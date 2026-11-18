<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const navbarHeight = ref(0)
let resizeObserver = null

function handleScroll() {
    isVisible.value = window.scrollY > 300
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function updateNavbarHeight(navbar) {
    navbarHeight.value = navbar ? navbar.offsetHeight : 0
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)

    const navbar = document.querySelector('.navbar.sticky-bottom')
    updateNavbarHeight(navbar)

    if (navbar) {
        resizeObserver = new ResizeObserver(() => updateNavbarHeight(navbar))
        resizeObserver.observe(navbar)
    }
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (resizeObserver) resizeObserver.disconnect()
})
</script>

<template>
    <button
        v-show="isVisible"
        @click="scrollToTop"
        type="button"
        class="btn btn-primary scroll-to-top"
        :style="{ bottom: navbarHeight + 20 + 'px' }"
        aria-label="Scroll to top">
        <i class="bi bi-chevron-up"></i>
    </button>
</template>

<style scoped>
.scroll-to-top {
    position: fixed;
    right: 20px;
    z-index: 1050;
    transition: bottom 0.2s ease;

    border: 1px solid #2e2a2823;
    background: #e7d3b3;
    color: rgb(58, 58, 58);
}

.scroll-to-top:hover {
    background: #bead93;
    color: rgb(58, 58, 58);
}

.scroll-to-top:active {
    border: none;
    background: #4e453f;
}
</style>