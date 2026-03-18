<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ref } from 'vue';
import ItemCard from '@/Shared/components/ItemCard.vue';
import QuickViewDialog from '@/Shared/components/QuickViewDialog.vue';

defineProps({
    items: Array,
    title: String,
    mousewheel: {
        type: Boolean,
        default: true,
    },
});

const modules = [Navigation, Pagination, Mousewheel, Keyboard];

const quickViewItem = ref(null);
const quickViewOpen = ref(false);

function openQuickView(item) {
    quickViewItem.value = item;
    quickViewOpen.value = true;
}
</script>

<template>
    <div v-if="items?.length" class="mt-10 px-4 mb-6">
        <h2 class="sm:text-lg font-semibold text-gray-800 mb-4">{{ title }}</h2>

        <Swiper
            :modules="modules"
            :space-between="16"
            :navigation="true"
            :pagination="{ clickable: true }"
            :mousewheel="mousewheel"
            :keyboard="true"
            :breakpoints="{
                320:  { slidesPerView: 2 },
                640:  { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
            }"
        >
            <SwiperSlide v-for="item in items" :key="item.id">
                <ItemCard :item="item" @quick-view="openQuickView" />
            </SwiperSlide>
        </Swiper>

        <QuickViewDialog v-model:visible="quickViewOpen" :item="quickViewItem" />
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
