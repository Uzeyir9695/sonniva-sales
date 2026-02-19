<script setup>
import {Link, usePage} from '@inertiajs/vue3';
import { computed, ref } from "vue";

const page = usePage();
const user = computed(() => page.props.user);
const isAuthenticated = computed(() => page.props.isLoggedIn);

const activeCategory = ref(null)

const categories = [
    {
        name: 'Women',
        icon: '👗',
        subs: [
            { name: 'Dresses', items: ['Maxi Dresses', 'Mini Dresses', 'Midi Dresses', 'Evening Gowns', 'Summer Dresses'] },
            { name: 'Tops & Shirts', items: ['T-Shirts', 'Blouses', 'Crop Tops', 'Tank Tops', 'Knitwear'] },
            { name: 'Bottoms', items: ['Skinny Jeans', 'Wide-Leg Jeans', 'Mini Skirts', 'Shorts', 'Leggings'] },
            { name: 'Shoes', items: ['Heels', 'Flats', 'Sneakers', 'Ankle Boots', 'Sandals'] },
            { name: 'Bags', items: ['Handbags', 'Tote Bags', 'Backpacks', 'Clutches'] },
            { name: 'Accessories', items: ['Scarves', 'Belts', 'Sunglasses', 'Hats'] },
        ]
    },
    {
        name: 'Men',
        icon: '👔',
        subs: [
            { name: 'Tops', items: ['T-Shirts', 'Shirts', 'Polo Shirts', 'Hoodies', 'Jackets'] },
            { name: 'Bottoms', items: ['Jeans', 'Chinos', 'Shorts', 'Joggers', 'Trousers'] },
            { name: 'Shoes', items: ['Sneakers', 'Loafers', 'Boots', 'Formal Shoes', 'Sandals'] },
            { name: 'Accessories', items: ['Watches', 'Belts', 'Wallets', 'Sunglasses'] },
        ]
    },
    {
        name: 'Electronics',
        icon: '📱',
        subs: [
            { name: 'Phones', items: ['Smartphones', 'Cases & Covers', 'Chargers', 'Screen Protectors'] },
            { name: 'Computers', items: ['Laptops', 'Desktops', 'Monitors', 'Keyboards', 'Mice'] },
            { name: 'Audio', items: ['Headphones', 'Earbuds', 'Speakers', 'Soundbars'] },
            { name: 'TV & Home', items: ['Smart TVs', 'Streaming Devices', 'Projectors', 'Remote Controls'] },
        ]
    },
    {
        name: 'Home & Living',
        icon: '🏠',
        subs: [
            { name: 'Furniture', items: ['Sofas', 'Beds', 'Tables', 'Chairs', 'Wardrobes'] },
            { name: 'Kitchen', items: ['Cookware', 'Appliances', 'Dinnerware', 'Storage'] },
            { name: 'Decor', items: ['Wall Art', 'Candles', 'Rugs', 'Cushions', 'Plants'] },
            { name: 'Bedding', items: ['Duvets', 'Pillows', 'Sheets', 'Blankets'] },
        ]
    },
    {
        name: 'Beauty',
        icon: '💄',
        subs: [
            { name: 'Skincare', items: ['Moisturizers', 'Serums', 'Sunscreen', 'Cleansers', 'Face Masks'] },
            { name: 'Makeup', items: ['Foundation', 'Lipstick', 'Mascara', 'Eyeshadow', 'Blush'] },
            { name: 'Hair Care', items: ['Shampoo', 'Conditioner', 'Hair Masks', 'Styling'] },
            { name: 'Fragrance', items: ['Perfumes', 'Body Sprays', 'Diffusers'] },
        ]
    },
    {
        name: 'Sports',
        icon: '⚽',
        subs: [
            { name: 'Clothing', items: ['Activewear', 'Swimwear', 'Tracksuits', 'Sports Bras'] },
            { name: 'Equipment', items: ['Gym Equipment', 'Yoga Mats', 'Resistance Bands', 'Weights'] },
            { name: 'Footwear', items: ['Running Shoes', 'Football Boots', 'Gym Trainers', 'Hiking Boots'] },
        ]
    },
    {
        name: 'Kids & Baby',
        icon: '🧸',
        subs: [
            { name: 'Clothing', items: ['Boys Clothing', 'Girls Clothing', 'Baby Bodysuits', 'School Wear'] },
            { name: 'Toys', items: ['Action Figures', 'Dolls', 'Board Games', 'Building Sets', 'Outdoor Toys'] },
            { name: 'Baby Gear', items: ['Strollers', 'Car Seats', 'Baby Monitors', 'Feeding'] },
        ]
    },
    {
        name: 'Jewellery',
        icon: '💍',
        subs: [
            { name: 'Necklaces', items: ['Gold Necklaces', 'Silver Necklaces', 'Pendants', 'Chains'] },
            { name: 'Rings', items: ['Engagement Rings', 'Wedding Bands', 'Fashion Rings', 'Stackable'] },
            { name: 'Earrings', items: ['Studs', 'Hoops', 'Drop Earrings', 'Ear Cuffs'] },
            { name: 'Bracelets', items: ['Bangles', 'Charm Bracelets', 'Tennis Bracelets', 'Cuffs'] },
        ]
    },
    {
        name: 'Books & Media',
        icon: '📚',
        subs: [
            { name: 'Books', items: ['Fiction', 'Non-Fiction', 'Self Help', 'Children\'s Books', 'Textbooks'] },
            { name: 'Music', items: ['Vinyl Records', 'CDs', 'Instruments', 'Sheet Music'] },
            { name: 'Movies', items: ['Blu-ray', 'DVD', 'Documentaries', 'Box Sets'] },
        ]
    },
    {
        name: 'Sale 🔥',
        icon: '',
        subs: null
    },
]
</script>

<template>
    <div class="flex-col">
        <nav class="bg-white border-b border-gray-200 shadow-sm">
            <div class="max-w-7xl mx-auto px-6 h-20 flex items-center gap-4">

                <!-- Logo -->
                <a href="/" class="flex items-center gap-2 shrink-0">
                    <div class="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center">
                        <i class="pi pi-bolt text-amber-400 text-sm"></i>
                    </div>
                    <span class="font-bold text-gray-900 text-xl tracking-wide">LUXE</span>
                </a>

                <!-- Search Bar -->
                <div class="flex items-center bg-gray-100 rounded-xl px-4 h-11 gap-3 focus-within:ring-2 focus-within:ring-amber-400 focus-within:bg-white transition-all flex-[4]">
                    <i class="pi pi-search text-gray-400 text-sm shrink-0"></i>
                    <input
                        type="text"
                        placeholder="Search products..."
                        class="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                    />
                </div>

                <!-- Contact Number -->
                <a href="tel:+1234567890" class="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors shrink-0">
                    <i class="pi pi-phone text-amber-500"></i>
                    <span class="text-sm font-medium whitespace-nowrap">+1 (234) 567-890</span>
                </a>

                <!-- Icons -->
                <div class="flex items-center gap-1 shrink-0">
                    <a href="/wishlist" class="relative p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all">
                        <i class="pi pi-heart text-lg"></i>
                        <span class="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">5</span>
                    </a>
                    <a href="/cart" class="relative p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all">
                        <i class="pi pi-shopping-cart text-lg"></i>
                        <span class="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
                    </a>
                    <a href="/login" class="p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all">
                        <i class="pi pi-user text-lg"></i>
                    </a>
                </div>
            </div>
        </nav>

        <!-- Category Sidebar + Mega Menu -->
        <div class="relative flex" @mouseleave="activeCategory = null">

            <!-- Left Category List -->
            <div class="w-64 bg-gray-900 shrink-0">
                <div
                    v-for="category in categories"
                    :key="category.name"
                    @mouseenter="activeCategory = category"
                    class="flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors"
                    :class="activeCategory?.name === category.name ? 'bg-white' : 'hover:bg-gray-800'"
                >
                    <div class="flex items-center gap-3">
                        <span class="text-lg">{{ category.icon }}</span>
                        <span
                            class="text-sm font-medium"
                            :class="[category.name === 'Sale' ? 'text-amber-400' : activeCategory?.name === category.name ? 'text-gray-900' : 'text-gray-100']"
                        >{{ category.name }}</span>
                    </div>
                    <i class="pi pi-chevron-right text-xs" :class="activeCategory?.name === category.name ? 'text-gray-400' : 'text-gray-500'"></i>
                </div>
            </div>

            <!-- Mega Menu Panel -->
            <div
                v-if="activeCategory && activeCategory.subs"
                class="absolute left-64 top-0 z-50 bg-white border border-gray-200 shadow-2xl min-w-[680px] p-8"
            >
                <!-- Header -->
                <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <span>{{ activeCategory.icon }}</span> {{ activeCategory.name }}
                    </h2>
                    <a href="#" class="text-amber-500 text-sm font-semibold hover:text-amber-600 flex items-center gap-1">
                        View all <i class="pi pi-arrow-right text-xs"></i>
                    </a>
                </div>

                <!-- Sub categories grid -->
                <div class="grid grid-cols-2 gap-x-12 gap-y-6">
                    <div v-for="sub in activeCategory.subs" :key="sub.name">
                        <h3 class="text-sm font-bold text-gray-900 mb-2 pb-1.5 border-b border-amber-400">{{ sub.name }}</h3>
                        <ul class="space-y-1.5">
                            <li v-for="item in sub.items" :key="item">
                                <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">{{ item }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>

</style>
