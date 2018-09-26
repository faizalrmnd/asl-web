import axios from 'axios'

export default {
  namespaced: true,

  state: {
    events: [],
    selectedEvent: {},
    isLoading: false
  },

  getters: {
    isLoading: state => state.isLoading,
    getAllEvent: state => state.events,
    getEvent: state => state.selectedEvent
  },

  mutations: {
    setAllEvent (state, events) {
      state.events = [...events]
    },

    setSelectedEvent (state, event) {
      state.selectedEvent = event
    },

    insertNewEvent (state, event) {
      state.events.push(event)
    },

    updateEvent (state, event) {
      let index = state.events.indexOf(event)
      state.events.splice(index, 1, event)
    },

    deleteEvent (state, event) {
      let index = state.events.indexOf(event)
      state.events.splice(index, 1)
    },

    setLoading (state, payload) {
      state.isLoading = payload
    }
  },

  actions: {
    getAllEvent ({ commit }) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get('http://35.197.150.118/event', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllEvent', res.data.events)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getEvent ({ commit }, id) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get(`http://35.197.150.118/event/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setSelectedEvent', res.data.event)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    createEvent ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.150.118/event', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewEvent', res.data.event)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    updateEvent ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload.id
        delete payload.id
        axios.put(`http://35.197.150.118/event/${id}`, payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('updateEvent', res.data.event)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    deleteEvent ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://35.197.150.118/event/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('deleteEvent', payload)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    }
  }
}
