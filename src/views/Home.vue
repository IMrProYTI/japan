<template>
  <div>
    <div class="w-screen min-h-screen bg-white dark:text-white dark:bg-neutral-800">
      <div class="flex flex-col w-screen min-h-screen">
        <Header />
        <div class="relative flex-1 justify-center items-center">
          <div class="absolute inset-0 bg-[url(/background.jpg)] bg-fixed bg-cover bg-center brightness-50" />
          <div class="absolute flex flex-col justify-center items-center inset-0 space-y-2 text-white">
            <img class="max-w-full max-h-96 p-4" src="/logo.png" alt="logo">
            <div class="flex flex-col justify-center items-center rounded-xl p-2 m-2 space-y-2">
              <h1 class="font-bold text-center text-4xl md:text-5xl lg:text-6xl m-2">Клуб Японской Культуры</h1>
              <hr class="w-full">
              <p class="font-semibold text-sm lg:text-base text-center">
                Мы приглашаем вас познакомится с удивительной культурой страны восходящего солнца.
              </p>
            </div>
          </div>
          <!-- <div class="absolute flex justify-center items-end bottom-0 w-full h-[calc(100%/10)] bg-gradient-to-t from-white dark:from-neutral-800">
            <span class="material-symbols m-2">expand_more</span>
          </div> -->
          <div class="absolute bottom-0 right-0 invisible 2xl:visible scale-75">
            <iframe
              src="https://discord.com/widget?id=1166086254396461066"
              width="350" height="500"
              allowtransparency="true" frameborder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              class="absolute bottom-5 right-10"
            >
            </iframe>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center space-y-16 p-6">
        <div class="text-center space-y-4">
          <h2 class="font-semibold text-3xl">О нашем клубе</h2>
          <p class="container max-w-3xl">
            Мы - клуб РТУ МИРЭА, который смог собрать людей, интересующихся культурой Японии.<br>
            Наши участники любят посещать самые разные мероприятия, некоторым нравится писать занимательные статьи о жизни в Японии, о быте японцев и о многом другом.<br>
            Другим приятно просто общаться в компании людей со схожими увлечениями.<br>
            А кому-то нравится своя определенная тематика.
            Но всех нас объединяет любовь к Японии - стране, где есть самураи, странная еда и постройки,
            древние храмы, красивая природа, многовековые традиции, аниме и многое другое.
          </p>
        </div>
        <div class="grid gap-4 md:grid-cols-3 xl:px-16 space-y-4 md:space-y-0">
          <div class="text-center space-y-4">
            <h3 class="font-semibold text-2xl">Мероприятия</h3>
            <p class="">Наш клуб участвует в мероприятиях, а также проводит их, мы расскажем и покажем все самое интересное о Японии.</p>
          </div>

          <div class="text-center space-y-4">
            <h3 class="font-semibold text-2xl">Атмосфера</h3>
            <p>Приятная ламповая атмосфера в клубе влюбит в себя абсолютно любого и никого не оставит равнодушным.</p>
          </div>

          <div class="text-center space-y-4">
            <h3 class="font-semibold text-2xl">Обучение</h3>
            <p>Остается только предполагать, сколько всего узнали наши участники за время существования клуба.</p>
          </div>
        </div>
        <div class="grid gap-4 lg:grid-cols-3 xl:px-16">
          <Card img="anime" title="Аниме">
            <p>Уже неотъемлемая часть японской культуры. У нас вы найдете с кем обсудить и новые тайтлы и классику аниме. Ко всему прочему мы также проводим показы занимательных картин.</p>
          </Card>
          <Card img="mythology" title="Мифология">
            <p>Если вам небезразлична пугающе интересная мифология Японии, то вы пришли по адресу.</p>
          </Card>
          <Card img="nature" title="Природа">
            <p>Нельзя не сказать об удивительной природе Японии. Сколько в ней красоты и умиротворения.</p>
          </Card>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <h3 class="font-semibold text-3xl text-center">Галерея</h3>
        <Gallery />
      </div>
      <div class="p-6 space-y-4">
        <h3 class="font-semibold text-3xl text-center">Посты группы во ВКонтакте</h3>
        <VK class="flex flex-wrap justify-center items-center *:m-4" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Home/Header.vue';
import Card from '../components/Home/Card.vue';
import Gallery from '../components/Home/Gallery.vue';
import VK from '../components/Home/VK.vue';
import Footer from '../components/Home/Footer.vue';
</script>

<style scoped>

</style>
