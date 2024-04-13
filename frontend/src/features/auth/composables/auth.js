import { ref } from 'vue'

import { useUserStore } from '@/entities/user'

import { useAuthRoutes } from '../composables/authRoutes'

export const useAuth = () => {
  const { goToAuthPage, goToBatteryPage } = useAuthRoutes()
  const userStore = useUserStore()

  const loading = ref(false)

  const login = (userLogin, userPassword) => {
    loading.value = true
    userStore
      .loginUser({ login: userLogin, password: userPassword })
      .then((response) => {
        goToBatteryPage(response.batteryIds[0])
      })
      .finally(() => {
        loading.value = false
      })
  }

  const logout = () => {
    userStore.logoutUser().then(() => {
      goToAuthPage()
    })
  }

  return { login, logout, loading }
}
