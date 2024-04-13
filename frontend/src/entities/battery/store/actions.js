import BatteryApi from '../api/battery'

export const actions = {
  getUserBattery(id) {
    if (isNaN(id)) return Promise.reject({ message: 'Battery id is undefined' })

    return BatteryApi.getUserBattery(id).then((response) => {
      if (response.status === 200) {
        this.update(response.data)
      }
    })
  },

  update(data) {
    this.batteryData = { ...this.batteryData, ...data }
  },

  updateUserBattery(battery) {
    return BatteryApi.updateUserBattery(battery).then((response) => {
      if (response.status === 200) {
        this.update(response.data)
      }
    })
  },

  chargeUserBattery(id) {
    return BatteryApi.chargeUserBattery(id).then((response) => {
      if (response.status === 200) {
        this.update(response.data)
      }
    })
  },
}
