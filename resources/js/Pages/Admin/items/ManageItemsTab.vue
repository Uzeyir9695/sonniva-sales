<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue'
import ManageItemDialog from './ManageItemDialog.vue'
import ItemsListing from './ItemsListing.vue'

const toast = useToast()

/* ---------------- Item video links ---------------- */
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

const dialogRef = ref(null)

function openManageDialog(item) {
    dialogRef.value.open(item)
}

function onSaved() {
    if (query.value.trim().length >= 2) runSearch(query.value.trim())
}

/* ---------------- Sync jobs ---------------- */
const syncingItems = ref(false)
const itemNoToSync = ref('')

function syncItems() {
    syncingItems.value = true
    router.post(route('admin.items.sync'), { no: itemNoToSync.value || null }, {
        preserveScroll: true,
        onSuccess: (res) => {
            toast.add({ severity: 'success', summary: 'Started', detail: res.props.flash.message, life: 4000 })
            itemNoToSync.value = ''
        },
        onError: () => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not start the sync, please try again.', life: 4000 })
        },
        onFinish: () => {
            syncingItems.value = false
        },
    })
}

const syncingAttributes = ref(false)

function syncAttributes() {
    syncingAttributes.value = true
    router.post(route('admin.items.sync-attributes'), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
            toast.add({ severity: 'success', summary: 'Started', detail: res.props.flash.message, life: 4000 })
        },
        onError: () => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not start the sync, please try again.', life: 4000 })
        },
        onFinish: () => {
            syncingAttributes.value = false
        },
    })
}

const syncingInventory = ref(false)

function syncInventory() {
    syncingInventory.value = true
    router.post(route('admin.items.sync-inventory'), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
            toast.add({ severity: 'success', summary: 'Started', detail: res.props.flash.message, life: 4000 })
        },
        onError: () => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not start the sync, please try again.', life: 4000 })
        },
        onFinish: () => {
            syncingInventory.value = false
        },
    })
}

const fetchingMissingImages = ref(false)

function fetchMissingImages() {
    fetchingMissingImages.value = true
    router.post(route('admin.items.fetch-missing-images'), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
            toast.add({ severity: 'success', summary: 'Started', detail: res.props.flash.message, life: 4000 })
        },
        onError: () => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not start the job, please try again.', life: 4000 })
        },
        onFinish: () => {
            fetchingMissingImages.value = false
        },
    })
}
</script>

<template>
    <div>
        <div class="flex items-center justify-between mb-1">
            <h2 class="text-base font-bold text-gray-900">Manage Item</h2>
            <Button
                label="View Discounted Items"
                icon="pi pi-list"
                size="small"
                severity="info"
                outlined
                @click="router.visit(route('admin.items.managed'))"
            />
        </div>
        <p class="text-sm text-gray-500 mb-4 max-w-xl">
            Search for an item by No. or name to manage its video link, pricing and discounts. The video link shows up as the last slide in the item's image gallery.
        </p>

        <span class="relative inline-block w-full sm:w-96">
            <i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
            <PrimeInputText
                v-model="query"
                @input="onSearchInput"
                placeholder="Search by item No. or name..."
                class="w-full pl-9! rounded-lg! py-1.5!"
            />
        </span>

        <div v-if="searching" class="flex items-center gap-2 text-sm text-gray-400 mt-4">
            <i class="pi pi-spinner pi-spin"></i> Searching...
        </div>

        <div v-else-if="query.trim().length >= 2 && results.length === 0" class="text-sm text-gray-400 mt-4">
            No items found for "{{ query }}".
        </div>

        <ul v-else-if="results.length" class="divide-y divide-gray-100 mt-4">
            <ItemsListing
                v-for="item in results"
                :key="item.id"
                :item="item"
                @manage="openManageDialog"
            />
        </ul>

        <hr class="my-6 border-gray-100" />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-5">
                <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                    <i class="pi pi-cloud-download"></i>
                </div>
                <h2 class="text-base font-bold text-gray-900 mb-1">Fetch New Items</h2>
                <p class="text-sm text-gray-500 mb-4">
                    Fetches new items added in Business Central and adds them to the shop, with their category, images, prices and attributes. Existing items are left untouched. Leave the item number empty to check the full catalog, or enter one to fetch just that item.
                </p>
                <PrimeInputText
                    v-model="itemNoToSync"
                    size="small"
                    class="text-sm mb-3 rounded-lg! py-1.5!"
                    placeholder="Item No. (optional)"
                />
                <Button
                    :loading="syncingItems"
                    @click="syncItems"
                    :label="syncingItems ? 'Fetching...' : (itemNoToSync ? 'Fetch Item' : 'Fetch New Items')"
                    icon="pi pi-cloud-download"
                    severity="success"
                    class="mt-auto self-start"
                />
                <p class="text-sm text-gray-400 mt-3 flex items-center gap-1">
                    <i class="pi pi-clock"></i>Seconds for a single item, about 4 minutes for the full catalog.
                </p>
            </div>

            <div class="flex flex-col rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-5">
                <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                    <i class="pi pi-tags"></i>
                </div>
                <h2 class="text-base font-bold text-gray-900 mb-1">Item Attributes</h2>
                <p class="text-sm text-gray-500 mb-4">
                    Updates item attribute values (e.g. size, color) from Business Central.
                </p>
                <Button
                    :loading="syncingAttributes"
                    @click="syncAttributes"
                    :label="syncingAttributes ? 'Updating...' : 'Update Attributes'"
                    icon="pi pi-refresh"
                    severity="warn"
                    class="mt-auto self-start"
                />
                <p class="text-sm text-gray-400 mt-3 flex items-center gap-1">
                    <i class="pi pi-clock"></i>Takes about 1-2 minutes to finish.
                </p>
            </div>

            <div class="flex flex-col rounded-2xl border-2 border-blue-200 bg-blue-50/50 p-5">
                <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                    <i class="pi pi-box"></i>
                </div>
                <h2 class="text-base font-bold text-gray-900 mb-1">Inventory</h2>
                <p class="text-sm text-gray-500 mb-4">
                    Updates item stock levels from Business Central and notifies users waiting on restocked items.
                </p>
                <Button
                    :loading="syncingInventory"
                    @click="syncInventory"
                    :label="syncingInventory ? 'Updating...' : 'Sync Inventory'"
                    icon="pi pi-box"
                    severity="info"
                    class="mt-auto self-start"
                />
                <p class="text-sm text-gray-400 mt-3 flex items-center gap-1">
                    <i class="pi pi-clock"></i>Takes about 1-2 minutes to finish.
                </p>
            </div>

            <div class="flex flex-col rounded-2xl border-2 border-purple-200 bg-purple-50/50 p-5">
                <div class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                    <i class="pi pi-images"></i>
                </div>
                <h2 class="text-base font-bold text-gray-900 mb-1">Missing Item Images</h2>
                <p class="text-sm text-gray-500 mb-4">
                    Fetches images from Business Central for in-stock items (inventory &gt; 0) that don't have any yet. Runs in the background.
                </p>
                <Button
                    :loading="fetchingMissingImages"
                    @click="fetchMissingImages"
                    :label="fetchingMissingImages ? 'Starting...' : 'Fetch Missing Images'"
                    icon="pi pi-images"
                    severity="help"
                    class="mt-auto self-start"
                />
                <p class="text-sm text-gray-400 mt-3 flex items-center gap-1">
                    <i class="pi pi-clock"></i>Takes about 1-2 minutes to finish.
                </p>
            </div>
        </div>

        <ManageItemDialog ref="dialogRef" @saved="onSaved" />
    </div>
</template>
