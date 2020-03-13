import Axios from 'axios'
import state from './state'

export default {
  namespaced: true,
  state,
  getters: {
    table: state => state.table,
    users: state => state.users,
    user: state => state.user
  },
  actions: {
    async getUsers(store) {
      try {
        const res = await Axios.get('api/users')
        store.commit('users', res.data)
      } catch (error) {
        throw error
      }
    },
    async getUser(store, id) {
      try {
        store.commit('user', {})
        const res = await Axios.get('api/users/' + id)
        store.commit('user', res.data)
        return
      } catch (error) {
        throw error
      }
    },
    async update(store, user) {
      try {
        const res = await Axios.patch('api/users/' + user.id, user)
        return res
      } catch (error) {
        throw error
      }
    },
    async create(store, user) {
      try {
        const res = await Axios.post('api/users', user)
        return res
      } catch (error) {
        throw error
      }
    }
  },
  mutations: {
    users(state, payload) {
      state.users = payload
    },
    user(state, payload) {
      state.user = payload
    }
  }
}
