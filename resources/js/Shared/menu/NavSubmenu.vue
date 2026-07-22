<script setup>
import { Link } from '@inertiajs/vue3'
</script>

<template>
    <div class="relative overflow-hidden bg-brand-500">
        <!-- black panel, inset from the brand-colored edges, plain div + rounded-* -->
        <div class="absolute inset-y-0 left-0 right-0 lg:left-2 lg:right-2 xl:left-6 xl:right-6 bg-neutral-950 rounded-none lg:rounded-xl lg:-skew-x-12"></div>

        <!-- decorative dot grid -->
        <div
            class="hidden lg:block absolute left-[4%] top-1/2 -translate-y-1/2 w-20 h-10 opacity-30 pointer-events-none"
            style="background-image: radial-gradient(circle, #fbbf24 1px, transparent 1px); background-size: 10px 10px;"
        ></div>

        <div class="relative z-10 w-full lg:max-w-11/12 2xl:max-w-9/12 mx-auto px-3 sm:px-7 flex justify-between items-center py-1">
            <div class="hidden lg:block"></div>

            <div class="flex items-center justify-center gap-4 lg:gap-6">
                <!-- left flow lines -->
                <div class="hidden md:flex flex-col items-end gap-1.5 shrink-0">
                    <span class="w-4 h-px bg-brand-500"></span>
                    <span class="w-10 h-px bg-brand-500"></span>
                    <span class="w-6 h-px bg-brand-500"></span>
                </div>

                <!-- hexagon sale tag -->
                <Link
                    :href="route('sales.index')"
                    class="group flex items-center gap-2.5 lg:gap-3 bg-brand-500 text-neutral-950 font-extrabold px-7 lg:px-9 py-1 lg:py-2 shrink-0 transition-colors duration-300 hover:bg-brand-400 [clip-path:polygon(16px_0,calc(100%-16px)_0,100%_50%,calc(100%-16px)_100%,16px_100%,0_50%)]"
                >
                    <span class="flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-neutral-950 shrink-0 transition-transform duration-500 group-hover:rotate-90">
                        <i class="pi pi-percentage text-xs lg:text-sm text-brand-400"></i>
                    </span>
                    <span class="text-sm lg:text-lg tracking-wide whitespace-nowrap">ფასდაკლებები</span>
                </Link>

                <!-- right flow lines -->
                <div class="hidden md:flex flex-col items-start gap-1.5 shrink-0">
                    <span class="w-6 h-px bg-brand-500"></span>
                    <span class="w-10 h-px bg-brand-500"></span>
                    <span class="w-4 h-px bg-brand-500"></span>
                </div>
            </div>

            <div class="flex justify-end">
                <a href="tel:+9950322693699" class="group flex items-center gap-2.5 lg:gap-3 shrink-0 text-white">
                <span class="flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-brand-500 shrink-0 transition-colors duration-300 group-hover:bg-brand-400">
                    <i class="pi pi-phone text-sm lg:text-base text-neutral-950 transition-transform duration-300 group-hover:rotate-20"></i>
                </span>
                    <span class="font-bold text-sm lg:text-lg whitespace-nowrap">032 269 36 99</span>
                </a>
            </div>
        </div>
    </div>
</template>
