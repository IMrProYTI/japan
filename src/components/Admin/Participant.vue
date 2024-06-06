<template>
  <div class="flex flex-col p-2 space-y-4">
    <div class="flex flex-col w-fit space-y-2">
      <div class="flex justify-start items-center space-x-2">
        <p class="h-fit">Добавить:</p>
        <input
          class="rounded flex-1 p-1 bg-neutral-100 dark:bg-slate-900"
          v-model="participant"
          placeholder="Имя участника"
          type="text"
        >
      </div>
      <div class="flex justify-start items-center space-x-2">
        <p class="h-fit">Идентификатор:</p>
        <input
          class="rounded flex-1 p-1 bg-neutral-100 dark:bg-slate-900"
          v-model="uid"
          placeholder="UID"
          type="text"
        >
      </div>
      <ApproveButton @click="createParticipant()">Добавить</ApproveButton>
      <p v-if="errorMessage" class="font-bold text-red-700">{{ errorMessage }}</p>
    </div>
    <div class="w-full overflow-x-auto rounded">
      <Suspense>
        <ParticipantTable />

        <template #fallback>
          <Loading class="min-h-16" />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../../supabase';

import Loading from '../root/Loading.vue';
import ParticipantTable from './ParticipantTable.vue';
import ApproveButton from '../root/ApproveButton.vue';

const participant: Ref<string> = ref("");
const uid: Ref<string> = ref("");

const errorMessage: Ref<string | undefined> = ref("");

async function createParticipant() {
  if (participant.value === '') {
    errorMessage.value = "Имя пользователя не должно быть пустым";
    return;
  };

	const { error } = await supabase.from('participant').insert({
		nickname: participant.value,
		uid: uid.value,
    completed: []
	}).select();

  participant.value = '';

  errorMessage.value = error?.message;
};
</script>

<style scoped>

</style>
