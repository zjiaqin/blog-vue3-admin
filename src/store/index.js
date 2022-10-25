import { createStore } from 'vuex'
// 使用vuex-persistedstate插件来进行持久化
import createPersistedState from 'vuex-persistedstate'
// 引入模块
import user from './modules/user'
import menu from './modules/menu'

const store = createStore({
  modules: {
    user,
    menu
  },
  plugins: [
    // 持久化插件配置
    createPersistedState({
      // 名称
      key: 'blog-admin-Store',
      // 持久化的模块
      paths: ['user']
    })
  ]
})

export default store
