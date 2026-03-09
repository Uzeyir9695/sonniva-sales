<script setup>
import { computed } from 'vue'
import { Deferred, Link } from '@inertiajs/vue3'
import ItemsGrid from '@/Shared/components/ItemsGrid.vue'
import GridSkeletonLoader from '@/Shared/skeletonLoaders/GridSkeletonLoader.vue'
import { useWishlist } from '@/composables/useWishlist'

const props = defineProps({
    items: { type: Object, required: true },
})

const { isWishlisted } = useWishlist()

// Filter out items that have been un-wishlisted client-side
const filteredItems = computed(() => ({
    ...props.items,
    data: (props.items?.data ?? []).filter(item => isWishlisted(item.id)),
}))
</script>

<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div v-if="filteredItems?.data.length" class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-lg sm:text-2xl font-bold text-gray-900">სურვილების სია</h1>
                <p class="text-gray-500 text-sm mt-1">
                    {{ filteredItems.data.length }}
                    {{ filteredItems.data.length === 1 ? 'პროდუქტია შენახული' : 'შენახული' }}
                </p>
            </div>
        </div>

        <div
            v-if="!filteredItems?.data.length"
            class="flex flex-col items-center justify-center py-24 text-center"
        >
            <i class="pi pi-heart text-gray-300 text-6xl mb-6"></i>
            <h2 class="text-lg font-semibold text-gray-700 mb-2">თქვენი სურვილების სია ცარიელია</h2>
            <p class="text-gray-500 text-sm mb-6 max-w-xs">
                შეინახე ის რაც მოგწონს და დაუბრუნდი ნებისმიერ დროს.
            </p>
            <Link
                :href="route('home')"
                class="inline-flex items-center gap-2 bg-primary text-white
                       rounded-full px-6 py-2.5 text-sm font-medium hover:bg-primary-dark
                       transition-colors duration-200"
            >
                დაიწყე შოპინგი
            </Link>
        </div>

        <Deferred v-else data="items">
            <template #default>
                <ItemsGrid :items="filteredItems" />
            </template>
            <template #fallback>
                <GridSkeletonLoader />
            </template>
        </Deferred>

    </div>
</template>
