<template>
	<table v-if="true" class="w-max rounded table-auto text-white bg-blue-600 dark:bg-slate-900">
		<thead>
			<tr class="*:px-2 *:py-1">
				<th>id</th>
				<th>Участник</th>
				<th>UID</th>
				<th>Очки</th>
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
				class="*:*:flex *:*:items-center *:*:p-0.5"
				v-for="participant in participants"
				:key="participant.id"
			>
				<td>
					<p class="justify-center">{{ participant.id }}</p>
				</td>
				<td>
					<p>{{ participant.nickname }}</p>
				</td>
				<td>
					<p>{{ participant.uid }}</p>
				</td>
				<td>
					<p class="justify-center">{{ participant.points }}</p>
				</td>
				<td>
					<div class="justify-center">
						<Danger class="p-1" @click="deleteParticipant(participant.id)">
							<span class="material-symbols">delete</span>
						</Danger>
					</div>
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr class="*:px-2 *:py-1 invisible">
				<th>id</th>
				<th>Участник</th>
				<th>UID</th>
				<th>Очки</th>
				<th>Действия</th>
			</tr>
		</tfoot>
	</table>
</template>

<script setup lang="ts">

import { Ref, ref } from 'vue';
import supabase from '../../supabase';

import Danger from '../root/Danger.vue';

const dataParticipants = (await supabase.from('participant').select('id,uid,nickname,completed')).data;
const dataTasks = (await supabase.from('tasks').select('id,reward')).data;

const participants: Ref<{
  id: number;
  uid: string;
  nickname: string;
	completed: number[];
	points?: number;
}[]> = ref(dataParticipants === null ? [] : dataParticipants.sort((a, b) => a.id - b.id));

const tasks: Ref<{
  id: number;
  reward: number;
}[]> = ref(dataTasks === null ? [] : dataTasks.sort((a, b) => a.id - b.id));

async function deleteParticipant(participantId: number) {
	if (confirm("Вы уверены, что хотите удалить участника?\nНажмите ОК, если вы собираетесь удалить участника!"))
		await supabase.from('participant').delete().eq('id', participantId);
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
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'participant' }, (payload) => { handleInsert(payload, participants); })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participant' }, (payload) => { handleUpdate(payload, participants); calcPoints(); })
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'participant' }, (payload) => { handleDelete(payload, participants); })
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, (payload) => { handleInsert(payload, tasks); })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, (payload) => { handleUpdate(payload, tasks); })
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'tasks' }, (payload) => { handleDelete(payload, tasks); })
  .subscribe();


function calcPoints() {
	for (let i = 0; i < participants.value.length; i++) {
		participants.value[i].points = 0;
		for (let j = 0; j < participants.value[i].completed.length; j++) {
			// @ts-ignore
			participants.value[i].points += tasks.value.find((el) => { return el.id === participants.value[i].completed[j] })?.reward || 0;
		};
	};
};
calcPoints();
</script>

<style scoped>

</style>