import axios from 'axios'

export default {
  namespaced: true,

  state: {
    applicants: [],
    selectedApplicant: {}
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
    }
  },

  actions: {
    getAllApplicant ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/applicant', {
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
        axios.get(`http://localhost:3000/applicant/${id}`, {
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
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/applicant', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewApplicant', res.data.applicant)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    deleteApplicant ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://localhost:3000/applicant/${id}`, {
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
