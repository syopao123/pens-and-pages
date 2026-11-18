<script setup>
import { useCartStore } from '@/stores/cart';
import { useGlobalStore } from '@/stores/global';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { user } = useGlobalStore();

const cartStore = useCartStore();

const router = useRouter();

onMounted(async() => {
    if (!user.isAdmin) {
        return;
    }
    await cartStore.updateCartCount();
});

</script>

<template>
    <nav class="navbar navbar-expand-lg sticky-top py-3 shadow-sm d-none d-md-block">
        <div class="container-fluid">
            <router-link :to="{ name: 'Home' }" class="navbar-brand ps-0 ps-md-5">pens&pages</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav text-center text-md-start mt-4 mt-lg-0 ms-auto ps-0 ps-md-5 pe-0 pe-md-5 gap-4">
                    <router-link :to="{ name: 'Home' }" class="nav-link" 
                        :class="router.currentRoute.value.name === 'Home' ? 'active-link' : ''" v-if="!user.isAdmin">Home</router-link>
                    <router-link :to="{ name: 'Products' }" class="nav-link"
                        :class="router.currentRoute.value.name ==='Products' ? 'active-link' : ''">Products</router-link>
                    <router-link :to="{ name: 'Cart' }" class="nav-link" v-if="user.token && !user.isAdmin"
                        :class="router.currentRoute.value.name === 'Cart' ? 'active-link' : ''">
                        <span class="d-flex gap-2 align-items-center">
                            <span>Cart</span>
                            <span
                                class="cart-badge bg-light text-body small"
                                v-if="cartStore.getCartCount > 0">
                                {{ cartStore.getCartCount }}
                            </span>
                        </span>
                    </router-link>
                    <router-link :to="{ name: 'Orders'}" class="nav-link" v-if="user.token"
                        :class="router.currentRoute.value.name ==='Orders' ? 'active-link' : ''">Orders</router-link>
                    <router-link :to="{ name: 'Profile' }" class="nav-link" v-if="user.token"
                        :class="router.currentRoute.value.name === 'Profile' ? 'active-link' : ''">Profile</router-link>
                    <router-link :to="{ name: 'Login' }" class="nav-link sign-in-link" v-if="!user.token">Sign In</router-link>
                    <router-link :to="{ name: 'Logout' }" class="nav-link" v-if="user.token">Logout</router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.cart-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 0.35rem;
    border-radius: 999px;
    line-height: 1;
}

.navbar {
    background: #2E2A28;
    border-bottom: 1px solid rgba(20, 11, 1, 0.5);
}

.navbar-brand {
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.45), -1px -1px 0px rgba(0, 0, 0, 0.22);
    font-size: 1.5rem;
}

.navbar-brand, .nav-link {
    color: #C8B496 !important;
    border-bottom: none;
    transition-property: border-bottom;
    transition-duration: 0.3s;
}

.nav-link:hover {
    color: white !important;
    border-bottom: 2px solid #F5DFC0;
}

.active-link {
    border-bottom: 2px solid #F5DFC0;

}

.sign-in-link {
    border-bottom: none !important;
    color: rgb(58, 58, 58) !important;
    border-radius: 5px;
    padding-left: 20px !important;
    padding-right: 20px !important;
    background: #e7d3b3;
    width: fit-content;
}

.sign-in-link:hover {
    background: #bead93;
    color: rgb(58, 58, 58) !important;
}

.navbar-brand {
    font-family: 'Playfair Display', sans-serif;
}

.navbar-toggler {
    background: #4b423f;
}
</style>