<script setup>
import { usePage } from '@inertiajs/vue3';
import LargeDeviceMegaMenu from '@/Shared/menu/LargeDeviceMegaMenu.vue';
import MegaMenuRightPanel from '@/Shared/components/MegaMenuRightPanel.vue';
import SwiperCarousel from '@/Shared/components/SwiperCarousel.vue';

const page = usePage();
const categories = page.props.categories ?? [];

const demoItem = (id, name, price, inStock = true) => ({
    id,
    name,
    slug: `demo-item-${id}`,
    unit_price: price,
    inventory: inStock ? 10 : 0,
    images: [],
});

const demoCarousels = [
    {
        title: 'სახელურები და ანჯამები',
        items: Array.from({ length: 10 }, (_, i) => demoItem(i + 1, `სახელური მოდელი ${i + 1}`, (4.5 + i * 0.8).toFixed(2))),
    },
    {
        title: 'კარის სახსრები',
        items: Array.from({ length: 10 }, (_, i) => demoItem(i + 11, `სახსარი ტიპი ${i + 1}`, (12 + i * 1.5).toFixed(2))),
    },
    {
        title: 'ავეჯის ფეხები',
        items: Array.from({ length: 10 }, (_, i) => demoItem(i + 21, `ფეხი სტილი ${i + 1}`, (8 + i * 2).toFixed(2), i % 3 !== 0)),
    },
    {
        title: 'სარდაფები და კეტები',
        items: Array.from({ length: 10 }, (_, i) => demoItem(i + 31, `კეტი სერია ${i + 1}`, (6.5 + i * 1.2).toFixed(2))),
    },
    {
        title: 'სამშენებლო მასალები',
        items: Array.from({ length: 10 }, (_, i) => demoItem(i + 41, `მასალა ${i + 1}`, (25 + i * 5).toFixed(2), i % 4 !== 0)),
    },
];
</script>

<template>
    <div class="flex gap-x-4 mt-4">
        <LargeDeviceMegaMenu class="hidden lg:flex" :categories="categories"/>
        <div class="flex-1 rounded-lg">
            <MegaMenuRightPanel/>
        </div>
    </div>

    <div class="mt-8 flex flex-col gap-10">
        <SwiperCarousel
            v-for="carousel in demoCarousels"
            :key="carousel.title"
            :items="carousel.items"
            :mousewheel="false"
        />
    </div>
</template>
