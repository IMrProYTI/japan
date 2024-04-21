<template>
  <div class="flex flex-col p-2">
    <div class="flex justify-start items-center space-x-2">
      <p class="h-fit">Добаивть судью:</p>
      <input class="rounded p-1 bg-neutral-100 dark:bg-slate-900" v-model="user" type="text">
    </div>

  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

const user: Ref<string> = ref("");
</script>

<style scoped>

</style>
