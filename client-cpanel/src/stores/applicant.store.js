import axios from 'axios'

export default {
  namespaced: true,

  state: {
    applicants: [],
    selectedApplicant: {},
    applicantsOnEvent: [],
    isLoading: false
  },

  getters: {
    isLoading: state => state.isLoading
  },

  mutations: {
    setAllApplicant (state, applicants) {
      state.applicants = [...applicants]
    },

    setApplicantsOnEvent (state, applicants) {
      state.applicantsOnEvent = [...applicants]
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
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get('http://35.197.150.118/applicant', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllApplicant', res.data.applicants)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getApplicant ({ commit }, id) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get(`http://35.197.150.118/applicant/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setSelectedApplicant', res.data.applicant)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getApplicantsByEventId ({ commit }, id) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get(`http://35.197.150.118/applicant/event/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setApplicantsOnEvent', res.data.applicants)
            commit('setLoading', false)
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
            reject(err.message)
          })
      })
    },

    deleteApplicant ({ commit }, payload) {
      commit('setLoading', true)
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
