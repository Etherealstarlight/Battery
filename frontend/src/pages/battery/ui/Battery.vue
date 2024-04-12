<template>
  <v-container class="pa-10 ga-8 h-100 w-100 d-flex flex-column align-center justify-center" fluid>
    <div class="ga-8 w-100 d-flex flex-column align-center justify-start battery__container">
      <div class="d-flex battery">
        <div class="cluster"></div>
        <div class="cluster"></div>
        <div class="cluster"></div>
        <div class="cluster" style="border-right: none"></div>
        <div v-if="loading" class="battery__skeleton-loader"></div>
        <div v-else>
          <div
            class="battery__background"
            :style="{ width: `${100 - visiblePercents}%`, display: battery?.percents === 100 ? 'none' : 'block' }"
          ></div>
          <div class="progress__shadow" :style="{ width: `${visiblePercents}%` }"></div>
          <div class="progress"></div>
        </div>
      </div>
      <span v-if="battery?.percents && !loading" class="pl-4 text-h4 text-center text-grey">{{
        `${visiblePercents}%`
      }}</span>
    </div>
    <v-btn
      v-if="user.isAdmin"
      class="mb-14 text-h2"
      icon
      height="180px"
      width="180px"
      :disabled="loading"
      @click="chargeUserBattery"
    >
      <v-icon size="72">mdi-lightning-bolt</v-icon>
    </v-btn>
    <div class="ga-4 d-flex flex-column actions__container">
      <v-btn title="Сменить пользователя" icon height="72px" width="72px" @click="logout">
        <v-icon>mdi-account-convert</v-icon>
      </v-btn>
      <v-btn
        title="Обновить данные"
        icon
        height="72px"
        width="72px"
        :ripple="false"
        :loading="loading"
        @click="loadBatteryData"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { onMounted, ref, watch } from 'vue'
  import { useRouter } from 'vue-router'

  import { useBatteryStore } from '@/entities/battery'
  import { useUserStore } from '@/entities/user'

  const batteryStore = useBatteryStore()
  const { battery } = storeToRefs(batteryStore)
  const userStore = useUserStore()
  const { user, isLogged } = storeToRefs(userStore)
  const router = useRouter()

  const loading = ref(true)
  const visiblePercents = ref(0)

  const setPercents = (percents) => {
    const interval = setInterval(() => {
      if (battery.value.percents > visiblePercents.value) visiblePercents.value++
      else if (battery.value.percents < visiblePercents.value) visiblePercents.value--
      else clearInterval(interval)
    }, 10)
  }

  const chargeUserBattery = () => {
    loading.value = true
    batteryStore.chargeUserBattery(user.value.batteryIds[0]).finally(() => {
      loading.value = false
    })
  }

  const loadBatteryData = () => {
    loading.value = true
    batteryStore.getUserBattery(user.value.batteryIds[0]).finally(() => {
      loading.value = false
    })
  }

  const logout = () => {
    userStore.logoutUser().then(() => {
      router.push({ name: 'Auth' })
    })
  }

  onMounted(() => {
    loadBatteryData()
  })

  watch(
    () => battery.value.percents,
    (value) => {
      console.log('changed')
      setPercents(value)
    },
    { immediate: true }
  )
</script>

<style scoped lang="scss">
  .battery {
    position: relative;
    width: 80%;
    max-width: 500px;
    height: 100%;
    max-height: 175px;
    border: 8px solid grey;
    border-radius: 18px;
    box-shadow: -2px 0 15px 0px black;

    .cluster {
      width: 100%;
      border-right: 2px solid grey;
      z-index: -1;
    }

    .progress {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: radial-gradient(circle at bottom left, darkred 10%, palegreen 75%);
      z-index: -3;
    }

    .progress__shadow {
      position: absolute;
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
      z-index: -4;
      background: linear-gradient(to bottom right, pink 50%, lightgreen 35%);
      filter: blur(35px);
    }

    .battery__background {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      background: white;
      box-shadow: 0 0 10px 10px white;
    }

    .battery__skeleton-loader {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: darkgrey;
      z-index: -3;

      overflow: hidden;
    }

    .battery__skeleton-loader::after {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        75deg,
        transparent 1%,
        transparent 25%,
        lightgrey 50%,
        transparent 75%,
        transparent 100%
      );
      z-index: -2;

      animation: loader 1s linear infinite;
    }
  }

  @keyframes loader {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }

  .battery::after {
    position: absolute;
    content: '';
    right: -50px;
    top: calc(50% - 37px);
    width: 50px;
    max-height: 78px;
    height: 100%;
    background: grey;
    border-radius: 18px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    z-index: 0;
    box-shadow: 5px 0 7px -5px black;
  }

  .battery__container {
    height: 35%;
    margin: 48px 0 0 0;
  }

  .actions__container {
    position: absolute;
    right: 35px;
    top: 35px;
    z-index: 1;
  }
</style>
