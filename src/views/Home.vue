<template>
  <div class="w-screen min-h-screen bg-neutral-300 dark:text-white dark:bg-slate-950">
    <div class="flex flex-col w-screen min-h-screen">
      <Header />
      <div class="relative flex-1 justify-center items-center">
        <div class="absolute inset-0 bg-[url(/background.jpg)] bg-cover bg-center brightness-50" />
        <div class="absolute flex flex-col justify-center items-center inset-0 space-y-2 text-white">
          <img class="max-w-full max-h-96" src="/Logo-Vector.png" alt="logo">
          <div class="flex flex-col justify-center items-center rounded-xl p-2 m-2 space-y-2">
            <h1 class="font-bold text-center text-4xl md:text-5xl lg:text-6xl m-2">Клуб Японской Культуры</h1>
            <hr class="w-full">
            <p class="font-semibold text-sm lg:text-base text-center">
              Мы приглашаем вас познакомится с удивительной культурой страны восходящего солнца.
            </p>
          </div>
        </div>
        <!-- <div class="absolute bottom-0 w-full h-1/6 bg-gradient-to-t from-neutral-300 dark:from-slate-950" /> -->
      </div>
      <!-- <div class="text-animate flex justify-center p-2">
        <span class="material-symbols">expand_more</span>
      </div> -->
    </div>

    <!-- <div class="container flex flex-col justify-center items-center p-4 m-auto">
      <div class="">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ullam corporis, fugit tempore possimus veritatis aliquid dolore sint enim magnam voluptas odio? Odit vero cupiditate fugit corrupti. Quisquam, odit aliquid?
      </div>
      <div class="">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ullam corporis, fugit tempore possimus veritatis aliquid dolore sint enim magnam voluptas odio? Odit vero cupiditate fugit corrupti. Quisquam, odit aliquid?
      </div>
    </div> -->

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Home/Header.vue';
import Footer from '../components/Home/Footer.vue';
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
