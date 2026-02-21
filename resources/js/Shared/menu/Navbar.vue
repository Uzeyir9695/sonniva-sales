<script setup>
import { ref, computed, nextTick } from 'vue'
import {Link, usePage} from '@inertiajs/vue3';
import LargeDeviceMegaMenu from '@/Shared/menu/LargeDeviceMegaMenu.vue';
import SmallDeviceMegaMenu from '@/Shared/menu/SmallDeviceMegaMenu.vue';

const page = usePage();
const user = computed(() => page.props.user);
const isAuthenticated = computed(() => page.props.isLoggedIn);
const categories = page.props.categories ?? []

const searchOpen = ref(false)
const searchInput = ref(null)
const mobileMenuRef = ref(null)

const openSearch = async () => {
    searchOpen.value = true
    await nextTick()
    searchInput.value?.focus()
}
</script>

<template>
    <div class="flex-col sticky top-0 mb-4 z-50">
        <nav class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-6 h-20 flex items-center gap-4">

                <!-- ── SMALL DEVICE: search open state ── -->
                <template v-if="searchOpen">
                    <div class="flex lg:hidden items-center w-full gap-3">
                        <!-- Search input -->
                        <div class="flex-1 flex items-center bg-gray-100 rounded-xl px-4 h-11 gap-3 focus-within:ring-2 focus-within:ring-brand-400 focus-within:bg-white transition-all">
                            <i class="pi pi-search text-brand-500 text-sm shrink-0"></i>
                            <input
                                ref="searchInput"
                                type="text"
                                placeholder="რას ეძებთ?"
                                class="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                            />
                        </div>
                        <!-- Close -->
                        <button @click="searchOpen = false" class="p-2 text-gray-500 hover:text-gray-900">
                            <i class="pi pi-times text-lg"></i>
                        </button>
                    </div>
                </template>

                <!-- ── SMALL DEVICE: default state ── -->
                <template v-else>
                    <div class="flex lg:hidden items-center justify-between w-full">
                        <div class="flex items-center gap-x-4">
                            <!-- Left: hamburger -->
                            <SmallDeviceMegaMenu ref="mobileMenuRef" :categories="categories" />

                            <!-- Center: logo -->
                            <Link :href="route('home')">
                                <img src="/logo/logo.png" alt="logo" class="w-20 object-cover">
                            </Link>
                        </div>

                        <!-- Right: search + user + cart -->
                        <div class="flex items-center gap-1">
                            <button @click="openSearch" class="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100">
                                <i class="pi pi-search text-xl"></i>
                            </button>
                            <Link v-if="!isAuthenticated" :href="route('login')" class="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100">
                                <i class="pi pi-user text-xl"></i>
                            </Link>
                            <a href="/cart" class="relative flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100">
                                <i class="pi pi-shopping-cart text-xl"></i>
                                <span class="absolute top-1 right-1 w-4 h-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
                            </a>
                        </div>
                    </div>
                </template>

                <!-- ── LARGE DEVICE: always shown ── -->
                <template class="hidden lg:contents">
                    <button
                        @click="mobileMenuRef?.openDrawer()"
                        class="flex items-center cursor-pointer bg-brand-400 hover:bg-brand-500 text-gray-900 font-semibold p-2.5 h-fit rounded-full transition-colors"
                    >
                        <i class="pi pi-th-large text-sm text-white"></i>
                    </button>

                    <Link :href="route('home')" class="hidden lg:flex items-center">
                        <img src="/logo/logo.png" alt="logo" class="w-20 h-full object-cover">
                    </Link>

                    <div class="hidden lg:flex items-center bg-gray-100 rounded-xl px-4 h-11 gap-3 focus-within:ring-2 focus-within:ring-brand-400 focus-within:bg-white transition-all flex-[4]">
                        <i class="pi pi-search text-gray-400 text-sm shrink-0"></i>
                        <input
                            type="text"
                            placeholder="Search products..."
                            class="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    <a href="tel:+995591047372" class="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900 shrink-0">
                        <i class="pi pi-phone text-brand-500"></i>
                        <span class="text-sm font-medium whitespace-nowrap">+995 591 04-73-72</span>
                    </a>

                    <div class="hidden lg:flex items-center gap-1 shrink-0">
                        <a href="/wishlist" class="relative flex items-center justify-center w-12 h-12 rounded-full text-gray-600 hover:bg-gray-100 transition-all">
                            <i class="pi pi-heart text-xl!"></i>
                            <span class="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">5</span>
                        </a>
                        <a href="/cart" class="relative flex items-center justify-center w-12 h-12 rounded-full text-gray-600 hover:bg-gray-100 transition-all">
                            <i class="pi pi-shopping-cart text-xl!"></i>
                            <span class="absolute top-1 right-1 w-4 h-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
                        </a>
                        <Link v-if="!isAuthenticated" :href="route('login')" class="flex items-center justify-center w-12 h-12 rounded-full text-gray-600 hover:bg-gray-100 transition-all">
                            <i class="pi pi-user text-xl!"></i>
                        </Link>
                        <Link v-if="isAuthenticated" :href="route('logout')" method="post" as="button" type="button" :replace="true" class="bg-blue-500 cursor-pointer">
                            <i class="pi pi-sign-out sm:text-md mr-2 font-bold"></i>
                            Log Out
                        </Link>
                    </div>
                </template>

            </div>
        </nav>
    </div>
</template>
