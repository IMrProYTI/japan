<template>
	<Button
		class="
			flex justify-center items-center
			rounded-md border-2 border-transparent text-black dark:text-white
			hover:border-neutral-400 bg-neutral-300 active:bg-neutral-400
			dark:bg-slate-700 dark:hover:border-slate-600 dark:active:bg-slate-600
		"
		:c-type="cType" :to="to"
	>
		<slot />
	</Button>
</template>

<script setup lang="ts">
import Button from './Button.vue';
defineProps<{ cType?: "button"; to?: string; } | { cType: "router" | "external"; to: string; }>();
</script>

<style scoped></style>
