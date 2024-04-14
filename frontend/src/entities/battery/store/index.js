import { defineStore } from 'pinia'

import { actions } from './actions'
import { getters } from './getters'

export const useBatteryStore = defineStore('battery', {
  state: () => ({
    batteryData: {},
    isLoading: false,
  }),
  getters: getters,
  actions: actions,
})
