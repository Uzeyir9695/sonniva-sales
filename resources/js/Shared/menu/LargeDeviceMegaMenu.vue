<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { usePage } from '@inertiajs/vue3';

const page = usePage()

const categories = page.props.categories ?? []
const activeCategory = ref(null)

const sidebarRef = ref(null)
const sidebarHeight = ref(0)

const updateHeight = () => {
    if (sidebarRef.value) {
        sidebarHeight.value = sidebarRef.value.offsetHeight
    }
}

onMounted(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateHeight)
})
</script>

<template>
    <!-- Category Sidebar + Mega Menu -->
    <div class="relative flex gap-x-4" @mouseleave="activeCategory = null">

        <Teleport to="body">
            <div
                v-if="activeCategory && activeCategory.subs?.length"
                class="fixed inset-0 z-30 backdrop-blur-sm bg-black/20"
                @mouseenter="activeCategory = null"
            />
        </Teleport>

        <!-- Left Category List -->
        <div class="w-64 bg-white rounded-xl shadow-sm shrink-0 z-40" ref="sidebarRef"
             :class="activeCategory ? 'rounded-r-none' : ''"
        >
            <div
                v-for="category in categories"
                :key="category.name"
                @mouseenter="activeCategory = category"
                class="flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors"
                :class="activeCategory?.name === category.name ? 'bg-gray-100' : 'hover:bg-gray-300'"
            >
                <div class="flex items-center gap-3">
                    <span class="text-lg">{{ category.icon }}</span>
                    <span
                        class="text-sm font-medium"
                        :class="[category.name === 'Sale' ? 'text-brand-500' : activeCategory?.name === category.name ? 'text-gray-900' : 'text-gray-700']"
                    >{{ category.name }}</span>
                </div>
                <i class="pi pi-chevron-right text-xs" :class="activeCategory?.name === category.name ? 'text-brand-500' : 'text-gray-400'"></i>
            </div>
        </div>

        <!-- Mega Menu Panel -->
        <div
            v-if="activeCategory && activeCategory.subs?.length"
            class="absolute left-64 top-0 z-50 bg-white rounded-r-xl border border-gray-200 shadow-2xl min-w-[680px] p-8 overflow-y-auto"
            :style="{ height: sidebarHeight + 'px' }"
            @mouseleave="activeCategory = null"
        >
            <!-- Header -->
            <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>{{ activeCategory.icon }}</span> {{ activeCategory.name }}
                </h2>
                <a href="#" class="text-brand-500 text-sm font-semibold hover:text-brand-600 flex items-center gap-1">
                    View all <i class="pi pi-arrow-right text-xs!"></i>
                </a>
            </div>

            <!-- Sub categories grid -->
            <div class="grid grid-cols-2 gap-x-12 gap-y-6">
                <div v-for="sub in activeCategory.subs" :key="sub.name">
                    <h3 class="text-sm font-bold text-gray-900 mb-2 pb-1.5 border-b border-gray-100">{{ sub.name }}</h3>
                    <ul class="space-y-1.5">
                        <li v-for="item in sub.items" :key="item">
                            <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">{{ item }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="flex-1 ring ring-amber-400 rounded-lg"></div>
    </div>
</template>
