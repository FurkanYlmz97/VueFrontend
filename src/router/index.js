import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DepartmentView from '../views/DepartmentView.vue'
import EmployeeView from '../views/EmployeeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/departments',
    name: 'departments',
    component: DepartmentView
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
