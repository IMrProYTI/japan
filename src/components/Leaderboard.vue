<template>
  <div class="text-black h-screen overflow-hidden space-y-2 p-2">
    <h1 class="p-2 rounded-md text-lg text-center text-[#ccbd8f] bg-gradient-to-b from-[#4b5265] to-[#4b526599]">
      🌸Таблица лидеров:🌸
    </h1>
    <h2
      class="flex space-x-2 *:text-center *:rounded-md *:p-2 text-[#ccbd8f] *:bg-gradient-to-b *:from-[#4b5265] *:to-[#4b526599]"
    >
      <p class="basis-2/3">Никнейм:</p>
      <p class="basis-1/3">Очки:</p>
    </h2>
    <div class="relative space-y-2">
      <transition-group name="participant">
        <div v-for="participant in participants" :key="participant.id">
          <div
		    		class="flex justify-between items-center w-full p-2 rounded-md text-lg bg-gradient-to-b from-[#ebe6db] to-[#ebe6db99]"
          >
		    		<h1 class="truncate">{{ participant.nickname }}</h1>
            <div class="flex">
              <p>{{ participant.points }}</p>
              <img class="w-7" src="/genshin/dice.png">
            </div>
		    	</div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../supabase';

const data = (await supabase.from('tasks').select('id,title,reward,is_opened,user')).data;
const dataParticipants = (await supabase.from('participant').select('id,nickname,uid,completed')).data;

const tasks: Ref<{
  id: number;
  title: string;
  reward: number;
  is_opened: boolean;
  user: string;
}[]> = ref(data === null ? [] : data.sort((a, b) => a.id - b.id));

const participants: Ref<{
  id: number;
  nickname: string;
	uid: string;
	completed: number[];
  points?: number;
}[]> = ref(dataParticipants === null ? [] : dataParticipants);

const sortFunc = (a: { id: number, points?: number }, b: { id: number, points?: number }) => {
  a.points = a.points || 0; 
  b.points = b.points || 0;
  if (a.points === b.points) {
    return a.id - b.id;
  } else {
    return a.points - b.points;
  };
};

function handleInsert(payload: any, refArray: Ref<any[]>): void {
	refArray.value.push(payload.new);
};

function handleUpdate(payload: any, refArray: Ref<any[]>): void {
	handleDelete(payload, refArray);
	handleInsert(payload, refArray);
  calcPoints();
	refArray.value = refArray.value.sort(sortFunc).reverse();
};

function handleDelete(payload: any, refArray: Ref<any[]>): void {
	const check = (el: any) => { return el.id !== payload.old.id; };
	refArray.value = refArray.value.filter(check);
};

function calcPoints() {
	for (let i = 0; i < participants.value.length; i++) {
		participants.value[i].points = 0;
		for (let j = 0; j < participants.value[i].completed.length; j++) {
			// @ts-ignore
			participants.value[i].points += tasks.value.find((el) => { return el.id === participants.value[i].completed[j] })?.reward || 0;
		};
	};
	participants.value = participants.value.sort(sortFunc).reverse();
};
calcPoints();

supabase
  .channel('custom-all-channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, (payload) => { handleInsert(payload, tasks) })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, (payload) => { handleUpdate(payload, tasks) })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participant' }, (payload) => { handleUpdate(payload, participants) })
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'tasks' }, (payload) => { handleDelete(payload, tasks) })
  .subscribe();
</script>

<style scoped>
.participant-move {
  transition: all 1s ease;
}
</style>
