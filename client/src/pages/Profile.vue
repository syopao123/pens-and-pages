<script setup>
import ChangePasswordCard from '@/components/ChangePasswordCard.vue';
import LogoutCard from '@/components/LogoutCard.vue';
import PersonalDetailsCard from '@/components/PersonalDetailsCard.vue';
import { useGlobalStore } from '@/stores/global';
import { onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { user } = useGlobalStore();
const router = useRouter();

onBeforeMount(() => {
    if (!user.token) {
        router.push({ name: 'Home' });
    }
})

onMounted(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
})
</script>

<template>
    <div class="container-fluid min-vh-100 profile py-5">
        <div class="row min-vh-100 justify-content-center align-items-start gy-4 gy-md-0">
            <div class="col-12 col-md-6">
                <PersonalDetailsCard/>
            </div>
            <div class="col-12 col-md-4">
                <ChangePasswordCard/>
            </div>
            <div class="col-12 d-block d-md-none">
                <LogoutCard/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile {
    background: #2E2A28;
}
</style>