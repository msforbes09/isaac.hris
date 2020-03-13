import Axios from 'axios'
import state from './state'
export default {
  namespaced: true,
  state,
  getters: {
    employment: state => state.employment,
    employments: state => state.employments,
    table: state => state.table
  },
  actions: {
    async getEmployments(context, key) {
      try {
        const res = await Axios.get('api/applicants/' + key.id + '/employments')
        context.commit('employments', res.data)
      } catch (error) {
        throw error
      }
    },
    async getEmployment(context, key) {
      try {
        const res = await Axios.get(
          'api/applicants/' + key.applicant_id + '/employments/' + key.id
        )
        context.commit('employment', res.data)
      } catch (error) {
        throw error
      }
    },
    async update(context, key) {
      try {
        const res = await Axios.patch(
          'api/applicants/' + key.applicant_id + '/employments/' + key.id,
          key
        )
        return res.data
      } catch (error) {
        throw error
      }
    },
    async store(context, key) {
      try {
        await Axios.post('api/applicants/' + key.id + '/employments', key)
      } catch (error) {
        throw error
      }
    },
    async remove(context, key) {
      try {
        await Axios.delete(
          'api/applicants/' + key.applicant_id + '/employments/' + key.id
        )
      } catch (error) {
        throw error
      }
    }
  },
  mutations: {
    employments: (state, payload) => {
      state.employments = payload
    },
    employment: (state, payload) => {
      state.employment = payload
    }
  }
}
