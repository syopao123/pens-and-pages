<script setup>
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

defineProps({
    product: Object
})
</script>

<template>
    <router-link :to="{ name: 'ProductDetail', params: { id: product.productId }}" class="text-decoration-none product-row">
        <div class="row mb-3 border-bottom border-light-subtle p-0 p-md-3 pb-4">
            <div class="col-auto p-0">
                <img :src="`https://picsum.photos/seed/${product._id}/200/300`" :alt="product.name" class="item-thumbnail img-fluid rounded-2">
            </div>
            <div class="col">
                <p class="mb-0 fw-bold product-name">
                    {{ product.name ?? 'Loading...' }}
                </p>
                <p>Qty: {{ product.quantity }}</p>
            </div>
            <div class="col-12 col-md-auto text-end">
                <p class="price fs-4">{{ cartStore.formatItemPrice(product.subtotal) }}</p>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
.product-row {
    color: #2E2A28 !important;
}

.row:hover {
    background: rgb(241, 241, 241);
}

.product-name {
    font-family: 'Playfair Display', 'sans-serif';
}

.price {
    font-family: 'Playfair Display', 'sans-serif';
}

.item-thumbnail {
  aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid rgba(200, 180, 150, 0.2);
  width: 5rem;
}
</style>