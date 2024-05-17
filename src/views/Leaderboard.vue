<template>
  <Suspense>
    <Leaderboard class="font-impact" />
        
    <template #fallback>
      <Loading class="min-h-screen" />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Leaderboard from '../components/Leaderboard.vue';
</script>

<style scoped>

</style>
