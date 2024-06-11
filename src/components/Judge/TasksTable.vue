<template>
	<table
		v-if="tasks !== null && participant" 
		class="w-max rounded table-auto text-xs sm:text-sm m-auto text-white bg-blue-600 dark:bg-slate-900"
	>
		<thead>
			<tr class="*:px-1 *:md:px-2 *:py-1">
				<th v-if="filter?.title">Название</th>
				<th v-if="filter?.description">Описание</th>
				<th v-if="filter?.status">Статус задания</th>
				<th v-if="filter?.actions && query.key">Действия</th>
			</tr>
		</thead>
		<tbody
			class="
				divide-y divide-neutral-300 dark:divide-slate-700
				text-black dark:text-white
				bg-neutral-200 dark:bg-slate-800
			"
		>
			<tr
				class="*:*:flex *:*:items-center *:*:p-0.5"
				:class="task.is_opened ? '' : 'hidden'"
				v-for="task in tasks" 
				:key="task.id" 
			>
				<td v-if="filter?.title" class="ps-1">
					<p>{{ task.title }}</p>
				</td>
				<td v-if="filter?.description">
					<p>{{ task.description }}</p>
				</td>
				<td v-if="filter?.status">
					<div class="justify-center">
						<p>{{ participant.completed.includes(task.id) ? 'Выполнено' : 'Не выполнено' }}</p>
						<span v-if="participant.completed.includes(task.id)" class="material-symbols text-green-600">check</span>
						<span v-else class="material-symbols text-red-600">close</span>
					</div>
				</td>
				<td v-if="filter?.actions && query.key">
					<div class="justify-center *:mx-0.5">
						<Danger class="px-1 py-0.5 space-x-1" v-if="participant.completed.includes(task.id)" @click="cancelTask(task.id)">
							<p class="flex-1">Отменить</p>
							<span class="material-symbols">cancel</span>
						</Danger>
						<Approve class="px-1 py-0.5 space-x-1" v-else @click="completeTask(task.id)">
							<p class="flex-1">Зачесть</p>
							<span class="material-symbols">check_circle</span>
						</Approve>
					</div>
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr class="*:px-2 *:py-1 invisible">
				<th v-if="filter?.title">Название</th>
				<th v-if="filter?.description">Описание</th>
				<th v-if="filter?.status">Статус задания</th>
				<th v-if="filter?.actions && query.key">Действия</th>
			</tr>
		</tfoot>
	</table>
</template>

<script setup lang="ts">
import { inject, Ref, ref } from 'vue';
import supabase from '../../supabase';
import router from '../../router';

const { params, query } = router.currentRoute.value;

const filter: Ref<{
  title: boolean;
  description: boolean;
  status: boolean;
  actions: boolean;
}> | undefined = inject('filter');

import Danger from '../root/Danger.vue';
import Approve from '../root/Approve.vue';

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