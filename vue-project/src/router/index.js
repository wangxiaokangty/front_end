import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/Blogs'
  },
  {
    path: '/BlogLogin',
    name: 'BlogLogin',
    component: () => import('../views/BlogLogin.vue')
  },
  {
    path: '/Blogs',
    name: 'Blogs',
    component: () => import('../views/Blogs.vue')
  },
  {
    path: '/BlogEdit',
    name: 'BlogEdit',
    component: () => import('../views/BlogEdit.vue')
  },
  {
    path: '/BlogDetail',
    name: 'BlogDetail',
    component: () => import('../views/BlogDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
