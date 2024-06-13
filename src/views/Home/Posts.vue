<template>
  <div class="p-6 space-y-4 pt-10">
		<hr class="w-screen -mx-6 border-neutral-700">
		<div class="flex flex-col lg:flex-row justify-center items-center">
    	<img class="drop-shadow-lg max-w-full max-h-64 p-4" src="/logo.png" alt="logo">
    	<h3 class="font-semibold text-3xl text-center">Посты группы во ВКонтакте</h3>
		</div>
		<div class="text-center italic">
			<p>Пользователям Firefox необходимо понизить приватность браузера со "Строгая" до "Стандартная"</p>
			<p>Данная настройка ломает отображение постов ВКонтакте</p>
		</div>
    <VK class="flex flex-wrap justify-center items-center *:m-4" />
  </div>
</template>

<script setup lang="ts">
import VK from '../../components/Home/VK.vue';
</script>

<style scoped>

</style>