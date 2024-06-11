<template>
  <div>
    <div class="w-screen min-h-screen bg-white dark:text-white dark:bg-neutral-800">
      <Header />
      <router-view v-slot="{ Component }">
        <transition mode="out-in">
			  	<component :is="Component" />
			  </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Home/Header.vue';
import Footer from '../components/Home/Footer.vue';
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
