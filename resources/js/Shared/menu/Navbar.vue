<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import {Link, usePage} from '@inertiajs/vue3';
import LargeDeviceMegaMenu from '@/Shared/menu/LargeDeviceMegaMenu.vue';
import SmallDeviceMegaMenu from '@/Shared/menu/SmallDeviceMegaMenu.vue';
import SearchBar from '@/Shared/components/SearchBar.vue';
import WishlistNavIcon from '@/Shared/components/WishlistNavIcon.vue';
import LogoutButton from '@/Shared/components/LogoutButton.vue';
import CartNavIcon from '@/Shared/components/CartNavIcon.vue';
import WeglotSwitcher from '@/Shared/components/WeglotSwitcher.vue';
import UserMenu from '@/Shared/components/UserMenu.vue';

const page = usePage();
const user = computed(() => page.props.user);
const isAuthenticated = computed(() => page.props.isLoggedIn);
const categories = page.props.categories ?? []

const searchOpen = ref(false)
const searchInput = ref(null)
const mobileMenuRef = ref(null)

const linguiseMountPoint = ref(null)

onMounted(() => {
    const slot = document.getElementById('linguise-slot')
    if (slot && linguiseMountPoint.value) {
        slot.style.display = ''
        linguiseMountPoint.value.appendChild(slot)
    }
})

const openSearch = async () => {
    searchOpen.value = true
    await nextTick()
    searchInput.value?.focus()
}
</script>

<template>
    <div class="flex-col sticky top-0 z-50">
        <nav class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto max-sm:pl-4 px-3 h-20 flex items-center gap-4">

                <!-- ── SMALL DEVICE: search open state ── -->
                <template v-if="searchOpen">
                    <div class="flex lg:hidden items-center w-full gap-1">
                        <div class="flex-1">
                            <SearchBar @close="searchOpen = false" placeholder="რას ეძებთ?" />
                        </div>
                        <button @click="searchOpen = false" class="p-2 text-gray-500 hover:text-gray-900">
                            <i class="pi pi-times text-"></i>
                        </button>
                    </div>
                </template>

                <!-- ── SMALL DEVICE: default state ── -->
                <template v-else>
                    <div class="flex lg:hidden items-center justify-between w-full">
                        <div class="flex items-center gap-x-4">
                            <!-- Left: hamburger -->
                            <SmallDeviceMegaMenu :categories="categories" />

                            <!-- Center: logo -->
                            <Link :href="route('home')">
                                <img src="/logo/logo3.png" alt="logo" class="w-16 object-cover">
                            </Link>
                        </div>

                        <!-- Right: search + user + cart -->
                        <div class="flex items-center gap-1">
                            <button @click="openSearch" class="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100">
                                <i class="pi pi-search text-xl"></i>
                            </button>

                            <WishlistNavIcon></WishlistNavIcon>

                            <CartNavIcon />

                            <Link v-if="!isAuthenticated" :href="route('login')" class="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100">
                                <i class="pi pi-user text-xl"></i>
                            </Link>
                        </div>
                    </div>
                </template>

                <!-- ── LARGE DEVICE: always shown ── -->
                <template class="hidden lg:contents">
                    <SmallDeviceMegaMenu :categories="categories" />

                    <Link :href="route('home')" class="hidden lg:flex items-center">
                        <img src="/logo/logo3.png" alt="logo" class="w-20 h-full object-cover">
                    </Link>

                    <div class="hidden lg:flex flex-4">
                        <SearchBar placeholder="მოძებნე ის რაც გჭირდება..." />
                    </div>

                    <a href="tel:+995591047372" class="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900 shrink-0">
                        <i class="pi pi-phone text-brand-500"></i>
                        <span class="text-sm font-medium whitespace-nowrap">+995 591 04-73-72</span>
                    </a>

                    <div class="hidden lg:flex items-center gap-1 shrink-0">
                        <div ref="linguiseMountPoint"></div>

                        <WishlistNavIcon></WishlistNavIcon>

                        <CartNavIcon />

                        <UserMenu />
                    </div>
                </template>
            </div>
        </nav>
    </div>
</template>
