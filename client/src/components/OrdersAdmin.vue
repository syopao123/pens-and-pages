<script setup>
import { computed } from 'vue';
import PageBanner from './PageBanner.vue';
import { useCartStore } from '@/stores/cart.js';

const cartStore = useCartStore();

const props = defineProps({
    orders: Array
})

const ordersCount = computed(() => {
    return props.orders.length;
})

const pendingOrdersCount = computed(() => {
    return props.orders.filter(o => o.status === 'Pending').length;
});

const formattedDate = (rawDate) => {
  const date = new Date(rawDate);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  }).format(date);
};
</script>

<template>
    <div class="container-fluid min-vh-100 py-5">
        <div class="container">
            <PageBanner :page-name="'All Orders'" :page-description="'Manage and track all orders from a single dashboard.'" />
        </div>
        <div class="container">
            <div class="table-responsive rounded-3 shadow-sm">
                <table class="table table-borderless table-hover">
                    <thead class="table-light small">
                        <tr>
                            <th colspan="5" style="background: #E7E2D9;">
                                <div class="row ms-1 text-uppercase small">
                                    <div class="col">
                                        <div class="row orders-info-counter">
                                            <div class="col-auto">
                                                <span class="d-flex gap-2 align-items-center">
                                                    <i class="bi bi-circle-fill small products-count"></i>
                                                    <span>{{ ordersCount }} orders</span>
                                                </span>
                                            </div>
                                            <div class="col-auto">
                                                <span class="d-flex gap-2 align-items-center">
                                                    <i class="bi bi-circle-fill small text-warning"></i>
                                                    <span>{{ pendingOrdersCount }} pending</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>Order ID</th>
                            <th>User ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders"
                            :key="order._id">
                            <td>{{ order._id }}</td>
                            <td>{{ order.userId }}</td>
                            <td>{{ formattedDate(order.orderedOn) }}</td>
                            <td>{{ cartStore.formatItemPrice(order.totalPrice) }}</td>
                            <td>
                                <span class="badge status text-uppercase px-3 py-2 small">
                                    <i class="bi bi-circle-fill small"></i>
                                    <span class="ps-2">{{ order.status }}</span>
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
.orders-info-counter {
    width: fit-content;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    border-radius: 5px;
    background: #CBC6BD;
}

.status {
    border-radius: 2px;
    background: #FFEED8;
    color: black;
    font-weight: 500;
    letter-spacing: 0.1em;
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
</style>