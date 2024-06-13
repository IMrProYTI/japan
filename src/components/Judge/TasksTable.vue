<template>
	<table
		v-if="tasks !== null && participant" 
		class="w-max rounded table-auto text-sm m-auto text-white bg-blue-600 dark:bg-slate-900"
	>
		<thead>
			<tr class="*:p-1">
				<th v-if="filter.title">Название</th>
				<th v-if="filter.description">Описание</th>
				<th v-if="filter.status">Статус задания</th>
				<th v-if="filter.actions && isValidKey">Действия</th>
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
				class="*:*:flex *:*:px-2 *:*:py-1 min-h-10"
				v-show="task.is_opened !== false"
				v-for="task in tasks" 
				:key="task.id" 
			>
				<td v-if="filter.title">
					<div>
						<p>{{ task.title }}</p>
					</div>
				</td>
				<td v-if="filter.description">
					<div class="flex-col">
						<p v-for="(el, index) in task.description" :key="index">{{ el }}</p>
					</div>
				</td>
				<td v-if="filter.status">
					<div class="justify-center items-center">
						<p>{{ participant.completed.includes(task.id) ? 'Выполнено' : 'Не выполнено' }}</p>
						<span v-if="participant.completed.includes(task.id)" class="material-symbols text-green-600">check</span>
						<span v-else class="material-symbols text-red-600">close</span>
					</div>
				</td>
				<td v-if="filter.actions && isValidKey">
					<div class="justify-center items-center">
						<Loading v-if="loading" />
						<Danger class="px-1 py-0.5 space-x-1" v-else-if="participant.completed.includes(task.id)" @click="cancelTask(task.id)">
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
			<tr class="*:p-1 invisible">
				<th v-if="filter.title">Название</th>
				<th v-if="filter.description">Описание</th>
				<th v-if="filter.status">Статус задания</th>
				<th v-if="filter.actions && isValidKey">Действия</th>
			</tr>
		</tfoot>
	</table>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { filter, isValidKey, validateKey } from './Judge';
import supabase from '../../supabase';

const { params, query } = useRoute();

import Danger from '../root/Danger.vue';
import Approve from '../root/Approve.vue';
import Loading from '../root/Loading.vue';

const dataTasks = (await supabase.from('tasks').select('id,title,description').eq('is_opened', true)).data;
const dataParticipant = (await supabase.from('participant').select('id,nickname,completed').eq('nickname', params.player)).data;

const tasks: Ref<{
  id: number;
  title: string;
  description: string[];
	is_opened?: boolean;
}[]> = ref(dataTasks === null ? [] : dataTasks.sort((a, b) => a.id - b.id));

const participant: Ref<{
  id: number;
  nickname: string;
	completed: number[];
} | null> = ref(dataParticipant === null ? null : dataParticipant[0]);

const loading: Ref<boolean> = ref(false);
if (participant.value) validateKey(participant.value.id, String(query.key));

async function completeTask(taskId: number) {
	if (participant.value && isValidKey) {
		loading.value = true;
		const payload = { completed: participant.value.completed.concat([taskId]) };
		await supabase.from('participant').update(payload).eq('nickname', params.player);
	};
};

async function cancelTask(taskId: number) {
	if (participant.value && isValidKey) {
		loading.value = true;
		const check = (el: number) => el !== taskId;
		const payload = { completed: participant.value.completed.filter(check) };
		await supabase.from('participant').update(payload).eq('nickname', params.player);
	};
};

function handleParticipantUpdate(payload: any) {
	participant.value = payload.new;
	loading.value = false;
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
	const check = (el: any) => el.id !== payload.old.id;
	refArray.value = refArray.value.filter(check);
};

supabase
  .channel('custom-all-channel')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, (payload) => { handleUpdate(payload, tasks) })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participant', filter: `nickname=eq.${params.player}` }, handleParticipantUpdate)
  .subscribe();
</script>

<style scoped>

</style>