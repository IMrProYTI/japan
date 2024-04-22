<template>
	<div class="flex items-center justify-center">
		<button
			class="relative w-10 h-10 m-auto rounded-full hover:bg-black/5 dark:hover:bg-white/5"
			@click="changeTheme()"
		>
			<span class="material-symbols absolute inset-0 text-black w-full h-full p-0.5 dark:invisible visible">
				dark_mode
			</span>
			<span class="material-symbols absolute inset-0 text-white w-full h-full p-0.5 dark:visible invisible">
				light_mode
			</span>
			<!-- <Moon class="absolute top-0 left-0 text-black w-full h-full p-0.5 dark:invisible visible" /> -->
			<!-- <Sun class="absolute top-0 left-0 text-white w-full h-full p-0.5 dark:visible invisible" /> -->
		</button>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

function changeTheme() {
	const html = document.getElementsByTagName('html')[0];

	if (localStorage.theme !== undefined) {
		if (localStorage.theme === 'dark') {
			html.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
		else {
			html.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		};
	} else {
		html.classList.toggle('dark');
	};
};

onMounted(() => {
	const html = document.getElementsByTagName('html')[0];

	if (localStorage.theme === undefined) {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			localStorage.setItem('theme', 'dark');
		}
		else {
			localStorage.setItem('theme', 'light');
		};
	};

	if (localStorage.theme === 'dark') html.classList.add('dark');
});
</script>

<style>

</style>