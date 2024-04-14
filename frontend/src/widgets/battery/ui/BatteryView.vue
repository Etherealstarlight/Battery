<template>
  <v-tabs v-model="currentTab" class="battery-tabs" align-tabs="end">
    <v-tab value="0">
      {{ isUserBatteryDonor ? 'Реципиент' : 'Донор' }}
    </v-tab>
    <v-tab value="1">
      {{ isUserBatteryDonor ? 'Донор' : 'Реципиент' }}
    </v-tab>
  </v-tabs>
  <Battery :percents="battery.percents" />
  <ChargeBattery :batteryId="currentUserBatteryId" :hidden="isUserBatteryDonor || !isUserBatteryOwner" />
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  import { ChargeBattery, useBatteryData } from '@/features/battery'

  import { Battery, BatteryModel } from '@/entities/battery'
  import { useUserStore } from '@/entities/user'

  const props = defineProps({
    battery: {
      type: BatteryModel,
      required: true,
    },
  })

  const { user } = storeToRefs(useUserStore())
  const route = useRoute()
  const { loadBatteryData } = useBatteryData()

  const currentTab = ref(1)
  const isUserBatteryDonor = ref(false)

  const isUserBatteryOwner = computed(() => user.value.id && user.value.id === props.battery.userId)

  const currentUserBatteryId = computed(() => Number(route.params.id))

  const currentBatteryId = computed(() =>
    Number(currentTab.value) ? currentUserBatteryId.value : props.battery.donorId || props.battery.recipientId
  )

  onMounted(() => {
    loadBatteryData(currentBatteryId.value).then(() => {
      isUserBatteryDonor.value = !!props.battery.recipientId
    })
  })

  watch(currentTab, () => {
    loadBatteryData(currentBatteryId.value)
  })
</script>

<style scoped lang="scss">
  .battery-tabs {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-transform-origin: 100% 0;
    -moz-transform-origin: 100% 0;
    -ms-transform-origin: 100% 0;
    -o-transform-origin: 100% 0;
    transform-origin: 0 0;
    position: absolute;
    left: 100%;
    top: -15%;
    width: 100vh;
  }
</style>
