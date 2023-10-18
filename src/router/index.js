import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import index from '../views/index.vue'
import new_index from '../views/new_index.vue'
const routes = [
  {
    path: '/',
    name: 'index',
    component: index
    // redirect: '/index' // 设置默认打开首页
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: new_index
  //   // redirect: '/index' // 设置默认打开首页
  // },

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
