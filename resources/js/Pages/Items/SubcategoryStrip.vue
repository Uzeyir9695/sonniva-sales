<script setup>
import { Link } from '@inertiajs/vue3'

defineProps({
    categories: { type: Array, required: true },
    currentSlug: { type: String, default: null },
})
</script>

<template>
    <section class="bg-white border-b border-gray-100">
        <div class="max-w-screen-2xl max-sm:px-3 py-5">
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2 sm:gap-3">
                <Link
                    v-for="cat in categories"
                    :key="cat.slug"
                    :href="route('items.index', [cat.slug])"
                    class="group flex flex-col items-center gap-2.5 p-1 sm:p-2 rounded-2xl transition-all duration-200"
                    :class="cat.slug === currentSlug ? 'bg-brand-50/30' : 'hover:bg-gray-50'"
                >
                    <!-- Image box -->
                    <div
                        class="w-full aspect-square rounded-xl overflow-hidden bg-gray-50 ring-1 flex items-center justify-center p-2.5 transition-all duration-200"
                        :class="cat.slug === currentSlug
                            ? 'ring-brand-400 bg-brand-50/30 shadow-md'
                            : 'ring-gray-100 group-hover:ring-brand-300 group-hover:bg-brand-50/30 group-hover:shadow-md'"
                    >
                        <img
                            v-if="cat.image"
                            :src="`/storage/categories/${cat.image}`"
                            :alt="cat.name"
                            loading="lazy"
                            class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                        <i v-else class="pi pi-tag text-2xl text-gray-300" />
                    </div>

                    <!-- Name -->
                    <span
                        class="w-full text-center text-[11px] sm:text-xs leading-snug transition-colors duration-200 line-clamp-2"
                        :class="cat.slug === currentSlug ? 'text-brand-500 font-semibold' : 'text-gray-600 font-medium group-hover:text-brand-500'"
                    >
                        {{ cat.name }}
                    </span>
                </Link>
            </div>
        </div>
    </section>
</template>
