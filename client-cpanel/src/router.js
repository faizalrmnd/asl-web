import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
// import  from './views/.vue'
// import  from './views/.vue'
// import  from './views/.vue'
// import  from './views/.vue'
// import  from './views/.vue'
// import  from './views/.vue'
// import  from './views/.vue'
// import  from './views/.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/register',
      name: 'register',
      component: Register
    },

    {
      path: '/admin',
      name: 'admin',
      component: Home
    },

    {
      path: '/artikel',
      name: 'artikel',
      component: Home
    },

    {
      path: '/testimoni',
      name: 'testimoni',
      component: Home
    },

    {
      path: '/product',
      name: 'product',
      component: Home
    },

    {
      path: '/merchandise',
      name: 'merchandise',
      component: Home
    },

    {
      path: '/event',
      name: 'event',
      component: Home
    },

    {
      path: '/enquiry',
      name: 'enquiry',
      component: Home
    },

    {
      path: '/about',
      name: 'about',
      component: Home
    }
  ]
})
