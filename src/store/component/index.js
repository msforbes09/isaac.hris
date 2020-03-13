export default {
  namespaced: true,
  state: {
    drawer: true
  },
  mutations: {
    drawer(state, payload) {
      state.drawer = payload
    }
  },
  actions: {},
  getters: {
    drawer: state => state.drawer
  }
}
