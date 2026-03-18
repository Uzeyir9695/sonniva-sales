<script setup>
import { usePage } from '@inertiajs/vue3';
import LargeDeviceMegaMenu from '@/Shared/menu/LargeDeviceMegaMenu.vue';
import MegaMenuRightPanel from '@/Shared/components/MegaMenuRightPanel.vue';
import SwiperCarousel from '@/Shared/components/SwiperCarousel.vue';

const page = usePage();
const categories = page.props.categories ?? [];

defineProps({
    carouselItems: {
        type: Array,
        default: []
    }
})

</script>

<template>
    <div class="flex gap-x-4 mt-4">
        <LargeDeviceMegaMenu class="hidden lg:flex" :categories="categories"/>
        <div class="flex-1 rounded-lg">
            <MegaMenuRightPanel/>
        </div>
    </div>

    <div class="flex flex-col">
        <SwiperCarousel
            v-for="carousel in carouselItems"
            :key="carousel.title"
            :title="carousel.title"
            :items="carousel.items"
            :mousewheel="false"
        />
    </div>
</template>
