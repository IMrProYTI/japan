<template>
  <nav class="flex justify-between items-center p-2">
    <div class="flex flex-wrap">
      <div class="flex *:m-1 me-2">
        <Link class="flex justify-center items-center p-1" c-type="router" to="/">
          <span class="material-symbols">home</span>
        </Link>
        <Link class="px-2 py-1" c-type="router" to="/admin/tasks">Задания</Link>
        <Link class="px-2 py-1" c-type="router" to="/admin/judge">Судьи</Link>
        <Link class="px-2 py-1" c-type="router" to="/admin/participant">Участники</Link>
      </div>
      <div class="flex *:m-1 *:px-2 *:py-1">
        <Link c-type="external" to="/leaderboard">
          Лидеры
		      <span class="material-symbols-nosize text-blue-400">north_east</span>
        </Link>
        <Link c-type="external" to="/overlay">
          Задания
		      <span class="material-symbols-nosize text-blue-400">north_east</span>
        </Link>
      </div>
    </div>
    <div class="flex">
      <Mode />
      <Danger class="p-1" @click="SignOut">
        <span class="material-symbols">logout</span>
      </Danger>
    </div>
  </nav>
</template>

<script setup lang="ts">
import supabase from '../../supabase';
import router from '../../router';

import Mode from '../root/Mode.vue';
import Link from '../root/Link.vue';
import Danger from '../root/Danger.vue';

async function SignOut() {
  const { error } = await supabase.auth.signOut();
  if (!error?.message) router.push('/');
};
</script>

<style scoped>

</style>