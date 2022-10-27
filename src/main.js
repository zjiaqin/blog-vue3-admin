import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import * as utils from '@/utils/utils.js'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'reset-css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import api from '@/api'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$api = api
app.config.globalProperties.$utils = utils

app.use(router).use(store).mount('#app')
