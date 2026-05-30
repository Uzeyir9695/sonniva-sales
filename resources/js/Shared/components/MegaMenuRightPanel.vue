<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const modules = [Autoplay];
</script>

<template>
    <div class="grid grid-cols-5 gap-3 px-4 h-[calc(100vh-100px)]">

        <!-- Door carousel: col 1-3, rows 1-2 -->
        <div class="col-span-5 xl:col-span-3 h-full relative rounded-xl overflow-hidden">
            <Swiper
                :modules="modules"
                :slides-per-view="1"
                :loop="true"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                class="h-full w-full"
            >
                <SwiperSlide v-for="n in [1, 2, 3]" :key="n" class="h-full!">
                    <img :src="`/door-examples/picture${n}.png`" :alt="`door ${n}`" class="w-full h-full object-cover" />
                </SwiperSlide>
            </Swiper>
            <div class="absolute bottom-0 left-0 right-0 p-4 z-10 flex items-center justify-between bg-black/50">
                <div>
                    <p class="text-white font-semibold text-sm">მემბრანული კარები</p>
                    <p class="text-white/90 text-xs">შეუკვეთეთ მემბრანული კარები თქვენთვის სასურველ ზომებში და ფერებში</p>
                </div>
                <a href="https://frame.sonniva.ge/ka/frames/create" target="_blank" rel="noopener noreferrer"
                   class="flex items-center gap-x-1.5 shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors">
                    <span>იხილეთ</span>
                    <i class="pi pi-external-link text-xs"></i>
                </a>
            </div>
        </div>

        <!-- Frame card 1: col 4-5, row 1 -->
        <div class="hidden xl:block col-span-2 row-span-2 relative rounded-xl overflow-hidden">
            <img src="/frame-examples/fur1.jpeg" alt="frame" class="w-full h-full object-cover" />
        </div>

        <!-- Frame card 2: col 4-5, row 2 -->
        <div class="col-span-5 xl:col-span-3 h-full relative rounded-xl overflow-hidden">
            <Swiper
                :modules="modules"
                :slides-per-view="1"
                :loop="true"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                class="h-full w-full"
            >
                <SwiperSlide v-for="n in [1, 2, 3]" :key="n" class="h-full!">
                    <img :src="`/frame-examples/fur${n}.jpeg`" :alt="`door ${n}`" class="w-full h-full object-cover" />
                </SwiperSlide>
            </Swiper>
            <div class="absolute bottom-0 left-0 right-0 p-4 z-10 flex items-center justify-between bg-black/50">
                <div>
                    <p class="text-white font-semibold text-sm">ალუმინის ჩარჩოები</p>
                    <p class="text-white/90 text-xs">ჩვენ ვამზადებთ ალუმინის ჩარჩოებს თქვენთვის სასურველ ზომებში</p>
                </div>
                <a href="https://frame.sonniva.ge/ka/doors" target="_blank" rel="noopener noreferrer"
                   class="flex items-center gap-x-1.5 shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors">
                    <span>იხილეთ</span>
                    <i class="pi pi-external-link text-xs"></i>
                </a>
            </div>
        </div>

        <!-- Feature cards: col 1-5, row 3 -->
        <div class="col-span-5 grid grid-cols-3 gap-3">
            <div class="flex items-center gap-3 bg-blue-50 rounded-2xl px-4 py-3">
                <span class="text-2xl shrink-0">🚚</span>
                <div>
                    <p class="text-xs font-semibold text-gray-800">უფასო მიწოდება</p>
                    <p class="text-xs text-gray-400">100₾+</p>
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
