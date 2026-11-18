<script setup>
import api from '@/api';
import ProductsAdmin from '@/components/ProductsAdmin.vue';
import PageBanner from '@/components/PageBanner.vue';
import ProductsCatalog from '@/components/ProductsCatalog.vue';
import ProductSearchBar from '@/components/ProductSearchBar.vue';
import { useGlobalStore } from '@/stores/global';
import { Notyf } from 'notyf';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';

const { user } = useGlobalStore();

const notyf = new Notyf();

const products = reactive({ data: [] });

const isInitialLoading = ref(true);
const isLoading = ref(false);
const isSearching = ref(false);

async function handleRefreshProducts() {
    try {

        isLoading.value = true;

        let response = user.isAdmin ? await api.get('/products/all') : await api.get('/products/active');
        products.data = response.data;

        isLoading.value = false;

    } catch (e) {
        notyf.error(e);
    }
}

async function handleProductSearchName(productName) {

    if (isLoading.value || isSearching.value) return;

    if (productName.length === 0 || productName === '') {
        await handleRefreshProducts();
        return;
    }

    try {

        isSearching.value = true;

        let response = await api.post('/products/search-by-name', {
            name: productName
        })

        if (response.data.length > 0) {
            products.data = response.data
        } else {
            await handleRefreshProducts();
            notyf.error("No Results Found.")
        }

    } catch (e) {
        notyf.error("Failed to search by product name.");
    } finally {
        isSearching.value = false;
    }

}

async function handleProductSearchPrice(min, max) {
    try {

        isSearching.value = true;

        let response = await api.post('/products/search-by-price', {
            minPrice: min,
            maxPrice: max
        });

        if (response.data.length > 0) {
            products.data = response.data;
        } else {
            await handleRefreshProducts();
            notyf.error("No Results Found.");
        }

    } catch (e) {
        notyf.error("Failed to search by product price.");
    } finally {
        isSearching.value = false;
    }
}

onBeforeMount(async () => {
    await handleRefreshProducts();
    isInitialLoading.value = false;
});

onMounted(async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
})

</script>

<template>
    <div class="container-fluid min-vh-100 py-5 banner">
        <div class="container">

            <PageBanner
                :page-name="user.isAdmin ? 'Admin Dashboard' : 'Products'"
                :page-description="user.isAdmin ? 'Manage products catalog, inventory allotments, and product availability'
                    : 'Your everyday essentials for writing, studying, and staying organized.'" />

            <div class="row mb-0 mb-md-4 gy-3">
                <ProductSearchBar v-if="!user.isAdmin" 
                    @on-product-search-name="handleProductSearchName" 
                    @on-product-search-price="handleProductSearchPrice"
                    @on-refresh-search="handleRefreshProducts"
                    :is-searching="isSearching" />
            </div>

            <div v-if="isInitialLoading" class="text-center py-5 my-5">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading cart...</span>
                </div>
            </div>

        </div>
        
        <ProductsAdmin :products="products.data" v-if="user.isAdmin && !isInitialLoading" @on-refresh-products="handleRefreshProducts" />

        <ProductsCatalog :products="products.data" v-else />

    </div>

</template>

<style scoped>
.banner {
    background: #F6F0E7;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
    color: #2E2A28;
}
</style>