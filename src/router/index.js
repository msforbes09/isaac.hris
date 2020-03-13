import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './../store'

Vue.use(VueRouter)

let router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),

  routes,

  // Leave these as is and change from quasar.conf.js instead!

  // quasar.conf.js -> build -> vueRouterMode

  // quasar.conf.js -> build -> publicPath

  mode: process.env.VUE_ROUTER_MODE,

  base: process.env.VUE_ROUTER_BASE
})

router.beforeEach((to, from, next) => {
  function type(val) {
    return to.matched.some(arr => arr.meta.logType == val)
  }
  // function access(val) {
  //   return to.matched.some(arr => arr.meta.accessType == val)
  // }
  // store.commit('drawer/opened', false)
  store.state.error.reset()
  switch (true) {
    case type('visitors'):
      !store.getters['auth/isAuthenticated'] ? next() : next({ name: 'home' })
      break
    case type('registered'):
      // console.log(access('administrator'))
      store.getters['auth/isAuthenticated'] ? next() : next({ name: 'sign-in' })
      break
    default:
      next()
      break
  }
})

export default router
