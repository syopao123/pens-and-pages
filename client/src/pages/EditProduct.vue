<script setup>
import api from '@/api';
import PageBanner from '@/components/PageBanner.vue';
import { Notyf } from 'notyf';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const notyf = new Notyf();

const router = useRouter();
const route = useRoute();

const name = ref('');
const description = ref('');
const price = ref(0);

const isLoading = ref(false);
const isEnabled = ref(false);

async function handleSubmit() {
    try {

        let response = await api.patch(`/products/${route.params.id}/update`, {
            name: name.value,
            description: description.value,
            price: price.value
        });

        notyf.success("Product successfully updated.");
        router.push({ name: 'Products' });

    } catch (e) {

        notyf.error("Something went wrong. Please contact the administrator.");
        
    }
}

onMounted(async() => {
    try {

        isLoading.value = true;

        let response = await api.get(`/products/${route.params.id}`);

        if (response.status === 200) {
            name.value = response.data.name;
            description.value = response.data.description;
            price.value = response.data.price;
        }

    } catch (e) {

        notyf.error("Something went wrong.");

    } finally {

        isLoading.value = false;

    }
})

onBeforeMount(() => {
    if (!route.params.id) {
        router.push({ name: 'Products' });
    }
})

watch([name, description, price], (currentValue, oldValue) => {
    if (currentValue.every(input => input !== '')) {
        isEnabled.value = true;
    } else {
        isEnabled.value = false;
    }
});

</script>
<template>
    <div class="container-fluid py-5">
        <div class="container min-vh-100">

            <PageBanner :page-name="'Edit Product'" :page-description="'Edit existing product'" />

            <div class="row">
                <div class="col-12 col-lg-6">
                    <div class="card shadow-sm rounded-2 p-4">
                        <div class="card-body text-center">
                            <div class="spinner-border" role="status" v-if="isLoading">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <form @submit.prevent="handleSubmit" v-else class="text-start">
                                <div class="row mb-4">
                                    <div class="col-12 col-md-6">
                                        <label for="productName" class="form-label text-uppercase small">name</label>
                                        <input type="text" class="form-control" v-model="name" required>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label for="productPrice" class="form-label text-uppercase small">price</label>
                                        <div class="input-group">
                                            <span class="input-group-text rounded-0">₱</span>
                                            <input type="number" name="productPrice" class="form-control" v-model="price" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-5">
                                    <div class="col">
                                        <label for="productDescription" class="form-label text-uppercase small">product description</label>
                                        <textarea name="productDescription" rows="7" class="form-control" v-model="description" required></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <span class="d-flex gap-2 justify-content-end">
                                            <router-link :to="{ name: 'Products' }" type="button" class="btn btn-danger">Cancel</router-link>
                                            <button type="submit" class="btn btn-primary" :disabled="!isEnabled">Save</button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.spinner-border {
    color: #2E2A28;
}

.card {
    border: 1px solid rgb(236, 236, 236);
}

.btn {
    border: none;
    border-radius: 2px;
    color: black;
}

.btn-primary {
    background: #F5DFC0;
}

.btn-primary:hover {
    background: #d8c4a9;
}

.btn-danger {
    background: #E9E1DD;
}

.btn-danger:hover {
    background: #bdb6b3;
}

input, textarea {
    border-radius: 2px;
}
</style>