<script setup>
import ProductCard from './ProductCard.vue';

defineProps({
    products: Array
})

</script>

<template>
    <div class="container-fluid min-vh-100">
        <div class="container my-5 px-0 px-md-3">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3">
                <ProductCard v-for="product in products" :product="product" :key="product._id" />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>