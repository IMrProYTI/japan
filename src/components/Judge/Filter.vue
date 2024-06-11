<template>
	<div class="flex flex-wrap justify-center *:px-1 *:py-0.5 *:flex *:justify-center *:items-center *:*:text-sm *:space-x-1">
		<div @click="filter.title = !filter.title">
			<input v-model="filter.title" type="checkbox">
			<p>Название</p>
		</div>
		<div @click="filter.description = !filter.description">
			<input v-model="filter.description" type="checkbox">
			<p>Описание</p>
		</div>
		<div @click="filter.status = !filter.status">
			<input v-model="filter.status" type="checkbox">
			<p>Статус задания</p>
		</div>
		<div v-if="query.key" @click="filter.actions = !filter.actions">
			<input v-model="filter.actions" type="checkbox">
			<p>Действия</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, ref, Ref } from 'vue';
import router from '../../router';

const { query } = router.currentRoute.value;

const filter: Ref<{
  title: boolean;
  description: boolean;
  status: boolean;
  actions: boolean;
}> = inject('filter') || ref({
	title: true,
  description: true,
  status: true,
  actions: true
});
</script>

<style scoped>

</style>