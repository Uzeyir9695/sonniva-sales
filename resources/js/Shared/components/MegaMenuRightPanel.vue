<script setup>
import { computed, ref, onMounted } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const modules = [Autoplay]

// Swiper mutates the DOM on init; mounting it during SSR / before hydration
// makes Vue and Swiper fight over the same nodes (banners flash then vanish).
const mounted = ref(false)
onMounted(() => { mounted.value = true })

const page = usePage()
const banners = computed(() => page.props.banners ?? {})

const mainImages  = computed(() => banners.value.main   ?? [])
const doorImages  = computed(() => banners.value.doors  ?? [])
const frameImages = computed(() => banners.value.frames ?? [])

// Fallback static images when nothing uploaded yet
const FALLBACK_MAIN   = [{ image_url: '/frame-examples/fur1.jpeg', mobile_image_url: null, item_slug: null, category_slug: null }]
const FALLBACK_DOORS  = ['/door-examples/picture1.png', '/door-examples/picture2.png', '/door-examples/picture3.png']
const FALLBACK_FRAMES = ['/frame-examples/fur1.jpeg', '/frame-examples/fur2.jpeg', '/frame-examples/fur3.jpeg']

const mainSrc = computed(() => mainImages.value.length ? mainImages.value : FALLBACK_MAIN)

function slideHref(slide) {
    if (slide.item_slug) return route('items.show', slide.item_slug)
    if (slide.category_slug) return route('items.index', slide.category_slug)
    return undefined
}
const doorSrc   = computed(() => doorImages.value.length   ? doorImages.value   : FALLBACK_DOORS)
const frameSrc  = computed(() => frameImages.value.length  ? frameImages.value  : FALLBACK_FRAMES)
</script>

<template>
    <!-- Desktop: 2-row grid filling the viewport. Mobile: everything stacked. -->
    <div class="grid grid-cols-1 grid-rows-[minmax(0,1.4fr)_minmax(0,1fr)] gap-3 px-4 h-[calc(100vh-100px)] max-sm:flex max-sm:flex-col max-sm:h-auto">

        <!-- Main banner: full width -->
        <div v-if="mainSrc.length" class="relative w-full min-w-0 rounded-xl overflow-hidden min-h-0 max-sm:h-60">
            <Swiper
                v-if="mounted"
                :modules="modules"
                :slides-per-view="1"
                :loop="mainSrc.length > 1"
                :autoplay="mainSrc.length > 1 ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true } : false"
                class="h-full w-full"
            >
                <SwiperSlide v-for="(slide, i) in mainSrc" :key="i" class="h-full!">
                    <component
                        :is="slideHref(slide) ? Link : 'div'"
                        :href="slideHref(slide)"
                        class="block h-full w-full"
                    >
                        <picture class="block h-full w-full ring">
                            <source v-if="slide.mobile_image_url" :srcset="slide.mobile_image_url" media="(max-width: 639px)" />
                            <img :src="slide.image_url" :alt="`main ${i + 1}`" class="w-full h-full object-fill" />
                        </picture>
                    </component>
                </SwiperSlide>
            </Swiper>
            <picture v-else class="block h-full w-full">
                <source v-if="mainSrc[0].mobile_image_url" :srcset="mainSrc[0].mobile_image_url" media="(max-width: 639px)" />
                <img :src="mainSrc[0].image_url" alt="main" class="w-full h-full object-fill" />
            </picture>
        </div>

        <!-- Promo banners row: doors + frames side by side. Add a third here and
             bump this to sm:grid-cols-3. Stacked on small screens. -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 min-h-0 min-w-0">

            <!-- Doors carousel -->
            <div class="relative rounded-xl overflow-hidden min-h-0 max-sm:h-56">
                <Swiper
                    v-if="mounted"
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
                <img v-else :src="doorSrc[0]" alt="door" class="w-full h-full object-cover" />
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

            <!-- Frames carousel -->
            <div class="relative rounded-xl overflow-hidden min-h-0 max-sm:h-56">
                <Swiper
                    v-if="mounted"
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
                <img v-else :src="frameSrc[0]" alt="frame" class="w-full h-full object-cover" />
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

    </div>
</template>
