<template>
	<div v-if="data && IS_LOAD">
		<div 
			v-for="(post, index) in data" :key="index"
			:id="`vk_post_${post.owner_id}_${post.post_id}`"
			class="max-w-[500px] md:text-base text-sm"
		></div>
	</div>
	<p v-else>Посты отключены</p>	
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import supabase from '../../supabase';

const IS_LOAD = false;

const data: Ref<{
  owner_id: number;
  post_id: number;
  hash: string;
}[] | null> = ref(null);

(async () => {
	if (IS_LOAD) {
		data.value = (await supabase.from('vk').select('owner_id,post_id,hash').order('post_id',{ ascending: false }).eq('show', 'true').limit(3)).data;

		if (data && data.value) {
			data.value.forEach((post) => {
				const width = window.innerWidth > 500 - 32 ? 500 : window.innerWidth - 32;
				// @ts-ignore
  			VK.Widgets.Post(`vk_post_${post.owner_id}_${post.post_id}`, post.owner_id, post.post_id, post.hash, { width });
			});
		};
	};
})();
</script>

<style scoped>

</style>