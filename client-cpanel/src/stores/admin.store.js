import axios from 'axios'

export default {
  namespaced: true,

  state: {
    loggedIn: false,
    user: {},
    isLoading: false
  },

  getters: {
    isLoading: state => state.isLoading
  },

  mutations: {
    changeLoggedInStatus (state, status) {
      state.loggedIn = status
    },

    setUser (state, user) {
      state.user = Object.assign({}, user)
    },

    setLoading (state, payload) {
      state.isLoading = payload
    }
  },

  actions: {
    verifyToken ({ commit }) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get('http://35.197.150.118/token', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setUser', res.data.user)
            commit('changeLoggedInStatus', true)
            commit('setLoading', false)
            resolve()
          })
          .catch(err => {
            commit('changeLoggedInStatus', false)
            reject(err)
          })
      })
    },

    register ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.150.118/users/register', payload)
          .then((res) => {
            localStorage.setItem('adminToken', res.headers.token)
            commit('setUser', res.data.user)
            commit('changeLoggedInStatus', true)
            commit('setLoading', false)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    login ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.150.118/users/login', payload)
          .then((res) => {
            localStorage.setItem('adminToken', res.headers.token)
            commit('setUser', res.data.user)
            commit('changeLoggedInStatus', true)
            commit('setLoading', false)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    updateAccount ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.put('http://35.197.150.118/users', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then((res) => {
            commit('setUser', res.data.user)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch((error) => {
            reject(error.message)
          })
      })
    },

    changePassword ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.put('http://35.197.150.118/users/pass', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then((res) => {
            commit('setLoading', false)
            resolve(res.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    deleteAccount ({ commit }) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.delete(`http://35.197.150.118/users/`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then((res) => {
            commit('setUser', {})
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
