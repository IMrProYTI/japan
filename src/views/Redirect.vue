<template>
	<div class="flex justify-center items-center w-screen min-h-screen bg-neutral-300 dark:text-white dark:bg-slate-950">
		<div class="flex justify-center items-center space-x-4">
			<div class="text-center">
				<p class="text-2xl font-bold">Перенаправление</p>
				<p class="w-max h-auto">Пожалуйста подождите{{ '...'.slice(0, dots) }}</p>
			</div>
			<Loading />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Loading from '../components/root/Loading.vue';

const dots = ref(0);
setInterval(() => {
	dots.value += 1;
	dots.value %= 4;
}, 500)
</script>

<style scoped>

</style>