<script setup>
</script>

<template>
    <div class="card p-5 pt-4">
        <div class="card-title border-bottom text-center text-md-start">
            <p class="form-title fs-3 mb-1">Session Account</p>
        </div>
        <div class="card-body p-0 pt-3">
            <div class="row">
                <div class="col">
                    <router-link :to="{ name: 'Logout' }" class="btn logout-btn w-100 text-uppercase py-3">logout</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-title .form-title {
    font-family: 'Playfair Display', 'sans serif';
}

.logout-btn {
    border: none;
    border-radius: 2px;
    background: #eee0cb;
}

.logout-btn:hover {
    background: #b4a48b;
}

.logout-btn:active {
    background: #d1c1a2 !important;
}

.logout-btn:disabled {
    border: none;
}
</style>