import { useRouter } from 'vue-router'

export const useAuthRoutes = () => {
  const router = useRouter()

  const goToBatteryPage = (batteryId) => {
    router.push({ name: 'CurrentBattery', params: { id: batteryId } })
  }

  const goToAuthPage = () => {
    router.push({ name: 'Auth' })
  }

  return { goToAuthPage, goToBatteryPage }
}
