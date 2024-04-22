<template>
	<router-link class="
			flex justify-center items-center
			w-auto h-full px-2
			bg-neutral-200 hover:bg-neutral-100
			dark:bg-slate-900 dark:hover:bg-slate-800
		" :to="to">
		<slot />
	</router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
	to: string
}>();
</script>

<style scoped>

</style>