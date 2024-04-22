<template>
	<table v-if="tasks !== null" class="rounded table-auto text-white bg-blue-600 dark:bg-slate-900">
		<thead>
			<tr>
				<th>id</th>
				<th>Название</th>
				<th>Описание</th>
				<th>Награда</th>
				<th>Пользователь</th>
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
			<tr v-for="task in tasks" :key="task.id">
				<td class="text-center p-1">{{ task.id }}</td>
				<td class="p-1">{{ task.title }}</td>
				<td class="p-1">{{ task.description }}</td>
				<td class="p-1">{{ task.reward }}</td>
				<td class="p-1">{{ task.user === 'ALL' ? 'Всем' : task.user }}</td>
				<td class="p-1">
					<DangerButton @click="deleteTask(task.id)">Удалить</DangerButton>
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<th class="invisible">id</th>
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