<script setup>
import { useCartStore } from '@/stores/cart';
import { useGlobalStore } from '@/stores/global';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { getUserDetails } = useGlobalStore();

const cartStore = useCartStore();

onBeforeMount(async() => {
    localStorage.clear();
    getUserDetails(null);
    cartStore.$reset();
    router.push({ name: 'Login' });
});
</script>

<template></template>