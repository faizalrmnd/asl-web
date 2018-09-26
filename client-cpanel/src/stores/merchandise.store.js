import axios from 'axios'

export default {
  namespaced: true,

  state: {
    merchandises: [],
    selectedMerchandise: {},
    isLoading: false
  },

  getters: {
    isLoading: state => state.isLoading
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
    },

    setLoading (state, payload) {
      state.isLoading = payload
    }
  },

  actions: {
    getAllMerchandise ({ commit }) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get('http://35.197.150.118/merchandise', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllMerchandise', res.data.merchandises)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getMerchandise ({ commit }, id) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get(`http://35.197.150.118/merchandise/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setSelectedMerchandise', res.data.merchandise)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    createMerchandise ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.150.118/merchandise', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewMerchandise', res.data.merchandise)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    updateMerchandise ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        let id = payload.get('id')
        payload.delete(id)
        axios.put(`http://35.197.150.118/merchandise/${id}`, payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('updateMerchandise', res.data.merchandise)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    deleteMerchandise ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://35.197.150.118/merchandise/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('deleteMerchandise', payload)
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
