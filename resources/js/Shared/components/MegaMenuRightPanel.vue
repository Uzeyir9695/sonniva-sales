<script setup>
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
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
const FALLBACK_MAIN   = ['/frame-examples/fur1.jpeg']
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
                :autoplay="mainSrc.length > 1 ? { delay: 5000, disableOnInteraction: false } : false"
                class="h-full w-full"
            >
                <SwiperSlide v-for="(src, i) in mainSrc" :key="i" class="h-full!">
                    <img :src="src" :alt="`main ${i + 1}`" class="w-full h-full object-cover sm:object-contain" />
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
                    <img :src="src" :alt="`door ${i + 1}`" class="w-full h-full object-cover sm:object-contain" />
                </SwiperSlide>
            </Swiper>
            <div class="absolute bottom-0 left-0 right-0 p-4 z-10 flex items-center justify-between bg-black/50">
                <div>
                    <p class="text-white font-semibold text-sm">მემბრანული კარები</p>
                    <p class="text-white/90 text-xs">შეუკვეთეთ მემბრანული კარები თქვენთვის სასურველ ზომებში და ფერებში</p>
                </div>
                <a href="https://frame.sonniva.ge/ka/doors" target="_blank" rel="noopener noreferrer"
                   class="flex items-center gap-x-1.5 shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors">
                    <span>იხილეთ</span>
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
                    <img :src="src" :alt="`frame ${i + 1}`" class="w-full h-full object-cover sm:object-contain" />
                </SwiperSlide>
            </Swiper>
            <div class="absolute bottom-0 left-0 right-0 p-4 z-10 flex items-center justify-between bg-black/50">
                <div>
                    <p class="text-white font-semibold text-sm">ალუმინის ჩარჩოები</p>
                    <p class="text-white/90 text-xs">ჩვენ ვამზადებთ ალუმინის ჩარჩოებს თქვენთვის სასურველ ზომებში</p>
                </div>
                <a href="https://frame.sonniva.ge/ka/frames/create" target="_blank" rel="noopener noreferrer"
                   class="flex items-center gap-x-1.5 shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors">
                    <span>იხილეთ</span>
                    <i class="pi pi-external-link text-xs"></i>
                </a>
            </div>
        </div>

        <!-- Feature cards -->
        <div class="col-span-5 grid grid-cols-1 xl:grid-cols-3 gap-3">
            <div class="flex items-center gap-3 bg-blue-50 rounded-2xl px-4 py-3">
                <span class="text-2xl shrink-0">🚚</span>
                <div>
                    <p class="text-xs font-semibold text-gray-800">უფასო მიწოდება თბილისში</p>
                    <p class="text-xs text-gray-400">500₾+</p>
                </div>
            </div>
            <div class="flex items-center gap-3 bg-pink-50 rounded-2xl px-4 py-3">
                <span class="text-2xl shrink-0">💎</span>
                <div>
                    <p class="text-xs font-semibold text-gray-800">ტოპ ბრენდები</p>
                    <p class="text-xs text-gray-400">პრემიუმ ხარისხი</p>
                </div>
            </div>
            <div class="flex items-center gap-3 bg-amber-50 rounded-2xl px-4 py-3">
                <span class="text-2xl shrink-0">⭐</span>
                <div>
                    <p class="text-xs font-semibold text-gray-800">ტოპ სელერი</p>
                    <p class="text-xs text-gray-400">პოპულარული</p>
                </div>
            </div>
        </div>

    </div>
</template>
