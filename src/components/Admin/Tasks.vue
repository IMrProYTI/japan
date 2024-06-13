<template>
  <div class="flex flex-col p-2 space-y-4">
    <div class="flex flex-col items-start w-fit overflow-x-auto space-y-2">
      <div class="flex justify-between w-full">
        <div class="flex justify-between space-x-2">
          <p class="h-fit">Выберите награду:</p>
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
        </div>
        <div class="flex px-1 space-x-2 cursor-pointer" @click="form.is_opened = !form.is_opened">
          <input class="cursor-pointer" v-model="form.is_opened" type="checkbox">
          <p class="select-none h-fit">Открыть?</p>
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <input
          class="rounded p-1 bg-neutral-100 dark:bg-slate-900"
          v-model="form.title"
          placeholder="Заголовок задания"
          type="text"
        >
        <textarea
          style="width: 542.9px; height: 100px;"
          class="resize rounded p-1 bg-neutral-100 dark:bg-slate-900"
          v-model="rawDescription"
          placeholder="Описание задания"
          type="text"
        ></textarea>
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

const rawDescription = ref("");

const form: Ref<{
  title: string;
  reward: string;
  is_opened: boolean;
}> = ref({
  title: "",
  reward: "",
  is_opened: false
});

const errorMessage: Ref<string | undefined> = ref("");

async function createTask() {
  if (form.value.reward === '') {
    errorMessage.value = "Не выбрана награда";
    return;
  };

  if (form.value.title === '' || rawDescription.value === '') {
    errorMessage.value = "Нет названия или описания";
    return;
  };

	const { error } = await supabase.from('tasks').insert({
		title: form.value.title,
		description: rawDescription.value.split('\n'),
		reward: Number(form.value.reward),
    is_opened: form.value.is_opened,
	}).select();

  form.value.title = '';
  rawDescription.value = '';
  form.value.reward = '';

  errorMessage.value = error?.message;
};
</script>

<style scoped>

</style>
