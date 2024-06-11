<template>
	<header class="flex flex-col w-full text-white bg-neutral-800">
		<div class="flex justify-between items-center w-fill h-10">
			<button
				class="flex justify-center items-center rounded border-2 px-2 py-0.5 ms-2"
				@click="menuIsOpen = !menuIsOpen"
			>
				<span class="material-symbols-nosize text-2xl">menu</span>
			</button>

			<div class="flex justify-center items-center pe-2">
				<a href="https://vk.com/japanclubm">
					<img class="w-8 h-8 p-1" src="/logos/VK.svg" alt="VK">
				</a>
				<a href="https://t.me/japanclubmirea">
					<img class="w-8 h-8 p-1" src="/logos/Telegram.svg" alt="Telegram">
				</a>
				<a href="https://www.youtube.com/@user-ot1vk5tc2i">
					<img class="w-8 h-8 p-1" src="/logos/Youtube.svg" alt="Youtube">
				</a>
				<a href="https://discord.com/invite/whUKEvMjgy">
					<img class="w-8 h-8 p-1" src="/logos/Discord.svg" alt="Discord">
				</a>
			</div>
		</div>
		<Transition>
			<nav
				class="space-y-2 p-2"
				v-if="menuIsOpen"
			>
				<PhoneLinkButton @click="menuIsOpen = !menuIsOpen" to="/">
					<span class="material-symbols">home</span>
					<p>Главная</p>
				</PhoneLinkButton>
				<PhoneLinkButton @click="menuIsOpen = !menuIsOpen" to="/posts">
					<span class="material-symbols">newspaper</span>
					<p>Посты</p>
				</PhoneLinkButton>
				<PhoneLinkButton @click="menuIsOpen = !menuIsOpen" to="/admin/tasks">
					<span class="material-symbols">admin_panel_settings</span>
					<p>Админка</p>
				</PhoneLinkButton>
			</nav>
		</Transition>
	</header>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

import PhoneLinkButton from './PhoneLinkButton.vue';

import Mode from '../root/Mode.vue';

const menuIsOpen: Ref<Boolean> = ref(false);
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>