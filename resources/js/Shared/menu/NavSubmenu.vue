<script setup>
import { Link } from '@inertiajs/vue3'
</script>

<template>
    <div class="bg-brand-500">
        <div class="w-full lg:max-w-11/12 2xl:max-w-9/12 mx-auto px-3 sm:px-4 flex justify-center items-center gap-5 py-3 text-xs sm:text-base 3xl:text-xl font-semibold text-white overflow-x-auto no-scrollbar">
            <Link :href="route('sales.index')" class="flex items-center gap-1.5 shrink-0 hover:text-white/80 transition-colors">
                <i class="pi pi-percentage"></i>
                ფასდაკლებები
            </Link>

            <a href="tel:+995591047372" class="flex items-center gap-1.5 shrink-0 hover:text-white/80 transition-colors">
                <i class="pi pi-phone text-xs"></i>
                032 269 36 99
            </a>
        </div>
    </div>
</template>
