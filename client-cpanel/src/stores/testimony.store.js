import axios from 'axios'

export default {
  namespaced: true,

  state: {
    testimonies: [],
    selectedTestimony: {}
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
      let index = state.testimonies.indexOf(testimony)
      state.testimonies.splice(index, 1, testimony)
    },

    deleteTestimony (state, testimony) {
      let index = state.testimonies.indexOf(testimony)
      state.testimonies.splice(index, 1)
    }
  },

  actions: {
    getAllTestimonies ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/testimony', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllTestimonies', res.data.testimonies)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getTestimony ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/testimony/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllTestimonies', res.data.testimonies)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    createTestimony ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/testimony', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewTestimony', res.data.testimony)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    updateTestimony ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload.id
        delete payload.id
        axios.put(`http://localhost:3000/testimony/${id}`, payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('updateTestimony', res.data.testimony)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    deleteTestimony ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://localhost:3000/testimony/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('deleteTestimony', payload)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    }
  }
}
