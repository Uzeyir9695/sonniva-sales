<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Link } from '@inertiajs/vue3'

const open = ref(false)
const menuRef = ref(null)

const items = [
    { label: 'ფავორიტების სია', icon: 'fa-heart', route: 'wishlist.index', class: 'sm:hidden' },
    { label: 'ჩვენს შესახებ', icon: 'fa-circle-info', route: 'about-us' },
    { label: 'მიწოდების ტარიფები', icon: 'fa-truck-fast', route: 'delivery-rates' },
    { label: 'Cookie პოლიტიკა', icon: 'fa-cookie-bite', route: 'cookie-policy' },
    { label: 'კონფიდენციალურობა', icon: 'fa-shield-halved', route: 'privacy-policy' },
    { label: 'მომსახურების პირობები', icon: 'fa-file-lines', route: 'terms-of-service' },
]

function handleClickOutside(e) {
    if (menuRef.value && !menuRef.value.contains(e.target)) {
        open.value = false
    }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<template>
    <div class="relative" ref="menuRef">
        <button
            @click="open = !open"
            class="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
            aria-label="მეტი"
        >
            <i class="pi pi-ellipsis-v text-lg"></i>
        </button>

        <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 translate-y-1 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-1 scale-95"
        >
            <div
                v-if="open"
                class="absolute right-0 mt-2 w-58 bg-white rounded-xl shadow-lg ring-1 ring-black/5 z-50 overflow-hidden origin-top-right py-1"
            >
                <Link
                    v-for="item in items"
                    :key="item.label"
                    :href="route(item.route)"
                    @click="open = false"
                    :class="[item.class, 'flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors']"
                >
                    <i :class="['fa-solid', item.icon, 'text-gray-400 text-sm w-4']"></i>
                    {{ item.label }}
                </Link>
            </div>
        </Transition>
    </div>
</template>
