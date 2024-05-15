<template>
  <button
		class="
			px-2 py-1 rounded-md border-2 border-transparent text-white
			hover:border-yellow-600 bg-yellow-500 active:bg-yellow-600
			dark:bg-yellow-600 dark:hover:border-yellow-700 dark:active:bg-yellow-700
		"
	>
		<slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped></style>
