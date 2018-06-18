import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import wysiwyg from 'vue-wysiwyg'

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(wysiwyg, {
  image: {
    uploadURL: 'http://localhost:3000/image',
    dropzoneOptions: {}
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
