<template>
  <div class="w-screen min-h-screen dark:text-white dark:bg-slate-950">
    <div v-if="$route.params.player">
      <h1 class="text-xl text-center">Вы судите: {{ $route.params.player }}</h1>
      <Tasks />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tasks from './Judge/Tasks.vue';
</script>

<style scoped>

</style>
