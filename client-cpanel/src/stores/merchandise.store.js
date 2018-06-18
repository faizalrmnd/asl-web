import axios from 'axios'

export default {
  namespaced: true,

  state: {
    merchandises: [],
    selectedMerchandise: {}
  },

  mutations: {
    setAllMerchandise (state, merchandises) {
      state.merchandises = [...merchandises]
    },

    setSelectedMerchandise (state, merchandise) {
      state.selectedMerchandise = merchandise
    },

    insertNewMerchandise (state, merchandise) {
      state.merchandises.push(merchandise)
    },

    updateMerchandise (state, merchandise) {
      let index = state.merchandises.indexOf(merchandise)
      state.merchandises.splice(index, 1, merchandise)
    },

    deleteMerchandise (state, merchandise) {
      let index = state.merchandises.indexOf(merchandise)
      state.merchandises.splice(index, 1)
    }
  },

  actions: {
    getAllMerchandise ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/merchandise', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllMerchandise', res.data.merchandises)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getMerchandise ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/merchandise/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setSelectedMerchandise', res.data.merchandise)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    createMerchandise ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/merchandise', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewMerchandise', res.data.merchandise)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    updateMerchandise ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload.id
        delete payload.id
        axios.put(`http://localhost:3000/merchandise/${id}`, payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('updateMerchandise', res.data.merchandise)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    deleteMerchandise ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://localhost:3000/merchandise/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('deleteMerchandise', payload)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    }
  }
}
