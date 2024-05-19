<template>
  <Suspense>
    <Overlay class="font-impact" />
        
    <template #fallback>
      <Loading class="min-h-screen" />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Overlay from '../components/Overlay.vue';
import Loading from '../components/root/Loading.vue';
</script>

<style scoped>

</style>