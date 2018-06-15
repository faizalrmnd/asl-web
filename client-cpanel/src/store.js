import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: {}
  },
  mutations: {
    changeLoggedInStatus (state, status) {
      state.loggedIn = status
    },

    setUser (state, user) {
      state.user = Object.assign({}, user)
    }
  },
  actions: {
    verifyToken ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/token', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setUser', res.data.user)
            commit('changeLoggedInStatus', true)
            resolve()
          })
          .catch(err => {
            commit('changeLoggedInStatus', false)
            reject(err)
          })
      })
    },

    register ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/users/register', payload)
          .then((res) => {
            localStorage.setItem('adminToken', res.headers.token)
            commit('setUser', res.data.user)
            commit('changeLoggedInStatus', true)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/users/login', payload)
          .then((res) => {
            localStorage.setItem('adminToken', res.headers.token)
            commit('setUser', res.data.user)
            commit('changeLoggedInStatus', true)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    }
  }
})
