<template>
  <div class="flex flex-col w-screen min-h-screen">
    <div class="fixed flex justify-between w-full p-2">
      <Link to="/">Главная</Link>
      <router-link to="/"><Danger>Закрыть</Danger></router-link>
    </div>
    <div class="flex flex-1 flex-col justify-center items-center space-y-2">
      <button
        class="px-2 py-1 rounded border-2 border-transparent bg-neutral-100 hover:border-neutral-300 active:bg-neutral-300 dark:bg-slate-900 dark:hover:border-slate-800 dark:active:bg-slate-800"
        @click="signIn"
      >
        Авторизоваться через GitHub
      </button>
      <p v-if="errorMessage" class="font-semibold text-red-600">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import supabase from '../supabase';

import Link from './root/Link.vue';
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
