import Vue from 'vue'
import Vuex from 'vuex'
import admin from './stores/admin.store'
import article from './stores/article.store'
import testimony from './stores/testimony.store'
import about from './stores/about.store'
import image from './stores/image.store'
import merchandise from './stores/merchandise.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin,
    article,
    testimony,
    about,
    image,
    merchandise
  }
})
