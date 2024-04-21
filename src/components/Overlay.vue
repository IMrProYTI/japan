<template>
  <div id="overlay" class="text-black p-2">
    <h1 class="text-center text-2xl">Задания: {{ $route.params.player }}</h1>
    <div v-for="task in tasks" :key="task.id">
      <div
				v-if="task.user === 'ALL' || task.user === $route.params.player"
				class="flex justify-between items-center p-2 m-2 space-x-2 rounded-md bg-yellow-200"
			>
				<h1 class="w-fit h-fit text-lg">{{ task.title }}</h1>
				<p class="w-fit h-fit text-lg">{{ task.reward }}</p>
			</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../supabase';

const data = (await supabase.from('tasks').select('id,title,description,user,reward')).data;

const tasks: Ref<{
  id: any;
  title: any;
  description: any;
  user: any;
  reward: any;
}[]> = ref(data === null ? [] : data);

function handleTasksInsert(payload: any) {
	tasks.value.push(payload.new);
};

function handleTasksDelete(payload: { old: { id: number } }) {
	const check = (el: { id: number }) => { return el.id !== payload.old.id; };
	tasks.value = tasks.value.filter(check);
};

supabase
  .channel('custom-all-channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, handleTasksInsert)
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'tasks' }, handleTasksDelete)
  .subscribe();
</script>

<style scoped>

</style>
