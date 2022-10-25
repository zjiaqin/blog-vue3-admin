// 菜单模块
export default {
  namespaced: true,
  state() {
    return {
      // 折叠
      isCollapse: false
    }
  },
  mutations: {
    // 改变折叠状态
    toggleCollapse(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
