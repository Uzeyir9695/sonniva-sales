<script setup>
import Footer from "./Footer.vue";
import {router, usePage} from "@inertiajs/vue3";
import {computed, onMounted} from "vue";
import Navbar from '@/Shared/menu/Navbar.vue';

const page = usePage();
const isAuthenticated = computed(() => page.props.isLoggedIn);

// Avoid showing login/protected page after login/logout
onMounted(() => {
    window.addEventListener('popstate', (event) => {
        if (!isAuthenticated.value) {
            router.get(route('login'), {}, {replace: true});
        } else {
            router.get(route('home'));
        }
        event.stopImmediatePropagation();
    });
});
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <Navbar />

        <main class="container md:w-7xl mx-auto space-y-4 px-4 mb-4">
            <slot />
        </main>

<!--        <ContactButtons />-->
        <Footer />
    </div>
</template>

<style scoped>

</style>
