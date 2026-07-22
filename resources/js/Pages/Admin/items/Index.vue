<script setup>
import { ref } from 'vue'
import { router, useForm } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import AdminLayout from '../AdminLayout.vue'
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue'
import InputNumber from 'primevue/inputnumber'
import { getOriginalPrice, getDisplayPrice } from '@/composables/usePricing.js'
import { formatDiscount } from '@/utils/numberFormat.js'

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

const manageDialogVisible = ref(false)
const editingItem = ref(null)

const manageForm = useForm({
    video_url: '',
    discount: null,
    discount_amount: null,
    wholesale_discount_percent: null,
    vip_discount_percent: null,
    bc_discount_percent: null,
    fake_price: null,
})

function openManageDialog(item) {
    editingItem.value = item
    manageForm.clearErrors()
    manageForm.video_url = item.video_url ?? ''
    manageForm.discount = item.discount ?? null
    manageForm.discount_amount = null
    manageForm.wholesale_discount_percent = item.wholesale_discount_percent ?? null
    manageForm.vip_discount_percent = item.vip_discount_percent ?? null
    manageForm.bc_discount_percent = item.bc_discount_percent ?? null
    manageForm.fake_price = item.fake_price ?? null
    manageDialogVisible.value = true
}

function saveItem() {
    manageForm
        .transform(data => ({
            video_url: data.video_url.trim() || null,
            discount: data.discount || null,
            discount_amount: data.discount_amount || null,
            wholesale_discount_percent: data.wholesale_discount_percent || null,
            vip_discount_percent: data.vip_discount_percent || null,
            bc_discount_percent: data.bc_discount_percent || null,
            fake_price: data.fake_price || null,
        }))
        .put(route('admin.items.update', editingItem.value.id), {
            preserveScroll: true,
            onSuccess: (res) => {
                editingItem.value.video_url = manageForm.video_url.trim() || null
                editingItem.value.fake_price = manageForm.fake_price || null
                manageDialogVisible.value = false
                toast.add({ severity: 'success', summary: 'Saved', detail: res.props.flash.message, life: 3000 })
                // Discount may have been derived server-side from the ₾ amount -
                // refetch so the list shows the actual saved percentage/price.
                if (query.value.trim().length >= 2) runSearch(query.value.trim())
            },
        })
}

/* ---------------- Category images ---------------- */
const categoryQuery = ref('')
const categoryResults = ref([])
const searchingCategories = ref(false)
const fetchingCategoryImageId = ref(null)
let categoryDebounceTimer = null

function categoryImageUrl(category) {
    return `/storage/categories/${category.image}`
}

async function runCategorySearch(q) {
    searchingCategories.value = true
    try {
        const res = await axios.get(route('admin.categories.search'), { params: { q } })
        categoryResults.value = res.data
    } catch {
        categoryResults.value = []
    } finally {
        searchingCategories.value = false
    }
}

function onCategorySearchInput() {
    clearTimeout(categoryDebounceTimer)
    const q = categoryQuery.value.trim()
    if (q.length < 2) {
        categoryResults.value = []
        searchingCategories.value = false
        return
    }
    categoryDebounceTimer = setTimeout(() => runCategorySearch(q), 400)
}

function fetchCategoryImage(category) {
    fetchingCategoryImageId.value = category.id
    router.post(route('admin.categories.fetch-image', category.id), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
            toast.add({ severity: 'success', summary: 'Updated', detail: res.props.flash.message, life: 3000 })
            if (categoryQuery.value.trim().length >= 2) runCategorySearch(categoryQuery.value.trim())
        },
        onError: (errors) => {
            toast.add({ severity: 'error', summary: 'Error', detail: errors?.message ?? 'Could not fetch the image, please try again.', life: 4000 })
        },
        onFinish: () => {
            fetchingCategoryImageId.value = null
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
                                <p class="text-sm mt-0.5">
                                    <span v-if="getOriginalPrice(item)" class="text-red-500 line-through mr-1.5">{{ Number(getOriginalPrice(item)).toFixed(2) }} ₾</span>
                                    <span class="font-semibold text-gray-700">{{ Number(getDisplayPrice(item)).toFixed(2) }} ₾</span>
                                </p>
                            </div>

                            <span
                                v-if="item.discount > 0"
                                class="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 bg-red-100 text-red-600"
                            >
                                -{{ formatDiscount(item.discount) }}%
                            </span>

                            <span
                                class="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                                :class="item.video_url ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'"
                            >
                                {{ item.video_url ? 'Video set' : 'No video' }}
                            </span>

                            <a
                                :href="route('items.show', item.slug)"
                                target="_blank"
                                v-tooltip.top="'View item page'"
                                class="w-8 h-8 flex items-center justify-center rounded-lg shrink-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <i class="pi pi-external-link text-sm"></i>
                            </a>

                            <Button
                                label="Manage"
                                icon="pi pi-cog"
                                size="small"
                                severity="secondary"
                                outlined
                                @click="openManageDialog(item)"
                            />
                        </li>
                    </ul>

                    <hr class="my-6 border-gray-100" />

                    <h2 class="text-base font-bold text-gray-900 mb-1">Item Attributes</h2>
                    <p class="text-sm text-gray-500 mb-4">
                        Updates item attribute values (e.g. size, color) from Business Central.
                    </p>
                    <Button
                        :loading="syncingAttributes"
                        @click="syncAttributes"
                        :label="syncingAttributes ? 'Updating...' : 'Update Attributes'"
                        icon="pi pi-refresh"
                    />

                    <hr class="my-6 border-gray-100" />

                    <h2 class="text-base font-bold text-gray-900 mb-1">Missing Item Images</h2>
                    <p class="text-sm text-gray-500 mb-4">
                        Fetches images from Business Central for in-stock items (inventory &gt; 0) that don't have any yet. Runs in the background.
                    </p>
                    <Button
                        :loading="fetchingMissingImages"
                        @click="fetchMissingImages"
                        :label="fetchingMissingImages ? 'Starting...' : 'Fetch Missing Images'"
                        icon="pi pi-images"
                    />
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

                    <hr class="my-6 border-gray-100" />

                    <h2 class="text-base font-bold text-gray-900 mb-1">Category Photo</h2>
                    <p class="text-sm text-gray-500 mb-4">
                        Search for a category by name or code and pull its latest photo from Business Central. The previous photo is deleted once the new one is saved.
                    </p>

                    <span class="relative inline-block w-full sm:w-96">
                        <i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                        <PrimeInputText
                            v-model="categoryQuery"
                            @input="onCategorySearchInput"
                            placeholder="Search by category name or code..."
                            class="w-full pl-9!"
                        />
                    </span>

                    <div v-if="searchingCategories" class="flex items-center gap-2 text-sm text-gray-400 mt-4">
                        <i class="pi pi-spinner pi-spin"></i> Searching...
                    </div>

                    <div v-else-if="categoryQuery.trim().length >= 2 && categoryResults.length === 0" class="text-sm text-gray-400 mt-4">
                        No categories found for "{{ categoryQuery }}".
                    </div>

                    <ul v-else-if="categoryResults.length" class="divide-y divide-gray-100 mt-4">
                        <li
                            v-for="category in categoryResults"
                            :key="category.id"
                            class="flex items-center gap-3 py-3"
                        >
                            <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                <img
                                    v-if="category.image"
                                    :src="categoryImageUrl(category)"
                                    :alt="category.name"
                                    class="w-full h-full object-cover"
                                />
                                <div v-else class="w-full h-full flex items-center justify-center">
                                    <i class="pi pi-image text-gray-300 text-sm"></i>
                                </div>
                            </div>

                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-800 truncate">{{ category.name }}</p>
                                <p class="text-xs text-gray-400 font-mono">{{ category.code }}</p>
                            </div>

                            <Button
                                label="Update Image"
                                icon="pi pi-refresh"
                                size="small"
                                severity="secondary"
                                outlined
                                :loading="fetchingCategoryImageId === category.id"
                                @click="fetchCategoryImage(category)"
                            />
                        </li>
                    </ul>
                </TabPanel>
            </TabPanels>
        </Tabs>

        <!-- Manage Item Dialog -->
        <Dialog v-model:visible="manageDialogVisible" modal header="Manage Item" :style="{ width: '28rem' }">
            <div v-if="editingItem" class="space-y-4">
                <div>
                    <p class="text-sm font-medium text-gray-800">{{ editingItem.name }}</p>
                    <p class="text-xs text-gray-400 font-mono">{{ editingItem.no }}</p>
                </div>

                <div>
                    <label class="text-sm font-semibold text-gray-500 mb-1 block">Video Link</label>
                    <PrimeInputText
                        v-model="manageForm.video_url"
                        placeholder="https://youtu.be/..."
                        :invalid="!!manageForm.errors.video_url"
                        class="w-full"
                        fluid
                    />
                    <p v-if="manageForm.errors.video_url" class="text-xs text-red-500 mt-1">{{ manageForm.errors.video_url }}</p>
                    <p v-else class="text-xs text-gray-400 mt-1">Paste the link from YouTube's Share button. Leave empty to remove the video.</p>
                </div>

                <div>
                    <label class="text-sm font-semibold text-gray-500 mb-1 block">Increased Price (₾)</label>
                    <InputNumber
                        v-model="manageForm.fake_price"
                        :min="0"
                        :min-fraction-digits="0"
                        :max-fraction-digits="2"
                        suffix=" ₾"
                        placeholder="0"
                        :invalid="!!manageForm.errors.fake_price"
                        fluid
                    />
                    <p v-if="manageForm.errors.fake_price" class="text-xs text-red-500 mt-1">{{ manageForm.errors.fake_price }}</p>
                    <p v-else class="text-xs text-gray-400 mt-1">Must be higher than the unit price ({{ Number(editingItem.unit_price).toFixed(2) }} ₾). Shown to customers in place of the unit price; leave empty to disable.</p>
                </div>

                <div>
                    <label class="text-sm font-semibold text-gray-500 mb-1 block">Web Discount (in %)</label>
                    <InputNumber
                        v-model="manageForm.discount"
                        :min="0"
                        :max="100"
                        :min-fraction-digits="0"
                        :max-fraction-digits="2"
                        suffix="%"
                        placeholder="0"
                        :invalid="!!manageForm.errors.discount"
                        fluid
                    />
                    <p v-if="manageForm.errors.discount" class="text-xs text-red-500 mt-1">{{ manageForm.errors.discount }}</p>
                    <p v-else class="text-xs text-gray-400 mt-1">Percentage off unit price. Leave empty for no discount.</p>
                </div>

                <div>
                    <label class="text-sm font-semibold text-gray-500 mb-1 block">BC Discount (in %)</label>
                    <InputNumber
                        v-model="manageForm.bc_discount_percent"
                        :min="0"
                        :max="100"
                        :min-fraction-digits="0"
                        :max-fraction-digits="2"
                        suffix="%"
                        placeholder="0"
                        :invalid="!!manageForm.errors.bc_discount_percent"
                        fluid
                    />
                    <p v-if="manageForm.errors.bc_discount_percent" class="text-xs text-red-500 mt-1">{{ manageForm.errors.bc_discount_percent }}</p>
                    <p v-else class="text-xs text-gray-400 mt-1">Percentage sent to Business Central on regular (non-wholesale/VIP) orders. Independent of the Web Discount above; leave empty to send no discount to BC.</p>
                </div>

                <div>
                    <label class="text-sm font-semibold text-gray-500 mb-1 block">Wholesale Discount (in %)</label>
                    <InputNumber
                        v-model="manageForm.wholesale_discount_percent"
                        :min="0"
                        :max="100"
                        :min-fraction-digits="0"
                        :max-fraction-digits="2"
                        suffix="%"
                        placeholder="0"
                        :invalid="!!manageForm.errors.wholesale_discount_percent"
                        fluid
                    />
                    <p v-if="manageForm.errors.wholesale_discount_percent" class="text-xs text-red-500 mt-1">{{ manageForm.errors.wholesale_discount_percent }}</p>
                    <p v-else class="text-xs text-gray-400 mt-1">Percentage off the Wholesale tier price. Leave empty for no extra discount.</p>
                </div>

                <div>
                    <label class="text-sm font-semibold text-gray-500 mb-1 block">VIP Discount (in %)</label>
                    <InputNumber
                        v-model="manageForm.vip_discount_percent"
                        :min="0"
                        :max="100"
                        :min-fraction-digits="0"
                        :max-fraction-digits="2"
                        suffix="%"
                        placeholder="0"
                        :invalid="!!manageForm.errors.vip_discount_percent"
                        fluid
                    />
                    <p v-if="manageForm.errors.vip_discount_percent" class="text-xs text-red-500 mt-1">{{ manageForm.errors.vip_discount_percent }}</p>
                    <p v-else class="text-xs text-gray-400 mt-1">Percentage off the VIP tier price. Leave empty for no extra discount.</p>
                </div>

                <div>
                    <label class="text-sm font-semibold text-gray-500 mb-1 block">Amount Off (₾)</label>
                    <InputNumber
                        v-model="manageForm.discount_amount"
                        :min="0"
                        :max="editingItem.unit_price"
                        :min-fraction-digits="0"
                        :max-fraction-digits="2"
                        suffix=" ₾"
                        placeholder="0"
                        :invalid="!!manageForm.errors.discount_amount"
                        fluid
                    />
                    <p v-if="manageForm.errors.discount_amount" class="text-xs text-red-500 mt-1">{{ manageForm.errors.discount_amount }}</p>
                    <p v-else class="text-xs text-gray-400 mt-1">e.g. price is {{ Number(editingItem.unit_price).toFixed(2) }} ₾, enter 1 to make it {{ (editingItem.unit_price - 1).toFixed(2) }} ₾. Overrides the percentage above if filled.</p>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" size="small" severity="secondary" variant="text" @click="manageDialogVisible = false" />
                <Button
                    label="Save"
                    size="small"
                    icon="pi pi-check"
                    :loading="manageForm.processing"
                    @click="saveItem"
                />
            </template>
        </Dialog>
    </div>
</template>
