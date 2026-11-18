<script setup>
import PageBanner from './PageBanner.vue';
import OrderCard from './OrderCard.vue';

defineProps({
    orders: Array
})

</script>

<template>

    <div class="container-fluid min-vh-100 py-5" v-if="orders.length > 0">
        <div class="container">
            <PageBanner :page-name="'My Orders'"
                :page-description="'Review past dispatches and view shipment tracking.'" />
        </div>

        <div class="container">

            <div class="row mb-3 gy-4">
                <OrderCard v-for="order in orders" :order="order" :key="order._id" />
            </div>

        </div>
    </div>

    <!-- Empty Orders State -->
    <div class="container min-vh-100 text-center py-5" v-else>
        <div class="py-5 my-5">
            <div class="empty-cart-icon mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle">
                <i class="bi bi-receipt-cutoff fs-1 px-3 py-2 rounded-circle"></i>
            </div>
            <h3 class="brand-title h4 mb-2">You have no orders yet.</h3>
            <p class="text-light-muted small max-w-msg mx-auto mb-4">
                Looks like you haven't ordered any stationery or writing essentials yet.
            </p>
            <router-link :to="{ name: 'Products' }" class="btn btn-gold px-4 py-2.5 fw-semibold text-uppercase">
                Explore Products
            </router-link>
        </div>
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

i {
    background: #302b27;
    color: #ecdbc1;
    border: 1px solid rgba(200, 180, 150, 0.2);
}

.container {
    color: #302b27;
}

h3 {
    font-family: 'Playfair Display', 'sans-serif';
}
</style>