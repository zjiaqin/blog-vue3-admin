// 用户模块
export default {
  namespaced: true,
  state() {
    return {
      // 用户信息
      profile: null,
      token: ''
    }
  },
  mutations: {
    // 存储用户详细信息
    setUserInfo(state, val) {
      state.profile = val
    },
    // 存储token
    setToken(state, val) {
      state.token = val
    },
    // 清除所有状态
    clearAll(state) {
      state.profile = null
      state.token = ''
    }
  },
  actions: {}
}
