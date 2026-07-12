<script setup>
import { Deferred, Head } from '@inertiajs/vue3'
import GridSkeletonLoader from '@/Shared/skeletonLoaders/GridSkeletonLoader.vue'
import ItemsGrid from '@/Shared/components/ItemsGrid.vue'

defineProps({
    items: Object,
})
</script>

<template>
    <Head title="ფასდაკლებები">
        <meta name="description" content="იხილეთ Sonniva-ს ფასდაკლებული პროდუქცია" />
    </Head>

    <div class="min-h-[calc(100vh-80px)] max-lg:mx-4">
        <!-- Hero -->
        <div class="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-500 to-brand-600 mt-4 px-2 py-5 sm:py-10 text-center">
            <i class="pi pi-percentage absolute -right-6 -top-6 text-[9rem] text-white/10 rotate-12"></i>
            <i class="pi pi-tag absolute -left-4 -bottom-6 text-[7rem] text-white/10 -rotate-12"></i>

            <span class="inline-flex items-center gap-1.5 bg-white/15 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
                <i class="pi pi-clock text-sm"></i>
                შეზღუდული დროით
            </span>
            <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">ფასდაკლებები</h1>
            <p class="text-white/90 text-sm sm:text-base max-w-xl mx-auto">
                აღმოაჩინეთ პროდუქცია საუკეთესო ფასებში.
            </p>
        </div>

        <!-- Items -->
        <div class="py-6">
            <Deferred data="items">
                <template #default>
                    <ItemsGrid v-if="items.data?.length" :items="items" />

                    <div v-else class="flex flex-col items-center justify-center h-72 text-center">
                        <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <i class="pi pi-percentage text-3xl text-gray-300"></i>
                        </div>
                        <h3 class="text-lg font-medium text-gray-500">ამჟამად ფასდაკლებული პროდუქცია არ არის</h3>
                    </div>
                </template>
                <template #fallback>
                    <GridSkeletonLoader />
                </template>
            </Deferred>
        </div>
    </div>
</template>
