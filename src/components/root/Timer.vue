<template>
  <p>{{ `Текущее время: ${getTimer()}` }}</p>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';

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