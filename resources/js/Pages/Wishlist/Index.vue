<template>
    <!-- Pages/Wishlist/Index.vue -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">My Wishlist</h1>
                    <p class="text-gray-500 text-sm mt-1">
                        {{ items.data.length }}
                    </p>
                </div>
            </div>

            <!-- Empty state -->
            <div
                v-if="!items.data.length"
                class="flex flex-col items-center justify-center py-24 text-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    class="text-gray-300 mb-6"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06
                   a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23
                   l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <h2 class="text-lg font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
                <p class="text-gray-500 text-sm mb-6 max-w-xs">
                    Save items you love and come back to them anytime.
                </p>
                <Link
                    href="/"
                    class="inline-flex items-center gap-2 bg-primary text-white
                 rounded-full px-6 py-2.5 text-sm font-medium hover:bg-primary-dark
                 transition-colors duration-200"
                >
                    Start shopping
                </Link>
            </div>

            <!-- Grid -->
            <div
                v-else
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
                <div
                    v-for="item in items.data"
                    :key="item.id"
                    class="group relative"
                >
                    <!-- Item card -->
                    <Link :href="`/item/${item.slug}`" class="block">
                        <div class="relative overflow-hidden rounded-xl bg-gray-50 aspect-square">
                            <img
                                :src="item.image_url"
                                :alt="item.name"
                                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                            <!-- Remove button overlay -->
                            <div class="absolute top-2 right-2">
                                <WishlistButton :item-id="item.id" size="sm" />
                            </div>
                        </div>
                        <div class="mt-2 px-1">
                            <p class="text-sm text-gray-800 font-medium line-clamp-2 leading-snug">
                                {{ item.name }}
                            </p>
                            <p class="text-sm font-bold text-gray-900 mt-1">
                                {{ item.formatted_price }}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
</template>

<script setup>
import { Link }        from '@inertiajs/vue3'
import WishlistButton  from '../../Shared/components/WishlistButton.vue'

defineProps({
    items: { type: Object, required: true },
})
</script>
