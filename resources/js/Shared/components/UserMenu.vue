<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import LogoutButton from './LogoutButton.vue'

const page = usePage()
const open = ref(false)
const dropdownRef = ref(null)

const isAuthenticated = computed(() => !!page.props.user)

const displayName = computed(() => {
    const name = page.props.user?.name ?? ''
    return name.slice(0, 6)
})

const menuItems = [
    { label: 'ჩემი კაბინეტი',  icon: 'pi-user',    route: 'account.index' },
    //{ label: 'ჩემი შეკვეთები',      icon: 'pi-list',     route: 'account.index' },
]

// Close on outside click
function handleClickOutside(e) {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
        open.value = false
    }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<template>
    <!-- Unauthenticated -->
    <Link
        v-if="!isAuthenticated"
        :href="route('login')"
        class="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 transition-all"
    >
        <i class="pi pi-user text-xl!"></i>
    </Link>

    <!-- Authenticated -->
    <div v-else class="relative" ref="dropdownRef">
        <!-- Trigger -->
        <button
            @click="open = !open"
            class="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-all cursor-pointer select-none"
        >
            <div class="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                <i class="pi pi-user text-sm"></i>
            </div>
            <span class="text-sm font-medium text-gray-700 max-w-20 truncate">
                {{ displayName }}
              </span>
            <i class="pi pi-chevron-down text-xs text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': open }"></i>
        </button>

        <!-- Dropdown -->
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
                class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black/5 z-50 overflow-hidden origin-top-right"
            >
                <!-- User info header -->
                <div class="px-4 py-3 border-b border-gray-100">
                    <p class="text-sm font-semibold text-gray-800 truncate">{{ $page.props.user.name }}</p>
                    <p class="text-xs text-gray-400 truncate">{{ $page.props.user.email }}</p>
                </div>

                <!-- Menu items -->
                <div class="py-1">
                    <Link
                        v-for="item in menuItems"
                        :key="item.label"
                        :href="route(item.route)"
                        @click="open = false"
                        class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <i :class="['pi', item.icon, 'text-gray-400 text-sm w-4']"></i>
                        {{ item.label }}
                    </Link>

                    <!-- Logout -->
                    <div class="border-t border-gray-100 px-4 py-2.5">
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
