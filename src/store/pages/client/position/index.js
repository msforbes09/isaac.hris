import Axios from 'axios'
import state from './state'
export default {
  namespaced: true,
  state,
  getters: {
    position: state => state.position,
    positions: state => state.positions,
    table: state => state.table
  },
  actions: {
    async getPositions(context, key) {
      try {
        const res = await Axios.get(
          'api/clients/' +
            key.id +
            '/positions?page=' +
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
        context.commit('positions', res.data)
      } catch (error) {
        throw error
      }
    },
    async getPosition(context, key) {
      try {
        const res = await Axios.get(
          'api/clients/' + key.client_id + '/positions/' + key.id
        )
        context.commit('position', res.data)
      } catch (error) {
        throw error
      }
    },
    async update(context, key) {
      try {
        const res = await Axios.patch(
          'api/clients/' + key.client_id + '/positions/' + key.id,
          key
        )
        return res.data
      } catch (error) {
        throw error
      }
    },
    async store(context, key) {
      try {
        await Axios.post('api/clients/' + key.id + '/positions', key)
      } catch (error) {
        throw error
      }
    },
    async remove(context, key) {
      try {
        await Axios.delete(
          'api/clients/' + key.client_id + '/positions/' + key.id
        )
      } catch (error) {
        throw error
      }
    }
  },
  mutations: {
    positions: (state, payload) => {
      state.positions = payload
    },
    position: (state, payload) => {
      state.position = payload
    }
  }
}
