<template>
	<router-link class="
			flex justify-center items-center
			w-auto h-full px-2
			text-white
			bg-neutral-700 hover:bg-neutral-600
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