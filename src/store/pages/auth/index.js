import { LocalStorage } from 'quasar'
import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    access_token: LocalStorage.getItem('hris_access_token') || null,
    user: {}
  },
  mutations: {
    access_token(state, payload) {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload
      state.access_token = payload
      payload
        ? LocalStorage.set('hris_access_token', payload)
        : LocalStorage.remove('hris_access_token')
    },
    user(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async get_token(context, key) {
      try {
        const res = await Axios.post('api/get-token', key)
        context.commit('access_token', res.data.accessToken)
        return res
      } catch (error) {
        throw error
      }
    },
    async getUser(context) {
      try {
        const res = await Axios.get('/api/auth-user')
        context.commit('user', res.data)
        return res
      } catch (error) {
        throw error
      }
    },
    async remove_token(context) {
      try {
        const res = await Axios.post('api/remove-tokens')
        context.commit('access_token', null)
        return res
      } catch (error) {
        throw error
      }
    },
    async forgot(context, key) {
      try {
        console.log(key)
        await Axios.post('api/forgot-password', key)
      } catch (error) {
        throw error
      }
    },
    async reset(context, key) {
      try {
        await Axios.post('api/reset-password', key)
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    isAuthenticated: state => state.access_token !== null,
    access_token: state => state.access_token,
    user: state => state.user
  }
}
