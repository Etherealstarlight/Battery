import { useBatteryStore } from '@/entities/battery'

export const useBatteryData = () => {
  const batteryStore = useBatteryStore()

  const loadBatteryData = (batteryId) => {
    return batteryStore.getUserBattery(batteryId)
  }

  const chargeUserBattery = (batteryId) => {
    return batteryStore.chargeUserBattery(batteryId)
  }

  return { chargeUserBattery, loadBatteryData }
}
