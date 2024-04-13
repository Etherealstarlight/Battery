<template>
  <v-btn
    title="Обновить данные"
    icon
    height="72px"
    width="72px"
    :ripple="false"
    :loading="loading"
    @click="updateBatteryData"
  >
    <v-icon>mdi-refresh</v-icon>
  </v-btn>
</template>

<script setup>
  import { useBatteryData } from '../composables/batteryData'

  const props = defineProps({
    batteryId: {
      type: Number,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  })

  const emits = defineEmits(['update:loading'])

  const { loadBatteryData } = useBatteryData()

  const updateBatteryData = () => {
    emits('update:loading', true)
    loadBatteryData(props.batteryId).finally(() => {
      emits('update:loading', false)
    })
  }
</script>

<style scoped lang="scss">
  .hidden {
    opacity: 0 !important;
  }
</style>
