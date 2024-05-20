<template>
  <div class="text-black h-screen overflow-hidden space-y-2 p-2">
    <h1 class="p-2 rounded-md text-lg text-center text-[#ccbd8f] bg-gradient-to-b from-[#4b5265] to-[#4b526599]">
      {{ $route.params.player ? `🌸Задания: ${$route.params.player}🌸` : `🌸Все задания:🌸` }}
    </h1>
    <h2
      class="flex space-x-2 *:text-center *:rounded-md *:p-2 text-[#ccbd8f] *:bg-gradient-to-b *:from-[#4b5265] *:to-[#4b526599]"
    >
      <p class="basis-2/3">Задание:</p>
      <p class="basis-1/3">Очки:</p>
    </h2>
    <div class="relative space-y-2">
      <transition-group name="task">
        <div
          v-for="task in tasks" :key="task.id"
          v-show="
            (
              (task.user === 'ALL' || task.user === $route.params.player) ||
              (participant && !participant.completed.includes(task.id))
            ) && task.is_opened
          "
          class="flex justify-between items-center w-full p-2 rounded-md text-lg bg-gradient-to-b from-[#ebe6db] to-[#ebe6db99]"
        >
		  	  <h1 class="flex-1 truncate">{{ task.title }}</h1>
		  	  <p>{{ task.reward }}</p>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../supabase';

import router from '../router';
const { params } = router.currentRoute.value;

const data = (await supabase.from('tasks').select('id,title,reward,is_opened,user')).data;
const dataParticipant = (await supabase.from('participant').select('id,nickname,uid,completed').eq('nickname', params.player)).data;

const tasks: Ref<{
  id: number;
  title: string;
  reward: number;
  is_opened: boolean;
  user: string;
}[]> = ref(data === null ? [] : data.sort((a, b) => a.id - b.id));

const participant: Ref<{
  id: number;
  nickname: string;
	uid: string;
	completed: number[];
} | null> = ref(dataParticipant === null ? null : dataParticipant[0]);

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
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participant' }, handleParticipantUpdate)
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, (payload) => { handleInsert(payload, tasks) })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, (payload) => { handleUpdate(payload, tasks) })
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'tasks' }, (payload) => { handleDelete(payload, tasks) })
  .subscribe();
</script>

<style scoped>
.task-move {
  transition: all 1s ease;
}

.task-enter-active,
.task-leave-active {
  transition: opacity 1s ease;
}

.task-leave-active {
  position: absolute;
}

.task-enter-to,
.task-leave-from {
  opacity: 1;
}

.task-leave-to,
.task-enter-from {
  opacity: 0;
}
</style>
