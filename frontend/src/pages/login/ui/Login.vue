<template>
  <v-container class="pa-8 h-100 w-100 d-flex flex-column justify-center align-center" fluid>
    <v-card class="pa-8 w-100" max-width="500">
      <v-card-title class="pa-0 pb-8">{{ 'Авторизация' }}</v-card-title>
      <v-card-text class="pa-0 ga-8 d-flex flex-column justify-center align-center">
        <v-text-field
          v-model="email"
          class="w-100"
          variant="underlined"
          hide-details
          label="Логин"
          @keydown.enter="login"
        />
        <v-text-field
          v-model="password"
          class="w-100"
          variant="underlined"
          hide-details
          label="Пароль"
          type="password"
          @keydown.enter="login"
        />
        <v-btn class="w-100" height="48" color="purple" variant="tonal" @click="login">
          {{ 'Войти' }}
        </v-btn>
      </v-card-text>
    </v-card>
    <span class="mt-4 cursor-pointer text-grey font-weight-thin link" @click="goToBatteryPage">{{
      'Продолжить как гость'
    }}</span>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import { useUserStore } from '@/entities/user'

  const email = ref('battery')
  const password = ref('')

  const router = useRouter()

  const goToBatteryPage = () => {
    router.push({ name: 'Battery' })
  }

  const login = () => {
    useUserStore()
      .loginUser({ email: email.value, password: password.value })
      .then((response) => {
        console.log(response)
        goToBatteryPage()
      })
  }
</script>

<style scoped lang="scss">
  .link:hover {
    color: rgb(var(--v-theme-info)) !important;
    text-decoration: underline;
  }
</style>
