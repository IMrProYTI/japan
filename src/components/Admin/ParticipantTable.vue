<template>
	<table v-if="true" class="w-max rounded table-auto text-white bg-blue-600 dark:bg-slate-900">
		<thead>
			<tr>
				<th class="px-2 py-1">id</th>
				<th class="px-2 py-1">Участник</th>
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
			<tr v-for="participant in participants" :key="participant">
				<td class="text-center px-2 py-1">{{ participant.id }}</td>
				<td class="px-2 py-1">{{ participant.nickname }}</td>
				<td class="px-2 py-1"><DangerButton @click="deleteParticipant(participant.id)">Удалить</DangerButton></td>
			</tr>
		</tbody>
		<tfoot>
			<tr class="invisible">
				<th>id</th>
				<th>Участник</th>
				<th>Действия</th>
			</tr>
		</tfoot>
	</table>
</template>

<script setup lang="ts">

import { Ref, ref } from 'vue';
import supabase from '../../supabase';

import DangerButton from '../root/DangerButton.vue';

const data = (await supabase.from('participant').select('id,nickname')).data;

const participants: Ref<{
  id: any;
  nickname: any;
}[]> = ref(data === null ? [] : data);

async function deleteParticipant(taskId: string) {
	await supabase.from('participant').delete().eq('id', taskId);
};

function handleParticipantsInsert(payload: any) {
	participants.value.push(payload.new);
};

function handleParticipantsDelete(payload: { old: { id: number } }) {
	const check = (el: { id: number }) => { return el.id !== payload.old.id; };
	participants.value = participants.value.filter(check);
};

supabase
  .channel('custom-all-channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'participant' }, handleParticipantsInsert)
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'participant' }, handleParticipantsDelete)
  .subscribe();
</script>

<style scoped>

</style>