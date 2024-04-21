<template>
  <Suspense>
    <Overlay />
        
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