<template>
	<header class="flex justify-between items-center w-fill h-10">
		<nav class="w-auto h-full flex justify-center items-center px-2 divide-x divide-slate-950 text-sm">
			<LinkButton to="/">
				<p>Главная</p>
			</LinkButton>
			<LinkButton to="/admin/tasks">
				<p>Админка</p>
			</LinkButton>
			<LinkButton v-show="!authorizedStatus" to="/login">
				<p>Авторизация</p>
			</LinkButton>
		</nav>
		<div class="flex">
			<Mode />
		</div>
	</header>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { checkAuth } from '../../supabase';

import Mode from './Mode.vue';
import LinkButton from './LinkButton.vue';

const authorizedStatus: Ref<boolean> = ref(false);

async function isAuthorized(): void {
	authorizedStatus.value = await checkAuth();
};

isAuthorized();
</script>

<style scoped>

</style>