<template>
	<div class="grid gap-4 grid-cols-1 lg:grid-cols-2 *:flex *:flex-col *:justify-start *:items-center px-4">
		<div class="space-y-4">
			<h4 class="font-semibold text-2xl">Актуальные фото</h4>
			<p class="xl:w-3/4 text-center">Фотографии которые были сделаны относительно недавно, они показывают какой клуб на данный момент.</p>
			<div class="gallery relative flex flex-col w-full aspect-[8/5] overflow-hidden overflow-x-auto">
				<div class="flex justify-between flex-1">
					<div @click="prevActualImage" class="flex justify-center items-center cursor-pointer z-10 px-4">
						<button class="flex justify-center items-center w-8 h-8 rounded-full bg-neutral-800/75">
							<span class="material-symbols">chevron_left</span>
						</button>
					</div>
					<div @click="nextActualImage" class="flex justify-center items-center cursor-pointer z-10 px-4">
						<button class="flex justify-center items-center w-8 h-8 rounded-full bg-neutral-800/75">
							<span class="material-symbols">chevron_right</span>
						</button>
					</div>
				</div>
				<TransitionGroup name="actual">
					<!-- <img class="-bottom-10"> -->
					<img
						v-for="(el, index) in range(0, maxActualCount)" :key="index"
						class="absolute object-cover cursor-pointer"
						v-show="el === actualIndex"
						:class="getActualtyle(el)"
						:src="`/gallery/actual/${el}.jpg`"
					>
				</TransitionGroup>
				<div class="flex justify-center items-center z-10 p-2 space-x-2">
					<button
						v-for="(el, index) in range(0, maxActualCount)" :key="index"
						@click="actualIndex = el"
						class="w-6 md:w-8 h-1"
						:class="el === actualIndex ? 'bg-white' : 'bg-neutral-300'"
					/>
				</div>
			</div>
		</div>

		<div class="space-y-4">
			<h4 class="font-semibold text-2xl">Архивные фото</h4>
			<p class="xl:w-3/4 text-center">Фотографии которые были сделаны достаточно давно, но они не потеряли своей актуальности.</p>
			<div class="gallery relative flex flex-col w-full aspect-[8/5] overflow-hidden overflow-x-auto">
				<div class="flex justify-between flex-1">
					<div @click="prevArchiveImage" class="flex justify-center items-center cursor-pointer z-10 px-4">
						<button class="flex justify-center items-center w-8 h-8 rounded-full bg-neutral-800/75">
							<span class="material-symbols">chevron_left</span>
						</button>
					</div>
					<div @click="nextArchiveImage" class="flex justify-center items-center cursor-pointer z-10 px-4">
						<button class="flex justify-center items-center w-8 h-8 rounded-full bg-neutral-800/75">
							<span class="material-symbols">chevron_right</span>
						</button>
					</div>
				</div>
				<TransitionGroup name="archive">
					<img
						v-for="(el, index) in range(0, maxArchiveCount)" :key="index"
						class="absolute object-cover cursor-pointer"
						v-show="el === archiveIndex"
						:class="getArchiveStyle(el)"
						:src="`/gallery/archive/${el}.jpg`"
					>
				</TransitionGroup>
				<div class="flex justify-center items-center z-10 p-2 space-x-2">
					<button
						v-for="(el, index) in range(0, maxArchiveCount)" :key="index"
						@click="archiveIndex = el"
						class="w-6 md:w-8 h-1"
						:class="el === archiveIndex ? 'bg-white' : 'bg-neutral-300'"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';

const range = (start: number, end: number, step: number = 1): number[] => { const out = []; for (let i = start; i < end; i+=step) out.push(i); return out; };

const maxActualCount: number = 6;
const actualIndex: Ref<number> = ref(0);

const nextActualImage = () => nextImage(actualIndex, maxActualCount);
const prevActualImage = () => prevImage(actualIndex, maxActualCount);

const maxArchiveCount: number = 3;
const archiveIndex: Ref<number> = ref(0);

const nextArchiveImage = () => nextImage(archiveIndex, maxArchiveCount);
const prevArchiveImage = () => prevImage(archiveIndex, maxArchiveCount);

function nextImage(index: Ref<number>, maxIndex: number) {
	if (index.value >= maxIndex-1)
		index.value = 0;
	else
		index.value += 1;
};

function prevImage(index: Ref<number>, maxIndex: number) {
	if (index.value <= 0)
		index.value = maxIndex-1;
	else
		index.value -= 1;
};

function getActualtyle(element: number): string {
	switch (element) {
		case 0: return 'bottom-0';
		case 1: return '-bottom-10';
		case 2: return 'bottom-0';
		case 3: return '';
		case 4: return 'bottom-0';
		case 5: return 'bottom-0';
		default: return '';
	};
};

function getArchiveStyle(element: number): string {
	switch (element) {
		case 0: return '';
		case 1: return 'bottom-0';
		case 2: return 'bottom-0';
		default: return '';
	};
};
</script>

<style scoped>
.actual-enter-active,
.actual-leave-active,
.archive-enter-active,
.archive-leave-active {
  transition: opacity 0.5s ease;
}

.actual-enter-from,
.actual-leave-to,
.archive-enter-from,
.archive-leave-to {
  opacity: 0;
}
</style>