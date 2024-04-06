import { createWebHistory, createRouter } from 'vue-router'

import { Login } from '@/pages/login'
import { Battery } from '@/pages/battery'

// 2. Определяем несколько маршрутов
// Каждый маршрут должен указывать на компонент.
// "Компонентом" может быть как конструктор компонента, созданный
// через `Vue.extend()`, так и просто объект с опциями компонента.
// Мы поговорим о вложенных маршрутах позднее.
const routes = [
  { name: 'Battery', path: '/', component: Battery },
  { name: 'Auth', path: '/auth', component: Login },
]

// 3. Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
// Вы можете передавать и дополнительные опции, но пока не будем усложнять.
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
