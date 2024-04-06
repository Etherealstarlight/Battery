<template>
  <h1>{{ msg }}</h1>
</template>

<script setup>
  import { ref } from 'vue'

  const msg = ref('battery')
</script>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
