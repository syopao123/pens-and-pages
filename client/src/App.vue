<script setup>
import { useRouter } from 'vue-router';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
import NavbarMobile from './components/NavbarMobile.vue';
import ScrollToTopButton from './components/ScrollToTopButton.vue';
import { onBeforeMount, onMounted } from 'vue';
import { useGlobalStore } from './stores/global.js';

const { user, getUserDetails } = useGlobalStore();

const router = useRouter();

onBeforeMount(async() => {
  try {

    let token = localStorage.getItem("token");
    if (token) {
      await getUserDetails(token);
    }

    if (user.isAdmin) {
      router.push({ name: 'Products' });
    }

  } catch {
    router.push({ name: 'Logout' });
  }
})

</script>

<template>
  <Navbar/>
  <router-view/>
  <Footer/>
  <NavbarMobile/>
  <ScrollToTopButton v-if="router.currentRoute.value.name === 'Products'"/>
</template>

<style>
</style>
