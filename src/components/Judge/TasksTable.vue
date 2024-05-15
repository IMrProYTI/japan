<template>
	<table v-if="tasks !== null && participant" class="w-max rounded table-auto text-sm md:text-base text-white bg-blue-600 dark:bg-slate-900">
		<thead>
			<tr class="*:px-1 *:md:px-2 *:py-1">
				<th>Название</th>
				<th class="hidden lg:table-cell">Описание</th>
				<th>Статус задания</th>
				<th>Действия</th>
			</tr>
		</thead>
		<tbody
			class="
				divide-y divide-neutral-300 dark:divide-slate-700
				text-black dark:text-white
				bg-neutral-200 dark:bg-slate-800
			"
		>
			<tr v-for="task in tasks" :key="task.id" class="*:px-1 *:md:px-2 *:py-1" :class="task.is_opened ? '' : 'hidden'">
				<td>{{ task.title }}</td>
				<td class="max-w-96 hidden lg:table-cell">{{ task.description }}</td>
				<td>{{ participant.completed.includes(task.id) ? 'Выполнено' : 'Не выполнено' }}</td>
				<td>
					<div class="flex justify-center items-center *:mx-0.5">
						<ApproveButton :class="participant.completed.includes(task.id) ? 'hidden' : ''" @click="completeTask(task.id)">Завершить</ApproveButton>
						<DangerButton :class="participant.completed.includes(task.id) ? '' : 'hidden'" @click="cancelTask(task.id)">Отмена</DangerButton>
					</div>
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr class="*:px-1 *:md:px-2 *:py-1 invisible">
				<th>Название</th>
				<th class="hidden lg:table-cell">Описание</th>
				<th>Статус задания</th>
				<th>Действия</th>
			</tr>
		</tfoot>
	</table>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../../supabase';
import router from '../../router';

const { params, query } = router.currentRoute.value;

import DangerButton from '../root/DangerButton.vue';
import ApproveButton from '../root/ApproveButton.vue';

const dataTasks = (await supabase.from('tasks').select('id,title,description,user,is_opened')).data;
const dataParticipant = (await supabase.from('participant').select('id,nickname,uid,completed').eq('nickname', params.player)).data;

const tasks: Ref<{
  id: number;
  title: string;
  description: string;
  user: string;
	is_opened: boolean;
}[]> = ref(dataTasks === null ? [] : dataTasks.sort((a, b) => a.id - b.id));

const participant: Ref<{
  id: number;
  nickname: string;
	uid: string;
	completed: number[];
} | null> = ref(dataParticipant === null ? null : dataParticipant[0]);

async function completeTask(taskId: number) {
	if (query.key !== null && participant.value) {
		const { data, error } = await supabase.from('judge').select('participant').eq('key', typeof query.key === 'string' ? query.key : query.key[0]);
		if (data && data.length !== 0 && data[0].participant === participant.value.id && error === null) {
			const payload = { completed: participant.value.completed.concat([taskId]) };
			await supabase.from('participant').update(payload).eq('nickname', params.player);
		};
	};
};

async function cancelTask(taskId: number) {
	if (query.key !== null && participant.value) {
		const { data, error } = await supabase.from('judge').select('participant').eq('key', typeof query.key === 'string' ? query.key : query.key[0]);
		if (data && data.length !== 0 && data[0].participant === participant.value.id && error === null) {
			const check = (el: number) => { return el !== taskId; };
			const payload = { completed: participant.value.completed.filter(check) };
			await supabase.from('participant').update(payload).eq('nickname', params.player);
		};
	};
};

function handleTasksInsert(payload: any) {
	tasks.value.push(payload.new);
};

function handleTasksUpdate(payload: any) {
	handleTasksDelete(payload);
	handleTasksInsert(payload);
	tasks.value = tasks.value.sort((a, b) => a.id - b.id);
};

function handleParticipantUpdate(payload: any) {
	console.log(params.player);
	console.log(payload);
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
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participant', filter: `nickname=eq.${params.player}` }, handleParticipantUpdate)
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'tasks' }, handleTasksDelete)
  .subscribe();
</script>

<style scoped>

</style>