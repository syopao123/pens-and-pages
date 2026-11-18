<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import OrderProductDetail from './OrderProductDetail.vue';
import { Notyf } from 'notyf';
import { useProductStore } from '@/stores/product.js';

const productStore = useProductStore();

const notyf = new Notyf();

async function getProductDetails() {
    try {

        props.order.productsOrdered.forEach(async (product, index) => {
            props.order.productsOrdered[index].name = await productStore.getProductName(product.productId);
        })

    } catch {

        notyf.error("Something went wrong while fetching product name.");

    }
}

const orderDate = computed(() => {
  const date = new Date(props.order.orderedOn);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  }).format(date);
});

const props = defineProps({
    order: Object
})

onBeforeMount(async() => {
    await getProductDetails();
})

</script>

<template>
    <div class="col-12">
        <div class="card border-light-subtle shadow-sm p-3 p-md-4">
            <div class="card-title border-bottom py-3">

                <div class="row small align-items-center my-auto gap-2">
                    <div class="col-auto border-end">
                        <p class="mb-1"><small class="order-label">order date</small></p>
                        <p class="fs-6 order-date fw-normal">{{ orderDate }}</p>
                    </div>
                    <div class="col">
                        <p class="mb-1"><small class="order-label">order total</small></p>
                        <p class="fs-5 fw-bold order-price">₱{{ order.totalPrice }}</p>
                    </div>
                    <div class="col-12 col-md-auto">
                        <span class="order-status px-3 py-1 rounded-1 d-flex align-items-center gap-2">
                            <i class="bi bi-circle-fill small"></i>
                            {{ order.status }}
                        </span>
                    </div>
                </div>

            </div>
            <div class="card-body">

                <OrderProductDetail v-for="product in order.productsOrdered" :product="product" :key="product._id"/>

            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    color: #2E2A28;
}

small {
    text-transform: uppercase;
}

.order-label {
    font-weight: 500;
}

.order-price {
    font-family: 'Playfair Display', 'sans-serif';
}

.order-status {
    background: #dfc9a9;
    font-size: 0.8rem;
    width: fit-content !important;
    text-transform: uppercase;
}
</style>