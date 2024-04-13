<template>
  <v-card class="pa-8 w-100" max-width="500">
    <v-card-title class="pa-0 pb-8">{{ 'Авторизация' }}</v-card-title>
    <v-card-text class="pa-0 ga-8 d-flex flex-column justify-center align-center">
      <v-text-field
        v-model="userLogin"
        class="w-100"
        variant="underlined"
        hide-details
        label="Логин"
        @keydown.enter="authButton?.login(userLogin, userPassword)"
      />
      <v-text-field
        v-model="userPassword"
        class="w-100"
        variant="underlined"
        hide-details
        label="Пароль"
        type="password"
        @keydown.enter="authButton?.login(userLogin, userPassword)"
      />
      <Authentificate ref="authButton" :userLogin="userLogin" :userPassword="userPassword" />
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  import { Authentificate } from '@/features/auth'

  const userLogin = ref('')
  const userPassword = ref('')
  const authButton = ref(null)
</script>
