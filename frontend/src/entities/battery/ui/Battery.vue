<template>
  <div class="ga-8 w-100 d-flex flex-column align-center justify-start battery__container">
    <div class="d-flex battery">
      <div class="cluster"></div>
      <div class="cluster"></div>
      <div class="cluster"></div>
      <div class="cluster" style="border-right: none"></div>
      <div v-if="isLoading" class="battery__skeleton-loader"></div>
      <div v-else>
        <div
          class="battery__background"
          :style="{ width: `${100 - visiblePercents}%`, display: visiblePercents === 100 ? 'none' : 'block' }"
        ></div>
        <div class="progress__shadow" :style="{ width: `${visiblePercents}%` }"></div>
        <div class="progress"></div>
      </div>
    </div>
    <span v-if="percents && !isLoading" class="pl-4 text-h4 text-center text-grey">{{ `${visiblePercents}%` }}</span>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { ref, watch } from 'vue'

  import { useBatteryStore } from '../store'

  const props = defineProps({
    percents: {
      type: Number,
      required: false,
      default: null,
    },
  })

  const { isLoading } = storeToRefs(useBatteryStore())

  const visiblePercents = ref(0)

  const setPercents = () => {
    const interval = setInterval(() => {
      if (props.percents > visiblePercents.value) visiblePercents.value++
      else if (props.percents < visiblePercents.value) visiblePercents.value--
      else clearInterval(interval)
    }, 10)
  }

  watch(
    () => props.percents,
    () => {
      setPercents()
    },
    { immediate: true }
  )
</script>

<style scoped lang="scss">
  @import '../styles/battery.scss';

  .battery__container {
    height: 35%;
    margin: 48px 0 0 0;
  }
</style>
