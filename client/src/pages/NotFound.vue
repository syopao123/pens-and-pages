<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onBeforeMount(() => {
    router.push({ name: 'Home' });
})
</script>
<template></template>