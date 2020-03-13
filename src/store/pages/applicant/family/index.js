import Axios from 'axios'
import state from './state'
export default {
  namespaced: true,
  state,
  getters: {
    family: state => state.family,
    families: state => state.families,
    table: state => state.table
  },
  actions: {
    async getFamilies(context, key) {
      try {
        const res = await Axios.get('api/applicants/' + key.id + '/families')
        context.commit('families', res.data)
      } catch (error) {
        throw error
      }
    },
    async getFamily(context, key) {
      try {
        const res = await Axios.get(
          'api/applicants/' + key.applicant_id + '/families/' + key.id
        )
        context.commit('family', res.data)
      } catch (error) {
        throw error
      }
    },
    async update(context, key) {
      try {
        const res = await Axios.patch(
          'api/applicants/' + key.applicant_id + '/families/' + key.id,
          key
        )
        return res.data
      } catch (error) {
        throw error
      }
    },
    async store(context, key) {
      try {
        await Axios.post('api/applicants/' + key.id + '/families', key)
      } catch (error) {
        throw error
      }
    },
    async remove(context, key) {
      try {
        await Axios.delete(
          'api/applicants/' + key.applicant_id + '/families/' + key.id
        )
      } catch (error) {
        throw error
      }
    }
  },
  mutations: {
    families: (state, payload) => {
      state.families = payload
    },
    family: (state, payload) => {
      state.family = payload
    }
  }
}
