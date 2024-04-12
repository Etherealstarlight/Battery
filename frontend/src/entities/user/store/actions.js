import AuthApi from '../api/auth'
import { jwtDecode } from 'jwt-decode'

export const actions = {
  init() {
    return AuthApi.getUserData().then((response) => {
      if (response.status === 200) {
        this.update(response.data)
        this.isLogged = true
        Promise.resolve()
      }
    })
  },

  update(data) {
    this.userData = { ...this.userData, ...data }
  },

  async registerUser(params) {
    return AuthApi.registerUser(params).then((response) => {
      if (response.status === 200) {
        this.init()
      }
    })
  },

  async loginUser(params) {
    return AuthApi.loginUser(params).then((response) => {
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        return this.init()
      }
    })
  },

  async logoutUser() {
    localStorage.removeItem('token')
    this.$reset()
    return Promise.resolve()
  },

  $reset() {
    this.userData = {}
    this.isLogged = false
  },
}
