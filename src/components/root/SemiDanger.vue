<template>
  <Button
		class="
			flex justify-center items-center
			rounded-md border-2 border-transparent text-white
			hover:border-yellow-600 bg-yellow-500 active:bg-yellow-600
			dark:bg-yellow-600 dark:hover:border-yellow-700 dark:active:bg-yellow-700
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
