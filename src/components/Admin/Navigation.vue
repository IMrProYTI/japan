<template>
  <nav class="flex justify-between items-center p-2">
    <div class="space-x-2">
      <LinkButton to="/">Главная</LinkButton>
      <LinkButton to="/admin/tasks">Задания</LinkButton>
      <LinkButton to="/admin/judge">Судьи</LinkButton>
      <LinkButton to="/admin/participant">Участники</LinkButton>
    </div>
    <div class="flex">
      <Mode />
      <DangerButton @click="SignOut">Выйти из аккаунта</DangerButton>
    </div>
  </nav>
</template>

<script setup lang="ts">
import supabase from '../../supabase';

import Mode from '../root/Mode.vue';
import LinkButton from '../root/LinkButton.vue';
import DangerButton from '../root/DangerButton.vue';

async function SignOut() {
  const { error } = await supabase.auth.signOut();
  if (!error?.message) window.location.reload();
};
</script>

<style scoped>

</style>