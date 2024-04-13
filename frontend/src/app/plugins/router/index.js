import { createWebHistory, createRouter } from 'vue-router'

import { Battery } from '@/pages/battery'
import { Login } from '@/pages/login'

const routes = [
  { name: 'Battery', path: '/', component: Battery },
  { name: 'CurrentBattery', path: '/:id', component: Battery },
  { name: 'Auth', path: '/auth', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
