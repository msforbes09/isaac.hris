import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    branches: [],
    userTypes: [],
    modules: [],
    companies: [],
    applicantsKeysGender: [],
    applicantsKeysHeight: [],
    applicantsKeysWeight: [],
    applicantsKeysCivilStatus: [],
    applicantsKeysCitizenship: [],
    applicantsKeysReligion: [],
    applicantsKeysTaxCode: [],
    applicantsKeysRelationship: [],
    applicantsKeysEducationLevel: [],
    applicantsKeysInterviewStat: [],
    applicantsKeysExamStat: [],
    applicantsKeysMedicalStat: [],
    applicantsKeysRequirementStat: [],
    applicantsKeysApplicationStat: [],
    applicantsClients: [],
    applicants: []
  },
  getters: {
    branches: state => state.branches,
    userTypes: state => state.userTypes,
    modules: state => state.modules,
    companies: state => state.companies,
    applicants: state => state.applicants,
    applicantsKeysGender: state => state.applicantsKeysGender,
    applicantsKeysHeight: state => state.applicantsKeysHeight,
    applicantsKeysWeight: state => state.applicantsKeysWeight,
    applicantsKeysCivilStatus: state => state.applicantsKeysCivilStatus,
    applicantsKeysCitizenship: state => state.applicantsKeysCitizenship,
    applicantsKeysReligion: state => state.applicantsKeysReligion,
    applicantsKeysRelationship: state => state.applicantsKeysRelationship,
    applicantsKeysEducationLevel: state => state.applicantsKeysEducationLevel,
    applicantsKeysInterviewStat: state => state.applicantsKeysInterviewStat,
    applicantsKeysExamStat: state => state.applicantsKeysExamStat,
    applicantsKeysMedicalStat: state => state.applicantsKeysMedicalStat,
    applicantsKeysRequirementStat: state => state.applicantsKeysRequirementStat,
    applicantsKeysApplicationStat: state => state.applicantsKeysApplicationStat,
    applicantsClients: state => state.applicantsClients,
    applicantsKeysTaxCode: state => state.applicantsKeysTaxCode
  },
  actions: {
    async getUserTools(context) {
      try {
        const res = await Axios.get('api/tools/user-management')
        context.commit('userTypes', res.data.user_types)
        context.commit('branches', res.data.branches)
      } catch (error) {
        throw error
      }
    },
    async getAccessTools(context) {
      try {
        const res = await Axios.get('api/tools/module-management')
        context.commit('modules', res.data.modules)
      } catch (error) {
        throw error
      }
    },
    async getClientManagement(context) {
      try {
        const res = await Axios.get('api/tools/client-management')
        context.commit('companies', res.data.companies)
      } catch (error) {
        throw error
      }
    },
    async getApplicantManagement(context) {
      try {
        const res = await Axios.get('api/tools/applicant-management')
        context.commit('applicants', res.data)
        context.commit(
          'applicantsKeysGender',
          res.data.keys.find(key => key.name == 'gender').keywords
        )
        context.commit(
          'applicantsKeysHeight',
          res.data.keys.find(key => key.name == 'height').keywords
        )
        context.commit(
          'applicantsKeysWeight',
          res.data.keys.find(key => key.name == 'weight').keywords
        )
        context.commit(
          'applicantsKeysCivilStatus',
          res.data.keys.find(key => key.name == 'civil_status').keywords
        )
        context.commit(
          'applicantsKeysCitizenship',
          res.data.keys.find(key => key.name == 'citizenship').keywords
        )
        context.commit(
          'applicantsKeysReligion',
          res.data.keys.find(key => key.name == 'religion').keywords
        )
        context.commit(
          'applicantsKeysTaxCode',
          res.data.keys.find(key => key.name == 'tax_code').keywords
        )
        context.commit(
          'applicantsKeysRelationship',
          res.data.keys.find(key => key.name == 'relationship').keywords
        )
        context.commit(
          'applicantsKeysEducationLevel',
          res.data.keys.find(key => key.name == 'education_level').keywords
        )
        context.commit(
          'applicantsKeysInterviewStat',
          res.data.keys.find(key => key.name == 'interview_status').keywords
        )
        context.commit(
          'applicantsKeysExamStat',
          res.data.keys.find(key => key.name == 'exam_status').keywords
        )
        context.commit(
          'applicantsKeysMedicalStat',
          res.data.keys.find(key => key.name == 'medical_status').keywords
        )
        context.commit(
          'applicantsKeysRequirementStat',
          res.data.keys.find(key => key.name == 'requirement_status').keywords
        )
        context.commit(
          'applicantsKeysApplicationStat',
          res.data.keys.find(key => key.name == 'application_status').keywords
        )
        context.commit('applicantsClients', res.data.clients)
      } catch (error) {
        throw error
      }
    }
  },
  mutations: {
    branches(state, payload) {
      state.branches = payload
    },
    userTypes(state, payload) {
      state.userTypes = payload
    },
    modules(state, payload) {
      state.modules = payload
    },
    companies(state, payload) {
      state.companies = payload
    },
    applicants(state, payload) {
      state.applicants = payload
    },
    applicantsKeysGender(state, payload) {
      state.applicantsKeysGender = payload
    },
    applicantsKeysHeight(state, payload) {
      state.applicantsKeysHeight = payload
    },
    applicantsKeysWeight(state, payload) {
      state.applicantsKeysWeight = payload
    },
    applicantsKeysCivilStatus(state, payload) {
      state.applicantsKeysCivilStatus = payload
    },
    applicantsKeysCitizenship(state, payload) {
      state.applicantsKeysCitizenship = payload
    },
    applicantsKeysReligion(state, payload) {
      state.applicantsKeysReligion = payload
    },
    applicantsKeysTaxCode(state, payload) {
      state.applicantsKeysTaxCode = payload
    },
    applicantsKeysRelationship(state, payload) {
      state.applicantsKeysRelationship = payload
    },
    applicantsKeysEducationLevel(state, payload) {
      state.applicantsKeysEducationLevel = payload
    },
    applicantsKeysInterviewStat(state, payload) {
      state.applicantsKeysInterviewStat = payload
    },
    applicantsKeysExamStat(state, payload) {
      state.applicantsKeysExamStat = payload
    },
    applicantsKeysMedicalStat(state, payload) {
      state.applicantsKeysMedicalStat = payload
    },
    applicantsKeysRequirementStat(state, payload) {
      state.applicantsKeysRequirementStat = payload
    },
    applicantsKeysApplicationStat(state, payload) {
      state.applicantsKeysApplicationStat = payload
    },
    applicantsClients(state, payload) {
      state.applicantsClients = payload
    }
  }
}
