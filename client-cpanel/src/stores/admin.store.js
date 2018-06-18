import axios from 'axios'

export default {
  namespaced: true,

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
            reject(error)
          })
      })
    },

    updateAccount ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:3000/users', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then((res) => {
            commit('setUser', res.data.user)
            resolve(res.data.message)
          })
          .catch((error) => {
            reject(error.message)
          })
      })
    },

    changePassword ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:3000/users/pass', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then((res) => {
            resolve(res.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    deleteAccount ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3000/users/`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then((res) => {
            commit('setUser', {})
            resolve(res.data.message)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
