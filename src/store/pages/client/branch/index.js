import Axios from 'axios'
import state from './state'
export default {
  namespaced: true,
  state,
  getters: {
    branch: state => state.branch,
    branches: state => state.branches,
    table: state => state.table
  },
  actions: {
    async getBranches(context, key) {
      try {
        const res = await Axios.get(
          'api/clients/' +
            key.id +
            '/branches?page=' +
            key.page +
            '&per_page=' +
            key.rowsPerPage +
            '&sort_by=' +
            key.sortBy +
            '&sort=' +
            key.descending +
            '&keyword=' +
            (key.search || '')
        )
        context.commit('branches', res.data)
      } catch (error) {
        throw error
      }
    },
    async getBranch(context, key) {
      try {
        const res = await Axios.get(
          'api/clients/' + key.client_id + '/branches/' + key.id
        )
        context.commit('branch', res.data)
      } catch (error) {
        throw error
      }
    },
    async update(context, key) {
      try {
        const res = await Axios.patch(
          'api/clients/' + key.client_id + '/branches/' + key.id,
          key
        )
        return res.data
      } catch (error) {
        throw error
      }
    },
    async store(context, key) {
      try {
        await Axios.post('api/clients/' + key.id + '/branches', key)
      } catch (error) {
        throw error
      }
    },
    async remove(context, key) {
      try {
        await Axios.delete(
          'api/clients/' + key.client_id + '/branches/' + key.id
        )
      } catch (error) {
        throw error
      }
    }
  },
  mutations: {
    branches: (state, payload) => {
      state.branches = payload
    },
    branch: (state, payload) => {
      state.branch = payload
    }
  }
}
