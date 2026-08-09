<script setup>
import SwiperCarousel from '@/Shared/components/SwiperCarousel.vue'

defineProps({
    section: { type: Object, required: true },
})
</script>

<template>
    <div v-if="section.items?.length || section.images?.length">
        <div v-if="section.images?.length" class="mt-10 px-4 mb-6">
            <h2 v-if="section.gallery_title" class="sm:text-lg font-semibold text-gray-800 mb-4">
                {{ section.gallery_title }}
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <component
                    :is="image.link_url ? 'a' : 'div'"
                    v-for="image in section.images"
                    :key="image.id"
                    :href="image.link_url || undefined"
                    class="relative block h-[500px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-100"
                >
                    <img :src="image.image_url" :alt="image.title || ''" class="w-full h-full object-cover" />
                    <span
                        v-if="image.title"
                        class="absolute bottom-0 inset-x-0 px-3 py-2 text-sm font-medium text-white bg-black/50 truncate"
                    >{{ image.title }}</span>
                </component>
            </div>
        </div>

        <SwiperCarousel
            v-if="section.items?.length"
            :title="section.carousel_title"
            :items="section.items"
            :mousewheel="false"
        />
    </div>
</template>