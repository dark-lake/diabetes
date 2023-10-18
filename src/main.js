import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
// import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

// app.config.globalProperties.$axios = axios
app.use(router)
app.use(ElementPlus)
app.mount('#app')

// app.config.errorHandler = function (err, vm, info) {
//   if (err.message.includes('ResizeObserver loop limit exceeded')) {
//     // 忽略某些错误
//     return;
//   }
//   console.log('错误', err);
// }

// createApp(App).use(router).mount('#app')
