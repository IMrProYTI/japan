<template>
	<Button
		class="
			flex justify-center items-center
			rounded-md border-2 border-transparent text-white
			hover:border-green-700 bg-green-600 active:bg-green-700
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
