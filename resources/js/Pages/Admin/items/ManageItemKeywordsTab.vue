<script setup>
import { ref } from 'vue'
import { router, useHttp } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import { useDebounceFn } from '@vueuse/core'
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue'

const toast = useToast()

const flagMap = {
    en: 'https://flagcdn.com/w40/gb.png',
    ru: 'https://flagcdn.com/w40/ru.png',
    tr: 'https://flagcdn.com/w40/tr.png',
}

/* ---------------- Category search ---------------- */
const categorySearch = useHttp({ q: '' })
const categoryResults = ref([])

const debouncedCategorySearch = useDebounceFn(() => {
    categorySearch.get(route('admin.categories.search'), {
        onSuccess: (data) => { categoryResults.value = data },
        onError: () => { categoryResults.value = [] },
    })
}, 400)

function onCategorySearchInput() {
    if (categorySearch.q.trim().length < 2) {
        categoryResults.value = []
        return
    }
    debouncedCategorySearch()
}

/* ---------------- Selected category & keywords ---------------- */
const selectedCategory = ref(null)
const savingKeywords = ref(false)
const keywords = useHttp({ en_keywords: '', ru_keywords: '', tr_keywords: '' })

function selectCategory(category) {
    selectedCategory.value = category
    categoryResults.value = []
    categorySearch.q = ''

    keywords.get(route('admin.categories.keywords.show', category.id), {
        onSuccess: (data) => {
            keywords.en_keywords = data.en_keywords
            keywords.ru_keywords = data.ru_keywords
            keywords.tr_keywords = data.tr_keywords
        },
        onError: () => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not load keywords for this category.', life: 4000 })
        },
    })
}

function changeCategory() {
    selectedCategory.value = null
    keywords.en_keywords = ''
    keywords.ru_keywords = ''
    keywords.tr_keywords = ''
}

function saveKeywords() {
    savingKeywords.value = true
    router.post(route('admin.categories.keywords.update', selectedCategory.value.id), {
        en_keywords: keywords.en_keywords,
        ru_keywords: keywords.ru_keywords,
        tr_keywords: keywords.tr_keywords,
    }, {
        preserveScroll: true,
        onSuccess: (res) => {
            toast.add({ severity: 'success', summary: 'Saved', detail: res.props.flash.message, life: 4000 })
        },
        onError: () => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not save the keywords, please try again.', life: 4000 })
        },
        onFinish: () => {
            savingKeywords.value = false
        },
    })
}
</script>

<template>
    <div>
        <h2 class="text-base font-bold text-gray-900 mb-1">Manage Item Keywords</h2>
        <p class="text-sm text-gray-500 mb-4">
            Search for a category by name or code, then set search keywords for it in each language. Saving assigns those keywords to every item in that category and its sub-categories. Keywords are only used to match the navbar search - they are never shown to customers.
        </p>

        <template v-if="!selectedCategory">
            <span class="relative inline-block w-full sm:w-96">
                <i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                <PrimeInputText
                    v-model="categorySearch.q"
                    @input="onCategorySearchInput"
                    placeholder="Search by category name or code..."
                    class="w-full pl-9! rounded-lg!"
                />
            </span>

            <div v-if="categorySearch.processing" class="flex items-center gap-2 text-sm text-gray-400 mt-4">
                <i class="pi pi-spinner pi-spin"></i> Searching...
            </div>

            <div v-else-if="categorySearch.q.trim().length >= 2 && categoryResults.length === 0" class="text-sm text-gray-400 mt-4">
                No categories found for "{{ categorySearch.q }}".
            </div>

            <ul v-else-if="categoryResults.length" class="divide-y divide-gray-100 mt-4">
                <li
                    v-for="category in categoryResults"
                    :key="category.id"
                    class="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2"
                    @click="selectCategory(category)"
                >
                    <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <img
                            v-if="category.image"
                            :src="`/storage/categories/${category.image}`"
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

                    <i class="pi pi-chevron-right text-gray-300 text-sm"></i>
                </li>
            </ul>
        </template>

        <template v-else>
            <div class="flex items-center gap-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4 mb-4">
                <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img
                        v-if="selectedCategory.image"
                        :src="`/storage/categories/${selectedCategory.image}`"
                        :alt="selectedCategory.name"
                        class="w-full h-full object-cover"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                        <i class="pi pi-image text-gray-300 text-sm"></i>
                    </div>
                </div>

                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-800 truncate">{{ selectedCategory.name }}</p>
                    <p class="text-xs text-gray-400 font-mono">{{ selectedCategory.code }}</p>
                </div>

                <Button
                    label="Change Category"
                    icon="pi pi-arrow-left"
                    size="small"
                    severity="secondary"
                    outlined
                    @click="changeCategory"
                />
            </div>

            <div v-if="keywords.processing" class="flex items-center gap-2 text-sm text-gray-400">
                <i class="pi pi-spinner pi-spin"></i> Loading keywords...
            </div>

            <div v-else class="space-y-4">
                <div>
                    <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1">
                        <img :src="flagMap.en" class="w-5 h-3.5 object-cover rounded-xs shrink-0" alt="" />
                        English keywords
                    </label>
                    <Textarea v-model="keywords.en_keywords" rows="3" class="w-full rounded-xl text-sm" placeholder="e.g. slides, door lock, handle" />
                </div>

                <div>
                    <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1">
                        <img :src="flagMap.ru" class="w-5 h-3.5 object-cover rounded-xs shrink-0" alt="" />
                        Russian keywords
                    </label>
                    <Textarea v-model="keywords.ru_keywords" rows="3" class="w-full rounded-xl text-sm" placeholder="e.g. слайды, дверной замок, ручка" />
                </div>

                <div>
                    <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1">
                        <img :src="flagMap.tr" class="w-5 h-3.5 object-cover rounded-xs shrink-0" alt="" />
                        Turkish keywords
                    </label>
                    <Textarea v-model="keywords.tr_keywords" rows="3" class="w-full rounded-xl text-sm" placeholder="e.g. sürgü, kapı kilidi, kol" />
                </div>

                <Button
                    :loading="savingKeywords"
                    @click="saveKeywords"
                    :label="savingKeywords ? 'Saving...' : 'Save Keywords'"
                    icon="pi pi-save"
                    severity="success"
                />
            </div>
        </template>
    </div>
</template>
