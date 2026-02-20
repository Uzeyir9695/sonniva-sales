<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import LargeDeviceMegaMenu from '@/Shared/menu/LargeDeviceMegaMenu.vue';
import Navbar from '@/Shared/menu/Navbar.vue';
import SmallDeviceMegaMenu from '@/Shared/menu/SmallDeviceMegaMenu.vue';
import { usePage } from '@inertiajs/vue3';

const page = usePage()

const categories = page.props.categories ?? []

</script>

<template>
    <!-- Category Sidebar + Mega Menu -->
    <LargeDeviceMegaMenu class="hidden lg:flex" :categories="categories"/>
</template>
