<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { router } from '@inertiajs/vue3';

defineProps({
    items: Array,
});

const modules = [Navigation, Pagination, Mousewheel, Keyboard];

function goToItem(item) {
    router.get(route('items.show', item.slug));
}
</script>

<template>
    <div v-if="items?.length" class="mt-10 px-4 mb-6">
        <h2 class="sm:text-lg font-semibold text-gray-800 mb-4">მსგავსი პროდუქტები</h2>

        <Swiper
            :modules="modules"
            :space-between="16"
            :navigation="true"
            :pagination="{ clickable: true }"
            :mousewheel="true"
            :keyboard="true"
            :breakpoints="{
                320:  { slidesPerView: 2 },
                640:  { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
            }"
        >
            <SwiperSlide v-for="item in items" :key="item.id" :zoom="true">
                <div
                    @click="goToItem(item)"
                    class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                    <!-- Image -->
                    <div class="aspect-square overflow-hidden bg-gray-50">
                        <img
                            v-if="item.images?.length"
                            :src="`/storage/items/${item.images[0]}`"
                            :alt="item.name"
                            class="w-full h-full object-cover"
                        />
                        <div v-else class="w-full h-full flex items-center justify-center">
                            <i class="pi pi-image text-3xl text-gray-300"></i>
                        </div>
                    </div>

                    <!-- Info -->
                    <div class="p-3">
                        <p class="text-xs text-gray-700 line-clamp-2 mb-2 leading-snug">{{ item.name }}</p>

                        <div class="flex flex-col sm:flex-row gap-2 items-center justify-between">
                            <span class="text-sm font-bold text-brand-500">₾{{ item.unit_price }}</span>

                            <div
                                class="flex items-center gap-x-1 text-xs px-2.5 py-0.5 rounded-full font-medium tracking-wide"
                                :class="item.inventory > 0
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-red-100 text-red-600'"
                            >
                                <div v-if="item.inventory > 0" class="w-2 h-2 rounded-full bg-emerald-700 animate-pulse"></div>
                                <div v-if="!item.inventory > 0" class="w-2 h-2 rounded-full bg-red-500"></div>
                                <span>{{ item.inventory > 0 ? 'მარაგშია' : 'მარაგში არაა' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style>
.swiper-button-next,
.swiper-button-prev {
    color: #f59e0b;
    background: white;
    width: 30px !important;
    height: 30px !important;
    padding: 7px !important;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}

</style>
