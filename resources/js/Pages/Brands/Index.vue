<script setup>
import { Head, Link } from '@inertiajs/vue3'

defineProps({
    brands: Array,
})
</script>

<template>
    <Head :title="$t('brands.title')">
        <meta name="description" :content="$t('brands.metaDescription')" />
    </Head>

    <div class="min-h-[calc(100vh-80px)] max-lg:mx-4 pt-4 pb-6">
        <div class="mb-6 rounded-2xl bg-linear-to-r from-neutral-950 via-neutral-900 to-brand-500 px-6 sm:px-10 py-8 sm:py-14">
            <h1 class="text-2xl sm:text-4xl font-bold text-white">{{ $t('brands.heading') }}</h1>
            <p class="mt-2 max-w-md text-sm sm:text-lg text-white/80">{{ $t('brands.subheading') }}</p>
        </div>

        <div v-if="brands.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            <Link
                v-for="brand in brands"
                :key="brand.name"
                :href="route('brands.show', { brand: brand.name })"
                class="group flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition-colors hover:border-brand-500 hover:bg-brand-50"
            >
                <span class="truncate text-sm font-semibold uppercase tracking-wide text-gray-800 group-hover:text-gray-950">{{ brand.name }}</span>
                <span class="shrink-0 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 group-hover:bg-white">{{ brand.items_count }}</span>
            </Link>
        </div>

        <div v-else class="flex flex-col items-center justify-center h-72 text-center">
            <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <i class="pi pi-tags text-3xl text-gray-300"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-500">{{ $t('brands.empty') }}</h3>
        </div>
    </div>
</template>
