<template>
      <div class="card-header">
        <h2 v-html="title"> </h2>
        <i id='todo-filter' @click="filterItems"   v-bind:class="[todoListFilter === 0 ? 'far fa-square' : todoListFilter ===1 ? 'fas fa-square': 'fas fa-check-square']"></i>
      </div>
      <div class="card-body">
        <ul data-filter="0" class="todo-list" id="todo-list">
           
           
            <div v-if="todosList.length  > 0">
                <div  v-for="(todo,index) in todosList" :key="todo"  v-bind:class="[todo.done === true ? 'done todo-item' : 'todo-item ']" >
                  <li>{{ index+1 }}.  {{ todo.title }}</li>
                  <i  v-bind:class="[todo.done === true ? 'fas fa-check-square':'fas fa-square' ]"  @click="doneTodo(todo)"></i>
                  <i class="fas fa-trash-alt" @click="deleteTodo(todo,$event)" ></i>
                  <i class="fas fa-pen-square"  @click="goToUpdatePage(todo)"></i>
                </div>
            </div>
            <div v-else><i class="far fa-smile-wink no-hover" style="font-size:20px"></i> | Hiç yapılacak işiniz bulunmamaktadır..</div>

        </ul>
      </div>
      <div class="card-footer">
        <input type="text" id="todo-input" v-model="newItem" @keydown.enter="onSave(newItem)" placeholder="Yeni yapılacaklar...">
        <button id="todo-button" @click="onSave(newItem)"><i class="fas fa-plus"></i></button>
      </div>
</template>
<script>
export default {
  data() {
    return {
      title:"",
      todoListFilter:1,
      newItem:"",
      todosList:[],
    }
  },
  created() {
    this.$appAxios.get("/todos")
    .then(todos_list_response=>{
      this.todosList=todos_list_response.data || []
    })
    this.title=`<i class="no-hover fas fa-list-ul"></i> Yapılacaklar Listesi`
  },
  methods: {
    onSave(newItem){
      const newTodo = {
          title:newItem,
          done:false,
      }
      console.log('newItem :>> ', newTodo);
      this.$appAxios.post("/todos",newTodo)
       this.$appAxios.get("/todos")
    .then(todos_list_response=>{
      this.todosList=todos_list_response.data || []
    })
      this.newItem=""
    },
    deleteTodo(todo,e){
      e.target.parentNode.classList.add('animate__animated', 'animate__zoomOut', 'animate__faster')
      e.target.parentNode.addEventListener('animationend',()=>{
            this.$appAxios.delete("/todos/"+todo.id)
      .then(delete_response=>{
        if (delete_response.status===200) {
          this.todosList=this.todosList.filter(t=>t.id!==todo.id)
        }
      })
      })
    
    },
     doneTodo(todo){
       if (todo.done==false) {
          const article= {title:todo.title,done:true}
          this.$appAxios.put("/todos/"+todo.id,article)
          .then(put_response=>console.log('put_response :>> ', put_response))
          this.$appAxios.get("/todos")
          .then(todos_list_response=>{
            this.todosList=todos_list_response.data || []
         })
       }
       else{
        const article= {title:todo.title,done:false}
          this.$appAxios.put("/todos/"+todo.id,article)
          .then(put_response=>console.log('put_response :>> ', put_response))
          this.$appAxios.get("/todos")
          .then(todos_list_response=>{
            this.todosList=todos_list_response.data || []
         })
       }

   },
    filterItems(){
          if (this.todoListFilter==0) {
              this.$appAxios.get("/todos")
              .then(todos_list_response=>{
              this.todosList=todos_list_response.data || []
              })
              this.title=`<i class="no-hover fas fa-list-ul"></i> Yapılacaklar Listesi`
          }
          else if(this.todoListFilter==1){
                this.$appAxios.get("/todos")
                .then(todos_list_response=>{
                this.todosList=todos_list_response.data.filter(t=>t.done=== true) || []
                })
                this.title=`<i class="no-hover far fa-calendar-check"></i> Tamamlananlar`
          }
          else{
                this.$appAxios.get("/todos")
                .then(todos_list_response=>{
                this.todosList=todos_list_response.data.filter(t=>t.done=== false) || []
                })
                 this.todoListFilter=-1
              this.title=`<i class="no-hover far fa-calendar-times"></i> Tamamlanamayanlar`
            }
       this.todoListFilter++
    },
    goToUpdatePage(todo){
      this.$router.push({
        name:'UpdatePage',
        query:{
            id:todo.id,
            title:todo.title,
            done:todo.done
        }
        })
    }

  },
  computed:{

  }

}
</script>