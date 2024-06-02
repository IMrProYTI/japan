<template>
	<div class="flex justify-center items-center w-full h-screen">
		<img :src="`http://api.qrserver.com/v1/create-qr-code/?data=${uri}`" alt="">
	</div>
</template>

<script setup lang="ts">
import router from '../router';

const { participant, key } = router.currentRoute.value.params;
const uri = encodeURI(`${window.location.origin}/judge/${participant}?key=${key}`);
</script>

<style scoped>

</style>