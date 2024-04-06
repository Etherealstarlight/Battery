import transport from '@/shared/api/transport'

class BatteryApi {
  appName = 'battery'

  getUserBattery = (id) => {
    return transport.sendGet(`${this.appName}/${id}`)
  }

  updateUserBattery = (battery) => {
    return transport.sendPatch(`${this.appName}`, battery)
  }
}

export default new BatteryApi()
