<template>
	<table v-if="tasks !== null" class="rounded table-auto text-white bg-blue-600 dark:bg-slate-900">
		<thead>
			<tr class="*:px-2 *:py-1">
				<th>id</th>
				<th>Название</th>
				<th>Описание</th>
				<th>Награда</th>
				<th>Выполнено</th>
				<th>Открыт?</th>
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
			<tr
			v-for="task in tasks" :key="task.id"
				class="*:*:flex *:*:items-center *:*:p-0.5"
				:class="calcCompleted(task.id) !== 0 && task.is_opened ? '*:bg-red-700/25' : ''"
			>
				<td>
					<p class="justify-center">{{ task.id }}</p>
				</td>
				<td>
					<p>{{ task.title }}</p>
				</td>
				<td>
					<p v-for="(el, index) in task.description" :key="index">{{ el }}</p>
				</td>
				<td>
					<p class="justify-center">{{ task.reward }} балл{{ task.reward != 1 ? task.reward >= 5 ? 'ов' : 'а' : '' }}</p>
				</td>
				<td>
					<div class="justify-center">
						<span v-if="calcCompleted(task.id) > 0" class="material-symbols text-green-600">check</span>
						<span v-else class="material-symbols text-red-600">close</span>
						<p>{{ calcCompleted(task.id) }} раз{{ calcCompleted(task.id) > 1 ? calcCompleted(task.id) >= 5 ? 'ов' : 'а' : '' }}</p>
					</div>
				</td>
				<td>
					<div class="justify-center">
						<span v-if="task.is_opened" class="material-symbols text-green-600">check</span>
						<span v-else class="material-symbols text-red-600">close</span>
					</div>
				</td>
				<td>
					<div class="*:mx-0.5">
						<Common class="px-2 py-1" v-if="task.is_opened" @click="closeTask(task.id)">Закрыть</Common>
						<Common class="px-2 py-1" v-else @click="openTask(task.id)">Открыть</Common>
						<Danger class="p-1" @click="deleteTask(task.id)">
							<span class="material-symbols">delete</span>
						</Danger>
					</div>
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr class="*:px-2 *:py-1 invisible">
				<th>id</th>
				<th>Название</th>
				<th>Описание</th>
				<th>Награда</th>
				<th>Выполнено</th>
				<th>Открыт?</th>
				<th>Действия</th>
			</tr>
		</tfoot>
	</table>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../../supabase';

import Danger from '../root/Danger.vue';
import Common from '../root/Common.vue';

const dataTasks = (await supabase.from('tasks').select('id,title,description,reward,is_opened')).data;
const dataParticipant = (await supabase.from('participant').select('id,nickname,completed')).data;

const tasks: Ref<{
  id: number;
  title: string;
  description: string;
  reward: number;
	is_opened: boolean;
}[]> = ref(dataTasks === null ? [] : dataTasks.sort((a, b) => a.id - b.id));

const participants: Ref<{
  id: number;
  nickname: string;
	completed: number[];
	points?: number;
}[]> = ref(dataParticipant === null ? [] : dataParticipant.sort((a, b) => a.id - b.id));

async function openTask(taskId: number) {
	await supabase.from('tasks').update({ is_opened: true }).eq('id', taskId);
};

async function closeTask(taskId: number) {
	await supabase.from('tasks').update({ is_opened: false }).eq('id', taskId);
};

async function deleteTask(taskId: number) {
	if (confirm("Вы уверены, что хотите удалить задание?\nНажмите ОК, если вы собираетесь удалить задание!"))
		await supabase.from('tasks').delete().eq('id', taskId);
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

function calcCompleted(taskId: number): number {
	let completed: number = 0;
	for (let i = 0; i < participants.value.length; i++) {
		if (participants.value[i].completed.includes(taskId)) completed += 1;
	};
	return completed;
};

supabase
  .channel('custom-all-channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, (payload) => { handleInsert(payload, tasks) })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, (payload) => { handleUpdate(payload, tasks) })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participant' }, (payload) => { handleUpdate(payload, participants) })
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'tasks' }, (payload) => { handleDelete(payload, tasks) })
  .subscribe();
</script>

<style scoped>

</style>