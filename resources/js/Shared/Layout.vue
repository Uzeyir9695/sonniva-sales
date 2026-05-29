<script setup>
import Footer from "./Footer.vue";
import {router, usePage} from "@inertiajs/vue3";
import {computed, onMounted} from "vue";
import Navbar from '@/Shared/menu/Navbar.vue';

const page = usePage();
const isAuthenticated = computed(() => page.props.isLoggedIn);

</script>

<template>
    <div class="body-content flex flex-col min-h-screen">
        <Navbar />

        <main class="flex-1 w-full md:max-w-9/12 2xl:max-10/12 mx-auto space-y-4 mb-4">
            <slot />
        </main>

<!--        <ContactButtons />-->
        <Toast position="top-right" />

        <Footer />
    </div>
</template>

<style scoped>

</style>
