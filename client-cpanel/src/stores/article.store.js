import axios from 'axios'

export default {
  namespaced: true,

  state: {
    articles: [],
    selectedArticle: {},
    isLoading: false
  },

  getters: {
    isLoading: state => state.isLoading,
    getArticles: state => state.articles,
    selectedArticle: state => state.selectedArticle
  },

  mutations: {
    setAllArticle (state, articles) {
      state.articles = [...articles]
    },

    setSelectedArticle (state, article) {
      state.selectedArticle = article
    },

    insertNewArticle (state, article) {
      state.articles.unshift(article)
    },

    updateArticle (state, article) {
      let index = state.articles.indexOf(article)
      state.articles.splice(index, 1, article)
    },

    deleteArticle (state, article) {
      let index = state.articles.indexOf(article)
      state.articles.splice(index, 1)
    },

    setLoading (state, payload) {
      state.isLoading = payload
    }
  },

  actions: {
    getAllArticles ({ commit }) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get('http://35.197.150.118/article', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllArticle', res.data.articles)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getArticle ({ commit }, id) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get(`http://35.197.150.118/article/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setSelectedArticle', res.data.article)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    createArticle ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.150.118/article', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewArticle', res.data.article)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    updateArticle ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        let id = payload.get('id')
        // payload.delete(id)
        // let id = payload._id
        axios.put(`http://35.197.150.118/article/${id}`, payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('updateArticle', res.data.article)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    deleteArticle ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        let id = payload._id
        delete payload._id
        axios.delete(`http://35.197.150.118/article/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('deleteArticle', payload)
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
