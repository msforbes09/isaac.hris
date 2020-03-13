import Axios from 'axios'
import state from './state'

export default {
  namespaced: true,
  state,
  getters: {
    table: state => state.table,
    focusApplicantFamilies: state => state.focusApplicantFamilies,
    columns: state => state.columns,
    filter: state => state.filter,
    pagination: state => state.pagination,
    applicants: state => state.applicants,
    applicant: state => state.applicant,
    focusApplicant: state => state.focusApplicant,
    checkApplicantIfExist: state => state.checkApplicantIfExist,
    form: state => state.form
  },
  actions: {
    async getApplicants(context, key) {
      try {
        const res = await Axios.get(
          'api/applicants?page=' +
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
        context.commit('applicants', res.data)
      } catch (error) {
        throw error
      }
    },
    async store(context, key) {
      try {
        const res = await Axios.post('api/applicants', key)
        return res.data
      } catch (error) {
        throw error
      }
    },
    async checkExists(context, key) {
      try {
        const res = await Axios.post('api/applicant-check', key)
        return res.data
      } catch (error) {
        throw error
      }
    },
    async update(context, key) {
      try {
        await Axios.patch('api/applicants/' + key.id, key)
      } catch (error) {
        throw error
      }
    },
    async remove(context, key) {
      try {
        await Axios.delete('api/applicants/' + key.id)
      } catch (error) {
        throw error
      }
    },
    async removeForm(context, key) {
      try {
        await Axios.delete(
          'api/applicants/' + key.applicant_id + '/' + key.form + '/' + key.id
        )
      } catch (error) {
        throw error
      }
    },
    async getApplicant(context, key) {
      try {
        const res = await Axios.get('api/applicants/' + key)
        context.commit('applicant', res.data)
      } catch (error) {
        throw error
      }
    },
    clearForm(context, key) {
      for (var x = 0; x < key.length; x++) {
        let req = key[x].requirements
        for (var y = 0; y < req.length; y++) {
          let temp = key[x].type.template
          for (var z = 0; z < temp.length; z++) {
            key[x].requirements[y][temp[z].model] = ''
          }
        }
        key[x].requirements.length = 1
      }
      return key
    }
  },
  mutations: {
    focusApplicantFamilies(state, payload) {
      state.focusApplicantFamilies = payload
    },
    filter(state, payload) {
      state.filter = payload
    },
    pagination(state, payload) {
      state.pagination = payload
    },
    applicants(state, payload) {
      state.applicants = payload
    },
    applicant(state, payload) {
      state.applicant = payload
    },
    focusApplicant(state, payload) {
      state.focusApplicant = payload
    },
    checkApplicantIfExist(state, payload) {
      state.checkApplicantIfExist = payload
    },
    table(state, payload) {
      state.table - payload
    }
  }
}
