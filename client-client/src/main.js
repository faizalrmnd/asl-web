import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTruncate from 'vue-truncate-filter'
import VueScrollReveal from 'vue-scroll-reveal'

Vue.config.productionTip = false
Vue.use(VueTruncate)
Vue.use(VueScrollReveal, {
  class: 'animated'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
