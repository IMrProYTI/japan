<template>
	<div class="flex items-center justify-center">
		<button
			class="relative w-8 h-8 m-auto me-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
			@click="changeTheme()"
		>
			<div class="absolute flex justify-center items-center inset-0">
				<span class="material-symbols dark:invisible visible">
					light_mode
				</span>
			</div>
			<div class="absolute flex justify-center items-center inset-0">
				<span class="material-symbols  dark:visible invisible">
					dark_mode
				</span>
			</div>
		</button>
	</div>
</template>

<script setup lang="ts">
import DarkMode from '../../DarkMode';

function changeTheme() {
	if (localStorage.theme !== undefined) {
		if (localStorage.theme === 'dark') {
			localStorage.setItem('theme', 'light');
			DarkMode();
		}
		else {
			localStorage.setItem('theme', 'dark');
			DarkMode();
		};
	} else {
	};
	DarkMode();
};
</script>

<style>

</style>