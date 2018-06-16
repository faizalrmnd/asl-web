import axios from 'axios'

export default {
  namespaced: true,

  state: {
    images: [],
    selectedImage: {}
  },

  mutations: {
    setAllImage (state, images) {
      state.images = [...images]
    },

    setSelectedImage (state, image) {
      state.selectedImage = image
    },

    deleteImage (state, image) {
      let index = state.images.indexOf(image)
      state.images.splice(index, 1)
    }
  },

  actions: {
    getAllimages ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/image', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllImage', res.data.images)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getImage ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/image/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setSelectedImage', res.data.image)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    deleteImage ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://localhost:3000/image/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('deleteImage', payload)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    }
  }
}
