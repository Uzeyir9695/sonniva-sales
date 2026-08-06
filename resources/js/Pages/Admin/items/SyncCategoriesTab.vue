<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue'

const toast = useToast()

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
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="flex flex-col rounded-2xl border-2 border-teal-200 bg-teal-50/50 p-5">
            <div class="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-3">
                <i class="pi pi-sitemap"></i>
            </div>
            <h2 class="text-base font-bold text-gray-900 mb-1">Sync Categories</h2>
            <p class="text-sm text-gray-500 mb-4">
                Updates the category structure and item category codes from Business Central.
            </p>
            <Button
                :loading="syncingCategories"
                @click="syncCategories"
                :label="syncingCategories ? 'Updating...' : 'Update Now'"
                icon="pi pi-refresh"
                severity="success"
                class="mt-auto self-start"
            />
            <p class="text-sm text-gray-400 mt-3 flex items-center gap-1">
                <i class="pi pi-clock"></i>Takes about 1-2 minutes to finish.
            </p>
        </div>

        <div class="flex flex-col rounded-2xl border-2 border-pink-200 bg-pink-50/50 p-5">
            <div class="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-3">
                <i class="pi pi-image"></i>
            </div>
            <h2 class="text-base font-bold text-gray-900 mb-1">Category Photo</h2>
            <p class="text-sm text-gray-500 mb-4">
                Search for a category by name or code and pull its latest photo from Business Central. The previous photo is deleted once the new one is saved.
            </p>

            <span class="relative inline-block w-full">
                <i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                <PrimeInputText
                    v-model="categoryQuery"
                    @input="onCategorySearchInput"
                    placeholder="Search by category name or code..."
                    class="w-full pl-9!  rounded-lg!"
                />
            </span>

            <div v-if="searchingCategories" class="flex items-center gap-2 text-sm text-gray-400 mt-4">
                <i class="pi pi-spinner pi-spin"></i> Searching...
            </div>

            <div v-else-if="categoryQuery.trim().length >= 2 && categoryResults.length === 0" class="text-sm text-gray-400 mt-4">
                No categories found for "{{ categoryQuery }}".
            </div>

            <ul v-else-if="categoryResults.length" class="divide-y divide-pink-100 mt-4">
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
        </div>
    </div>
</template>
