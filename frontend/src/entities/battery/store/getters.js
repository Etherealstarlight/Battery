import Battery from '../models/battery'

export const getters = {
  battery(state) {
    return new Battery(state.batteryData)
  },
}
