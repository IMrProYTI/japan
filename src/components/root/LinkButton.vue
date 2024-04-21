<template>
	<router-link 
		class="
			px-2 py-1 rounded-md border-2 border-transparent text-white
			hover:border-blue-700 bg-blue-600 active:bg-blue-700
		"
		:to="to"
	>
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