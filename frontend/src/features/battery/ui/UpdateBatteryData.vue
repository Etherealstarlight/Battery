<template>
  <v-btn
    title="Обновить данные"
    icon
    height="72px"
    width="72px"
    :ripple="false"
    :loading="isLoading"
    @click="updateBatteryData"
  >
    <v-icon>mdi-refresh</v-icon>
  </v-btn>
</template>

<script setup>
  import { storeToRefs } from 'pinia'

  import { useBatteryStore } from '@/entities/battery'

  import { useBatteryData } from '../composables/batteryData'

  const props = defineProps({
    batteryId: {
      type: Number,
      required: true,
    },
  })

  const { loadBatteryData } = useBatteryData()
  const { isLoading } = storeToRefs(useBatteryStore())

  const updateBatteryData = () => {
    loadBatteryData(props.batteryId)
  }
</script>

<style scoped lang="scss">
  .hidden {
    opacity: 0 !important;
  }
</style>
