<template>
  <div class="w-screen min-h-screen dark:text-white dark:bg-slate-950">
    <div v-if="$route.params.player" class="flex flex-col justify-center items-center">
      <div class="flex justify-between items-start w-full p-2">
        <div class="w-10" />
        <div class="*:text-xl *:text-center">
          <h1>Задания: {{ $route.params.player }}</h1>
          <Timer />
          <Filter class="pt-2" />
        </div>
        <Mode class="mt-2" />
      </div>
      <Tasks />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tasks from './Judge/Tasks.vue';
import Filter from './Judge/Filter.vue';
import Timer from './root/Timer.vue';
import Mode from './root/Mode.vue';
</script>

<style scoped>

</style>
