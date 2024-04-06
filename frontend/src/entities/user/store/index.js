import { defineStore } from 'pinia'

import { actions } from './actions'
import { getters } from './getters'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {},
    isLogged: false,
  }),
  getters: getters,
  actions: actions,
})
