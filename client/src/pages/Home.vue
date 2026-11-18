<script setup>
import FeaturedProducts from '@/components/FeaturedProducts.vue';
import Landing from '@/components/Landing.vue';
import { useGlobalStore } from '@/stores/global';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { user } = useGlobalStore();
const router = useRouter();

onMounted(() => {

    if (user.isAdmin) {
        router.push({ name: 'Products' });
        return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth'});

})

</script>

<template>
    <Landing />
    <FeaturedProducts/>
</template>

<style scoped>

</style>