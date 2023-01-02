import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
  
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import(/* webpackChunkName: "add" */ '../views/Edit.vue')
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "add" */ '../views/Add.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
