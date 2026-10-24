<script setup>
import { Link } from '@inertiajs/vue3';

const branches = [
    { address: 'footer.avchalaAddress', mapUrl: 'https://maps.app.goo.gl/3YwH55CnhUUfJoYQ9' },
    { address: 'footer.didubeAddress', mapUrl: 'https://maps.app.goo.gl/mUedJ9Jf9j1tR9nt6' },
];
</script>

<template>
    <footer class="flex flex-col lg:flex-row items-center justify-around gap-6 px-6 py-5 sm:py-10 bg-white border-t border-slate-200">

        <div class="flex flex-col items-center gap-3">
            <div class="flex items-center gap-3">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                    <i class="pi pi-linkedin text-lg lg:text-2xl text-[#0A66C2] inline-block scale-95"></i>
                </Link>

                <Link href="https://www.facebook.com/FurnituraSonniva" target="_blank" rel="noopener noreferrer">
                    <i class="pi pi-facebook text-lg lg:text-2xl text-[#1877F2]"></i>
                </Link>

                <Link href="https://www.instagram.com/sonnivageorgia/" target="_blank" rel="noopener noreferrer">
                    <i class="pi pi-instagram text-lg lg:text-2xl instagram-icon"></i>
                </Link>
            </div>
        </div>

        <div class="flex flex-col items-center space-y-3 order-3 sm:order-2">
            <div>
                <p class="text-center text-sm text-gray-500">
                    &copy; 2025, <span class="text-[#c80a1d]">Sonniva Georgia</span> - {{ $t('footer.rightsReserved') }}
                </p>
            </div>

            <div class="flex flex-col lg:flex-row items-center justify-center gap-2 text-xs text-gray-500">
                <Link :href="route('terms-of-service')" class="hover:text-brand-500">{{ $t('footer.termsOfService') }}</Link>
                <Link :href="route('privacy-policy')" class="hover:text-brand-500">{{ $t('footer.privacyPolicy') }}</Link>
                <Link :href="route('cookie-policy')" class="hover:text-brand-500">{{ $t('footer.cookiePolicy') }}</Link>
            </div>
        </div>

        <div class="flex flex-col items-center gap-3 order-2 sm:order-3">
            <a
                v-for="branch in branches"
                :key="branch.address"
                :href="branch.mapUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-start gap-3 w-full rounded-lg border border-slate-200 px-4 py-3 hover:border-[#c80a1d]/40 hover:bg-slate-50 transition-colors"
            >
                <i class="pi pi-map-marker text-[#c80a1d] mt-0.5"></i>
                <div class="flex flex-col gap-0.5">
                    <span class="text-sm font-medium text-gray-700">{{ $t(branch.address) }}</span>
                    <span class="text-xs text-gray-500">{{ $t('footer.workingHours') }}</span>
                    <span class="text-xs text-[#c80a1d] group-hover:underline">
                        {{ $t('footer.viewOnMap') }} <i class="pi pi-external-link text-[10px]"></i>
                    </span>
                </div>
            </a>
            <a href="tel:032-269-36-99" class="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-500 transition-colors">
                <i class="pi pi-phone text-[#c80a1d]"></i>
                <span class="font-medium">032 269 36 99</span>
            </a>
        </div>

    </footer>
</template>

<style scoped>
.instagram-icon {
    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
