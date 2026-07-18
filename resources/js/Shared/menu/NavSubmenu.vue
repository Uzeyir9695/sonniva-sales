<script setup>
import { Link } from '@inertiajs/vue3'
</script>

<template>
    <div class="relative overflow-hidden bg-brand-500">
        <!-- black panel, inset from the brand-colored edges, plain div + rounded-* -->
        <div class="absolute inset-y-0 left-0 right-0 sm:left-2 sm:right-2 lg:left-6 lg:right-6 bg-neutral-950 rounded-none sm:rounded-xl sm:-skew-x-12"></div>

        <!-- decorative dot grid -->
        <div
            class="hidden lg:block absolute left-[4%] top-1/2 -translate-y-1/2 w-20 h-10 opacity-30 pointer-events-none"
            style="background-image: radial-gradient(circle, #fbbf24 1px, transparent 1px); background-size: 10px 10px;"
        ></div>

        <div class="relative z-10 flex items-center justify-between gap-4 px-4 sm:px-10 py-1">
            <div class="flex items-center justify-center gap-4 sm:gap-6 flex-1">
                <!-- left flow lines -->
                <div class="hidden md:flex flex-col items-end gap-1.5 shrink-0">
                    <span class="w-4 h-px bg-brand-500"></span>
                    <span class="w-10 h-px bg-brand-500"></span>
                    <span class="w-6 h-px bg-brand-500"></span>
                </div>

                <!-- hexagon sale tag -->
                <Link
                    :href="route('sales.index')"
                    class="group flex items-center gap-2.5 sm:gap-3 bg-brand-500 text-neutral-950 font-extrabold px-7 sm:px-9 py-1 sm:py-2 shrink-0 transition-colors duration-300 hover:bg-brand-400 [clip-path:polygon(16px_0,calc(100%-16px)_0,100%_50%,calc(100%-16px)_100%,16px_100%,0_50%)]"
                >
                    <span class="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-950 shrink-0 transition-transform duration-500 group-hover:rotate-90">
                        <i class="pi pi-percentage text-xs sm:text-sm text-brand-400"></i>
                    </span>
                    <span class="text-sm sm:text-lg tracking-wide whitespace-nowrap">ფასდაკლებები</span>
                </Link>

                <!-- right flow lines -->
                <div class="hidden md:flex flex-col items-start gap-1.5 shrink-0">
                    <span class="w-6 h-px bg-brand-500"></span>
                    <span class="w-10 h-px bg-brand-500"></span>
                    <span class="w-4 h-px bg-brand-500"></span>
                </div>
            </div>

            <a href="tel:+9950322693699" class="group flex items-center gap-2.5 sm:gap-3 shrink-0 text-white">
                <span class="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-500 shrink-0 transition-colors duration-300 group-hover:bg-brand-400">
                    <i class="pi pi-phone text-sm sm:text-base text-neutral-950 transition-transform duration-300 group-hover:rotate-20"></i>
                </span>
                <span class="font-bold text-sm sm:text-lg whitespace-nowrap">032 269 36 99</span>
            </a>
        </div>
    </div>
</template>
