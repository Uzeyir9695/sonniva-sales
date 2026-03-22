<script setup>
import AdminLayout from './AdminLayout.vue';

defineOptions({ layout: AdminLayout });
</script>

<template>
    <div class="h-full flex flex-col items-center justify-center">
        <h1 class="text-xl md:text-3xl text-center font-bold text-gray-800 my-4">
            Welcome to Admin Dashboard
        </h1>
        <p class="text-gray-600 text-center text-sm md:text-xl mb-6">
            Here you can manage orders, users, and settings efficiently.
        </p>
    </div>
</template>