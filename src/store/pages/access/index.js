import Axios from 'axios'
import state from './state'

export default {
  namespaced: true,
  state,
  mutations: {
    accesses(state, payload) {
      state.accesses = payload
    },
    access(state, payload) {
      state.access = payload
    },
    actions(state, payload) {
      state.actions = payload
    }
  },
  actions: {
    async getAccesses(context) {
      try {
        const res = await Axios.get('api/user-types')
        context.commit('accesses', res.data)
        return
      } catch (error) {
        throw error
      }
    },
    async getAccess(context, key) {
      context.commit('access', {})
      try {
        const res = await Axios.get('api/user-types/' + key)
        res.data.module_actions = res.data.module_actions.map(
          action => action.id
        )
        context.commit('access', res.data)
        return
      } catch (error) {
        throw error
      }
    },
    async update(context, key) {
      try {
        const res = await Axios.post('api/user-types/' + key.id + '/accesses', {
          accesses: key.module_actions
        })
        return res
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    accesses: state => state.accesses,
    access: state => state.access,
    table: state => state.table,
    actions: state => state.actions
  }
}
