<template>
  <div class="flex flex-col p-2 space-y-4">
    <div class="flex flex-col w-fit space-y-2">
      <div class="flex justify-start items-center space-x-2">
        <p class="h-fit">Добаивть судью:</p>
        <input class="rounded flex-1 p-1 bg-neutral-100 dark:bg-slate-900" v-model="form.judge" placeholder="Имя" type="text">
      </div>
      <div class="flex justify-start items-center space-x-2">
        <p>Следит за:</p>
        <select
          class="rounded p-1 flex-1 disabled:text-slate-500 bg-neutral-100 dark:bg-slate-900"
          v-model="form.user"
        >
          <option value="" selected disabled>Выберите участника</option>
          <option
            v-for="participant in participants"
            :key="participant.id"
            :value="participant.id"
          >{{ participant.nickname }}</option>
        </select>
      </div>
      <Approve class="px-2 py-1 w-full" @click="addJudge">Добавить</Approve>
    </div>
    <div class="w-full overflow-x-auto rounded">
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
import Approve from '../root/Approve.vue';

const form: Ref<{
  judge: string;
  user: string;
}> = ref({
  judge: "",
  user: ""
});

const participants: Ref<{
  id: number;
  nickname: string;
}[]> = ref([]);

async function addJudge() {
	await supabase.from('judge').insert({
    judge: form.value.judge,
    participant: form.value.user,
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
