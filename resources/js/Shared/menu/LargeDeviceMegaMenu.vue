<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const page = usePage()

const categories = page.props.categories ?? []
const activeCategory = ref(null)

const sidebarRef = ref(null)

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
        <div class="w-72 bg-white p-2 rounded-xl shadow-sm shrink-0 z-40" ref="sidebarRef"
             :class="activeCategory ? 'rounded-r-none' : ''"
        >
            <div
                v-for="category in categories"
                :key="category.name"
                style="--p-ripple-background: rgba(251, 191, 36, 0.3)"
                v-ripple
                @mouseenter="activeCategory = category"
                class="flex items-center justify-between rounded-xl px-5 py-3.5 cursor-pointer transition-colors"
                :class="activeCategory?.name === category.name ? 'bg-gray-50' : 'hover:bg-gray-300'"
            >
                <div class="flex items-center gap-3">
                    <span class="text-lg">{{ category.icon }}</span>
                    <Link
                        :href="route('category.index', category.slug)"
                        class="text-sm font-medium"
                        :class="[category.name === 'Sale' ? 'text-brand-500' : activeCategory?.name === category.name ? 'text-brand-400' : 'text-gray-700']"
                    >
                        {{ category.name }}
                    </Link>
                </div>
                <i class="pi pi-chevron-right text-xs" :class="activeCategory?.name === category.name ? 'text-brand-400' : 'text-gray-400'"></i>
            </div>
        </div>

        <!-- Mega Menu Panel -->
        <div
            v-if="activeCategory && activeCategory.subs?.length"
            class="absolute left-72 top-0 h-full z-50 bg-white rounded-r-xl border border-gray-200 shadow-2xl min-w-[680px] p-8 overflow-y-auto"
            @mouseleave="activeCategory = null"
        >
            <!-- Header -->
            <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>{{ activeCategory.icon }}</span> {{ activeCategory.name }}
                </h2>
                <Link
                    :href="route('category.index', activeCategory.slug)"
                    class="text-brand-500 text-sm font-semibold hover:text-brand-600 flex items-center gap-1"
                >
                    ყველას ნახვა <i class="pi pi-arrow-right text-xs!"></i>
                </Link>
            </div>

            <!-- Sub categories grid -->
            <div class="grid grid-cols-2 gap-x-12 gap-y-6">
                <div v-for="sub in activeCategory.subs" :key="sub.name">
                    <Link
                        :href="route('category.index', [activeCategory.slug, sub.slug])"
                        class="text-sm font-semibold text-gray-900 hover:text-brand-400 mb- 2 pb- 1.5 borde r-b border-gray-100 inline-block"
                    >
                        {{ sub.name }}
                    </Link>
                    <ul class="space-y-1.5 mt-2">
                        <li v-for="item in sub.items" :key="item.name">
                            <Link
                                :href="route('category.index', [activeCategory.slug, sub.slug, item.slug])"
                                class="text-sm text-gray-500 hover:text-brand-400 transition-colors"
                            >
                                {{ item.name }}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="flex-1 ring ring-amber-400 rounded-lg">

        </div>
    </div>
</template>
