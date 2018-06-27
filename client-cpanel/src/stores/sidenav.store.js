export default {
  namespaced: true,

  state: {
    sidebarOpened: true
  },

  getters: {
    sidebarOpened: state => state.sidebarOpened
  },

  mutations: {
    setSidebarOpened (state, payload) {
      state.sidebarOpened = payload
    }
  },

  actions: {
    changeSidebarOpened ({commit}, payload) {
      commit('setSidebarOpened', payload)
    }
  }
}
