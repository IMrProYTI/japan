<template>
	<table v-if="true" class="w-max rounded table-auto text-white bg-blue-600 dark:bg-slate-900">
		<thead>
			<tr>
				<th class="px-2 py-1">id</th>
				<th class="px-2 py-1">Судья</th>
				<th class="px-2 py-1">Участник</th>
				<th class="px-2 py-1">Ссылка</th>
				<th class="px-2 py-1">Действия</th>
			</tr>
			</thead>
		<tbody
			class="
				divide-y divide-neutral-300 dark:divide-slate-700
				text-black dark:text-white
				bg-neutral-200 dark:bg-slate-800
			"
		>
			
		</tbody>
		<tfoot>
			<tr class="invisible">
				<th class="px-2 py-1">id</th>
				<th class="px-2 py-1">Судья</th>
				<th class="px-2 py-1">Участник</th>
				<th class="px-2 py-1">Ссылка</th>
				<th class="px-2 py-1">Действия</th>
			</tr>
		</tfoot>
	</table>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>