<template>
	<a class="underline text-blue-500 hover:text-blue-600" :href="href">
		<slot/>
	</a>
</template>

<script setup lang="ts">
defineProps<{
	href: string;
}>();
</script>

<style scoped>

</style>