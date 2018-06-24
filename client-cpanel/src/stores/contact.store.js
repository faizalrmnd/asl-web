import axios from 'axios'

export default {
  namespaced: true,

  state: {
    contacts: [],
    selectedContacc: {}
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
    }
  },

  actions: {
    getAllcontacts ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/contact', {
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
        axios.get(`http://localhost:3000/contact/${id}`, {
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
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/contact', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewContact', res.data.contact)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    respondContact ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload.id
        let email = {
          subject: payload.subject,
          message: payload.message
        }
        delete payload.id
        delete payload.subject
        delete payload.message

        axios.put(`http://localhost:3000/contact/${id}`, email, {
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
    },

    deleteContact ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://localhost:3000/contact/${id}`, {
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
