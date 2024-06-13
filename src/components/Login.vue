<template>
  <div class="flex flex-col w-screen min-h-screen">
    <div class="fixed flex justify-between w-full p-2">
      <div class="flex space-x-2">
        <Link class="px-2 py-1" c-type="router" to="/">Главная</Link>
        <Link class="px-2 py-1" c-type="router" to="/posts">Посты</Link>
      </div>
      <Mode />
    </div>
    <div class="flex flex-1 justify-center items-center">
      <div class="flex flex-col justify-center items-center rounded p-4 space-y-4 bg-neutral-200 dark:bg-slate-900">
        <img class="drop-shadow w-44" src="/logo.png" alt="logo">
        <div class="flex flex-col justify-center items-center">
          <h1 class="text-xl">Авторизуйтесь через <b class="font-semibold">{{ selectedMethod }}</b></h1>
          <p>Чтобы войти в панель администратора</p>
        </div>
        <hr class="w-full border-neutral-300 dark:border-slate-800">
        <div class="flex flex-col w-full justify-stretch items-stretch space-y-1">
          <div class="flex space-x-2">
            <Common class="flex-1 px-2 py-1 dark:bg-slate-800 dark:hover:border-slate-700" @click="signIn(selectedMethod)">Авторизоватся</Common>
            <Danger class="p-1" c-type="router" to="/">
              <span class="material-symbols">logout</span>
            </Danger>
          </div>
          <div class="flex justify-center space-x-2 text-sm">
            <button
              v-for="(el, index) in availableMethods" :key="index"
              :class="selectedMethod === el ? 'underline' : ''"
              @click="selectedMethod = el"
            >
              {{ el }}
            </button>
          </div>
        </div>
        <p v-if="errorMessage" class="font-semibold text-red-600">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import supabase from '../supabase';

import Mode from './root/Mode.vue';
import Link from './root/Link.vue';
import Common from './root/Common.vue';
import Danger from './root/Danger.vue';

type availableMethods = "Discord" | "GitHub";
const availableMethods: availableMethods[] = ["Discord", "GitHub"];
const selectedMethod: Ref<availableMethods> = ref("Discord");

const { query } = useRoute();
const errorMessage: Ref<string | undefined> = ref("");

// @ts-ignore
const redirect: string = typeof (query.redirect) === 'string' ? query.redirect : "/";

if (String(query.redirect).split('?').length !== 1) {
  const errorQuery = String(query.redirect).split('?')[1].split('&');
  if (errorQuery[0].split('=')[1] === 'access_denied') {
    setTimeout(() => {errorMessage.value = ''}, 5*1000)
    errorMessage.value = "Доступ Запрещён";
  };
};

async function signIn(method: availableMethods) {
  const { error } = await supabase.auth.signInWithOAuth({
    // @ts-ignore
    provider: method.toLowerCase(),
    options: { redirectTo: `${window.location.origin}${redirect}` }
  });
  
  errorMessage.value = error?.message;
};
</script>

<style scoped>

</style>
