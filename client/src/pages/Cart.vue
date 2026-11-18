<script setup>
import { onBeforeMount, ref, onMounted } from 'vue';
import { useGlobalStore } from '@/stores/global';
import { useRouter } from 'vue-router';
import PageBanner from '@/components/PageBanner.vue';
import { useCartStore } from '@/stores/cart';
import CartItem from '@/components/CartItem.vue';
import CartSummaryCard from '@/components/CartSummaryCard.vue';

const { user } = useGlobalStore();
const cartStore = useCartStore();

const router = useRouter();

const isLoading = ref(true);

const fetchCart = async () => {
  isLoading.value = true;
  await cartStore.fetchUserCart();
  isLoading.value = false;
}

onBeforeMount(async () => {
  if (!user.token || user.isAdmin) {
    router.push({ name: 'Login' });
    return;
  }
  await fetchCart();
  await cartStore.updateCartCount();
});

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})
</script>

<template>
  <div class="min-vh-100 pb-5">
    <div class="container py-5" v-if="user.token && !user.isAdmin">
      <PageBanner
        pageName="Your Shopping Cart"
        pageDescription="Review your chosen stationery items, fine writing tools, and notebooks before checkout."
        v-if="cartStore.getCartCount > 0" />

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-5 my-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading cart...</span>
        </div>
        <p class="text-light-muted mt-3 small">Updating your cart items list...</p>
      </div>

      <!-- Empty Cart State -->
      <div v-else-if="cartStore.getCartCount === 0" class="text-center py-5 my-5">
        <div class="empty-cart-icon mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle">
          <i class="bi bi-bag-x fs-1 text-gold"></i>
        </div>
        <h3 class="brand-title h4 mb-2">Your Cart is Empty</h3>
        <p class="text-light-muted small max-w-msg mx-auto mb-4">
          Looks like you haven't added any stationery or writing essentials yet.
        </p>
        <router-link :to="{ name: 'Products' }" class="btn btn-gold px-4 py-2.5 fw-semibold text-uppercase">
          Explore Products
        </router-link>
      </div>

      <!-- Active Cart Grid -->
      <div v-else class="row g-4">
        <!-- Cart Items List -->
        <div class="col-12 col-lg-8">
          <div class="card bg-dark-card border-light-subtle shadow-sm rounded-2 overflow-hidden">
            <div class="card-header bg-transparent border-bottom border-secondary border-opacity-25 py-3 px-4">
              <h2 class="h4 brand-title mb-0">Cart Items ({{ cartStore.getCartCount }})</h2>
            </div>

            <div class="card-body p-0">
              <div class="cart-item-row p-3 p-md-4 border-bottom border-secondary border-opacity-25">
                <CartItem v-for="item in cartStore.getCart.cartItems" 
                    :item="item" 
                    :key="item.productId" />
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="col-12 col-lg-4">
          <CartSummaryCard v-if="cartStore.getCartCount > 0"/>
        </div>
      </div>
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

.btn-outline-gold {
  color: #C8B496;
  border-color: rgba(200, 180, 150, 0.4);
}

.btn-outline-gold:hover:not(:disabled) {
  background-color: #C8B496;
  color: #2E2A28;
}

.text-gold {
  color: #ecdbc1;
}

.empty-cart-icon {
  width: 80px;
  height: 80px;
  background-color: #2E2A28;
  border: 1px solid rgba(200, 180, 150, 0.2);
}

.max-w-msg {
  max-width: 380px;
}
</style>