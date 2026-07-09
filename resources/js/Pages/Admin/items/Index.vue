<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import AdminLayout from '../AdminLayout.vue'
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue'

defineOptions({ layout: AdminLayout })

const toast = useToast()
const activeTab = ref('0')
const syncingCategories = ref(false)

function syncCategories() {
    syncingCategories.value = true
    router.post(route('admin.items.sync-category'), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
            toast.add({ severity: 'success', summary: 'Started', detail: res.props.flash.message, life: 4000 })
        },
        onError: () => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not start the sync, please try again.', life: 4000 })
        },
        onFinish: () => {
            syncingCategories.value = false
        },
    })
}

/* ---------------- Item video links ---------------- */
const query = ref('')
const results = ref([])
const searching = ref(false)
let debounceTimer = null

function imageUrl(img) {
    return `/storage/items/${img}`
}

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

const videoDialogVisible = ref(false)
const editingItem = ref(null)
const videoUrlInput = ref('')
const savingVideo = ref(false)

function openVideoDialog(item) {
    editingItem.value = item
    videoUrlInput.value = item.video_url ?? ''
    videoDialogVisible.value = true
}

function saveVideo() {
    savingVideo.value = true
    router.put(route('admin.items.update-video', editingItem.value.id), {
        video_url: videoUrlInput.value.trim() || null,
    }, {
        preserveScroll: true,
        onSuccess: (res) => {
            editingItem.value.video_url = videoUrlInput.value.trim() || null
            videoDialogVisible.value = false
            toast.add({ severity: 'success', summary: 'Saved', detail: res.props.flash.message, life: 3000 })
        },
        onError: (errors) => {
            toast.add({ severity: 'error', summary: 'Error', detail: errors.video_url ?? 'Could not save the video link.', life: 4000 })
        },
        onFinish: () => {
            savingVideo.value = false
        },
    })
}
</script>

<template>
    <div class="p-4 sm:p-6 space-y-4">
        <h1 class="text-xl font-bold text-gray-900">Manage Items</h1>

        <Tabs v-model:value="activeTab" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <TabList>
                <Tab value="0">Manage Items</Tab>
                <Tab value="1">Sync Categories</Tab>
            </TabList>

            <TabPanels>
                <!-- Sync Categories -->
                <TabPanel value="0">

                    <h2 class="text-base font-bold text-gray-900 mb-1">Item Video Links</h2>
                    <p class="text-sm text-gray-500 mb-4">
                        Search for an item by No. or name and attach a YouTube link. It will show up as the last slide in the item's image gallery.
                    </p>

                    <span class="relative inline-block w-full sm:w-96">
                        <i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                        <PrimeInputText
                            v-model="query"
                            @input="onSearchInput"
                            placeholder="Search by item No. or name..."
                            class="w-full pl-9!"
                        />
                    </span>

                    <div v-if="searching" class="flex items-center gap-2 text-sm text-gray-400 mt-4">
                        <i class="pi pi-spinner pi-spin"></i> Searching...
                    </div>

                    <div v-else-if="query.trim().length >= 2 && results.length === 0" class="text-sm text-gray-400 mt-4">
                        No items found for "{{ query }}".
                    </div>

                    <ul v-else-if="results.length" class="divide-y divide-gray-100 mt-4">
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

                            <span
                                class="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                                :class="item.video_url ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'"
                            >
                                {{ item.video_url ? 'Video set' : 'No video' }}
                            </span>

                            <Button
                                :label="item.video_url ? 'Edit' : 'Add Video'"
                                :icon="item.video_url ? 'pi pi-pencil' : 'pi pi-plus'"
                                size="small"
                                severity="secondary"
                                outlined
                                @click="openVideoDialog(item)"
                            />
                        </li>
                    </ul>
                </TabPanel>

                <!-- Item Video Links -->
                <TabPanel value="1">
                    <h2 class="text-base font-bold text-gray-900 mb-1">Sync Categories</h2>
                    <p class="text-sm text-gray-500 mb-4">
                        Updates the category structure and item category codes from Business Central.
                    </p>
                    <Button
                        :loading="syncingCategories"
                        @click="syncCategories"
                        :label="syncingCategories ? 'Updating...' : 'Update Now'"
                        icon="pi pi-refresh"
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>

        <!-- Video Link Dialog -->
        <Dialog v-model:visible="videoDialogVisible" modal header="Item Video Link" :style="{ width: '28rem' }">
            <div v-if="editingItem" class="space-y-3">
                <p class="text-sm font-medium text-gray-800">{{ editingItem.name }}</p>
                <p class="text-xs text-gray-400 font-mono">{{ editingItem.no }}</p>

                <PrimeInputText
                    v-model="videoUrlInput"
                    placeholder="https://youtu.be/..."
                    class="w-full"
                    fluid
                />
                <p class="text-xs text-gray-400">Paste the link from YouTube's Share button. Leave empty to remove the video.</p>
            </div>

            <template #footer>
                <Button label="Cancel" size="small" severity="secondary" variant="text" @click="videoDialogVisible = false" />
                <Button
                    label="Save"
                    size="small"
                    icon="pi pi-check"
                    :loading="savingVideo"
                    @click="saveVideo"
                />
            </template>
        </Dialog>
    </div>
</template>
