<template>
  <div class="flex flex-col justify-center items-center w-full h-screen *:text-center">
		<img class="aspect-square max-w-[75%] sm:max-w-[50%] max-h-[75%] sm:max-h-[50vh]" src="/404.png" alt="404">
		<h1 class="text-8xl sm:text-9xl">404</h1>
		<p class="text-base sm:text-xl">Данной страницы не существует...</p>
		<router-link class="text-base sm:text-xl underline text-blue-500 hover:text-blue-600" to="/">Вернутся на глувную</router-link>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
