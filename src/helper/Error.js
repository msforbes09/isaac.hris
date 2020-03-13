export default class Errors {
  constructor() {
    this.errors = {}
    this.requestName = ''
  }

  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  has(field) {
    return this.errors[field] ? true : false
  }

  record(errors) {
    this.errors = errors
  }

  any() {
    return Object.keys(this.errors).length > 0
  }

  clear(field) {
    delete this.errors[field]
  }

  reset() {
    this.errors = {}
    this.requestName = ''
  }

  form(key) {
    this.requestName = key
  }
}
