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
import Loading from '../components/root/Loading.vue';
</script>

<style scoped>

</style>
