<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <footer class="flex flex-col lg:flex-row items-center justify-around gap-y-6 py-3 bg-white dark:primary-dark-bg border-t border-slate-200 dark:border-slate-700">
        <div class="flex flex-col items-center space-y-3 max-lg:order-2">
            <div>
                <p class="text-center text-sm text-gray-500 dark:secondary-dark-mode-text">
                    &copy; 2025, <span class="text-[#c80a1d]">Sonniva Georgia</span> - All right reserved.
                </p>
            </div>

            <div class="flex flex-col lg:flex-row items-center justify-center gap-2 text-xs text-gray-500">
                <Link :href="route('terms-of-service')" class="hover:text-brand-500">Terms of Service</Link>
                <Link :href="route('privacy-policy')" class="hover:text-brand-500">Privacy Policy</Link>
                <Link :href="route('cookie-policy')" class="hover:text-brand-500">Cookie Policy</Link>
            </div>
        </div>

        <div class="flex flex-col items-center">
            <i class="pi pi-phone text-xl lg:text-3xl text-gray-500"></i>
            <p class="text-lg lg:text-2xl font-bold text-[#c80a1d]">+995 511 16 83 83</p>
            <p class="text-center text-sm text-gray-500 dark:secondary-dark-mode-text">
                24/7 Support
            </p>
        </div>

        <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
                <p class="text-center text-sm text-gray-500 dark:secondary-dark-mode-text">
                    Follow us on:
                </p>
                <i class="pi pi-linkedin text-lg lg:text-2xl text-[#c80a1d]"></i>
                <i class="pi pi-facebook text-lg lg:text-2xl text-[#c80a1d]"></i>
                <i class="pi pi-instagram text-lg lg:text-2xl text-[#c80a1d]"></i>
            </div>

            <Link :href="route('faq.index')" class="flex items-center hover:text-brand-500">
                FAQ
            </Link>
        </div>
    </footer>
</template>

<style scoped>

</style>
