<template>
  <div class="flex flex-col p-2 space-y-4">
    <div class="flex flex-col w-fit space-y-2">
      <div class="flex justify-start items-center space-x-2">
        <p class="h-fit">Добаивть судью:</p>
        <input class="rounded flex-1 p-1 bg-neutral-100 dark:bg-slate-900" v-model="judge" placeholder="Имя" type="text">
      </div>
      <div class="flex justify-start items-center space-x-2">
        <p>Следит за:</p>
        <select
          class="rounded p-1 flex-1 disabled:text-slate-500 bg-neutral-100 dark:bg-slate-900"
          v-model="user"
        >
          <option value="" selected disabled>Выберите участника</option>
          <option
            v-for="participant in participants"
            :key="participant.id"
            :value="participant.id"
          >{{ participant.nickname }}</option>
        </select>
      </div>
      <ApproveButton @click="addJudge">Добавить</ApproveButton>
    </div>
    <div class="w-full overflow-x-scroll rounded">
      <Suspense>
        <JudgeTable />
            
        <template #fallback>
          <Loading class="min-h-16" />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../../supabase';

import Loading from '../root/Loading.vue';
import JudgeTable from './JudgeTable.vue';
import ApproveButton from '../root/ApproveButton.vue';

const judge: Ref<string> = ref("");
const user: Ref<string> = ref("");

const participants: Ref<{
  id: number;
  nickname: string;
}[]> = ref([]);

async function addJudge() {
	await supabase.from('judge').insert({
    judge: judge.value,
    participant: user.value,
    key: makeKey(64)
  });
};

function makeKey(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

(async () => {
  const { data, error } = await supabase.from('participant').select('id,nickname');
  if (data) participants.value = data;
})();
</script>

<style scoped>

</style>
