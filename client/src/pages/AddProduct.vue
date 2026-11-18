<script setup>
import api from '@/api';
import PageBanner from '@/components/PageBanner.vue';
import { useGlobalStore } from '@/stores/global';
import { Notyf } from 'notyf';
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const { user } = useGlobalStore();

const notyf = new Notyf();

const router = useRouter();

const isEnabled = ref(false);

const name = ref('');
const description = ref('');
const price = ref(0);

async function handleSubmit() {
    try {

        if (isEnabled) {
            let response = await api.post('/products', {
                name: name.value,
                description: description.value,
                price: price.value
            });

            if (response.status === 201) {
                notyf.success("Successfully added product.");
                router.push({ name: 'Products' });
            }
        }

    } catch (e) {
        notyf.error("Something went wrong. Please contact administrator.");
    }

}

watch([name, description, price], (currentValue, oldValue) => {

    if (currentValue.every(input => input !== '')) {
        isEnabled.value = true;
    } else {
        isEnabled.value = false;
    }

});

onBeforeMount(() => {
    if (!user.token || !user.isAdmin) {
        router.push({ name: 'Home' });
    }
})

</script>

<template>
    <div class="container-fluid py-5">
        <div class="container min-vh-100">

            <PageBanner
                :page-name="'Add Product'"
                :page-description="'Register a new product'" />

            <div class="row">
                <div class="col-12 col-lg-6">
                    <div class="card shadow-sm rounded-2 p-4">
                        <div class="card-body">
                            <form @submit.prevent="handleSubmit">
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

.btn-danger {
    background: #E9E1DD;
}

.btn-danger:hover, btn.primary:hover {
    background: #bdb6b3;
}

input, textarea {
    border-radius: 2px;
}
</style>