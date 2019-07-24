import axios from 'axios'

export default {
  namespaced: true,

  state: {
    applicants: [],
    selectedApplicant: {},
    isLoading: false
  },

  getters: {
    isLoading: state => state.isLoading
  },

  mutations: {
    setAllApplicant (state, applicants) {
      state.applicants = [...applicants]
    },

    setSelectedApplicant (state, applicant) {
      state.selectedApplicant = applicant
    },

    insertNewApplicant (state, applicant) {
      state.applicants.push(applicant)
    },

    updateApplicant (state, applicant) {
      let index = state.applicants.indexOf(applicant)
      state.applicants.splice(index, 1, applicant)
    },

    deleteApplicant (state, applicant) {
      let index = state.applicants.indexOf(applicant)
      state.applicants.splice(index, 1)
    },

    setLoading (state, payload) {
      state.isLoading = payload
    }
  },

  actions: {
    getAllApplicant ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://35.197.150.118/applicant', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllApplicant', res.data.applicants)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getApplicant ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`http://35.197.150.118/applicant/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setSelectedApplicant', res.data.applicant)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    createApplicant ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.150.118/applicant', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewApplicant', res.data.applicant)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            commit('setLoading', false)
            reject(err.message)
          })
      })
    },

    deleteApplicant ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://35.197.150.118/applicant/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('deleteApplicant', payload)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    }
  }
}
