<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const isAuthenticated = computed(() => page.props.isLoggedIn);
</script>

<template>
    <Link v-if="isAuthenticated" :href="route('logout')" method="post" as="button" type="button" :replace="true" class="flex items-center gap-x-1 text-sm cursor-pointer">
        <i class="pi pi-sign-out text-sm ml-1 font-bold"></i>
        <span class="max-sm:hid">გასვლა</span>
    </Link>
</template>

<style scoped>

</style>
