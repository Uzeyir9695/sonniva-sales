<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { ZoomImg } from 'vue3-zoomer';

const props = defineProps({
    images: Array,
    itemName: String,
});

const modules = [Thumbs, Navigation];
const thumbsSwiper = ref(null);

function setThumbsSwiper(swiper) {
    thumbsSwiper.value = swiper;
}

const imageUrl = (img) => `/storage/items/${img}`;
</script>

<template>
    <div class="flex flex-col gap-3">

        <!-- Main Swiper -->
        <Swiper
            :modules="modules"
            :thumbs="{ swiper: thumbsSwiper }"
            :navigation="true"
            :loop="images.length > 1"
            class="main-gallery w-full rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-[270px] sm:h-[500px]"
        >
            <SwiperSlide v-for="(img, i) in images" :key="i">
                <ZoomImg
                    :src="imageUrl(img)"
                    :alt="itemName"
                    class="w-full h-full object-cover"
                    zoom-type="move"
                    trigger="click"
                    :zoom-scale="4"
                    :step="1"
                    :show-zoom-btns="false"
                />
            </SwiperSlide>
        </Swiper>

        <!-- Thumbs Swiper -->
        <Swiper
            v-if="images.length > 1"
            :modules="modules"
            watch-slides-progress
            @swiper="setThumbsSwiper"
            :slides-per-view="6"
            :space-between="8"
            :free-mode="true"
            class="thumbs-gallery w-full mt-2"
        >
            <SwiperSlide v-for="(img, i) in images" :key="i">
                <div class="w-full aspect-square rounded-xl overflow-hidden border-2 border-transparent cursor-pointer transition-all">
                    <img :src="imageUrl(img)" :alt="itemName" class="w-full h-full object-cover" />
                </div>
            </SwiperSlide>
        </Swiper>

    </div>
</template>

<style>
.main-gallery .swiper-button-next,
.main-gallery .swiper-button-prev {
    color: white;
    background: rgba(0,0,0,0.3);
    width: 30px !important;
    height: 30px !important;
    padding: 7px !important;
    border-radius: 50%;
}


/* Active thumb highlight */
.thumbs-gallery .swiper-slide-thumb-active div {
    border-color: #f59e0b;
    opacity: 1;
}
.thumbs-gallery .swiper-slide div {
    opacity: 0.5;
    transition: opacity 0.2s, border-color 0.2s;
}
.thumbs-gallery .swiper-slide-thumb-active div {
    opacity: 1;
}
</style>
