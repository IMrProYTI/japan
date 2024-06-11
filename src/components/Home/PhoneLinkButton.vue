<template>
	<router-link class="
			flex justify-start items-center w-auto h-full py-2 *:ms-3 space-x-4
			rounded-xl bg-neutral-700/50
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