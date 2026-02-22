<script setup>
import { ref, computed, onMounted } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import { onClickOutside } from '@vueuse/core'

const page = usePage()
const user = computed(() => page.props.user)
const isAuthenticated = computed(() => page.props.isLoggedIn)

const props = defineProps({
    categories: Array,
})

// Auth dropdown
const showAuth = ref(false)
const dropdownRef = ref(null)
onClickOutside(dropdownRef, () => showAuth.value = false)

// Drawer state
const drawerOpen = ref(false)
const drawerRef = ref(null)

onClickOutside(drawerRef, () => closeDrawer())

const openDrawer  = () => drawerOpen.value = true

const closeDrawer = () => {
    drawerOpen.value = false
    // Reset levels after animation
    setTimeout(() => {
        stack.value = []
        currentItems.value = props.categories
    }, 300)
}

// Level navigation — stack holds breadcrumb titles
const stack = ref([])
const currentItems = ref(props.categories ?? [])
const fadeVisible = ref(true)

const navigateTo = (category) => {
    if (!category.subs?.length) return closeDrawer()

    fadeOut(() => {
        stack.value.push(category.name)
        currentItems.value = category.subs.map(sub => ({
            name: sub.name,
            subs: sub.items?.map(item => ({ name: item.name, subs: [] })) ?? [],
        }))
    })
}

const goBack = () => {
    if (stack.value.length === 0) return closeDrawer()

    fadeOut(() => {
        stack.value.pop()
        if (stack.value.length === 0) {
            currentItems.value = props.categories
        } else {
            // Re-walk from root to find current level
            let items = props.categories
            for (const name of stack.value) {
                const found = items.find(c => c.name === name)
                if (found) items = found.subs?.map(sub => ({
                    name: sub.name,
                    subs: sub.items?.map(i => ({ name: i.name, subs: [] })) ?? [],
                })) ?? []
            }
            currentItems.value = items
        }
    })
}

const fadeOut = (callback) => {
    fadeVisible.value = false
    setTimeout(() => {
        callback()
        fadeVisible.value = true
    }, 150)
}

defineExpose({
    openDrawer
})
</script>

<template>
    <button
        @click="openDrawer"
        class="flex items-center cursor-pointer bg-brand-400 hover:bg-brand-500 text-gray-900 font-semibold p-2.5 h-fit rounded-full transition-colors"
    >
        <i class="pi pi-th-large text-sm text-white"></i>
    </button>

    <!-- Drawer overlay -->
    <Teleport to="body">
        <Transition name="overlay">
            <div
                v-if="drawerOpen"
                class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                @click="closeDrawer"
            />
        </Transition>

        <!-- Drawer -->
        <Transition name="drawer">
            <div
                v-if="drawerOpen"
                ref="drawerRef"
                class="fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col"
            >
                <!-- Drawer header -->
                <div class="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
                    <div
                        @click="goBack"
                        class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 transition-colors shrink-0"
                    >
                        <i class="pi pi-arrow-left text-gray-600 text-sm"></i>
                    </div>

                    <span class="font-semibold text-gray-900 text-sm">
                        {{ stack.length ? stack[stack.length - 1] : 'კატეგორია' }}
                    </span>

                    <button @click="closeDrawer" class="ml-auto w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100 shrink-0">
                        <i class="pi pi-times text-gray-400 text-sm"></i>
                    </button>
                </div>

                <!-- Category items with fade -->
                <div class="flex-1 overflow-y-auto">
                    <Transition name="fade">
                        <div v-if="fadeVisible" class="p-2">
                            <button
                                v-for="item in currentItems"
                                :key="item.name"
                                style="--p-ripple-background: rgba(251, 191, 36, 0.3)"
                                v-ripple
                                @click="navigateTo(item)"
                                class="w-full flex items-center justify-between cursor-pointer px-5 py-3.5 rounded-xl hover:bg-gray-50 hover:text-brand-400 transition-colors text-left"
                            >
                                <span class="text-sm font-medium text-inherit">{{ item.name }}</span>
                                <i
                                    v-if="item.subs?.length"
                                    class="pi pi-chevron-right text-xs text-inherit"
                                ></i>
                            </button>
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
