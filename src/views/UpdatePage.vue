<template>
     <div class="card-header">
        <h2> <i class="no-hover fas fa-pen-square"></i><label for="UpdateItem"> Güncelle</label></h2>
      </div>
    <div class="card-body">
      <div class="form-group">
        
        <input type="text" @keydown.enter="updateTodo()"  class="form-control" v-model="$route.query.title" id="UpdateItem">
      </div>
      <div class="button-group">
      <button class="btn-update" @click="updateTodo()">Tamam <i class="far fa-check-circle"></i></button>
      <button class="btn-cancel" @click="$router.push({name:'HomePage'})" >İptal <i class="fas fa-ban"></i></button>
    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    
    }
  },
  methods: {
    updateTodo(){
      const article={
        title:this.$route.query.title,
        done:this.$route.query.done
      }
      this.$appAxios.put("/todos/"+this.$route.query.id,article)
      this.$router.push({name:'HomePage'})
    }
  },


  }
</script>