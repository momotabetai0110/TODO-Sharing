<!-- App.vue -->
<template>
  <div id="app">
    <div style="position: fixed; top: 0; left: 0; width: 100%;  border-bottom: 1px solid #ccc;">
      <h2>TODO Sharing</h2>
    </div>
    <router-view /> <!-- ここにページが表示される -->
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@import '@/assets/styles/main.scss';
</style>
