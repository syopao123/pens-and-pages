<script setup>
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { useGlobalStore } from '@/stores/global';
import { useRouter } from 'vue-router';
import { Notyf } from 'notyf';
import api from '@/api';
import { useCartStore } from '@/stores/cart';

const { user, getUserDetails } = useGlobalStore();

const cartStore = useCartStore();

const notyf = new Notyf();

const router = useRouter();

const isLoading = ref(false);

const isEnabled = ref(false);

const email = ref('');
const password = ref('');

const errors = reactive({ email: null, password: null });

async function handleSubmit() {

  try {

    isLoading.value = true;

    let response = await api.post('/users/login', {
      email: email.value,
      password: password.value
    })

    if (response.data.access) {
      notyf.success('Login successful');

      localStorage.setItem("token", response.data.access);
      await getUserDetails(response.data.access);

      await cartStore.fetchUserCart();
      await cartStore.updateCartCount();

      email.value = "";
      password.value = "";

      router.push({ name: 'Products' });
    }

  } catch (e) {
    notyf.error(e.response.data.error);
  } finally {
    isLoading.value = false;
  }
  
}

watch([email, password], (currentValue, oldValue) => {

  if (currentValue.every(input => input !== "")) {
    isEnabled.value = true;
  } else {
    isEnabled.value = false;
  }
})

watch([email], (value) => {
  errors.email = !value[0] ? 'Email address is required' : null;
})

watch([password], (value) => {
  errors.password = !value[0] ? 'Password is required' : null;
})

onBeforeMount(() => {

  if (user.token) {
    router.push({ name: 'Home' });
  }

})

onMounted(() => {
    window.scrollTo({ top: 0, behavior: 'smooth'});
})
</script>

<template>
  <div class="login-wrapper py-5 d-flex align-items-center min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <!-- Main Login Card -->
          <div class="card login-card shadow-sm border-0 rounded-4 overflow-hidden">
            <div class="card-header border-0 text-center py-4 bg-transparent pb-0 mb-5 mb-md-0">
              <h2 class="brand-title mb-1">pens&pages</h2>
              <p class="text-light-muted mb-0 small">Sign in to your customer or admin account</p>
            </div>

            <!-- Card Body Opening -->
            <div class="card-body p-4 p-md-5 pt-0">

              <!-- Login Form -->
              <form @submit.prevent="handleSubmit">
                <!-- Email Field -->
                <div class="mb-3">
                  <label for="email" class="form-label text-light-muted small fw-semibold">Email Address</label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="form-control form-control-dark"
                    :class="errors.email ? 'border-danger' : ''"
                    placeholder="Enter your email..."
                    :disabled="isLoading"
                    required />
                  <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
                </div>

                <!-- Password Field -->
                <div class="mb-5">
                  <div class="d-flex justify-content-between align-items-center">
                    <label for="password" class="form-label text-light-muted small fw-semibold">Password</label>
                  </div>
                  <div class="input-group">
                    <input
                      id="password"
                      v-model="password"
                      type="password"
                      class="form-control form-control-dark"
                      :class="errors.password ? 'border-danger' : ''"
                      placeholder="Enter your password..."
                      :disabled="isLoading"
                      required />
                  </div>
                  <small class="text-danger" v-if="errors.password">{{ errors.password }}</small>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="btn btn-gold w-100 py-2 fw-semibold d-flex justify-content-center align-items-center gap-2"
                  :disabled="!isEnabled || isLoading">
                  Login
                </button>
              </form>

            </div>

            <!-- Footer Section -->
            <div class="card-footer bg-darker border-0 text-center py-3">
              <p class="mb-0 text-light-footer small">
                Don't have an account?
                <router-link :to="{ name: 'Register' }" class="text-gold fw-semibold text-decoration-none">
                  Create one now
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-card {
  border: 1px solid rgba(200, 180, 150, 0.15) !important;
}

.bg-darker {
  background: #423b36;
}

.brand-title {
  font-family: 'Playfair Display', serif;
  color: rgb(59, 52, 48) !important;
}

.text-gold {
  color: #C8B496 !important;
}

.text-light-muted {
  color: #5c554f;
  font-weight: 500;
}

.text-light-footer {
  color: #a0958b;
  font-weight: 500;
}

.form-control-dark {
  background-color: #F5EFE6;
  border: 1px solid rgb(223, 209, 199);
  color: #55524e;
}

.form-control-dark::placeholder {
  color: #8d877f;
}

.btn-dark-toggle {
  background-color: #383330;
  border: 1px solid #4a4440;
  border-left: none;
}

.btn-gold {
  background-color: #ebdbc2;
  color: #2E2A28;
  font-weight: 500 !important;
  border: none;
}

.btn-gold:hover {
  background-color: #ba9f7d;
  color: #2E2A28;
}

.form-check-input:checked {
  background-color: #C8B496;
  border-color: #C8B496;
}
</style>