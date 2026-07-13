<script setup>
import { Link } from '@inertiajs/vue3'
</script>

<template>
    <div class="bg-brand-500">
        <div class="w-full lg:max-w-11/12 2xl:max-w-9/12 mx-auto px-3 sm:px-4 flex justify-center items-center gap-5 h-9 text-xs sm:text-sm font-semibold text-white overflow-x-auto no-scrollbar">
            <Link :href="route('sales.index')" class="flex items-center gap-1.5 shrink-0 hover:text-white/80 transition-colors">
                <i class="pi pi-percentage text-xs"></i>
                ფასდაკლებები
            </Link>

            <Link :href="route('about-us')" class="flex items-center gap-1.5 shrink-0 hover:text-white/80 transition-colors">
                <i class="pi pi-circle-info text-xs"></i>
                ჩვენს შესახებ
            </Link>

            <a href="tel:+995591047372" class="flex items-center gap-1.5 shrink-0 hover:text-white/80 transition-colors">
                <i class="pi pi-phone text-xs"></i>
                032 269 36 99
            </a>
        </div>
    </div>
</template>
