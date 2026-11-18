<script setup>
import { computed } from 'vue';

const props = defineProps({
    product: Object,
})

const formattedPrice = computed(() => {
    return props.product.price.toLocaleString('en-US');
});

</script>

<template>
    <div class="col mb-0 mb-md-1">
        <div class="card border-0 rounded-1 shadow-sm">
            <img :src="`https://picsum.photos/seed/${product._id}/200/200`" :alt="product.name" class="card-img rounded-top-1 rounded-bottom-0">
            <div class="card-body">
                <p class="product-name fs-4">{{ product.name }}</p>
                <p class="small text-truncate">{{ product.description }}</p>
            </div>
            <div class="card-footer bg-transparent border-0">
                <div class="row row-cols-2" v-if="product.isActive">
                    <div class="col">
                        <p class="product-price fs-4">
                            ₱{{ formattedPrice }}
                        </p>
                    </div>
                    <div class="col text-end">
                        <router-link :to="{ name: 'ProductDetail', params: { id: product._id } }" type="button" class="btn product-details-btn px-3 px-xl-4">
                            Details
                        </router-link>
                    </div>
                </div>
                <div class="row justify-content-center" v-else>
                    <div class="col-auto product-unavailable rounded-1 mb-2 py-1 px-3">
                        <small class="fw-lighter">product is not available</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-unavailable {
    text-transform: uppercase;
    background: rgb(252, 176, 176);
    color: black;
}

.card {
    height: 100%;
}

.product-name,
.product-price {
    font-family: 'Playfair Display', 'sans-serif';
    font-weight: 500;
}

.product-details-btn {
    border: none;
    border-radius: 2px;
    background: #f3e2c6;
    color: black;
}

.product-details-btn:hover {
    background: #cebc9e;
}

.product-details-btn:active {
    background: #c4b398;
}
</style>