import transport from '@/shared/api/transport'

class BatteryApi {
  appName = 'battery'

  getUserBattery = (id) => {
    return transport.sendGet(`${this.appName}/${id}`)
  }

  chargeUserBattery = (id) => {
    return transport.sendPost(`${this.appName}/${id}/charge`)
  }
}

export default new BatteryApi()
