<template>
  <Button
		class="
			flex justify-center items-center
			rounded-md border-2 border-transparent text-white
			hover:border-red-700 bg-red-600 active:bg-red-700
			dark:bg-red-700 dark:hover:border-red-800 dark:active:bg-red-800
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
