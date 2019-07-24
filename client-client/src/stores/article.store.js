import axios from 'axios'

export default {
  namespaced: true,

  state: {
    articles: [],
    selectedArticle: {}
  },

  mutations: {
    setAllArticle (state, articles) {
      state.articles = [...articles]
    },

    setSelectedArticle (state, article) {
      state.selectedArticle = article
    },

    insertNewArticle (state, article) {
      state.articles.push(article)
    },

    updateArticle (state, article) {
      let index = state.articles.indexOf(article)
      state.articles.splice(index, 1, article)
    },

    deleteArticle (state, article) {
      let index = state.articles.indexOf(article)
      state.articles.splice(index, 1)
    }
  },

  actions: {
    getAllArticles ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://35.197.150.118/article', {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setAllArticle', res.data.articles)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    getArticle ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`http://35.197.150.118/article/${id}`, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('setSelectedArticle', res.data.article)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    createArticle ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.150.118/article', payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('insertNewArticle', res.data.article)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    updateArticle ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let id = payload.id
        delete payload.id
        axios.put(`http://35.197.150.118/article/${id}`, payload, {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        })
          .then(res => {
            commit('updateArticle', res.data.article)
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },

    deleteArticle ({ commit }, payload) {
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
            resolve(res.data.message)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    }
  }
}
