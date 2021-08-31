import { createRouter, createWebHashHistory } from "vue-router";

const routes=[
  {
    name:"HomePage",
    path:"/",
    component:()=> import("@/views/HomePage.vue")
  },  
  {
    name:"UpdatePage",
    path:"/update",
    component:()=> import("@/views/UpdatePage.vue")
  }
]

const router= createRouter({
  routes,
  history: createWebHashHistory()
})

export default router