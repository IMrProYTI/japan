<template>
  <div class="text-black h-screen overflow-x-hidden space-y-2 p-2">
    <h1 class="p-2 rounded-md text-lg text-center text-[#ccbd8f] bg-gradient-to-b from-[#4b5265] to-[#4b526599]">
      🌸Все задания:🌸
    </h1>
    <h2
      class="flex space-x-2 *:text-center *:rounded-md *:p-2 text-[#ccbd8f] *:bg-gradient-to-b *:from-[#4b5265] *:to-[#4b526599]"
    >
      <p class="flex-1">Задание:</p>
      <p class="w-[calc(28px*5+8px*2)]">Очки:</p>
    </h2>
    <div class="relative space-y-2">
      <transition-group name="task">
        <div
          v-for="task in tasks" :key="task.id"
          v-show="task.is_opened !== false"
          class="flex justify-between items-center w-full p-2 space-x-4 rounded-md text-lg bg-gradient-to-b"
          :class="tasksCompleted[task.id] === 0 ? 'from-[#ebe6db] to-[#ebe6db99]' : 'from-[#ebdbdb] to-[#ebdbdb99]'"
        >
          <div class="flex-1 overflow-hidden">
            <h1 class="">{{ task.title }}</h1>
            <p
              class="text-sm text-neutral-500"
              v-for="(el, index) in task.description" :key="index"
            >{{ el }}</p>
          </div>
          <div class="flex justify-end shrink-0 w-[calc(28px*5)]">
            <img v-for="el in range(0, task.reward)" :key="el" class="w-7" src="/genshin/dice.png">
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../supabase';

const range = (start: number, end: number, step: number = 1) => { let out = [], i = start; while (i < end) { out.push(i); i += step; }; return out; }

const dataTasks = (await supabase.from('tasks').select('id,title,description,reward').eq('is_opened', true)).data;
const dataParticipants = (await supabase.from('participant').select('id,nickname,uid,completed')).data;

const tasks: Ref<{
  id: number;
  title: string;
  description: string;
  reward: number;
  is_opened?: boolean;
}[]> = ref(dataTasks === null ? [] : dataTasks.sort((a, b) => a.id - b.id));

const tasksCompleted: Ref<{
  [id: number]: number
}> = ref({});

const participants: Ref<{
  id: number;
  nickname: string;
	uid: string;
	completed: number[];
}[]> = ref(dataParticipants === null ? [] : dataParticipants.sort((a, b) => a.id - b.id));

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

function calcParticipants(): void {
  for (let i = 0; i < tasks.value.length; i++)
    tasksCompleted.value[tasks.value[i].id] = calcCompleted(tasks.value[i].id);
};
calcParticipants();

supabase
  .channel('custom-all-channel')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participant' }, (payload) => { handleUpdate(payload, participants); calcParticipants(); })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, (payload) => { handleUpdate(payload, tasks); calcParticipants(); })
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
