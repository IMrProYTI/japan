<template>
	<table v-if="tasks !== null" class="w-max rounded table-auto text-white bg-blue-600 dark:bg-slate-900">
		<thead>
			<tr>
				<th class="px-2 py-1">id</th>
				<th class="px-2 py-1">Название</th>
				<th class="px-2 py-1">Описание</th>
				<th class="px-2 py-1">Награда</th>
				<th class="px-2 py-1">Задание для</th>
				<th class="px-2 py-1">Действия</th>
			</tr>
		</thead>
		<tbody
			class="
				divide-y divide-neutral-300 dark:divide-slate-700
				text-black dark:text-white
				bg-neutral-200 dark:bg-slate-800
			"
		>
			<tr v-for="task in tasks" :key="task.id">
				<td class="text-center px-2 py-1">{{ task.id }}</td>
				<td class="px-2 py-1">{{ task.title }}</td>
				<td class="px-2 py-1">{{ task.description }}</td>
				<td class="px-2 py-1">{{ task.reward }}</td>
				<td class="px-2 py-1">{{ task.user === 'ALL' ? 'Всех' : task.user }}</td>
				<td class="px-2 py-1">
					<DangerButton @click="deleteTask(task.id)">Удалить</DangerButton>
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr class="invisible">
				<th class="px-2 py-1">id</th>
				<th class="px-2 py-1">Название</th>
				<th class="px-2 py-1">Описание</th>
				<th class="px-2 py-1">Награда</th>
				<th class="px-2 py-1">Пользователь</th>
				<th class="px-2 py-1">Действия</th>
			</tr>
		</tfoot>
	</table>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../../supabase';

import DangerButton from '../root/DangerButton.vue';

const data = (await supabase.from('tasks').select('id,title,description,user,reward')).data;

const tasks: Ref<{
  id: any;
  title: any;
  description: any;
  user: any;
  reward: any;
}[]> = ref(data === null ? [] : data);

async function deleteTask(taskId: string) {
	await supabase.from('tasks').delete().eq('id', taskId);
};

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