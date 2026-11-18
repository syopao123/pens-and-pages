<script setup>
import { useCartStore } from '@/stores/cart';
import { Notyf } from 'notyf';
import { ref, watch } from 'vue';

const cartStore = useCartStore();

const notyf = new Notyf();

const props = defineProps({
    isCartUpdating: Boolean
})

const checkout = async() => {
    try {

        let message = await cartStore.checkout();
        notyf.success(message);

    } catch (e) {
        console.log(e);
        notyf.error('Something went wrong while checking out.');
    }
}

const clearCart = async() => {
    try {

        let message = await cartStore.clearCart();
        notyf.success(message);

    } catch (e) {
        notyf.error('Something went wrong while clearing cart.');
    }
}

</script>

<template>
    <div class="card border-light-subtle shadow-sm rounded-2 p-4">
        <h3 class="h4 brand-title mb-3 border-bottom border-secondary border-opacity-25 pb-3">
            Order Summary
        </h3>

        <div class="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span class="fw-semibold">{{ cartStore.formatItemPrice(cartStore.cart.totalPrice) }}</span>
        </div>

        <div class="d-flex justify-content-between mb-3">
            <span>Estimated Shipping</span>
            <span class="fw-light small">Calculated at checkout</span>
        </div>

        <div class="border-top border-secondary border-opacity-25 pt-3 mb-4 d-flex justify-content-between align-items-center">
            <span class="fw-semibold fs-5">Total</span>
            <span class="brand-title fs-4 fw-bold">{{ cartStore.formatItemPrice(cartStore.cart.totalPrice) }}</span>
        </div>

        <button
            type="button"
            class="btn btn-gold w-100 py-3 fw-semibold text-uppercase d-flex align-items-center justify-content-center gap-2"
            :disabled="cartStore.isCartUpdating"
            @click="checkout()">
            <span>Proceed to Checkout</span>
            <i class="bi bi-arrow-right"></i>
        </button>

        <button
            type="button"
            class="btn btn-sm btn-danger w-100 py-2 text-uppercase mt-3"
            :disabled="cartStore.isCartUpdating"
            @click="clearCart()">
            Clear Cart
        </button>
    </div>
</template>

<style scoped>
.btn-gold {
  background-color: #f5e3ca;
  color: #2E2A28;
  border: none;
  border-radius: 4px;
  transition: all 0.25s ease;
}

.btn-gold:hover {
  background-color: #ba9f7d;
  color: #2E2A28;
}

.btn-outline-gold {
  color: #C8B496;
  border-color: rgba(200, 180, 150, 0.4);
}

.btn-outline-gold:hover:not(:disabled) {
  background-color: #C8B496;
  color: #2E2A28;
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
</style>