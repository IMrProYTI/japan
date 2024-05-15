<template>
  <div class="text-black p-2">
    <h1 class="text-center text-2xl">{{ $route.params.player ? `Задания: ${$route.params.player}` : `Все задания:` }}</h1>
    <div v-for="task in tasks" :key="task.id">
      <div
				v-if="((task.user === 'ALL' || task.user === $route.params.player) || (participant && !participant.completed.includes(task.id))) && task.is_opened"
				class="flex justify-between items-center *:w-fit *:h-fit p-2 m-2 space-x-2 rounded-md text-lg bg-yellow-200"
			>
				<h1>{{ task.title }}</h1>
				<p>{{ task.reward }}</p>
			</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../supabase';

import router from '../router';
const { params } = router.currentRoute.value;

const data = (await supabase.from('tasks').select('id,title,reward,is_opened,user')).data;
const dataParticipant = (await supabase.from('participant').select('id,nickname,uid,completed').eq('nickname', params.player)).data;

const tasks: Ref<{
  id: number;
  title: string;
  reward: number;
  is_opened: boolean;
  user: string;
}[]> = ref(data === null ? [] : data.sort((a, b) => a.id - b.id));

const participant: Ref<{
  id: number;
  nickname: string;
	uid: string;
	completed: number[];
} | null> = ref(dataParticipant === null ? null : dataParticipant[0]);

function handleTasksInsert(payload: any) {
	tasks.value.push(payload.new);
};

function handleTasksUpdate(payload: any) {
	handleTasksDelete(payload);
	handleTasksInsert(payload);
	tasks.value = tasks.value.sort((a, b) => a.id - b.id);
};

function handleParticipantUpdate(payload: any) {
	participant.value = payload.new;
};

function handleTasksDelete(payload: { old: { id: number } }) {
	const check = (el: { id: number }) => { return el.id !== payload.old.id; };
	tasks.value = tasks.value.filter(check);
};

supabase
  .channel('custom-all-channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, handleTasksInsert)
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, handleTasksUpdate)
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participant' }, handleParticipantUpdate)
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'tasks' }, handleTasksDelete)
  .subscribe();
</script>

<style scoped>

</style>
