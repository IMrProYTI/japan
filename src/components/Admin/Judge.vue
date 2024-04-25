<template>
  <div class="flex flex-col p-2 space-y-4">
    <div class="flex flex-col w-fit space-y-2">
      <div class="flex justify-start items-center space-x-2">
        <p class="h-fit">Добаивть судью:</p>
        <input class="rounded flex-1 p-1 bg-neutral-100 dark:bg-slate-900" v-model="judge" placeholder="Имя" type="text">
      </div>
      <div class="flex justify-start items-center space-x-2">
        <p>Следит за:</p>
        <input class="rounded flex-1 p-1 bg-neutral-100 dark:bg-slate-900" v-model="judge" placeholder="Участником" type="text">
      </div>
      <ApproveButton @click="() => {}">Добавить</ApproveButton>
    </div>
    <Suspense>
      <JudgeTable />
          
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

import JudgeTable from './JudgeTable.vue';
import ApproveButton from '../root/ApproveButton.vue';

const judge: Ref<string> = ref("");
</script>

<style scoped>

</style>
