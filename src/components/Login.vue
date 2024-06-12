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
          <h1 class="text-xl">Авторизуйтесь через <b class="font-semibold">GitHub</b></h1>
          <p>Чтобы войти в панель администратора</p>
        </div>
        <hr class="w-full border-neutral-300 dark:border-slate-800">
        <div class="flex w-full space-x-2">
          <Common class="flex-1 px-2 py-1 dark:bg-slate-800 dark:hover:border-slate-700" @click="signIn">Авторизоватся</Common>
          <Danger class="p-1" c-type="router" to="/">
            <span class="material-symbols">logout</span>
          </Danger>
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

const errorMessage: Ref<string | undefined> = ref("");

// @ts-ignore
const redirect: string = typeof (useRoute().query.redirect) === 'string' ? useRoute().query.redirect : "/";

async function signIn() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: `${window.location.origin}${redirect}` }
  });
  
  errorMessage.value = error?.message;
};
</script>

<style scoped>

</style>
