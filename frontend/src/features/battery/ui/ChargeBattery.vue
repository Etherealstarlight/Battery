<template>
  <v-btn
    :class="{ hidden: hidden }"
    class="mb-14 text-h2"
    icon
    height="180px"
    width="180px"
    :disabled="isLoading || hidden"
    @click="chargeBattery()"
  >
    <v-icon size="72">mdi-lightning-bolt</v-icon>
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
    hidden: {
      type: Boolean,
      required: false,
      default: false,
    },
  })

  const { chargeUserBattery } = useBatteryData()
  const { isLoading } = storeToRefs(useBatteryStore())

  const chargeBattery = () => {
    chargeUserBattery(props.batteryId)
  }
</script>

<style scoped lang="scss">
  .hidden {
    opacity: 0 !important;
  }
</style>
