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
import EventDetail from './views/EventDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {title: 'Home | Artistik Salindia Lima'}
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {title: 'About | Artistik Salindia Lima'}
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
      meta: {title: 'Articles | Artistik Salindia Lima'}
    },
    {
      path: '/articles/:id',
      name: 'article-detail',
      component: ArticleDetail,
      meta: {title: 'Articles | Artistik Salindia Lima'}
    },
    {
      path: '/services',
      name: 'services',
      component: Services,
      meta: {title: 'Services | Artistik Salindia Lima'}
    },
    {
      path: '/merchandise',
      name: 'merchandise',
      component: Merchandise,
      meta: {title: 'Merchandise | Artistik Salindia Lima'}
    },
    {
      path: '/contactus',
      name: 'contactus',
      component: ContactUs,
      meta: {title: 'Contact | Artistik Salindia Lima'}
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      meta: {title: 'Events | Artistik Salindia Lima'}
    },
    {
      path: '/events/:id',
      name: 'event-detail',
      component: EventDetail,
      meta: {title: 'Events | Artistik Salindia Lima'}
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
