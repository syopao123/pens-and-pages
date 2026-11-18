<script setup>
import api from '@/api';
import { Notyf } from 'notyf';
import { onBeforeMount, reactive, ref } from 'vue';
import ProductCard from './ProductCard.vue';

const products = reactive({ data: [] });

const isLoading = ref(false);

const notyf = new Notyf();

onBeforeMount(async() => {

    try {

        isLoading.value = true;

        let response = await api.get('/products/active');

        products.data = response.data;

    } catch {

        notyf.error("Failed to fetch featured products.");

    } finally {

        isLoading.value = false;

    }
})

</script>

<template>
    <div class="container">
        <div class="row min-vh-100">
            <div class="col py-5">

                <div class="row row-cols-1 row-cols-md-2 mb-4 align-items-center pt-0 pt-md-5">
                    <div class="col text-center text-md-start">
                        <p class="featured-title fs-1 mb-0">Featured Products</p>
                        <p>Discover our favorite school supplies to help you stay prepared for every class.</p>
                    </div>
                    <div class="col text-center text-md-end">
                        <router-link 
                            :to="{ name: 'Products' }" 
                            class="d-block d-md-flex justify-content-end gap-2 text-decoration-none fw-light view-all-products">
                            <span>View All Products</span>
                            <i class="bi bi-arrow-up-right"></i>
                        </router-link>
                    </div>
                </div>

                <div v-if="!isLoading" class="row row-cols-1 row-cols-md-3 g-3 px-2">
                    <ProductCard v-for="product in products.data.slice(0, 3)" :product="product" :key="product._id" />
                </div>

                <div v-else class="text-center py-5 my-5">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading cart...</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.featured-title {
    font-family: 'Playfair Display', 'sans-serif';
}

.view-all-products {
    color: #140d06;
}

.view-all-products:hover {
    color: #744b23;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}
</style>