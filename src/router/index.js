import { createRouter, createWebHistory } from 'vue-router'
import { asyncRoutes } from './asyncRoutes.js'
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  ...asyncRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
