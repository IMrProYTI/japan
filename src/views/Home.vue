<template>
  <div class="w-screen min-h-screen bg-neutral-300 dark:text-white dark:bg-slate-950">
    <div class="flex flex-col w-screen min-h-screen">
      <Header />
      <div class="relative flex-1 justify-center items-center">
        <div class="absolute inset-0 bg-[url(/background.jpg)] bg-cover bg-center" />
        <div class="absolute flex flex-col justify-center items-center inset-0 text-white">
          <img src="./logo.svg" alt="logo">
          <div class="flex flex-col justify-center items-center drop-shadow">
            <h1 class="font-bold text-6xl m-4">Клуб Японской Культуры</h1>
            <hr class="w-full">
            <p class="m-2 text-wrap">Мы приглашаем вас познакомится с удивительной культурой страны восходящего солнца.
            </p>
          </div>
        </div>
        <div class="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-neutral-300 dark:from-slate-950">

        </div>
      </div>
      <div class="text-animate flex justify-center p-4">
        <span class="material-symbols">expand_more</span>
        <p>Листай ниже</p>
        <span class="material-symbols">expand_more</span>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center p-4">
      <div class="">

      </div>
      <div class="">
        
      </div>
    </div>

    <footer class="flex justify-between items-center p-2">
      <p>Разработано: <a class="underline" href="https://poti.netlify.app/">POTI</a></p>
      <div class="text-xs">
        <router-link class="px-2 py-1 rounded-md text-black dark:text-white" to="/">Домашняя</router-link>
        <router-link class="px-2 py-1 rounded-md text-black dark:text-white" to="/admin/tasks">Админка</router-link>
        <router-link class="px-2 py-1 rounded-md text-black dark:text-white" to="/overlay/">Оверлэй</router-link>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Home/Header.vue';
</script>

<style scoped>
.text-animate {
  animation: 1s alternate;

}

@keyframes Pulse {
  from {}
  50% {}
  to {}
}
</style>
