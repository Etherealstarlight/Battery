import User from '../models/user'

export const getters = {
  user(state) {
    return new User(state.isLogged ? state.userData : { login: 'anonymous' })
  },
}
