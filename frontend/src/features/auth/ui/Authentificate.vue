<template>
  <v-btn
    class="w-100"
    height="48"
    color="purple"
    variant="tonal"
    :loading="loading"
    @click="login(userLogin, userPassword)"
  >
    {{ 'Войти' }}
  </v-btn>
</template>

<script setup>
  import { useAuth } from '../composables/auth'

  const props = defineProps({
    userLogin: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
  })

  const { login, loading } = useAuth(props)

  defineExpose({
    login,
  })
</script>

<style scoped lang="scss">
  .link:hover {
    color: rgb(var(--v-theme-info)) !important;
    text-decoration: underline;
  }
</style>
