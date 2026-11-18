<script setup>
import { useGlobalStore } from '@/stores/global';

const { user } = useGlobalStore();

</script>

<template>

    <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-bottom d-block d-md-none">
        <div class="container-fluid justify-content-center">
            <div class="d-flex flex-row flex-grow-1 flex-nowrap text-center justify-content-evenly">
                <router-link :to="{ name: 'Products' }" class="nav-link">
                    <i class="bi bi-bag-fill fs-3"></i><br />
                    <span class="small">Products</span>
                </router-link>
                <router-link :to="{ name: 'Cart' }" class="nav-link" v-if="user.token && !user.isAdmin">
                    <i class="bi bi-cart-fill fs-3"></i><br />
                    <span class="small">Cart</span>
                </router-link>
                <router-link :to="{ name: 'Orders' }" class="nav-link" v-if="user.token">
                    <i class="bi bi-receipt-cutoff fs-3"></i><br/>
                    <span class="small">Orders</span>
                </router-link>
                <router-link :to="{ name: 'Login' }" class="nav-link" v-if="!user.token">
                    <i class="bi bi-person-circle fs-3"></i><br />
                    <span class="small">Sign In</span>
                </router-link>
                <router-link :to="{ name: 'Profile' }" class="nav-link" v-if="user.token">
                    <i class="bi bi-person-circle fs-3"></i><br/>
                    <span class="small">Profile</span>
                </router-link>
            </div>
        </div>
    </nav>

</template>

<style scoped>
.navbar {
    background: #2E2A28 !important;
    color: #C8B496;
    border-top: 1px solid rgba(200, 180, 150, 0.459);
}

.nav-link {
    border-radius: 30px;
    padding: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.nav-link:active {
    background: gray;
}
</style>