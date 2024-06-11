<template>
	<div class="flex flex-col justify-center items-center w-full h-screen space-y-2">
		<p class="font-bold text-4xl">{{ participant }}</p>
		<img :src="`http://api.qrserver.com/v1/create-qr-code/?data=${uri}`">
	</div>
</template>

<script setup lang="ts">
import router from '../router';

const { participant, key } = router.currentRoute.value.params;
const uri = encodeURI(`${window.location.origin}/judge/${participant}?key=${key}`);
</script>

<style scoped>

</style>