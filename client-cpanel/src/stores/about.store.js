import axios from 'axios'

export default {
  namespaced: true,

  state: {
    about: {},
    isLoading: false
  },

  getters: {
    isLoading: state => state.isLoading
  },

  mutations: {
    setAbout (state, about) {
      state.about = about
    },
    setLoading (state, payload) {
      state.isLoading = payload
    }
  },

  actions: {
    getAbout ({ commit }) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/about', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAbout', res.data.about)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    createUpdateAbout ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post(`http://localhost:3000/about`, payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAbout', res.data.about)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    }
  }
}
