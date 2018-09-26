import axios from 'axios'

export default {
  namespaced: true,

  state: {
    testimonies: [],
    selectedTestimony: {},
    isLoading: false
  },

  getters: {
    isLoading: state => state.isLoading
  },

  mutations: {
    setAllTestimonies (state, testimonies) {
      state.testimonies = [...testimonies]
    },

    setSelectedTestimony (state, testimony) {
      state.selectedTestimony = testimony
    },

    insertNewTestimony (state, testimony) {
      state.testimonies.push(testimony)
    },

    updateTestimony (state, testimony) {
      // di index of ga ada yang sama karena dia nyari data yang udah ke update
      // possible fix, commit dulu abis itu baru axios update
      let index = state.testimonies.indexOf(testimony)
      state.testimonies.splice(index, 1, testimony)
    },

    deleteTestimony (state, testimony) {
      let index = state.testimonies.indexOf(testimony)
      state.testimonies.splice(index, 1)
    },

    setLoading (state, payload) {
      state.isLoading = payload
    }
  },

  actions: {
    getAllTestimonies ({ commit }) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get('http://35.197.150.118/testimony', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllTestimonies', res.data.testimonies)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getTestimony ({ commit }, id) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get(`http://35.197.150.118/testimony/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllTestimonies', res.data.testimonies)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    createTestimony ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.150.118/testimony', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewTestimony', res.data.testimony)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    updateTestimony ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        let id = payload.get('id')
        payload.delete('id')
        axios.put(`http://35.197.150.118/testimony/${id}`, payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('updateTestimony', res.data.testimony)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    deleteTestimony ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://35.197.150.118/testimony/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('deleteTestimony', payload)
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
