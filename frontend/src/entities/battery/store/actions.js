import BatteryApi from '../api/battery'

export const actions = {
  getUserBattery(id) {
    if (isNaN(id)) return Promise.reject({ message: 'Battery id is undefined' })

    this.isLoading = true
    return BatteryApi.getUserBattery(id)
      .then((response) => {
        if (response.status === 200) {
          this.update(response.data)
        }
      })
      .finally(() => {
        this.isLoading = false
      })
  },

  update(data) {
    this.batteryData = { ...this.batteryData, ...data }
  },

  updateUserBattery(battery) {
    this.isLoading = true
    return BatteryApi.updateUserBattery(battery)
      .then((response) => {
        if (response.status === 200) {
          this.update(response.data)
        }
      })
      .finally(() => {
        this.isLoading = false
      })
  },

  chargeUserBattery(id) {
    this.isLoading = true
    return BatteryApi.chargeUserBattery(id)
      .then((response) => {
        if (response.status === 200) {
          this.update(response.data)
        }
      })
      .finally(() => {
        this.isLoading = false
      })
  },
}
