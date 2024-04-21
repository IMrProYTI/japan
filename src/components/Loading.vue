<template>
  <div class="flex flex-col justify-center items-center w-screen min-h-screen space-y-1">
    <p class="text-2xl">Please Wait</p>
    <p class="text-lg">{{ LoadingText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';

const LoadingText: Ref<string> = ref("Loading...");

let i: number = 0;
setInterval(() => {
  i = i % 3 + 1;
  LoadingText.value = "Loading" + '.'.repeat(i);
}, 1000)
</script>

<style scoped>

</style>
