import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import '@/assets/style.css'
import { appAxios } from './utils/appAxios'
const app = createApp(App)
app.use(router)
app.config.globalProperties.$appAxios=appAxios
app.mount('#app')
