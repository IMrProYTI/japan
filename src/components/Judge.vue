<template>
  <div class="w-screen min-h-screen dark:text-white dark:bg-slate-950">
    <div v-if="$route.params.player" class="flex flex-col justify-center items-center">
      <div class="*:text-xl *:text-center p-2">
        <h1>Задания: {{ $route.params.player }}</h1>
        <Timer />
      </div>
      <Tasks />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tasks from './Judge/Tasks.vue';
import Timer from './root/Timer.vue';
</script>

<style scoped>

</style>
