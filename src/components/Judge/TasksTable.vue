<template>
	<table v-if="tasks !== null && participant" class="w-max rounded table-auto text-xs sm:text-sm text-white bg-blue-600 dark:bg-slate-900">
		<thead>
			<tr class="*:px-1 *:md:px-2 *:py-1">
				<th>Название</th>
				<th class="hidden md:table-cell">Описание</th>
				<th>Статус задания</th>
				<th v-if="query.key">Действия</th>
			</tr>
		</thead>
		<tbody
			class="
				divide-y divide-neutral-300 dark:divide-slate-700
				text-black dark:text-white
				bg-neutral-200 dark:bg-slate-800
			"
		>
			<tr v-for="task in tasks" :key="task.id" class="*:px-2 *:py-1" :class="task.is_opened ? '' : 'hidden'">
				<td>{{ task.title }}</td>
				<td class="max-w-96 hidden md:table-cell">{{ task.description }}</td>
				<td>{{ participant.completed.includes(task.id) ? 'Выполнено' : 'Не выполнено' }}</td>
				<td v-if="query.key">
					<div class="flex justify-center items-center *:mx-0.5">
						<ApproveButton :class="participant.completed.includes(task.id) ? 'hidden' : ''" @click="completeTask(task.id)">Завершить</ApproveButton>
						<DangerButton :class="participant.completed.includes(task.id) ? '' : 'hidden'" @click="cancelTask(task.id)">Отмена</DangerButton>
					</div>
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr class="*:px-2 *:py-1 invisible">
				<th>Название</th>
				<th class="hidden md:table-cell">Описание</th>
				<th>Статус задания</th>
				<th v-if="query.key">Действия</th>
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

function handleParticipantUpdate(payload: any) {
	participant.value = payload.new;
};

function handleInsert(payload: any, refArray: Ref<any[]>): void {
	refArray.value.push(payload.new);
};

function handleUpdate(payload: any, refArray: Ref<any[]>): void {
	handleDelete(payload, refArray);
	handleInsert(payload, refArray);
	refArray.value = refArray.value.sort((a, b) => a.id - b.id);
};

function handleDelete(payload: any, refArray: Ref<any[]>): void {
	const check = (el: any) => { return el.id !== payload.old.id; };
	refArray.value = refArray.value.filter(check);
};

supabase
  .channel('custom-all-channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, (payload) => { handleInsert(payload, tasks) })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, (payload) => { handleUpdate(payload, tasks) })
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'tasks' }, (payload) => { handleDelete(payload, tasks) })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participant', filter: `nickname=eq.${params.player}` }, handleParticipantUpdate)
  .subscribe();
</script>

<style scoped>

</style>