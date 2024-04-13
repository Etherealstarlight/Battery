<template>
  <v-container class="pa-8 h-100 w-100 d-flex flex-column justify-center align-center" fluid>
    <AuthentificationForm />
    <span class="mt-4 cursor-pointer text-grey font-weight-thin link" @click="goToBatteryPage(1)">
      {{ 'Продолжить как гость' }}
    </span>
  </v-container>
</template>

<script setup>
  import { AuthentificationForm } from '@/widgets/auth'

  import { useAuthRoutes } from '@/features/auth'

  const { goToBatteryPage } = useAuthRoutes()
</script>

<style scoped lang="scss">
  .link:hover {
    color: rgb(var(--v-theme-info)) !important;
    text-decoration: underline;
  }
</style>
