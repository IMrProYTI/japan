<template>
  <div class="flex flex-col p-2 space-y-8">
    <div class="flex flex-col items-start w-fit space-y-2">
      <div class="flex justify-center items-center space-x-2">
        <p class="h-fit">Добаивть задание:</p>
        <select
          class="rounded p-1 disabled:text-slate-500 bg-neutral-100 dark:bg-slate-900"
          v-model="user"
          :placeholder="checkbox ? `Всем` : `Игроку`"
          :disabled="checkbox"
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
          v-model="reward"
        >
          <option value="" selected disabled>Награда</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input v-model="checkbox" type="checkbox">
        <p class="h-fit">Всем?</p>
      </div>
      <div class="flex flex-col space-y-2">
        <input
          class="rounded p-1 bg-neutral-100 dark:bg-slate-900"
          v-model="title"
          placeholder="Заголовок"
          type="text"
        >
        <textarea
          style="width: 542.9px; height: 100px;"
          class="resize rounded p-1 bg-neutral-100 dark:bg-slate-900"
          v-model="description"
          placeholder="Описание"
          type="text"
        >
        </textarea>
      </div>
      <ApproveButton class="w-full" @click="createTask">Добавить</ApproveButton>
      <p v-if="errorMessage" class="font-bold text-red-700">{{ errorMessage }}</p>
    </div>
    <Suspense>
      <TasksTable />
          
      <template #fallback>
        <Loading class="min-h-16" />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../../supabase';

import Loading from '../root/Loading.vue';
import TasksTable from './TasksTable.vue';
import ApproveButton from '../root/ApproveButton.vue';

// Inputs
const title: Ref<string> = ref("");
const description: Ref<string> = ref("");
const user: Ref<string> = ref("");
const reward: Ref<string> = ref("");

const checkbox: Ref<boolean> = ref(true);
const participants: Ref<{
  id: number;
  nickname: string;
}[]> = ref([]);
const errorMessage: Ref<string | undefined> = ref("");

async function createTask() {
  if (user.value === '' && !checkbox.value) {
    errorMessage.value = "Имя пользователя не должно быть пустым";
    return;
  };

  if (reward.value === '') {
    errorMessage.value = "Не выбрана награда";
    return;
  };

  if (title.value === '' || description.value === '') {
    errorMessage.value = "Нет названия или описания";
    return;
  };

	const { error } = await supabase.from('tasks').insert({
		title: title.value,
		description: description.value,
		reward: Number(reward.value),
    is_opened: true,
		user: checkbox.value ? 'ALL' : user.value,
	}).select();

  title.value = '';
  description.value = '';
  if (!checkbox.value) user.value = '';
  reward.value = '';

  errorMessage.value = error?.message;
};

(async () => {
  const { data, error } = await supabase.from('participant').select('id,nickname');
  if (data) participants.value = data;
  errorMessage.value = error?.message;
})();
</script>

<style scoped>

</style>
