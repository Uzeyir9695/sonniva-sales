<script setup>
import Skeleton from 'primevue/skeleton';
</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-3 sm:gap-4">
        <div v-for="item in 24" :key="item" class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">

            <!-- Image area -->
            <div class="relative w-full aspect-square">
                <Skeleton class="!absolute !inset-0 !w-full !h-full" borderRadius="0" />
            </div>

            <!-- Indicator lines -->
            <div class="flex gap-1 px-3 py-2 bg-gray-100 border-t border-gray-200">
                <div v-for="n in 3" :key="n" class="h-[3px] flex-1 rounded-full bg-gray-200" />
            </div>

            <!-- Content -->
            <div class="p-3 sm:p-4 flex flex-col flex-1 gap-2">
                <Skeleton height="0.75rem" width="90%" borderRadius="4px" />
                <Skeleton height="0.75rem" width="55%" borderRadius="4px" />

                <div class="mt-auto pt-2 flex items-center justify-between gap-2">
                    <Skeleton height="1.25rem" width="4rem" borderRadius="4px" />
                    <Skeleton height="1.75rem" width="3.5rem" borderRadius="10px" />
                </div>
            </div>

        </div>
    </div>
</template>
