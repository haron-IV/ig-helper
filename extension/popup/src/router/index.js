import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import About from '../views/About.vue';
import SavedProfiles from "../views/SavedProfiles.vue";

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Get Followers',
    menuIcon: 'mdi-human-male-height',
    component: Home
  },
  {
    path: '/SavedProfiles',
    name: 'Saved Profiles',
    menuIcon: 'mdi-folder-account',
    component: SavedProfiles
  },
  {
    path: '/about',
    name: 'About',
    menuIcon: 'mdi-information',
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
