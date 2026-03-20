<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const dots = ref('.')
let interval = null

onMounted(() => {
    interval = setInterval(() => {
        dots.value = dots.value.length >= 3 ? '.' : dots.value + '.'
    }, 500)
})

onUnmounted(() => {
    clearInterval(interval)
})
</script>

<template>
    <div class="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gray-50 px-4 relative overflow-hidden">

        <!-- Subtle background decoration -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl"></div>
            <div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl"></div>
        </div>

        <!-- Card -->
        <div class="relative z-10 bg-white rounded-3xl shadow-lg px-10 py-14 max-w-lg w-full text-center border border-gray-100">

            <!-- Logo -->
            <div class="flex justify-center mb-8">
                <img src="/logo/logo3.png" alt="Sonniva Georgia" class="h-12 object-contain" />
            </div>

            <!-- Icon -->
            <div class="flex justify-center mb-6">
                <div class="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center">
                    <i class="pi pi-wrench text-3xl text-brand-600"></i>
                </div>
            </div>

            <!-- Title -->
            <h1 class="text-2xl font-semibold text-gray-900 mb-3" style="font-family: 'Instrument Sans', sans-serif;">
                მიმდინარეობს ტექნიკური სამუშაოები
            </h1>

            <!-- Subtitle -->
            <p class="text-gray-500 text-sm leading-relaxed mb-8">
                გთხოვთ, მოიცადოთ — მალე დავბრუნდებით<span class="inline-block w-6 text-left text-brand-500 font-bold">{{ dots }}</span>
            </p>

            <!-- Divider -->
            <div class="border-t border-gray-100 mb-8"></div>

            <!-- Contact info -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
                <div class="flex items-center gap-2">
                    <i class="pi pi-phone text-brand-500"></i>
                    <span>032 269 36 99</span>
                </div>
                <span class="hidden sm:block text-gray-200">|</span>
                <div class="flex items-center gap-2">
                    <i class="pi pi-clock text-brand-500"></i>
                    <span>ორშ–პარ, 09:00–18:00</span>
                </div>
            </div>
        </div>

        <!-- Footer note -->
        <p class="relative z-10 mt-8 text-xs text-gray-400">
            &copy; {{ new Date().getFullYear() }} Sonniva Georgia. ყველა უფლება დაცულია.
        </p>
    </div>
</template>
