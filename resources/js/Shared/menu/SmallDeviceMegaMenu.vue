<script setup>
import { ref, computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import { onClickOutside } from '@vueuse/core'
import LogoutButton from '@/Shared/components/LogoutButton.vue';
import WeglotSwitcher from '@/Shared/components/WeglotSwitcher.vue';

const props = defineProps({
    categories: Array,
})

// Drawer state
const drawerOpen = ref(false)
const drawerRef = ref(null)
const drawerButtonRef = ref(null)

onClickOutside(drawerRef, () => closeDrawer(), { ignore: [drawerButtonRef] })

const openDrawer = () => {
    drawerOpen.value = !drawerOpen.value
    document.body.classList.toggle('overflow-hidden', drawerOpen.value)
}

const closeDrawer = () => {
    drawerOpen.value = false
    document.body.classList.remove('overflow-hidden')
    setTimeout(() => resetStack(), 300)
}

// Stack stores the actual category objects
const stack = ref([])  // [ rootCategory, subCategory ]
const fadeVisible = ref(true)

const resetStack = () => stack.value = []

// Current items to display based on stack depth
const currentItems = computed(() => {
    if (stack.value.length === 0) return props.categories
    if (stack.value.length === 1) return stack.value[0].subs
    if (stack.value.length === 2) return stack.value[1].items  // leaf level
    return []
})

const currentTitle = computed(() => {
    if (stack.value.length === 0) return 'აირჩიე კატეგორია'
    return stack.value[stack.value.length - 1].name
})

const navigateTo = (item) => {
    fadeOut(() => stack.value.push(item))
}

const goBack = () => {
    if (stack.value.length === 0) return closeDrawer()
    fadeOut(() => stack.value.pop())
}

// Route based on stack depth
const getItemRoute = (item) => {
    if (stack.value.length === 0) {
        return route('items.index', [item.slug])
    } else if (stack.value.length === 1) {
        return route('items.index', [stack.value[0].slug, item.slug])
    } else {
        return route('items.index', [stack.value[0].slug, stack.value[1].slug, item.slug])
    }
}

const getViewAllRoute = () => {
    if (stack.value.length === 1) {
        return route('items.index', [stack.value[0].slug])
    } else if (stack.value.length === 2) {
        return route('items.index', [stack.value[0].slug, stack.value[1].slug])
    }
    return '#'
}
const hasChildren = (item) => {
    if (stack.value.length === 0) return item.subs?.length > 0
    if (stack.value.length === 1) return item.items?.length > 0
    return false
}

const fadeOut = (callback) => {
    fadeVisible.value = false
    setTimeout(() => {
        callback()
        fadeVisible.value = true
    }, 150)
}

defineExpose({ openDrawer })
</script>

<template>
    <button
        ref="drawerButtonRef"
        @click="openDrawer"
        class="flex items-center cursor-pointer bg-brand-400 hover:bg-brand-500 text-gray-900 font-semibold p-2.5 h-fit rounded-full transition-colors"
    >
        <i class="pi pi-th-large text-sm text-white"></i>
    </button>

    <Teleport to="body">
        <Transition name="overlay">
            <div
                v-if="drawerOpen"
                class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                @click="closeDrawer"
            />
        </Transition>

        <Transition name="drawer">
            <div
                v-if="drawerOpen"
                ref="drawerRef"
                class="fixed top-20 left-0 z-50 h-[calc(100vh-80px)] w-full sm:w-80 bg-white shadow-2xl flex flex-col"
            >
                <div class="bg-gray-50 shado w-full sm:w-xs flex items-center justify-between px-4 py-4 border-y border-gray-100 sm:hidden">
                    <WeglotSwitcher />

                    <LogoutButton />
                </div>

                <!-- Header -->
                <div class="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
                    <div
                        @click="goBack"
                        class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 transition-colors shrink-0"
                    >
                        <i class="pi pi-arrow-left text-gray-600 text-sm"></i>
                    </div>
                    <span class="font-semibold text-gray-900 text-sm">{{ currentTitle }}</span>
                    <button @click="closeDrawer" class="ml-auto w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100 shrink-0">
                        <i class="pi pi-times text-gray-400 text-sm"></i>
                    </button>
                </div>

                <!-- Items -->
                <div class="small-device-menu flex-1 overflow-y-auto">
                    <Transition name="fade">
                        <div v-if="fadeVisible" class="p-2">

                            <!-- View all -->
                            <Link
                                v-if="stack.length > 0"
                                :href="getViewAllRoute()"
                                @click="closeDrawer"
                                class="w-full flex items-center gap-2 px-5 py-3.5 rounded-xl hover:bg-gray-50 text-brand-500 font-semibold text-sm mb-1"
                            >
                                <i class="pi pi-th-large text-xs"></i>
                                ყველას ნახვა
                            </Link>

                            <!-- Level 0: main categories — full width, no grid, no images -->
                            <template v-if="stack.length === 0">
                                <div
                                    v-for="item in currentItems"
                                    :key="item.name"
                                    @click="navigateTo(item)"
                                    class="w-full px-5 py-3.5 cursor-pointer rounded-xl text-gray-800 hover:bg-gray-50 hover:text-brand-400 transition-colors"
                                >
                                    <button
                                        style="--p-ripple-background: rgba(251, 191, 36, 0.3)"
                                        v-ripple
                                        class="w-full flex items-center justify-between cursor-pointer text-left"
                                    >
                                        <span class="text-sm font-medium text-inherit">{{ item.name }}</span>
                                        <i class="pi pi-chevron-right text-xs text-inherit"></i>
                                    </button>
                                </div>
                            </template>

                            <!-- Level 1 (subs): 2-col grid with images -->
                            <div v-else-if="stack.length === 1" class="grid grid-cols-2 gap-3">
                                <template v-for="item in currentItems" :key="item.name">
                                    <!-- Has children: navigate deeper -->
                                    <div
                                        v-if="hasChildren(item)"
                                        @click="navigateTo(item)"
                                        class="w-full px-3 py-3 space-y-1 cursor-pointer rounded-xl text-gray-800 hover:bg-gray-50 hover:text-brand-400 transition-colors"
                                    >
                                        <img v-if="item.image" :src="`${item.storage_path}/${item.image}`" :alt="item.name" class="w-full h-20 object-cover rounded-lg mb-2" />
                                        <button
                                            style="--p-ripple-background: rgba(251, 191, 36, 0.3)"
                                            v-ripple
                                            class="w-full flex items-center justify-between cursor-pointer text-left"
                                        >
                                            <span class="text-sm font-medium text-inherit">{{ item.name }} {{ item.items_count ? `(${item.items_count})` : item.items?.length < 1 ? '(0)' : '' }}</span>
                                            <i class="pi pi-chevron-right text-xs text-inherit"></i>
                                        </button>
                                    </div>

                                    <!-- No children: direct link -->
                                    <Link
                                        v-else
                                        :href="getItemRoute(item)"
                                        style="--p-ripple-background: rgba(251, 191, 36, 0.3)"
                                        v-ripple
                                        @click="closeDrawer"
                                        class="w-full px-3 py-3 space-y-1 rounded-xl text-gray-800 hover:bg-gray-50 hover:text-brand-400 transition-colors block"
                                    >
                                        <img v-if="item.image" :src="`${item.storage_path}/${item.image}`" :alt="item.name" class="w-full h-20 object-cover rounded-lg mb-2" />
                                        <span class="text-sm font-medium">{{ item.name }} {{ item.items_count ? `(${item.items_count})` : '(0)' }}</span>
                                    </Link>
                                </template>
                            </div>

                            <!-- Level 2 (leaf items): full width, one per line, no images -->
                            <template v-else>
                                <Link
                                    v-for="item in currentItems"
                                    :key="item.name"
                                    :href="getItemRoute(item)"
                                    style="--p-ripple-background: rgba(251, 191, 36, 0.3)"
                                    v-ripple
                                    @click="closeDrawer"
                                    class="w-full flex items-center justify-between px-5 py-3.5 rounded-xl cursor-pointer text-gray-800 hover:bg-gray-50 hover:text-brand-400 transition-colors"
                                >
                                    <span class="text-sm font-medium text-inherit">{{ item.name }} {{ item.items_count ? `(${item.items_count})` : '(0)' }}</span>
                                </Link>
                            </template>
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.drawer-enter-active, .drawer-leave-active { transition: transform 0.3s ease; }
.drawer-enter-from, .drawer-leave-to { transform: translateX(-100%); }

.overlay-enter-active, .overlay-leave-active { transition: opacity 0.3s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
