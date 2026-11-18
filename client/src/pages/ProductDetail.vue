<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import { Notyf } from 'notyf';
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';

const route = useRoute();
const router = useRouter();
const { user } = useGlobalStore();
const notyf = new Notyf();

const product = ref(null);
const isLoading = ref(true);
const quantity = ref(1);
const isAdding = ref(false);

const cartStore = useCartStore();
const productStore = useProductStore();

const getProductDetails = async () => {
  try {
    isLoading.value = true;
    product.value = await productStore.getProductDetails(route.params.id);

  } catch (e) {

    notyf.error("Something went wrong while fetching product details.");
    router.push({ name: 'Products' });

  } finally {
    isLoading.value = false;
  }
}

const addToCart = async() => {
  try {

    isAdding.value = true;

    if (!product.value.isActive) {
      notyf.error('Product is no longer available.');
      return;
    }

    let message = await cartStore.addToCart(product.value._id, quantity.value, product.value.price);
    notyf.success(message);

  } catch (e) {
    notyf.error("Something went wrong while adding product to cart.");
  } finally {
    isAdding.value = false;
  }
}

onBeforeMount(async() => {
  await getProductDetails();
});

onMounted(async() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<template>

  <div class="container-fluid min-vh-100">
    <div class="container my-5 py-0 py-md-5">

      <div class="row mb-3">
        <div class="col">
          <router-link :to="{ name: 'Products' }" class="text-gold small text-decoration-none d-inline-flex align-items-center mb-3">
            <i class="bi bi-arrow-left me-2"></i> Back to Products
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-5 my-5">
        <div class="spinner-border text-gold" role="status">
          <span class="visually-hidden">Loading details...</span>
        </div>
        <p class="text-light-muted mt-3 small">Retrieving product details...</p>
      </div>

      <div class="row gy-4" v-else-if="product">

        <!-- Image Column -->
        <div class="col-12 col-md-6">

          <div class="row">
            <div class="col">
              <div class="product-image-wrapper p-2 bg-dark-card rounded-4 text-center">
                <img
                  :src="`https://picsum.photos/seed/${product._id}/200/300`"
                  :alt="product.name"
                  class="img-fluid rounded-3 detail-image" />
              </div>
            </div>
          </div>

        </div>

        <!-- Product Info Column -->
        <div class="col-12 col-md-6 text-center text-md-start ps-0 ps-md-4">

          <div class="row">
            <div class="col">
              <h1 class="brand-title text-gold display-6 fw-bold mb-2">{{ product.name }}</h1>
              <p class="fs-3 text-gold fw-semibold mb-3 price">{{ cartStore.formatItemPrice(product.price) }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <p class="text-light-muted lh-lg mb-4">
                {{ product.description }}
              </p>
            </div>
          </div>

          <div class="row px-2 px-md-0 justify-content-center">
            <!-- Quantity & Add to Cart Controls -->
            <div v-if="user.token && !user.isAdmin" class="d-flex flex-wrap align-items-center gap-3 mb-4">
              <div class="input-group quantity-selector" style="max-width: 130px;">
                <button
                  type="button"
                  class="btn btn-outline-gold"
                  :disabled="quantity <= 1"
                  @click="quantity--">
                  <i class="bi bi-dash"></i>
                </button>
                <span class="form-control bg-dark-input text-gold text-center fw-semibold border-gold-subtle">
                  {{ quantity }}
                </span>
                <button
                  type="button"
                  class="btn btn-outline-gold"
                  @click="quantity++">
                  <i class="bi bi-plus"></i>
                </button>
              </div>

              <button
                type="button"
                class="btn btn-gold flex-grow-1 py-2.5 fw-semibold text-uppercase d-flex align-items-center justify-content-center gap-2"
                :disabled="isAdding || !product.isActive"
                @click="addToCart()">
                <i class="bi bi-bag-plus fs-5"></i>
                <span>{{ isAdding ? 'Adding...' : 'Add to Cart' }}</span>
              </button>
            </div>

            <!-- Please Login Message -->
            <div v-else class="row justify-content-center py-4">
              <div class="col-auto">
                <div class="card p-4 py-2 rounded-1 border-1 shadow-sm border-light-subtle login-card">
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col text-center">
                        <p>Please login to add this item to cart</p>
                      </div>
                    </div>
                    <div class="row gap-2 justify-content-center">
                      <div class="col-auto p-0">
                        <router-link :to="{ name: 'Login' }" class="btn login-btn">Login</router-link>
                      </div>
                      <div class="col-auto p-0">
                        <router-link :to="{ name: 'Register' }" class="btn register-btn">Create Account</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Availability Status Badge -->
            <div class="border-top border-secondary border-opacity-25 pt-3">
              <span class="small text-light-muted me-2">Status:</span>
              <span :class="product.isActive ? 'badge bg-success-subtle text-success' : 'badge bg-danger-subtle text-danger'">
                {{ product.isActive ? 'In Stock / Available' : 'Currently Unavailable' }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="product-detail-page min-vh-100 pb-5">
  </div>
</template>

<style scoped>
.price {
  font-family: 'Playfair Display', 'sans-serif';
}

.login-btn, .register-btn {
  padding: 10px;
}

.login-btn {
  padding-left: 80px;
  padding-right: 80px;
  background: #2E2A28;
  color: #ece5df;
}

.login-btn:hover {
  background: #524a47;
}

.register-btn {
  padding-left: 30px;
  padding-right: 30px;
  background: #f1e2ca;
  color: black;
}

.register-btn:hover {
  background: #d6c9b3;
}

.product-detail-page {
  color: black;
}

.bg-dark-card {
  background-color: #2E2A28;
  border: 1px solid rgba(200, 180, 150, 0.2);
}

.brand-title {
  font-family: 'Playfair Display', serif;
}

.text-gold, .text-light-muted {
  color: #2E2A28 !important;
}

.text-light-muted {
  color: #b3a89f;
}

.border-gold-subtle {
  border-color: rgba(200, 180, 150, 0.25) !important;
}

.detail-image {
  max-height: 420px;
  width: 100%;
  object-fit: cover;
}

.btn-gold {
  background-color: #ebd9be;
  color: #2E2A28;
  border: none;
  border-radius: 4px;
  transition: all 0.25s ease;
}

.btn-gold:hover:not(:disabled) {
  background-color: #ba9f7d;
  color: #2E2A28;
}

.btn-outline-gold {
  background: #2E2A28;
  color: #C8B496;
  border-color: rgba(200, 180, 150, 0.4);
}

.btn-outline-gold:hover:not(:disabled) {
  background-color: #C8B496;
  color: #2E2A28;
}
</style>
