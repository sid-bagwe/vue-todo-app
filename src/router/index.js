import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewTodos from '@/components/Todos/ViewTodos'
import AddNewTodo from '@/components/Todos/AddNewTodo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todos',
    component: ViewTodos
  },
  {
    path: '/addTodo',
    name: 'AddTodo',
    component: AddNewTodo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
