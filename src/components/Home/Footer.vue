<template>
	<footer class="flex flex-col p-2 text-white bg-neutral-800">
    <hr class="hidden dark:block">
    <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 *:flex *:flex-col justify-around items-stretch m-4">
      <div class="xl:col-start-2">
        <h4 class="font-semibold text-lg">О нас</h4>
        <p class="text-wrap w-3/4">
          Клуб Японской Культуры ждет новых участников.
          Фестивали, турниры, показы фильмов - всё это и еще много мероприятий, которые проводит наш клуб.
        </p>
      </div>
      <div class="justify-center items-start">
        <h4 class="font-semibold text-lg">При поддержке</h4>
        <a class="relative flex justify-center items-center overflow-hidden w-32 h-32" href="https://www.mirea.ru/">
          <img src="/footer/Gerb.png" class="absolute scale-125" alt="Герб Вуза">
        </a>
        <a class="relative flex justify-center items-center overflow-hidden w-32 h-32" href="https://sumirea.ru/">
          <img src="/footer/Stud.png" class="absolute scale-125" alt="Студенческий Союз">
        </a>
      </div>
      <div>
        <h4 class="font-semibold text-lg">Полезные ссылки</h4>
        <div class="flex flex-col flex-1 justify-around py-4">
          <Link href="https://vk.com/japanclubm">Мы во ВКонтакте</Link>
          <Link href="https://t.me/japanclubmirea">Мы в Telegram</Link>
          <Link href="https://www.youtube.com/@user-ot1vk5tc2i">Мы на YouTube</Link>
          <Link href="https://discord.com/invite/whUKEvMjgy">Мы в Discord</Link>
          <Link href="https://jc.org.ru/ru/index">Японский центр</Link>
          <Link href="https://vk.com/yatoisada">Президент клуба</Link>
        </div>
      </div>
    </div>
    <div class="grid gap-2 grid-cols-2 *:text-center">
      <p>© 2024 Copyright:  Клуб Японской Культуры</p>
      <div class="flex justify-around flex-wrap *:text-center *:px-1">
        <p>Разработано: <Link href="https://poti.netlify.app/">POTI</Link></p>
        <p>Код на <Link href="https://github.com/IMrProYTI/japan">Github</Link></p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Link from './Link.vue';
</script>

<style scoped>

</style>