import store from './../store'
import router from './../router'
import { Notify } from 'quasar'
export default {
  checkError(key) {
    let error = store.state.error
    let res = key.response
    let stat = res.status
    let data = res.data
    let message = data.message
    let color = 'negative'

    let url = res.request.responseURL.split('/')
    error.form(url[url.length - 1])

    if (res) {
      if (stat === 400) {
        Notify.create({ message, color })
      } else if (stat === 401) {
        Notify.create({ message, color })
        store.commit('auth/access_token', null)
        router.push({ name: 'sign-in' })
      } else if (stat === 403) {
        Notify.create({ message, color })
      } else if (stat === 404) {
        Notify.create({ message, color })
        router.push({ name: '404' })
      } else if (stat === 422) {
        error.record(data.errors)
      }
    }
  }
}
