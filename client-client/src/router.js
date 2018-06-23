import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Articles from './views/Articles.vue'
import Services from './views/Services.vue'
import Merchandise from './views/Merchandise.vue'
import ContactUs from './views/ContactUs.vue'
import ArticleDetail from './views/ArticleDetail.vue'
import Events from './views/Events.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/articles/:id',
      name: 'article-detail',
      component: ArticleDetail
    },
    {
      path: '/services',
      name: 'services',
      component: Services
    },
    {
      path: '/merchandise',
      name: 'merchandise',
      component: Merchandise
    },
    {
      path: '/contactus',
      name: 'contactus',
      component: ContactUs
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    }
  ],
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    return {
      x: 0,
      y: 0
    }
  }
})
