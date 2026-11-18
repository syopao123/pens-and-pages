<script setup>
import { onBeforeMount, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import { Notyf } from 'notyf';
import api from '@/api';

const { user } = useGlobalStore();
const router = useRouter();
const notyf = new Notyf();

const isEnabled = ref(false);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const mobileNo = ref('');
const password = ref('');
const confirmPassword = ref('');

const errors = reactive({
    firstName: null,
    lastName: null,
    email: null,
    mobileNo: null,
    password: null,
    confirmPassword: null
})

async function handleSubmit() {
    try {

        let response = await api.post('/users/register', {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            mobileNo: mobileNo.value,
            password: password.value
        })

        if (response.status === 201) {
            notyf.success('Registered successfully');
            router.push({ name: 'Login' });

            firstName.value = "";
            lastName.value = "";
            email.value = "";
            mobileNo.value = "";
            password.value = "";
            confirmPassword.value = "";
        }

    } catch (e) {
        notyf.error(e.response.data.error);
    }
}

watch([firstName, lastName, email, mobileNo, password, confirmPassword], (currentValue, oldValue) => {
    if (currentValue.every(input => input !== "") && 
        currentValue[3].length === 11 && currentValue[4].length >= 8 && 
        currentValue[4] === currentValue[5]) {
        isEnabled.value = true;
    } else {
        isEnabled.value = false;
    }
});

watch([firstName], (currentVal) => {
    errors.firstName = !currentVal[0] ? 'First name is required' : null;
})

watch([lastName], (currentVal) => {
    errors.lastName = !currentVal[0] ? 'Last name is required' : null;
})

watch([email], (currentVal) => {
    errors.email = !currentVal[0] ? 'Email is required' : null;
})

watch([mobileNo], (currentVal) => {
    errors.mobileNo = !currentVal[0] ? 'Mobile number is required' : null;
})

watch([password], (currentVal) => {
    errors.password = !currentVal[0] ? 'Password is required' : null;
})

watch([confirmPassword], (currentVal) => {
    errors.confirmPassword = !currentVal[0] ? 'Please confirm your password' : null;
})

onBeforeMount(() => {

    if (user.token) {
        router.push({ name: 'Home' });
    }

});

</script>

<template>
    <div class="container-fluid min-vh-100">
        <div class="container my-5 my-md-0">

            <div class="row min-vh-100">
                <div class="col my-auto">
                    <form v-on:submit.prevent="handleSubmit" class="card p-3 pb-5 p-md-5 border-0 rounded-3 shadow-sm register-form">

                        <div class="card-title border-bottom mb-3 pb-3 text-center text-md-start">
                            <span class="fs-3">Create an Account</span>
                        </div>
                        <div class="card-body p-0 px-3 px-md-0">
                            <div class="row row-cols-1 row-cols-md-2 mb-4 gap-2 gap-md-0">
                                <div class="col">
                                    <label for="firstName" class="form-label small">first name<span class="text-danger ps-1">*</span></label>
                                    <input 
                                        v-model="firstName" 
                                        type="text" 
                                        class="form-control" 
                                        :class="errors.firstName ? 'border-danger' : ''" 
                                        placeholder="Enter your first name..." 
                                        required />
                                    <small class="text-danger" v-if="errors.firstName">{{ errors.firstName }}</small>
                                </div>
                                <div class="col">
                                    <label for="lastName" class="form-label small">last name<span class="text-danger ps-1">*</span></label>
                                    <input 
                                        v-model="lastName" 
                                        type="text" 
                                        class="form-control" 
                                        :class="errors.lastName ? 'border-danger' : ''"
                                        placeholder="Enter your last name..." 
                                        required />
                                    <small class="text-danger" v-if="errors.lastName">{{ errors.lastName }}</small>
                                </div>
                            </div>
                            <div class="row row-cols-1 row-cols-md-2 mb-2 mb-md-4 gap-2 gap-md-0">
                                <div class="col">
                                    <label for="emailAddress" class="form-label small">email address<span class="text-danger ps-1">*</span></label>
                                    <input 
                                        v-model="email" 
                                        type="email" 
                                        class="form-control" 
                                        :class="errors.email ? 'border-danger' : ''"
                                        placeholder="Enter your email address..." 
                                        required />
                                    <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
                                </div>
                                <div class="col">
                                    <label for="mobileNumber" class="form-label small">mobile number<span class="text-danger ps-1">*</span></label>
                                    <input 
                                        v-model="mobileNo" 
                                        type="text" 
                                        class="form-control" 
                                        :class="errors.mobileNo ? 'border-danger' : ''"
                                        placeholder="Enter your mobile number..." 
                                        required>
                                    <small class="text-danger" v-if="errors.mobileNo">{{ errors.mobileNo }}</small>
                                </div>
                            </div>
                            <br />
                            <div class="row row-cols-1 row-cols-md-2 mb-4 mb-md-5 gap-2 gap-md-0">
                                <div class="col">
                                    <label for="password" class="form-label small">password<span class="text-danger ps-1">*</span></label>
                                    <input 
                                        v-model="password" 
                                        type="password" 
                                        name="password" 
                                        class="form-control" 
                                        :class="errors.password ? 'border-danger' : ''"
                                        placeholder="Enter your password..." 
                                        required>
                                    <small class="text-danger" v-if="errors.password">{{ errors.password }}</small>
                                </div>
                                <div class="col">
                                    <label for="confirmPassword" class="form-label small">confirm password<span class="text-danger ps-1">*</span></label>
                                    <input 
                                        v-model="confirmPassword" 
                                        type="password" 
                                        class="form-control" 
                                        :class="errors.confirmPassword ? 'border-danger' : ''"
                                        placeholder="Confirm your password..." 
                                        required>
                                    <small class="text-danger" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</small>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer border-0 bg-transparent p-0 pt-3 pt-md-4">
                            <div class="row row-cols-1 row-cols-md-2 align-items-center gap-5 gap-md-0">
                                <div class="col text-center text-md-start">
                                    <button class="btn register-btn px-5 py-3" :disabled="!isEnabled">
                                        Register
                                        <i class="bi bi-arrow-right ps-0 ps-md-3 fs-5"></i>
                                    </button>
                                </div>
                                <div class="col text-center text-md-end">
                                    <span class="d-block d-md-flex justify-content-center justify-content-md-end gap-2">
                                        <span>Already have an account?</span>
                                        <router-link :to="{ name: 'Login' }" class="login-link fw-bold d-block d-md-inline mx-auto mx-md-0">
                                            LOGIN
                                        </router-link>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
label {
    text-transform: uppercase;
}
.card-title {
    font-family: 'Playfair Display', 'sans-serif';
}

.register-form input {
    border-radius: 2px;
    background: #F5EFE6;
}

.register-btn {
    border: none;
    border-radius: 2px;
    background: #e7d3b3;
}

.register-btn:active {
    background: #d1c1a2;
}

.register-btn:disabled {
    border: none;
}

.login-link {
    width: fit-content;
    color: #8b817d;
    text-decoration: none;
    border-bottom: 2px solid #8b817d;
}
</style>