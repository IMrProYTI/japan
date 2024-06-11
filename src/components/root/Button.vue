<template>
	<!-- @vue-skip -->
	<router-link v-if="cType === 'router'" :to="to">
		<slot />
	</router-link>
	<a v-else-if="cType === 'external'" :href="to" target="_blank">
		<slot />
	</a>
  <button v-else>
		<slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{ cType?: "button"; to?: string; } | { cType: "router" | "external"; to: string; }>();
</script>

<style scoped></style>
