import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "@/App";
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/popup/dist/index.html', 
    name: 'App',
    component: App
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// base: process.env.BASE_URL
const router = new VueRouter({
  mode: 'history',
  base: '/popup/dist/index.html',
  routes
})

export default router
