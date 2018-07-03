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
      component: Home,
      meta: {title: 'Home | Admin ASL'}
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {title: 'Register / Login | Admin Asl'}
    },

    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {title: 'User | Admin Asl'}
    },

    {
      path: '/artikel',
      name: 'artikel',
      component: Article,
      meta: {title: 'Article | Admin Asl'}
    },

    {
      path: '/artikel/:id',
      name: 'artikel-detail',
      component: ArticleDetail,
      meta: {title: 'Article | Admin Asl'}
    },

    {
      path: '/testimoni',
      name: 'testimoni',
      component: Testimony,
      meta: {title: 'Testimony | Admin Asl'}
    },

    {
      path: '/service',
      name: 'service',
      component: Service,
      meta: {title: 'Service | Admin Asl'}
    },

    {
      path: '/merchandise',
      name: 'merchandise',
      component: Merchandise,
      meta: {title: 'Merchandise | Admin Asl'}
    },

    {
      path: '/event',
      name: 'event',
      component: Events,
      meta: {title: 'Events | Admin Asl'}
    },

    {
      path: '/event/:id',
      name: 'event-detail',
      component: EventDetail,
      meta: {title: 'Events | Admin Asl'}
    },

    {
      path: '/enquiry',
      name: 'enquiry',
      component: Enquiry,
      meta: {title: 'Enquiry | Admin Asl'}
    },

    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {title: 'About | Admin Asl'}
    }
  ]
})
