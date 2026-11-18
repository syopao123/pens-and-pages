<script setup>
import api from '@/api';
import { Notyf } from 'notyf';
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import ProductSearchBar from './ProductSearchBar.vue';
import { useCartStore } from '@/stores/cart.js';

const cartStore = useCartStore();

const router = useRouter();

const notyf = new Notyf();

const searchProductResults = reactive({ data: [] });

const isLoading = ref(false);

const emit = defineEmits(['onRefreshProducts']);

const productsCount = computed(() => {
    return props.products.length;
})

const activeProductsCount = computed(() => {
    return props.products.filter(p => p.isActive).length;
})

const archivedProductsCount = computed(() => {
    return props.products.filter(p => !p.isActive).length;
})

function handleEdit(productId) {
    router.push({ name: 'EditProduct', params: { id: productId }});
}

async function handleArchive(productId) {
    try {
        isLoading.value = true;
        let response = await api.patch(`/products/${productId}/archive`);

        notyf.success(response.data.message);
        emit('onRefreshProducts');
        isLoading.value = false;

    } catch (e) {

        notyf.error(e.response.data.error);
        isLoading.value = false;

    }
}

async function handleActivate(productId) {
    try {
        isLoading.value = true;
        let response = await api.patch(`/products/${productId}/activate`);

        notyf.success(response.data.message);
        emit('onRefreshProducts');
        isLoading.value = false;

    } catch (e) {        
        notyf.error(e.response.data.error);
        isLoading.value = false;
    }
}

async function handleProductSearchName(productName) {

    if (isLoading.value) return;

    if (productName.length === 0 || productName === '') {
        searchProductResults.data = [];
        emit('onRefreshProducts');
        return;
    }

    try {

        isLoading.value = true;

        let response = await api.post('/products/search-by-name', {
            name: productName
        })

        if (response.data.length > 0) {
            searchProductResults.data = response.data;
        } else {
            searchProductResults.data = [];
            emit('onRefreshProducts');
            notyf.error("No Results Found.")
        }

    } catch {
        notyf.error("Failed to search product name.");
    } finally {
        isLoading.value = false;
    }
}

async function handleProductSearchPrice(min, max) {
    try {

        isLoading.value = true;

        let response = await api.post('/products/search-by-price', {
            minPrice: min,
            maxPrice: max
        });

        if (response.data.length > 0) {
            searchProductResults.data = response.data;
        } else {
            searchProductResults.data = []
            emit('onRefreshProducts');
            notyf.error("No Results Found.");
        }

    } catch (e) {
        notyf.error("Failed to search by product price.");
    } finally {
        isLoading.value = false;
    }
}

function handleRefreshSearch() {
    searchProductResults.data = [];
    emit('onRefreshProducts');
}

const props = defineProps({
    products: Array
});

</script>

<template>
    <div class="container-fluid min-vh-100">
        <div class="container p-0">

            <div class="row text-end mb-3">
                <div class="col">
                    <router-link :to="{ name: 'AddProduct' }" class="btn px-4 py-3 add-product-btn">
                        <span class="d-flex gap-2">
                            <i class="bi bi-plus-lg"></i>
                            <span>Add Product</span>
                        </span>
                    </router-link>
                </div>
            </div>
            
            <div class="table-responsive rounded-3 shadow-sm">
                <table class="table table-borderless table-hover">
                    <thead class="table-light small">
                        <tr>
                            <th colspan="6" style="background: #E7E2D9;">
                                <div class="row ms-1 text-uppercase small">

                                    <!-- Products Count -->
                                    <div class="col">
                                        <div class="row products-info-counter">
                                            <div class="col-auto">
                                                <span class="d-flex gap-2 align-items-center">
                                                    <i class="bi bi-circle-fill small products-count"></i>
                                                    <span>{{ productsCount }} products</span>
                                                </span>
                                            </div>
                                            <div class="col-auto">
                                                <span class="d-flex gap-2 align-items-center">
                                                    <i class="bi bi-circle-fill small text-success"></i>
                                                    <span>{{ activeProductsCount }} available</span>
                                                </span>
                                            </div>
                                            <div class="col-auto">
                                                <span class="d-flex gap-2 align-items-center">
                                                    <i class="bi bi-circle-fill small text-danger"></i>
                                                    <span>{{ archivedProductsCount }} unavailable</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Search Bar -->
                                    <div class="col">
                                        <div class="row mb-0 mb-md-4 justify-content-start">
                                            <ProductSearchBar 
                                                @on-product-search-name="handleProductSearchName" 
                                                @on-product-search-price="handleProductSearchPrice"
                                                @on-refresh-search="handleRefreshSearch"
                                                :is-searching="isLoading" />
                                        </div>
                                    </div>

                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in (searchProductResults.data.length > 0 ? searchProductResults.data : products)"
                            :class="!product.isActive ? 'disabled-product' : ''" 
                            :key="product._id">
                            <td>{{ product._id }}</td>
                            <td>{{ product.name}}</td>
                            <td>{{ product.description }}</td>
                            <td>{{ cartStore.formatItemPrice(product.price) }}</td>
                            <td>
                                <span class="badge available-status text-uppercase px-3 py-2 small">
                                    <i class="bi bi-circle-fill small" :class="product.isActive? 'bi-active' : 'bi-not-active'"></i>
                                    <span class="ps-2">{{ product.isActive ? 'available' : 'unavailable' }}</span>
                                </span>
                            </td>
                            <td>
                                <span class="text-nowrap d-flex gap-2">
                                    <button @click="handleEdit(product._id)" :disabled="isLoading" class="btn btn-primary btn-sm px-3 py-2 text-uppercase">
                                        edit
                                    </button>
                                    <button v-if="product.isActive" @click="handleArchive(product._id)" :disabled="isLoading" class="btn btn-danger btn-sm px-3 py-2 text-uppercase">
                                        archive
                                    </button>
                                    <button v-else @click="handleActivate(product._id)" :disabled="isLoading" class="btn btn-info btn-sm px-3 py-2 text-uppercase">
                                        activate
                                    </button>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.products-info-counter {
    width: fit-content;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    border-radius: 5px;
    background: #CBC6BD;
}

.products-count {
    color: #615E57;
}

.bi-active {
    color: #FFFFFF;
}

.bi-not-active {
    color: #615E57;
}

.available-status {
    border-radius: 2px;
    background: #FFEED8;
    color: black;
    font-weight: 500;
    letter-spacing: 0.1em;
}

.add-product-btn {
    background: #F5DFC0;
    color: black;
    font-weight: 400 !important;
}

.add-product-btn:hover {
    background: #D8C4A5;
}

.add-product-btn:active {
    background: #F5DFC0;
}

.table-responsive {
    border: 1px solid rgb(221, 221, 221);
    background: white;
}

th {
    background: #CBC6BD;
    font-weight: 500;
    text-transform: uppercase;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

th, td {
    padding-left: 20px;
    padding-right: 20px;
}

td {
    padding-top: 2rem;
    padding-bottom: 2rem;
}

tr {
    border-bottom: 1px solid rgb(219, 219, 219);
}

.disabled-product td {
    background: #eeeeee;
}

.btn {
    border: none;
    border-radius: 2px;
    color: black;
    font-weight: 500;    
}

.btn-primary {
    background: #d8d0ca;
}

.btn-danger {
    background: #FFDBD1;
}

.btn-info {
    background: #FFEED8;
}

.btn-primary:hover {
    background: #c9c1bb;
}

.btn-danger:hover {
    background: #ebcac0;
}

.btn-info:hover {
    background: #ddcebb;
}
</style>