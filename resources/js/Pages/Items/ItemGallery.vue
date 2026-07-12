<script setup>
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { ZoomImg } from 'vue3-zoomer';

const props = defineProps({
    images: Array,
    itemName: String,
    imagePath: String,
    videoUrl: { type: String, default: null },
});

const modules = [Thumbs, Navigation];
const thumbsSwiper = ref(null);

function setThumbsSwiper(swiper) {
    thumbsSwiper.value = swiper;
}

// Admins paste the link from YouTube's Share button, e.g. https://youtu.be/CklcjGBB7B8?si=...
function extractYoutubeId(url) {
    if (!url) return null;
    const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
}

const videoId = computed(() => extractYoutubeId(props.videoUrl));

// Combined slide list: images first, then the video (if any) as the last slide.
const slides = computed(() => {
    const list = props.images.map((img) => ({ type: 'image', src: img }));
    if (videoId.value) {
        list.push({ type: 'video', id: videoId.value });
    }
    return list;
});
</script>

<template>
    <div class="flex flex-col gap-3">

        <!-- No image/video placeholder -->
        <div
            v-if="!slides.length"
            class="w-full rounded-3xl border border-gray-100 shadow-sm h-[270px] sm:h-[500px] bg-gray-50 flex flex-col items-center justify-center gap-3 text-gray-300"
        >
            <i class="pi pi-image text-6xl"></i>
            <span class="text-sm">სურათი არ არის</span>
        </div>

        <!-- Main Swiper -->
        <div v-else class="relative">
            <slot name="badge" />

            <Swiper
                :modules="modules"
                :thumbs="{ swiper: thumbsSwiper }"
                :navigation="true"
                :loop="slides.length > 1"
                class="main-gallery w-full rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-[270px] sm:h-[500px]"
            >
                <SwiperSlide v-for="(slide, i) in slides" :key="i" class="bg-white flex items-center justify-center">
                    <img
                        v-if="slide.type === 'image'"
                        :src="`${imagePath}/${slide.src}`"
                        :alt="itemName"
                        class="max-w-[500px] mx-auto h-full object-cover"
                    >
                    <iframe
                        v-else
                        :src="`https://www.youtube.com/embed/${slide.id}`"
                        :title="itemName"
                        class="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </SwiperSlide>
            </Swiper>
        </div>

        <!-- Thumbs Swiper -->
        <Swiper
            v-if="slides.length > 1"
            :modules="modules"
            watch-slides-progress
            @swiper="setThumbsSwiper"
            :slides-per-view="6"
            :space-between="8"
            :free-mode="true"
            class="thumbs-gallery w-full mt-2"
        >
            <SwiperSlide v-for="(slide, i) in slides" :key="i">
                <div class="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-transparent cursor-pointer transition-all">
                    <img
                        v-if="slide.type === 'image'"
                        :src="`${imagePath}/${slide.src}`"
                        :alt="itemName"
                        class="w-full h-full object-cover"
                    />
                    <template v-else>
                        <img
                            :src="`https://img.youtube.com/vi/${slide.id}/hqdefault.jpg`"
                            :alt="itemName"
                            class="w-full h-full object-cover"
                        />
                        <div class="absolute inset-0 flex items-center justify-center bg-black/20">
                            <i class="pi pi-play-circle text-white text-xl"></i>
                        </div>
                    </template>
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
