<template>
  <button
		class="
			px-2 py-1 rounded-md border-2 border-transparent text-black dark:text-white
			hover:border-neutral-400 bg-neutral-300 active:bg-neutral-400
			dark:bg-slate-700 dark:hover:border-slate-600 dark:active:bg-slate-600
		"
	>
		<slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped></style>
