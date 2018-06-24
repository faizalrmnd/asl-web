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
        axios.get('http://localhost:3000/about', {
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
    },

    createUpdateAbout ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`http://localhost:3000/about`, payload, {
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
