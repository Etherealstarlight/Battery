import { defineStore } from 'pinia'

import { actions } from './actions'
import { getters } from './getters'

export const useBatteryStore = defineStore('battery', {
  state: () => ({
    batteryData: {},
  }),
  getters: getters,
  actions: actions,
})
