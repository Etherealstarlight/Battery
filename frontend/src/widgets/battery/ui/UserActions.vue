<template>
  <div class="ga-4 d-flex flex-column actions__container">
    <v-btn title="Сменить пользователя" icon height="72px" width="72px" @click="logout">
      <v-icon>mdi-account-convert</v-icon>
    </v-btn>
    <UpdateBatteryData :loading="loading" @update:loading="setLoading($event)" :batteryId="currentUserBatteryId" />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import { useAuth } from '@/features/auth'
  import { UpdateBatteryData } from '@/features/battery'

  defineProps({
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  })

  const emits = defineEmits(['update:loading'])

  const { logout } = useAuth()
  const route = useRoute()

  const currentUserBatteryId = computed(() => Number(route.params.id))

  const setLoading = (value) => {
    emits('update:loading', value)
  }
</script>

<style scoped lang="scss">
  .actions__container {
    position: absolute;
    right: 35px;
    top: 35px;
    z-index: 1;
  }
</style>
