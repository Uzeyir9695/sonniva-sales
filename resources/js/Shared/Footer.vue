<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <footer class="flex flex-col lg:flex-row items-center justify-around gap-6 px-6 py-5 sm:py-10 bg-white border-t border-slate-200">

        <!-- Social + FAQ -->
        <div class="flex flex-col items-center gap-3">
            <div class="flex items-center gap-3">
                <i class="pi pi-linkedin text-lg lg:text-2xl text-[#c80a1d]"></i>
                <i class="pi pi-facebook text-lg lg:text-2xl text-[#c80a1d]"></i>
                <i class="pi pi-instagram text-lg lg:text-2xl text-[#c80a1d]"></i>
            </div>

            <Link :href="route('faq.index')" class="flex items-center text-sm hover:text-brand-500 border-t border-gray-200 pt-1.5">
                <i class="pi pi-question-circle text-sm mr-2 "></i>
                ხშირად დასმული კითხვები
            </Link>
        </div>

        <!-- Brand + legal links -->
        <div class="flex flex-col items-center space-y-3 order-3 sm:order-2">
            <div>
                <p class="text-center text-sm text-gray-500">
                    &copy; 2025, <span class="text-[#c80a1d]">Sonniva Georgia</span> - ყველა უფლება დაცულია.
                </p>
            </div>

            <div class="flex flex-col lg:flex-row items-center justify-center gap-2 text-xs text-gray-500">
                <Link :href="route('terms-of-service')" class="hover:text-brand-500">მომსახურების პირობები</Link>
                <Link :href="route('privacy-policy')" class="hover:text-brand-500">კონფიდენციალურობის პოლიტიკა</Link>
                <Link :href="route('cookie-policy')" class="hover:text-brand-500">ქუქი ფაილების პოლიტიკა</Link>
            </div>
        </div>

        <!-- Working hours + hotline -->
        <div class="flex flex-col items-center gap-2 order-2 sm:order-3">
            <div class="flex items-center gap-2 text-sm text-gray-500">
                <i class="pi pi-clock text-gray-500"></i>
                <span>ორშაბათი–პარასკევი, 09:00–18:00</span>
            </div>
            <a href="tel:032-269-36-99" class="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-500 transition-colors">
                <i class="pi pi-phone text-[#c80a1d]"></i>
                <span class="font-medium">032 269 36 99</span>
            </a>
        </div>

    </footer>
</template>

<style scoped>

</style>
