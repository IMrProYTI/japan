<template>
	<div class="grid gap-4 grid-cols-1 lg:grid-cols-2 *:flex *:flex-col *:justify-start *:items-center xl:px-16">
		<div class="space-y-4">
			<h4 class="font-semibold text-2xl">Актуальные фото</h4>
			<p class="xl:w-3/4 text-center">Фотографии, которые были сделаны относительно недавно. Они показывают, каков клуб на данный момент.</p>
			<div class="gallery relative flex flex-col w-full aspect-[8/5] overflow-hidden overflow-x-auto">
				<div class="flex justify-between flex-1">
					<div @click="prevActual" class="flex flex-1 justify-start items-center cursor-pointer z-10 ps-4">
						<button class="flex justify-center items-center w-8 h-8 rounded-full bg-white/50 dark:bg-neutral-800/75">
							<span class="material-symbols">chevron_left</span>
						</button>
					</div>
					<div @click="nextActual" class="flex flex-1 justify-end items-center cursor-pointer z-10 pe-4">
						<button class="flex justify-center items-center w-8 h-8 rounded-full bg-white/50 dark:bg-neutral-800/75">
							<span class="material-symbols">chevron_right</span>
						</button>
					</div>
				</div>
				<TransitionGroup name="actual">
					<img
						v-for="(url, index) in gallery.actual.urls" :key="index"
						class="absolute object-cover"
						:style="gallery.actual.styles[index]"
						v-show="gallery.actual.index === index"
						:src="url"
					>
				</TransitionGroup>
				<div class="flex justify-center items-center z-10 p-2 space-x-2">
					<button
						v-for="(_url, index) in gallery.actual.urls" :key="index"
						@click="gallery.actual.index = index"
						class="w-6 md:w-8 h-1"
						:class="gallery.actual.index === index ? 'bg-white' : 'bg-neutral-300'"
					/>
				</div>
			</div>
		</div>

		<div class="space-y-4">
			<h4 class="font-semibold text-2xl">Архивные фото</h4>
			<p class="xl:w-3/4 text-center">Фотографии, которые были сделаны достаточно давно, но не потеряли своей актуальности.</p>
			<div class="gallery relative flex flex-col w-full aspect-[8/5] overflow-hidden overflow-x-auto">
				<div class="flex justify-between flex-1">
					<div @click="prevArchive" class="flex flex-1 justify-start items-center cursor-pointer z-10 ps-4">
						<button class="flex justify-center items-center w-8 h-8 rounded-full bg-white/50 dark:bg-neutral-800/75">
							<span class="material-symbols">chevron_left</span>
						</button>
					</div>
					<div @click="nextArchive" class="flex flex-1 justify-end items-center cursor-pointer z-10 pe-4">
						<button class="flex justify-center items-center w-8 h-8 rounded-full bg-white/50 dark:bg-neutral-800/75">
							<span class="material-symbols">chevron_right</span>
						</button>
					</div>
				</div>
				<TransitionGroup name="archive">
					<img
						v-for="(url, index) in gallery.archive.urls" :key="index"
						class="absolute object-cover cursor-pointer"
						:style="gallery.archive.styles[index]"
						v-show="gallery.archive.index === index"
						:src="url"
					>
				</TransitionGroup>
				<div class="flex justify-center items-center z-10 p-2 space-x-2">
					<button
						v-for="(_url, index) in gallery.archive.urls" :key="index"
						@click="gallery.archive.index = index"
						class="w-6 md:w-8 h-1"
						:class="gallery.archive.index === index ? 'bg-white' : 'bg-neutral-300'"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import supabase from '../../supabase';

const gallery: Ref<{
	actual: {
		index: number,
		maxIndex: number,
		urls: string[],
		styles: string[]
	},
	archive: {
		index: number,
		maxIndex: number,
		urls: string[],
		styles: string[]
	}
}> = ref({
	actual: {
		index: 0,
		maxIndex: 0,
		urls: [],
		styles: []
	},
	archive: {
		index: 0,
		maxIndex: 0,
		urls: [],
		styles: []
	}
});

const prevActual = () => {
	const { index, maxIndex } = gallery.value.actual;
	gallery.value.actual.index = validateIndexes(index - 1, maxIndex);
}
const nextActual = () => {
	const { index, maxIndex } = gallery.value.actual;
	gallery.value.actual.index = validateIndexes(index + 1, maxIndex);
}

const prevArchive = () => {
	const { index, maxIndex } = gallery.value.archive;
	gallery.value.archive.index = validateIndexes(index - 1, maxIndex);
}
const nextArchive = () => {
	const { index, maxIndex } = gallery.value.archive;
	gallery.value.archive.index = validateIndexes(index + 1, maxIndex);
}

function validateIndexes(newIndex: number, maxIndex: number): number {
	if (newIndex < 0) return maxIndex - 1;
	else if (newIndex >= maxIndex) return 0;
	else return newIndex;
}

(async () => {
	const data: {
		actual: {
			maxIndex: number,
			styles: string[]
		}; 
		archive: {
			maxIndex: number,
			styles: string[]
		}; 
	} = await (await fetch(supabase.storage.from('japanclub').getPublicUrl('data.json').data.publicUrl)).json();

	gallery.value.actual.maxIndex = data.actual.maxIndex;
	gallery.value.archive.maxIndex = data.archive.maxIndex;

	gallery.value.actual.styles = data.actual.styles;
	gallery.value.archive.styles = data.archive.styles;

	for (let i = 0; i < data.actual.maxIndex; i++) {
		const imgUrl = supabase.storage.from('japanclub').getPublicUrl(`actual/${i}.jpg`).data.publicUrl;
		gallery.value.actual.urls.push(imgUrl);
	}

	for (let i = 0; i < data.archive.maxIndex; i++) {
		const imgUrl = supabase.storage.from('japanclub').getPublicUrl(`archive/${i}.jpg`).data.publicUrl;
		gallery.value.archive.urls.push(imgUrl);
	};
})();
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