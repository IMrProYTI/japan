<template>
  <div class="flex flex-col justify-center items-center lg:items-start space-y-8">
    <Suspense>
      <TasksTable />
          
      <template #fallback>
        <Loading class="min-h-16" />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import TasksTable from './TasksTable.vue';
import Loading from '../root/Loading.vue';
</script>

<style scoped>

</style>
