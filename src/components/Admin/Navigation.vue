<template>
  <nav class="flex justify-between items-center p-2">
    <div class="space-x-2">
      <LinkButton to="/">Главная</LinkButton>
      <LinkButton to="/admin/tasks">Задания</LinkButton>
      <LinkButton to="/admin/judge">Судьи</LinkButton>
    </div>
    <DangerButton @click="SignOut">Выйти из акаунта</DangerButton>
  </nav>
</template>

<script setup lang="ts">
import supabase from '../../supabase';

import DangerButton from '../root/DangerButton.vue';
import LinkButton from '../root/LinkButton.vue';

async function SignOut() {
  const { error } = await supabase.auth.signOut();
  if (!error?.message) window.location.reload();
};
</script>

<style scoped>

</style>