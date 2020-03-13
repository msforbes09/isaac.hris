import Vue from 'vue'
import axios from 'axios'
import errorHandler from './error-handler'
import responseHandler from './response-handler'
import store from './../store'

Vue.prototype.$axios = axios

let def = axios.defaults
let common = def.headers.common
def.baseURL = process.env.API
common['X-Requested-With'] = 'XMLHttpRequest'
common['Authorization'] = 'Bearer ' + store.getters['auth/access_token']

axios.interceptors.response.use(
  function(response) {
    responseHandler.checkResponse(response)
    return response
  },
  function(error) {
    errorHandler.checkError(error)
    return Promise.reject(error)
  }
)
