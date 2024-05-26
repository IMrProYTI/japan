<template>
	<div class="card flex flex-col border-2 hover:border-4 m-0.5 hover:m-0 rounded-xl overflow-hidden border-black dark:border-white">
		<img class="w-full 2xl:h-72 xl:h-56 lg:h-48 md:h-96 sm:h-80 h-72 object-cover" :src="`/static/${img}.jpg`">
		<div class="p-4 pb-6 space-y-2 flex-1">
			<h3 class="font-semibold text-2xl">{{ title }}</h3>
			<slot class="flex-1"/>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	img: "anime" | "mythology" | "nature";
	title: string;
}>();
</script>

<style scoped>
div.card {
	transition: margin 250ms, border 250ms;
}
</style>