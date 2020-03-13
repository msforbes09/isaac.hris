import Axios from 'axios'
import state from './state'

export default {
  namespaced: true,
  state,
  getters: {
    keywords: state => state.keywords,
    table: state => state.table
  },
  actions: {
    async getKeywords(context) {
      try {
        const res = await Axios.get('api/keywords')
        context.commit('keywords', res.data)
      } catch (error) {
        throw error
      }
    },
    async create(context, key) {
      try {
        console.log(key)
        await Axios.post('api/keywords', key)
      } catch (error) {
        throw error
      }
    },
    async update(context, key) {
      try {
        await Axios.patch('api/keywords/' + key.id, key)
      } catch (error) {
        throw error
      }
    },
    async destroy(context, key) {
      try {
        await Axios.delete('api/keywords/' + key.id)
      } catch (error) {
        throw error
      }
    }
  },
  mutations: {
    keywords(state, payload) {
      state.keywords = payload
    }
  }
}
