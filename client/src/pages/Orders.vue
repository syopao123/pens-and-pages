<script setup>
import OrdersAdmin from '@/components/OrdersAdmin.vue';
import OrdersUser from '@/components/OrdersUser.vue';
import { useGlobalStore } from '@/stores/global';
import { useOrdersStore } from '@/stores/orders';
import { Notyf } from 'notyf';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const { user } = useGlobalStore();
const ordersStore = useOrdersStore();
const router = useRouter();

const notyf = new Notyf();

const orders = reactive({ data: [] });

const isLoading = ref(false);

async function getOrders() {

    try {
        isLoading.value = true;
        let data = user.isAdmin ? await ordersStore.fetchAllOrders() : await ordersStore.fetchMyOrders();
        orders.data = data;
    } catch (e) {
        notyf.error(e.response.data.error);
    } finally {
        isLoading.value = false;
    }
}

onBeforeMount(async() => {
    if (!user.token) {
        router.push({ name: 'Home' });
    }
    await getOrders();
})

onMounted(() => {
    window.scrollTo({ top: 0, behavior: 'smooth'});
})

</script>

<template>

    <div class="container-fluid min-vh-100 py-5" v-if="isLoading">
        <div v-if="isLoading" class="text-center py-5 my-5">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading cart...</span>
            </div>
        </div>
    </div>

    <OrdersAdmin v-if="user.isAdmin" :orders="orders.data" />

    <OrdersUser v-else :orders="orders.data" />
    
</template>

<style scoped>
.spinner-border {
    width: 3rem;
    height: 3rem;
}
</style>