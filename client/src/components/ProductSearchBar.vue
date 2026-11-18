<script setup>
import { Notyf } from 'notyf';
import { ref } from 'vue';

const notyf = new Notyf();

const emit = defineEmits(['onProductSearchName', 'onProductSearchPrice', 'onRefreshSearch']);

const productName = ref('');
const minPrice = ref(null);
const maxPrice = ref(null);

async function handleProductSearchName() {
    minPrice.value = null;
    maxPrice.value = null;
    emit('onProductSearchName', productName.value);
}

async function handleProductSearchPrice() {
    productName.value = '';
    minPrice.value = minPrice.value <= 0 ? 0 : minPrice.value;
    maxPrice.value = maxPrice.value <= 0 ? 0 : maxPrice.value;

    if (minPrice.value > maxPrice.value) {
        notyf.error('Minimum price cannot be greater than maximum price.');
        return;
    }

    emit('onProductSearchPrice', minPrice.value, maxPrice.value);
}

function handleRefreshSearch() {
    productName.value = '';
    minPrice.value = null;
    maxPrice.value = null;
    emit('onRefreshSearch');
}

defineProps({
    isSearching: Boolean
});

</script>
<template>
    <div class="col-12 col-md-6">
        <form @submit.prevent="handleProductSearchName">
            <div class="input-group">
                <span class="input-group-text bg-white border-end-0">
                    <i class="bi bi-search"></i>
                </span>
                <input v-model="productName" :disabled="isSearching" type="text" name="searchProduct" class="form-control search-bar" placeholder="Search product name...">
            </div>
        </form>
    </div>

    <div class="col-10 col-md-5">

        <form @submit.prevent="handleProductSearchPrice">
            <div class="input-group">
                <span class="input-group-text rounded-0 bg-white pe-0">₱</span>
                <input type="number" class="form-control border-0" placeholder="Min" v-model="minPrice" :disabled="isSearching">
                <span class="input-group-text rounded-0 bg-white px-0"> - </span>
                <input type="number" class="form-control border-0" placeholder="Max" v-model="maxPrice" :disabled="isSearching">
                <button type="submit" class="btn btn-primary rounded-0">Apply</button>
            </div>
        </form>

    </div>

    <div class="col-2 col-md-1 ps-0">

        <button @click="handleRefreshSearch" type="button" class="btn btn-primary refresh-btn rounded-0">
            <i class="bi bi-arrow-clockwise"></i>
        </button>

    </div>

</template>

<style scoped>

input:disabled {
    background: white;
}

.btn-primary {
    border: none;
    background: #f1dbbc;
    color: black;
    font-weight: 400 !important;
}

.btn-primary:hover {
    background: #D8C4A5;
}

.input-group, .refresh-btn {
    border: 1px solid #d6c8c073;
}

.search-bar,
.input-group-text {
    border: none;
    border-left: none;
    border-radius: 2px;
}

.search-bar:focus,
.search-bar:active {
    border-color: transparent;
    box-shadow: none;
}

.spinner-border {
    color: #2E2A28;
}
</style>