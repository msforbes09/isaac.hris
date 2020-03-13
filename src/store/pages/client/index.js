import Axios from 'axios'
import state from './state'

export default {
  namespaced: true,
  state,
  getters: {
    client: state => state.client,
    table: state => state.table,
    clients: state => state.clients,
    positions: state => state.positions
  },
  actions: {
    async getClient(context, key) {
      try {
        const res = await Axios.get('api/clients/' + key)
        context.commit('client', res.data)
      } catch (error) {
        throw error
      }
    },
    async getClients(context, key) {
      try {
        const res = await Axios.get(
          'api/clients?page=' +
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
        context.commit('clients', res.data)
      } catch (error) {
        throw error
      }
    },
    async getPositions(context, key) {
      try {
        const res = await Axios.get('api/clients/' + key + '/positions')
        context.commit('positions', res.data)
      } catch (error) {
        throw error
      }
    },
    async update(context, key) {
      try {
        const res = await Axios.patch('api/clients/' + key.id, key)
        return res.data
      } catch (error) {
        throw error
      }
    },
    async updatePosition(context, key) {
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
        await Axios.post('api/clients', key)
      } catch (error) {
        throw error
      }
    },
    async storePosition(context, key) {
      try {
        await Axios.post('api/clients/' + key.id + '/positions', key)
      } catch (error) {
        throw error
      }
    },
    async remove(context, key) {
      try {
        await Axios.delete('api/clients/' + key.id)
      } catch (error) {
        throw error
      }
    },
    async removePosition(context, key) {
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
    client(state, payload) {
      state.client = payload
    },
    clients(state, payload) {
      state.clients = payload
    },
    positions(state, payload) {
      state.positions = payload
    }
  }
}
