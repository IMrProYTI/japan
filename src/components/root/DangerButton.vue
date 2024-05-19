<template>
  <button
		class="
			px-2 py-1 rounded-md border-2 border-transparent text-white
			hover:border-red-700 bg-red-600 active:bg-red-700
			dark:bg-red-700 dark:hover:border-red-800 dark:active:bg-red-800
		"
	>
		<slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped></style>
