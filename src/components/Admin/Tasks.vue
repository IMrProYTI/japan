<template>
  <div class="flex flex-col p-2 space-y-4">
    <div class="flex flex-col items-start w-full overflow-x-auto space-y-2">
      <div class="flex justify-center items-center space-x-2">
        <p class="h-fit">Добаивть задание:</p>
        <select
          class="rounded p-1 disabled:text-slate-500 bg-neutral-100 dark:bg-slate-900"
          v-model="form.user"
          :placeholder="form.checkbox ? `Всем` : `Игроку`"
          :disabled="form.checkbox"
        >
          <option value="" selected disabled>Выберите участника</option>
          <option
            v-for="participant in participants"
            :key="participant.id"
            :value="participant.id"
          >{{ participant.nickname }}</option>
        </select>
        <select
          class="px-2 py-1 rounded bg-neutral-100 dark:bg-slate-900"
          v-model="form.reward"
        >
          <option value="" selected disabled>Награда</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input v-model="form.checkbox" disabled type="checkbox">
        <p class="h-fit">Всем?</p>
      </div>
      <div class="flex flex-col space-y-2">
        <input
          class="rounded p-1 bg-neutral-100 dark:bg-slate-900"
          v-model="form.title"
          placeholder="Заголовок"
          type="text"
        >
        <textarea
          style="width: 542.9px; height: 100px;"
          class="resize rounded p-1 bg-neutral-100 dark:bg-slate-900"
          v-model="form.description"
          placeholder="Описание"
          type="text"
        >
        </textarea>
        <Approve class="px-2 py-1 w-full" @click="createTask">Добавить</Approve>
      </div>
      <p v-if="errorMessage" class="font-bold text-red-700">{{ errorMessage }}</p>
    </div>
    <Timer class="font-semibold text-xl" />
    <div class="w-full overflow-x-auto rounded">
      <Suspense>
        <TasksTable />

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

import Timer from '../root/Timer.vue';
import Loading from '../root/Loading.vue';
import TasksTable from './TasksTable.vue';
import Approve from '../root/Approve.vue';

const form: Ref<{
  title: string;
  description: string;
  user: string;
  reward: string;
  checkbox: boolean;
}> = ref({
  title: "",
  description: "",
  user: "",
  reward: "",
  checkbox: true
});

const participants: Ref<{
  id: number;
  nickname: string;
}[]> = ref([]);
const errorMessage: Ref<string | undefined> = ref("");

async function createTask() {
  if (form.value.user === '' && !form.value.checkbox) {
    errorMessage.value = "Имя пользователя не должно быть пустым";
    return;
  };

  if (form.value.reward === '') {
    errorMessage.value = "Не выбрана награда";
    return;
  };

  if (form.value.title === '' || form.value.description === '') {
    errorMessage.value = "Нет названия или описания";
    return;
  };

	const { error } = await supabase.from('tasks').insert({
		title: form.value.title,
		description: form.value.description,
		reward: Number(form.value.reward),
    is_opened: false,
		user: form.value.checkbox ? 'ALL' : form.value.user,
	}).select();

  form.value.title = '';
  form.value.description = '';
  if (!form.value.checkbox) form.value.user = '';
  form.value.reward = '';

  errorMessage.value = error?.message;
};

// (async () => {
//   const { data, error } = await supabase.from('participant').select('id,nickname');
//   if (data) participants.value = data;
//   errorMessage.value = error?.message;
// })();
</script>

<style scoped>

</style>
