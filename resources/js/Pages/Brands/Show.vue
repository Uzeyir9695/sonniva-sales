<script setup>
import { Deferred, Head, Link } from '@inertiajs/vue3'
import GridSkeletonLoader from '@/Shared/skeletonLoaders/GridSkeletonLoader.vue'
import ItemsGrid from '@/Shared/components/ItemsGrid.vue'

defineProps({
    brand: String,
    items: Object,
})
</script>

<template>
    <Head :title="brand">
        <meta name="description" :content="$t('brands.showMetaDescription', { brand })" />
    </Head>

    <div class="min-h-[calc(100vh-80px)] max-lg:mx-4 py-6">
        <div class="mb-6">
            <Link :href="route('brands.index')" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <i class="pi pi-arrow-left text-xs"></i>
                {{ $t('brands.allBrands') }}
            </Link>
            <h1 class="mt-2 text-2xl sm:text-3xl font-bold uppercase text-gray-900">{{ brand }}</h1>
        </div>

        <Deferred data="items">
            <template #default>
                <ItemsGrid :items="items" is-sale-page />
            </template>
            <template #fallback>
                <GridSkeletonLoader is-sale-page />
            </template>
        </Deferred>
    </div>
</template>
