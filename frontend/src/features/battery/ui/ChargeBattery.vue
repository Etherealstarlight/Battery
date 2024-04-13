<template>
  <v-btn
    :class="{ hidden: hidden }"
    class="mb-14 text-h2"
    icon
    height="180px"
    width="180px"
    :disabled="loading || hidden"
    @click="chargeBattery()"
  >
    <v-icon size="72">mdi-lightning-bolt</v-icon>
  </v-btn>
</template>

<script setup>
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
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  })

  const emits = defineEmits(['update:loading'])

  const { chargeUserBattery } = useBatteryData()

  const chargeBattery = () => {
    emits('update:loading', true)
    chargeUserBattery(props.batteryId).finally(() => {
      emits('update:loading', false)
    })
  }
</script>

<style scoped lang="scss">
  .hidden {
    opacity: 0 !important;
  }
</style>
