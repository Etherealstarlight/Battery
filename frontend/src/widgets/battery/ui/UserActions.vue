<template>
  <div class="ga-4 d-flex flex-column actions__container">
    <v-btn title="Сменить пользователя" icon height="72px" width="72px" @click="logout">
      <v-icon>mdi-account-convert</v-icon>
    </v-btn>
    <UpdateBatteryData :batteryId="battery.id" />
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'

  import { useAuth } from '@/features/auth'
  import { UpdateBatteryData } from '@/features/battery'

  import { useBatteryStore } from '@/entities/battery'

  const { logout } = useAuth()
  const { battery } = storeToRefs(useBatteryStore())
</script>

<style scoped lang="scss">
  .actions__container {
    position: absolute;
    right: 35px;
    top: 35px;
    z-index: 1;
  }
</style>
