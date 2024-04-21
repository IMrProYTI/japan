<template>
  <div class="w-screen min-h-screen bg-neutral-300 dark:text-white dark:bg-slate-950">
    <Navigation />
    <!-- <Tasks /> -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Admin/Navigation.vue';
import Tasks from '../components/Admin/Tasks.vue';
</script>

<style scoped>

</style>
