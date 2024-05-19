<template>
  <div class="w-screen min-h-screen pe-2 bg-neutral-300 dark:text-white dark:bg-slate-950">
    <Navigation />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Admin/Navigation.vue';
</script>

<style scoped>

</style>
