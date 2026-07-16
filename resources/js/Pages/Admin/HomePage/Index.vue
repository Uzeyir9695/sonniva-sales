<script setup>
import AdminLayout from '../AdminLayout.vue'
import { router } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import axios from 'axios'
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue'

defineOptions({ layout: AdminLayout });

const props = defineProps({
    banners: { type: Object, default: () => ({}) },
})

const toast = useToast()

const otherSlots = [
    { key: 'doors',  label: 'Doors Carousel (top right)'    },
    { key: 'frames', label: 'Frames Carousel (bottom right)' },
]

const uploading = ref({})

function imagesFor(slot) {
    return props.banners[slot] ?? []
}

function mainBannerCountFor(itemId) {
    return imagesFor('main').filter(img => img.item?.id === itemId).length
}

function imageUrl(img) {
    return `/storage/items/${img}`
}

function onFileChange(slot, event) {
    const files = event.target.files
    if (!files?.length) return

    const data = new FormData()
    data.append('slot', slot)
    Array.from(files).forEach(f => data.append('images[]', f))

    uploading.value[slot] = true

    router.post(route('admin.home-page.banners.store'), data, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => toast.add({ severity: 'success', summary: 'Uploaded', life: 3000 }),
        onError: () => toast.add({ severity: 'error', summary: 'Upload failed', life: 3000 }),
        onFinish: () => {
            uploading.value[slot] = false
            event.target.value = ''
        },
    })
}

function deleteImage(id) {
    router.delete(route('admin.home-page.banners.destroy', id), {
        preserveScroll: true,
        onSuccess: () => toast.add({ severity: 'success', summary: 'Deleted', life: 3000 }),
        onError: () => toast.add({ severity: 'error', summary: 'Delete failed', life: 3000 }),
    })
}

/* ---------------- Main banner: search item, then upload image bound to it ---------------- */
const query = ref('')
const results = ref([])
const searching = ref(false)
let debounceTimer = null

async function runSearch(q) {
    searching.value = true
    try {
        const res = await axios.get(route('admin.items.search'), { params: { q } })
        results.value = res.data
    } catch {
        results.value = []
    } finally {
        searching.value = false
    }
}

function onSearchInput() {
    clearTimeout(debounceTimer)
    const q = query.value.trim()
    if (q.length < 2) {
        results.value = []
        searching.value = false
        return
    }
    debounceTimer = setTimeout(() => runSearch(q), 400)
}

function onMainFileChange(item, event) {
    const files = event.target.files
    if (!files?.length) return

    const data = new FormData()
    data.append('slot', 'main')
    data.append('item_id', item.id)
    Array.from(files).forEach(f => data.append('images[]', f))

    uploading.value[`main-${item.id}`] = true

    router.post(route('admin.home-page.banners.store'), data, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => toast.add({ severity: 'success', summary: 'Uploaded', life: 3000 }),
        onError: () => toast.add({ severity: 'error', summary: 'Upload failed', life: 3000 }),
        onFinish: () => {
            uploading.value[`main-${item.id}`] = false
            event.target.value = ''
        },
    })
}
</script>

<template>
    <div class="p-6 max-w-5xl mx-auto space-y-6">
        <h1 class="text-xl font-bold text-gray-800">Manage Home Page</h1>

        <!-- Main Banner: search item, then attach a banner image -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-semibold text-gray-800">Main Banner (large left)</p>
                    <p class="text-xs text-gray-400 mt-0.5">Link a slide to an item by searching below, or upload one with no item link.</p>
                </div>
                <label
                    for="upload-main"
                    class="flex items-center gap-2 cursor-pointer bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"
                    :class="uploading.main ? 'opacity-60 pointer-events-none' : ''"
                >
                    <i class="pi pi-upload text-xs"></i>
                    {{ uploading.main ? 'Uploading...' : 'Upload without item' }}
                </label>
                <input
                    id="upload-main"
                    type="file"
                    accept="image/*"
                    multiple
                    class="hidden"
                    @change="onFileChange('main', $event)"
                />
            </div>

            <span class="relative inline-block w-full sm:w-96">
                <i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                <PrimeInputText
                    v-model="query"
                    @input="onSearchInput"
                    placeholder="Search by item No. or name..."
                    class="w-full pl-9!"
                />
            </span>

            <div v-if="searching" class="flex items-center gap-2 text-sm text-gray-400">
                <i class="pi pi-spinner pi-spin"></i> Searching...
            </div>

            <div v-else-if="query.trim().length >= 2 && results.length === 0" class="text-sm text-gray-400">
                No items found for "{{ query }}".
            </div>

            <ul v-else-if="results.length" class="divide-y divide-gray-100">
                <li
                    v-for="item in results"
                    :key="item.id"
                    class="flex items-center gap-3 py-3"
                >
                    <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <img
                            v-if="item.images?.length"
                            :src="imageUrl(item.images[0])"
                            :alt="item.name"
                            class="w-full h-full object-cover"
                        />
                        <div v-else class="w-full h-full flex items-center justify-center">
                            <i class="pi pi-image text-gray-300 text-sm"></i>
                        </div>
                    </div>

                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-800 truncate">{{ item.name }}</p>
                        <p class="text-xs text-gray-400 font-mono">{{ item.no }}</p>
                    </div>

                    <span class="flex items-center gap-1.5 text-base text-gray-400 shrink-0">
                        <i class="pi pi-image text-base"></i>
                        {{ mainBannerCountFor(item.id) }}
                    </span>

                    <label
                        class="flex items-center gap-2 cursor-pointer bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors shrink-0"
                        :class="uploading[`main-${item.id}`] ? 'opacity-60 pointer-events-none' : ''"
                    >
                        <i class="pi pi-upload text-xs"></i>
                        {{ uploading[`main-${item.id}`] ? 'Uploading...' : 'Upload image' }}
                        <input type="file" accept="image/*" multiple class="hidden" @change="onMainFileChange(item, $event)" />
                    </label>
                </li>
            </ul>

            <!-- Existing main banners -->
            <div class="pt-2 border-t border-gray-100">
                <div v-if="imagesFor('main').length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                    <div
                        v-for="img in imagesFor('main')"
                        :key="img.id"
                        class="relative group rounded-xl overflow-hidden aspect-video bg-gray-100 shadow-md"
                    >
                        <img :src="img.image_url" alt="banner" class="w-full h-full object-cover" />
                        <span class="absolute bottom-0 left-0 right-0 px-2 py-1 text-[11px] font-medium text-white bg-black/60 truncate">
                            {{ img.item?.name ?? 'No item linked' }}
                        </span>
                        <button
                            @click="deleteImage(img.id)"
                            class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <i class="pi pi-trash text-white text-lg"></i>
                        </button>
                    </div>
                </div>

                <p v-else class="text-sm text-gray-400 italic mt-3">No main banners uploaded yet.</p>
            </div>
        </div>

        <!-- Doors / Frames: plain image slots, no item link -->
        <div v-for="slot in otherSlots" :key="slot.key" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-semibold text-gray-800">{{ slot.label }}</p>
                    <p class="text-xs text-gray-400 mt-0.5">Multiple images — carousel when more than 1</p>
                </div>
                <label
                    :for="`upload-${slot.key}`"
                    class="flex items-center gap-2 cursor-pointer bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                    :class="uploading[slot.key] ? 'opacity-60 pointer-events-none' : ''"
                >
                    <i class="pi pi-upload text-xs"></i>
                    {{ uploading[slot.key] ? 'Uploading...' : 'Upload' }}
                </label>
                <input
                    :id="`upload-${slot.key}`"
                    type="file"
                    accept="image/*"
                    multiple
                    class="hidden"
                    @change="onFileChange(slot.key, $event)"
                />
            </div>

            <!-- Image grid -->
            <div class="relative">
                <!-- Upload overlay spinner -->
                <div
                    v-if="uploading[slot.key]"
                    class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl"
                >
                    <i class="pi pi-spinner pi-spin text-2xl text-brand-500"></i>
                    <span class="text-sm text-gray-500 font-medium">Uploading...</span>
                </div>

                <div v-if="imagesFor(slot.key).length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <div
                        v-for="img in imagesFor(slot.key)"
                        :key="img.id"
                        class="relative group rounded-xl overflow-hidden aspect-video bg-gray-100 shadow-md"
                    >
                        <img :src="img.image_url" alt="banner" class="w-full h-full object-cover" />
                        <button
                            @click="deleteImage(img.id)"
                            class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <i class="pi pi-trash text-white text-lg"></i>
                        </button>
                    </div>
                </div>

                <p v-else class="text-sm text-gray-400 italic">No images uploaded yet.</p>
            </div>
        </div>
    </div>
</template>