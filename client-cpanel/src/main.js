import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import wysiwyg from 'vue-wysiwyg'
import VueCurrencyFilter from 'vue-currency-filter'
import VueMoment from 'vue-moment'
import './assets/css/admin-panel.css'
import VueMq from 'vue-mq'
import VueTruncate from 'vue-truncate-filter'
import VuePaginate from 'vue-paginate'
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import '../node_modules/vue-datetime/dist/vue-datetime.css'
// import Vuetify from 'vuetify'
// import '../node_modules/vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(VueTruncate)
Vue.use(VeeValidate)
// Vue.use(Vuetify)
Vue.use(wysiwyg, {
  image: {
    uploadURL: 'http://35.197.150.118/image',
    dropzoneOptions: {}
  }
})
Vue.use(VueCurrencyFilter, {
  symbol: 'Rp.',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true
})
Vue.use(VueMoment)
Vue.use(VueMq, {
  breakpoints: { vsmobile: 300, mobile: 767, tablet: 1024, laptop: 1200, desktop: Infinity }
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
Vue.use(VuePaginate)
Vue.use(Datetime)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
