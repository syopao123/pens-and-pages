<script setup>
import { useCartStore } from '@/stores/cart';
import { useProductStore } from '@/stores/product';
import { Notyf } from 'notyf';
import { defineProps, onBeforeMount, ref } from 'vue';

const cartStore = useCartStore();
const productStore = useProductStore();

const notyf = new Notyf();

const itemName = ref('');

const props = defineProps({
    item: Object,
    isCartUpdating: Boolean
})

const updateCartQuantity = async(productId, quantity) => {
    try {

        let message = await cartStore.updateCartQuantity(productId, quantity);
        notyf.success(message);

    } catch (e) {
        notyf.error('Something went wrong while updating cart quantity.');
    }
}

const removeFromCart = async(productId) => {
    try {

        let message = await cartStore.removeFromCart(productId);
        notyf.success(message);

    } catch (e) {
        notyf.error('Something went wrong while removing item from cart.');
    }
}

onBeforeMount(async() => {
    itemName.value = await productStore.getProductName(props.item.productId);
})

</script>

<template>

    <div class="row align-items-center g-3 p-3">
        <!-- Thumbnail -->
        <div class="col-4 col-sm-3 col-md-2">
            <img
                :src="`https://picsum.photos/seed/${item.productId}/200/300`"
                :alt="itemName"
                class="img-fluid rounded-3 item-thumbnail" />
        </div>

        <!-- Details -->
        <div class="col-8 col-sm-4 col-md-4">
            <p>
                <router-link :to="{ name: 'ProductDetail', params: { id: item.productId } }" class="router-link">
                    {{ itemName }}
                </router-link>
            </p>
            <p class="small mb-0">{{ cartStore.formatItemPrice(item.subtotal / item.quantity) }} each</p>
        </div>

        <!-- Quantity Controls -->
        <div class="col-6 col-sm-3 col-md-3">
            <div class="input-group input-group-sm quantity-control z-0">
                <button
                    type="button"
                    class="btn border-secondary-subtle"
                    :class="item.quantity <= 1 ? 'disable-quantity' : ''"
                    :disabled="item.quantity <= 1 || cartStore.isCartUpdating"
                    @click="updateCartQuantity(item.productId, item.quantity - 1)">
                    <i class="bi bi-dash"></i>
                </button>

                <span class="form-control text-center fw-semibold border-secondary-subtle">
                    {{ cartStore.getCartItemQuantity(item.productId) }}
                </span>

                <button
                    type="button"
                    class="btn border-secondary-subtle"
                    :disabled="cartStore.isCartUpdating"
                    @click="updateCartQuantity(item.productId, item.quantity + 1)">
                    <i class="bi bi-plus"></i>
                </button>
            </div>
        </div>

        <!-- Item Total & Delete -->
        <div class="col-6 col-sm-2 col-md-3 text-end">
            <p class="fw-semibold mb-1 fs-6">
                {{ cartStore.formatItemPrice(item.subtotal) }}
            </p>
            <button
                type="button"
                class="btn btn-danger btn-sm p-2 px-3"
                :disabled="cartStore.isCartUpdating"
                @click="removeFromCart(item.productId)">
                <i class="bi bi-trash me-1"></i>
                <span>Remove</span>
            </button>
        </div>

    </div>

</template>

<style scoped>
.router-link {
  color: #2E2A28;
}

.router-link .row:hover {
  background: rgb(240, 240, 240) !important;
}

.text-gold {
  color: #ecdbc1;
}

.bg-dark-input {
  background-color: #231F1D;
}

.brand-title {
  font-family: 'Playfair Display', serif;
}

.item-thumbnail {
  aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid rgba(200, 180, 150, 0.2);
}

.btn-danger {
  font-weight: 400;
  border: none;
  border-radius: 2px;
  background: #fdbcbc;
  color: black;
}

.btn-danger:hover {
  background: #e4bdb0;
}

.disable-quantity {
    background: #2E2A28;
    color: white;
}
</style>