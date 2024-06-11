<template>
	<table v-if="true" class="w-max rounded table-auto text-white bg-blue-600 dark:bg-slate-900">
		<thead>
			<tr class="*:px-2 *:py-1">
				<th>id</th>
				<th>Судья</th>
				<th>Участник</th>
				<th>Ссылка</th>
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
				v-for="judge in judges" 
				:key="judge.id"
			>
				<td>
					<p class="justify-center">{{ judge.id }}</p>
				</td>
				<td>
					<p>{{ judge.judge }}</p>
				</td>
				<td>
					<p>{{ getParticipant(judge.participant)?.nickname }}</p>
				</td>
				<td>
					<div class="justify-center *:m-0.5">
						<Common
							class="p-1"
							c-type="external"
							:to="`/judge/${getParticipant(judge.participant)?.nickname}?key=${judge.key}`"
						>
							<span class="material-symbols">open_in_new</span>
						</Common>
						<Common
							class="p-1"
							c-type="external"
							:to="`/qrcode/${getParticipant(judge.participant)?.nickname}/${judge.key}`"
						>
							<span class="material-symbols">qr_code_2</span>
						</Common>
					</div>
				</td>
				<td>
					<div class="justify-center *:m-0.5">
						<SemiDanger class="p-1" @click="updateJudge(judge.id)">
							<span class="material-symbols">device_reset</span>
						</SemiDanger>
						<Danger class="p-1" @click="deleteJudge(judge.id)">
							<span class="material-symbols">delete</span>
						</Danger>
					</div>
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr class="*:px-2 *:py-1 invisible">
				<th>id</th>
				<th>Судья</th>
				<th>Участник</th>
				<th>Ссылка</th>
				<th>Действия</th>
			</tr>
		</tfoot>
	</table>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../../supabase';

import Common from '../root/Common.vue';
import SemiDanger from '../root/SemiDanger.vue';
import Danger from '../root/Danger.vue';

const dataJudges = (await supabase.from('judge').select('id,judge,participant,key')).data;
const dataParticipants = (await supabase.from('participant').select('id,nickname')).data;

const judges: Ref<{
  id: number;
  judge: string;
  participant: number;
  key: string;
}[]> = ref(dataJudges === null ? [] : dataJudges.sort((a, b) => a.id - b.id));

const participants: Ref<{
  id: number;
  nickname: string;
}[]> = ref(dataParticipants === null ? [] : dataParticipants.sort((a, b) => a.id - b.id));

async function updateJudge(judgeId: number) {
	if (confirm("Вы уверены, что хотите сбросить ключ?\nНажмите ОК, если вы собираетесь сбросить ключ!")) {}
		await supabase.from('judge').update({ key: makeKey(64) }).eq('id', judgeId);
};

async function deleteJudge(judgeId: number) {
	if (confirm("Вы уверены, что хотите удалить судью?\nНажмите ОК, если вы собираетесь удалить судью!"))
		await supabase.from('judge').delete().eq('id', judgeId);
};

function makeKey(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

function getParticipant(participantId: number) {
	return participants.value.find((el) => { return el.id === participantId })
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
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'judge' }, (payload) => { handleInsert(payload, judges) })
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'participant' }, (payload) => { handleInsert(payload, participants) })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'judge' }, (payload) => { handleUpdate(payload, judges) })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participant' }, (payload) => { handleUpdate(payload, participants) })
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'judge' }, (payload) => { handleDelete(payload, judges) })
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'participant' }, (payload) => { handleDelete(payload, participants) })
  .subscribe();
</script>

<style scoped>

</style>