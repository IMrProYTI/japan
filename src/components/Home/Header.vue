<template>
	<header class="flex justify-between items-center w-fill h-10 bg-neutral-800">
		<nav class="w-auto h-full flex justify-center items-center px-2 divide-x divide-neutral-800 text-sm">
			<LinkButton to="/">
				<p>Главная</p>
			</LinkButton>
			<LinkButton to="/admin/tasks">
				<p>Админка</p>
			</LinkButton>
			<!-- <LinkButton v-show="!authorizedStatus" to="/login">
				<p>Авторизация</p>
			</LinkButton> -->
		</nav>
		<div class="flex justify-center items-center pe-4">
			<a href="https://vk.com/japanclubm">
				<img class="w-8 h-8 p-1 hover:p-0.5 linkHover" src="/logos/VK.svg" alt="VK">
			</a>
			<a href="https://t.me/japanclubmirea">
				<img class="w-8 h-8 p-1 hover:p-0.5 linkHover" src="/logos/Telegram.svg" alt="Telegram">
			</a>
			<a href="https://www.youtube.com/@user-ot1vk5tc2i">
				<img class="w-8 h-8 p-1 hover:p-0.5 linkHover" src="/logos/Youtube.svg" alt="Youtube">
			</a>
			<a href="https://discord.com/invite/whUKEvMjgy">
				<img class="w-8 h-8 p-1 hover:p-0.5 linkHover" src="/logos/Discord.svg" alt="Discord">
			</a>
			
		</div>
	</header>
</template>

<script setup lang="ts">
// import { Ref, ref } from 'vue';
// import { checkAuth } from '../../supabase';

import LinkButton from './LinkButton.vue';

// const authorizedStatus: Ref<boolean> = ref(true);

// async function isAuthorized(): Promise<void> {
// 	authorizedStatus.value = await checkAuth();
// };

// isAuthorized();
</script>

<style scoped>

@keyframes hoverIcon {
	from { padding: 0.25rem; }
	to { padding: 0.125rem; }
}

@keyframes unhoverIcon {
	from { padding: 0.125rem; }
	to { padding: 0.25rem; }
}

.linkHover {
	animation: ease-in-out unhoverIcon 0.25s;
}

.linkHover:hover {
	animation: ease-in-out hoverIcon 0.25s;
}
</style>