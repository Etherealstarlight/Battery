<template>
  <v-container class="w-100 h-100 ma-0 pa-0 d-flex" style="position: relative" fluid>
    <v-tabs class="navigation-tabs" align-tabs="end">
      <v-tab
        v-for="(batteryId, index) in user.batteryIds"
        :key="batteryId"
        :to="{ name: 'CurrentBattery', params: { id: batteryId } }"
      >
        <span>
          {{ `Батарейка -${index + 1}` }}
        </span>
      </v-tab>
    </v-tabs>
    <v-container
      class="pa-10 ga-8 h-100 w-100 d-flex flex-column align-center justify-center"
      style="position: relative"
      fluid
    >
      <router-view>
        <BatteryView :battery="battery" v-model:loading="loading" />
        <UserActions v-model:loading="loading" />
      </router-view>
    </v-container>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'

  import { BatteryView, UserActions } from '@/widgets/battery'

  import { useBatteryStore } from '@/entities/battery'
  import { useUserStore } from '@/entities/user'

  const { battery } = storeToRefs(useBatteryStore())
  const { user } = storeToRefs(useUserStore())

  const loading = ref(false)
</script>

<style scoped lang="scss">
  .navigation-tabs {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    transform: rotate(-90deg);
    -webkit-transform-origin: 100% 0;
    -moz-transform-origin: 100% 0;
    -ms-transform-origin: 100% 0;
    -o-transform-origin: 100% 0;
    transform-origin: 0 0;
    position: absolute;
    left: 0;
    bottom: -48px;
    width: 100vh;
  }
</style>
