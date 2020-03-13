import Axios from 'axios'
import state from './state'
export default {
  namespaced: true,
  state,
  getters: {
    education: state => state.education,
    educations: state => state.educations,
    table: state => state.table
  },
  actions: {
    async getEducations(context, key) {
      try {
        const res = await Axios.get('api/applicants/' + key.id + '/education')
        context.commit('educations', res.data)
      } catch (error) {
        throw error
      }
    },
    async getEducation(context, key) {
      try {
        const res = await Axios.get(
          'api/applicants/' + key.applicant_id + '/education/' + key.id
        )
        context.commit('education', res.data)
      } catch (error) {
        throw error
      }
    },
    async update(context, key) {
      try {
        const res = await Axios.patch(
          'api/applicants/' + key.applicant_id + '/education/' + key.id,
          key
        )
        return res.data
      } catch (error) {
        throw error
      }
    },
    async store(context, key) {
      try {
        await Axios.post('api/applicants/' + key.id + '/education', key)
      } catch (error) {
        throw error
      }
    },
    async remove(context, key) {
      try {
        await Axios.delete(
          'api/applicants/' + key.applicant_id + '/education/' + key.id
        )
      } catch (error) {
        throw error
      }
    }
  },
  mutations: {
    educations: (state, payload) => {
      state.educations = payload
    },
    education: (state, payload) => {
      state.education = payload
    }
  }
}
