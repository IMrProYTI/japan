<template>
	<div class="flex flex-wrap justify-center *:px-1 *:py-0.5 *:flex *:justify-center *:items-center *:*:text-sm *:space-x-1">
		<div @click="filter.title = !filter.title">
			<input v-model="filter.title" type="checkbox">
			<p class="select-none">Название</p>
		</div>
		<div @click="filter.description = !filter.description">
			<input v-model="filter.description" type="checkbox">
			<p class="select-none">Описание</p>
		</div>
		<div @click="filter.status = !filter.status">
			<input v-model="filter.status" type="checkbox">
			<p class="select-none">Статус задания</p>
		</div>
		<div v-if="isValidKey" @click="filter.actions = !filter.actions">
			<input v-model="filter.actions" type="checkbox">
			<p class="select-none">Действия</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { filter, isValidKey } from './Judge';
</script>

<style scoped>

</style>