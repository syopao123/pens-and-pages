<script setup>
import api from '@/api';
import { Notyf } from 'notyf';
import { ref, watch } from 'vue';

const newPassword = ref('');
const confirmNewPassword = ref('');

const isEnabled = ref(false);

const notyf = new Notyf();

async function handlePasswordChange() {
    try {

        let response = await api.patch('/users/update-password', {
            newPassword: newPassword.value
        });

        notyf.success(response.data.message);

        newPassword.value = '';
        confirmNewPassword.value = '';

    } catch (e) {
        notyf.error("Something went wrong. Please contact administrator.");
    }
}

watch([newPassword, confirmNewPassword], (currentVal, oldVal) => {

    if (currentVal.every(input => input !== "" && input.length >= 8) && newPassword.value === confirmNewPassword.value) {
        isEnabled.value = true;
    } else {
        isEnabled.value = false;
    }

})

</script>

<template>
    <div class="card p-5 pt-4">
        <div class="card-title border-bottom text-center text-md-start">
            <p class="form-title fs-3 mb-1">Change Password</p>
            <p class="small">Update your account password and security credentials.</p>
        </div>
        <div class="card-body p-0 pt-3">
            <form @submit.prevent="handlePasswordChange">
                <div class="row row-cols-1 mb-4 gap-3">
                    <div class="col">
                        <label for="lastName" class="form-label text-uppercase small">new password</label>
                        <input type="password" class="form-control" required v-model="newPassword" />
                    </div>
                    <div class="col">
                        <label for="mobileNumber" class="form-label text-uppercase small">confirm new password</label>
                        <input type="password" class="form-control" required v-model="confirmNewPassword">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button class="btn btn-primary w-100 text-uppercase py-3" :disabled="!isEnabled">update password</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
label {
    color: #302b27;
    font-weight: 500;
}

input {
    border-radius: 2px;
    background: #F5EFE6;
}

.card-title .form-title {
    font-family: 'Playfair Display', 'sans serif';
}

button {
    color: white;
    border-radius: 2px;
    border: none;
    background: #24201d;
}

button:hover {
    background: #443c36;
    color: white;
}

button:active {
    background: #24201d !important;
    color: rgb(167, 167, 167);
}

button:disabled {
    background: #24201d;
}
</style>