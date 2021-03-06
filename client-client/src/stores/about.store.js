import axios from 'axios'

export default {
  namespaced: true,

  state: {
    about: {}
  },

  mutations: {
    setAbout (state, about) {
      state.about = about
    }
  },

  actions: {
    getAbout ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://35.197.150.118/about', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAbout', res.data.about)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    }
  }
}
