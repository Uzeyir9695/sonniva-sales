<script setup>
import {Link, usePage} from '@inertiajs/vue3';
import { computed } from "vue";

const page = usePage();
const user = computed(() => page.props.user);
const isAuthenticated = computed(() => page.props.isLoggedIn);

</script>

<template>
    <!--****************************************************
            Large screen devices navbar
    *****************************************************-->
    <header class="bg-sky-400 sticky top-0 flex justify-around items-center shadow-sm h-24 z-50">
        <div class="flex space-x-12 items-center">
            <Link v-if="!isAuthenticated" :href="route('login')" class="flex items-center space-x-2 hover:text-brand-500 text-sm border border-gray-300 px-3 py-2 rounded-md">
                <i class="pi pi-user mr-2"></i>
                Login
            </Link>

            <Link v-if="isAuthenticated" :href="route('logout')" method="post" as="button" type="button" :replace="true" class="bg-blue-500 cursor-pointer">
                <i class="pi pi-sign-out sm:text-md mr-2 font-bold"></i>
                Log Out
            </Link>
        </div>
    </header>
</template>

<style scoped>

</style>
