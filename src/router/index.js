import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/BlogLogin'
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
    path: '/blog/add',
    name: 'BlogAdd',
    component: () => import('../views/BlogEdit.vue')
  },

  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: () => import('../views/BlogEdit.vue')
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: () => import('../views/BlogDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
