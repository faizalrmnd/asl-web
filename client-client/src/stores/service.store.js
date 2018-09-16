import axios from 'axios'

export default {
  namespaced: true,

  state: {
    services: [],
    selectedService: {}
  },

  mutations: {
    setAllService (state, services) {
      state.services = [...services]
    },

    setSelectedService (state, service) {
      state.selectedService = service
    },

    insertNewService (state, service) {
      state.services.push(service)
    },

    updateService (state, service) {
      let index = state.services.indexOf(service)
      state.services.splice(index, 1, service)
    },

    deleteService (state, service) {
      let index = state.services.indexOf(service)
      state.services.splice(index, 1)
    }
  },

  actions: {
    getAllService ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/service', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllService', res.data.services)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getService ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/service/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setSelectedService', res.data.service)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    createService ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/service', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewService', res.data.service)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    updateService ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload.id
        delete payload.id
        axios.put(`http://localhost:3000/service/${id}`, payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('updateService', res.data.service)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    deleteService ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://localhost:3000/service/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('deleteService', payload)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    }
  }
}
