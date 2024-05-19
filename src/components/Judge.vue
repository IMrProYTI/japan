<template>
  <div class="w-screen min-h-screen dark:text-white dark:bg-slate-950">
    <div v-if="$route.params.player" class="flex flex-col justify-center items-center">
      <div class="*:text-xl *:text-center p-2">
        <h1>Задания: {{ $route.params.player }}</h1>
        <p>{{ `Текущее время: ${getTimer()}` }}</p>
      </div>
      <Tasks />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import Tasks from './Judge/Tasks.vue';

const timer: Ref<Date> = ref(new Date());

function getTimer(): string {
  const hours = `${timer.value.getHours()}`;
  const minutes = timer.value.getMinutes() < 10 ? `0${timer.value.getMinutes()}` : `${timer.value.getMinutes()}`;
  const seconds = timer.value.getSeconds() < 10 ? `0${timer.value.getSeconds()}` : `${timer.value.getSeconds()}`;
  return `${hours}:${minutes}:${seconds}`;
};

setInterval(() => {
  timer.value = new Date();
}, 1000);
</script>

<style scoped>

</style>
