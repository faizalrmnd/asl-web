import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Admin from './views/Admin.vue'
import Article from './views/Article.vue'
import ArticleDetail from './components/ArticleDetail.vue'
import Testimony from './views/Testimony.vue'
import Service from './views/Service.vue'
import Merchandise from './views/Merchandise.vue'
import Events from './views/Event.vue'
import EventDetail from './components/EventDetail.vue'
import Enquiry from './views/Enquiry.vue'
import About from './views/About.vue'

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
      component: Service
    },

    {
      path: '/merchandise',
      name: 'merchandise',
      component: Merchandise
    },

    {
      path: '/event',
      name: 'event',
      component: Events
    },

    {
      path: '/event/:id',
      name: 'event-detail',
      component: EventDetail
    },

    {
      path: '/enquiry',
      name: 'enquiry',
      component: Enquiry
    },

    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
