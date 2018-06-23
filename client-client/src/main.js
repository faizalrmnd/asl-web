import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTruncate from 'vue-truncate-filter'
import VueScrollReveal from 'vue-scroll-reveal'
import VueCurrencyFilter from 'vue-currency-filter'
import VueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.use(VueTruncate)
Vue.use(VueScrollReveal, {
  class: 'animated'
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
