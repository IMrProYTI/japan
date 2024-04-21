<template>
  <div class="flex justify-center items-center w-screen min-h-screen">
    <div class="flex flex-col justify-center items-center space-y-2">
      <p class="text-2xl">Админка</p>
      <input class="p-1 rounded bg-neutral-100 dark:bg-slate-900" v-model="email" placeholder="Логин" type="email">
      <input class="p-1 rounded bg-neutral-100 dark:bg-slate-900" v-model="password" placeholder="Пароль" type="password">
      <button class="px-2 py-1 rounded border-2 border-transparent bg-neutral-100 hover:border-neutral-300 active:bg-neutral-300 dark:bg-slate-900 dark:hover:border-slate-800 dark:active:bg-slate-800" @click="authorize">Авторизоваться</button>
      <p v-if="errorMessage" class="font-semibold text-red-600">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import supabase from '../supabase';
import router from '../router';

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const errorMessage: Ref<string | undefined> = ref("");

// @ts-ignore
const redirect: string = typeof (useRoute().query.redirect) === 'string' ? useRoute().query.redirect : "/";

async function authorize() {
  if (email.value !== '' && password.value !== '') {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });
  
    errorMessage.value = error?.message;
    if (!error?.message) router.push(redirect);
  } else {
    errorMessage.value = `Поля логин и пароль должны быть заполнены`;
  };
};
</script>

<style scoped>

</style>
