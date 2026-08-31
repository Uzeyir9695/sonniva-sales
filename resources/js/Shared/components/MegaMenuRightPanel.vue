<script setup>
import { computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const modules = [Autoplay]

const page = usePage()
const banners = computed(() => page.props.banners ?? {})

const mainImages  = computed(() => banners.value.main   ?? [])
const doorImages  = computed(() => banners.value.doors  ?? [])
const frameImages = computed(() => banners.value.frames ?? [])

// Fallback static images when nothing uploaded yet
const FALLBACK_MAIN   = [{ image_url: '/frame-examples/fur1.jpeg', item_slug: null }]
const FALLBACK_DOORS  = ['/door-examples/picture1.png', '/door-examples/picture2.png', '/door-examples/picture3.png']
const FALLBACK_FRAMES = ['/frame-examples/fur1.jpeg', '/frame-examples/fur2.jpeg', '/frame-examples/fur3.jpeg']

const mainSrc   = computed(() => mainImages.value.length   ? mainImages.value   : FALLBACK_MAIN)
const doorSrc   = computed(() => doorImages.value.length   ? doorImages.value   : FALLBACK_DOORS)
const frameSrc  = computed(() => frameImages.value.length  ? frameImages.value  : FALLBACK_FRAMES)
</script>

<template>
    <div class="grid grid-cols-5 gap-3 px-4 h-[calc(100vh-100px)]">

        <!-- Main banner: large left -->
        <div class="col-span-5 xl:col-span-3 xl:row-span-2 h-full relative rounded-xl overflow-hidden">
            <Swiper
                :modules="modules"
                :slides-per-view="1"
                :loop="mainSrc.length > 1"
                :autoplay="mainSrc.length > 1 ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true } : false"
                class="h-full w-full"
            >
                <SwiperSlide v-for="(slide, i) in mainSrc" :key="i" class="h-full!">
                    <Link v-if="slide.item_slug" :href="route('items.show', slide.item_slug)" class="block h-full w-full">
                        <img :src="slide.image_url" :alt="`main ${i + 1}`" class="w-full h-full object-cover sm:object-contain" />
                    </Link>
                    <img v-else :src="slide.image_url" :alt="`main ${i + 1}`" class="w-full h-full object-cover sm:object-contain" />
                </SwiperSlide>
            </Swiper>
        </div>

        <!-- Doors carousel: top right -->
        <div class="col-span-5 xl:col-span-2 h-full relative rounded-xl overflow-hidden">
            <Swiper
                :modules="modules"
                :slides-per-view="1"
                :loop="doorSrc.length > 1"
                :autoplay="doorSrc.length > 1 ? { delay: 5000, disableOnInteraction: false } : false"
                class="h-full w-full"
            >
                <SwiperSlide v-for="(src, i) in doorSrc" :key="i" class="h-full!">
                    <img :src="src" :alt="`door ${i + 1}`" class="w-full h-full object-cover" />
                </SwiperSlide>
            </Swiper>
            <div class="absolute bottom-0 left-0 right-0 p-4 z-10 flex items-center justify-between bg-black/50">
                <div>
                    <p class="text-white font-semibold text-sm">{{ $t('promo.doorsTitle') }}</p>
                    <p class="text-white/90 text-xs">{{ $t('promo.doorsText') }}</p>
                </div>
                <a href="https://frame.sonniva.ge/ka/doors" target="_blank" rel="noopener noreferrer"
                   class="flex items-center gap-x-1.5 shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors">
                    <span>{{ $t('common.view') }}</span>
                    <i class="pi pi-external-link text-xs"></i>
                </a>
            </div>
        </div>

        <!-- Frames carousel: bottom right -->
        <div class="col-span-5 xl:col-span-2 h-full relative rounded-xl overflow-hidden">
            <Swiper
                :modules="modules"
                :slides-per-view="1"
                :loop="frameSrc.length > 1"
                :autoplay="frameSrc.length > 1 ? { delay: 5000, disableOnInteraction: false } : false"
                class="h-full w-full"
            >
                <SwiperSlide v-for="(src, i) in frameSrc" :key="i" class="h-full!">
                    <img :src="src" :alt="`frame ${i + 1}`" class="w-full h-full object-cover" />
                </SwiperSlide>
            </Swiper>
            <div class="absolute bottom-0 left-0 right-0 p-4 z-10 flex items-center justify-between bg-black/50">
                <div>
                    <p class="text-white font-semibold text-sm">{{ $t('promo.framesTitle') }}</p>
                    <p class="text-white/90 text-xs">{{ $t('promo.framesText') }}</p>
                </div>
                <a href="https://frame.sonniva.ge/ka/frames/create" target="_blank" rel="noopener noreferrer"
                   class="flex items-center gap-x-1.5 shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors">
                    <span>{{ $t('common.view') }}</span>
                    <i class="pi pi-external-link text-xs"></i>
                </a>
            </div>
        </div>

    </div>
</template>
