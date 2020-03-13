import Vue from 'vue'
import Vuex from 'vuex'
import Error from './../helper/Error'

import access from './pages/access'
import auth from './pages/auth'
import client from './pages/client'
import branch from './pages/client/branch'
import position from './pages/client/position'
import family from './pages/applicant/family'
import education from './pages/applicant/education'
import employment from './pages/applicant/employment'
import application from './pages/applicant/application'
import applicant from './pages/applicant'
import component from './component'
import keyword from './pages/keyword'
import user from './pages/user'
import tools from './tools'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    access,
    auth,
    client,
    branch,
    position,
    component,
    applicant,
    family,
    education,
    employment,
    application,
    keyword,
    tools,
    user
  },
  state: {
    error: new Error()
  },
  mutations: {},
  actions: {},
  getters: {
    error: state => state.error
  }
  // enable strict mode (adds overhead!)
  // for dev mode only
  // strict: process.env.DEV
})
