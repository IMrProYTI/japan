<template>
  <Suspense>
    <Overlay class="font-impact" />
        
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Overlay from '../components/Overlay.vue';
</script>

<style scoped>

</style>