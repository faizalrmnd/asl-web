import axios from 'axios'

export default {
  namespaced: true,

  state: {
    contacts: [],
    selectedContact: {},
    isLoading: false
  },

  getters: {
    isLoading: state => state.isLoading
  },

  mutations: {
    setAllContact (state, contacts) {
      state.contacts = [...contacts]
    },

    setSelectedContact (state, contact) {
      state.selectedContact = contact
    },

    insertNewContact (state, contact) {
      state.contacts.push(contact)
    },

    updateContact (state, contact) {
      let index = state.contacts.indexOf(contact)
      state.contacts.splice(index, 1, contact)
    },

    deleteContact (state, contact) {
      let index = state.contacts.indexOf(contact)
      state.contacts.splice(index, 1)
    },

    setLoading (state, payload) {
      state.isLoading = payload
    }
  },

  actions: {
    getAllcontacts ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://35.197.150.118/contact', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllContact', res.data.contacts)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getContact ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`http://35.197.150.118/contact/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setSelectedContact', res.data.contact)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    createContact ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.150.118/contact', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewContact', res.data.contact)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            commit('setLoading', false)
            reject(err.message)
          })
      })
    },

    respondContact ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload.id
        delete payload.id
        axios.put(`http://35.197.150.118/contact/${id}`, payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('updateContact', res.data.contact)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    deleteContact ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://35.197.150.118/contact/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('deleteContact', payload)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    }
  }
}
