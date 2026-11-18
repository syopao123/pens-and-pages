<script setup>

defineProps({
    pageName: String,
    pageDescription: String
});
</script>

<template>
    <div class="row mb-3">
        <div class="col">
            <p class="fs-1 header-text">{{ pageName }}</p>
            <p class="fw-light">
                {{ pageDescription }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.header-text {
    font-family: 'Playfair Display', 'sans-serif';
}
</style>