import Axios from 'axios'
import state from './state'
export default {
  namespaced: true,
  state,
  getters: {
    application: state => state.application,
    applications: state => state.applications,
    table: state => state.table
  },
  actions: {
    async getApplications(context, key) {
      try {
        const res = await Axios.get(
          'api/applicants/' + key.id + '/applications'
        )
        context.commit('applications', res.data)
      } catch (error) {
        throw error
      }
    },
    async getApplication(context, key) {
      try {
        console.log(key)
        const res = await Axios.get(
          'api/applicants/' + key.applicant_id + '/applications/' + key.id
        )
        context.commit('application', res.data)
      } catch (error) {
        throw error
      }
    },
    async update(context, key) {
      try {
        const res = await Axios.patch(
          'api/applicants/' + key.applicant_id + '/applications/' + key.id,
          key
        )
        return res.data
      } catch (error) {
        throw error
      }
    },
    async store(context, key) {
      try {
        await Axios.post('api/applicants/' + key.id + '/applications', key)
      } catch (error) {
        throw error
      }
    },
    async remove(context, key) {
      try {
        await Axios.delete(
          'api/applicants/' + key.applicant_id + '/applications/' + key.id
        )
      } catch (error) {
        throw error
      }
    }
  },
  mutations: {
    applications: (state, payload) => {
      state.applications = payload
    },
    application: (state, payload) => {
      state.application = payload
    }
  }
}
