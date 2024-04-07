<template>
  <v-container class="pa-10 h-100 w-100 d-flex flex-column align-center justify-space-around" fluid>
    <div class="ga-8 h-100 w-100 d-flex flex-column align-center justify-center">
      <div class="d-flex battery">
        <div class="cluster"></div>
        <div class="cluster"></div>
        <div class="cluster"></div>
        <div class="cluster" style="border-right: none"></div>
        <div
          class="battery__background"
          :style="{ width: `${100 - battery?.percents}%`, display: battery?.percents === 100 ? 'none' : 'block' }"
        ></div>
        <div class="progress__shadow" :style="{ width: `${battery?.percents}%` }"></div>
        <div class="progress"></div>
        <div class="progress__shadow" :style="{ width: `${battery?.percents}%` }"></div>
      </div>
      <span v-if="battery?.percents" class="text-h4 text-center text-grey">{{ `${battery?.percents}%` }}</span>
    </div>
    <v-btn v-if="user.isAdmin" class="mb-8 text-h2" icon height="180px" width="180px" @click="updateUserBattery">
      <v-icon size="72">mdi-lightning-bolt</v-icon>
    </v-btn>
    <v-btn class="logout__button" title="Сменить пользователя" icon height="72px" width="72px" @click="logout">
      <v-icon>mdi-account-convert</v-icon>
    </v-btn>
    <v-btn class="update__button" title="Сменить пользователя" icon height="72px" width="72px" @click="loadBatteryData">
      <v-icon>mdi-account-convert</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  import { useBatteryStore } from '@/entities/battery'
  import { useUserStore } from '@/entities/user'

  const batteryStore = useBatteryStore()
  const { battery } = storeToRefs(batteryStore)
  const { user } = storeToRefs(useUserStore())
  const router = useRouter()

  const updateUserBattery = () => {
    batteryStore.updateUserBattery({ ...battery.value, percents: Math.round(1.1 * Number(battery.value.percents)) })
  }

  const loadBatteryData = () => {
    batteryStore.getUserBattery(1)
  }

  onMounted(() => {
    loadBatteryData()
  })

  const logout = () => {
    useUserStore()
      .logoutUser()
      .then(() => {
        router.push({ name: 'Auth' })
      })
  }
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
      transition: width 1s ease;
    }

    .battery__background {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      background: white;
      box-shadow: -10px 0 10px 5px white;
      transition: width 1s ease;
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

  .logout__button {
    position: absolute;
    right: 35px;
    top: 35px;
    z-index: 1;
  }
</style>
