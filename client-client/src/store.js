import Vue from 'vue'
import Vuex from 'vuex'
import article from './stores/article.store'
import testimony from './stores/testimony.store'
import about from './stores/about.store'
import merchandise from './stores/merchandise.store'
import service from './stores/service.store'
import event from './stores/event.store'
import applicant from './stores/applicant.store'
import contact from './stores/contact.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    article,
    testimony,
    about,
    merchandise,
    service,
    event,
    applicant,
    contact
  }
})
