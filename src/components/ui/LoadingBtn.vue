<template>
  <button>
    <icon v-if="loading" class="loading-btn__icon" icon="broom" spin />
    <span><slot></slot></span>
  </button>
</template>

<script setup>
  const loading = ref(false)

  const start = () => loading.value = true
  const stop = () => loading.value = false

  defineExpose({start, stop})
</script>

<style scoped>
  .loading-btn__icon {
    margin-right: .5em;
  }
</style>