// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import TodoPage from '@/pages/TodoPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/todo',
    name: 'Todo',
    component: TodoPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
