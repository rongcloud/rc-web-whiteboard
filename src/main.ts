import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import element from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/css/reset.scss'
import './assets/css/common.scss'
import './utils/rem'
const app = createApp(App)
app.use(router)
app.use(element)
app.mount('#app')
