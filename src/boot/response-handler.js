import { Notify } from 'quasar'
import store from './../store'
export default {
  checkResponse(key) {
    store.state.error.reset()
    let msg = key.data.message
    if (msg) {
      Notify.create({
        message: msg,
        color: 'positive'
      })
    }
  }
}
