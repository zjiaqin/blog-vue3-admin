// 菜单模块
import { asyncRoutes } from '@/router/asyncRoutes.js'

function filterRoutes(list, allList) {
  list.push('1')
  const res = []
  allList.forEach((item) => {
    if (list.includes(item.meta.authId)) {
      if (item.children) {
        item.children = filterRoutes(list, item.children)
      }
      res.push(item)
    }
  })

  return res
}

export default {
  namespaced: true,
  state() {
    return {
      // 折叠
      isCollapse: false,
      menuList: []
    }
  },
  mutations: {
    // 改变折叠状态
    toggleCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    getMenuList(state, list) {
      state.menuList = filterRoutes(list, asyncRoutes).filter((item) => {
        return item.children.length > 0
      })

      console.log(state.menuList)
    }
  },
  actions: {}
}
