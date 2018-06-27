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
// import Vuetify from 'vuetify'
// import '../node_modules/vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(VeeValidate)
// Vue.use(Vuetify)
Vue.use(wysiwyg, {
  image: {
    uploadURL: 'http://localhost:3000/image',
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
