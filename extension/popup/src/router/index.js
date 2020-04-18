import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue';

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Get Followers',
    menuIcon: 'mdi-human-male-height',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component : About
  }
]

// base: process.env.BASE_URL
const router = new VueRouter({
  mode: 'history',
  base: '/popup/dist/index.html',
  routes
})

export default router
