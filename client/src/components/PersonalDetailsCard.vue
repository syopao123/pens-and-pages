<script setup>
import { useGlobalStore } from '@/stores/global';

const { user } = useGlobalStore();

</script>

<template>
    <div class="card p-5 pt-4">
        <div class="card-title border-bottom text-center text-md-start">
            <p class="form-title fs-3 mb-1">Personal Details</p>
            <p class="small">Manage your name, contact information, and address.</p>
        </div>
        <div class="card-body p-0 pt-3">
            <div class="row row-cols-1 row-cols-md-2 mb-3">
                <div class="col">
                    <label for="firstName" class="form-label text-uppercase small">first name</label>
                    <input type="text" class="form-control" placeholder="" :value="user.firstName" required />
                </div>
                <div class="col">
                    <label for="lastName" class="form-label text-uppercase small">last name</label>
                    <input type="text" class="form-control" :value="user.lastName" required />
                </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 mb-3">
                <div class="col">
                    <label for="mobileNumber" class="form-label text-uppercase small">mobile number</label>
                    <input type="text" class="form-control" :value="user.mobileNumber" required>
                </div>
                <div class="col">
                    <label for="email" class="form-label text-uppercase small">email</label>
                    <input type="email" name="email" class="form-control" :value="user.email" required>
                </div>
            </div>
            <div class="row mb-4 mb-md-3">
                <div class="col">
                    <label for="address" class="form-label text-uppercase small">address</label>
                    <textarea name="address" rows="5" class="form-control"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
label {
    color: #302b27;
    font-weight: 500;
}

input,
textarea {
    border-radius: 2px;
    background: #F5EFE6;
}

button {
    border: none;
    border-radius: 2px;
    background: #e7d3b3;
}

button:hover {
    background: #b4a48b;
}

button:active {
    background: #d1c1a2 !important;
}

button:disabled {
    border: none;
}

.card-title .form-title {
    font-family: 'Playfair Display', 'sans serif';
}
</style>