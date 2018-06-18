import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Admin from './views/Admin.vue'
import Article from './views/Article.vue'
import ArticleDetail from './components/ArticleDetail.vue'
import Testimony from './views/Testimony.vue'
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
      component: Admin
    },

    {
      path: '/artikel',
      name: 'artikel',
      component: Article
    },

    {
      path: '/artikel/:id',
      name: 'artikel-detail',
      component: ArticleDetail
    },

    {
      path: '/testimoni',
      name: 'testimoni',
      component: Testimony
    },

    {
      path: '/service',
      name: 'service',
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
