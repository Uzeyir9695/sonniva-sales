<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useDebounceFn } from '@vueuse/core'
import axios from 'axios'
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue'

const props = defineProps({
    section: { type: Object, required: true },
    index: { type: Number, required: true },
})

const toast = useToast()
const confirm = useConfirm()

function imageUrl(item) {
    return `${item.storage_path}/${item.images[0]}`
}

/* ---------------- Header titles ---------------- */
const carouselTitle = ref(props.section.carousel_title ?? '')
const galleryTitle = ref(props.section.gallery_title ?? '')

function saveTitles() {
    router.put(route('admin.home-page.sections.update', props.section.id), {
        carousel_title: carouselTitle.value.trim() || null,
        gallery_title: galleryTitle.value.trim() || null,
    }, { preserveScroll: true })
}

/* ---------------- Hide / delete ---------------- */
function toggleHidden() {
    router.patch(route('admin.home-page.sections.toggle-hidden', props.section.id), {}, { preserveScroll: true })
}

function deleteSection() {
    confirm.require({
        message: 'Delete this section and all its items/images? This cannot be undone.',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
        acceptProps: { label: 'Delete', severity: 'danger' },
        accept: () => {
            router.delete(route('admin.home-page.sections.destroy', props.section.id), {
                preserveScroll: true,
                onSuccess: (res) => toast.add({ severity: 'success', summary: 'Deleted', detail: res.props.flash.message, life: 3000 }),
            })
        },
    })
}

/* ---------------- Item search & add ---------------- */
const query = ref('')
const results = ref([])
const searching = ref(false)

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

const debouncedSearch = useDebounceFn((q) => runSearch(q), 400)

function onSearchInput() {
    const q = query.value.trim()
    if (q.length < 2) {
        results.value = []
        searching.value = false
        return
    }
    debouncedSearch(q)
}

function addItem(item) {
    router.post(route('admin.home-page.sections.items.store', props.section.id), { item_id: item.id }, {
        preserveScroll: true,
        onSuccess: () => { results.value = results.value.filter(r => r.id !== item.id) },
    })
}

function closeResults() {
    query.value = ''
    results.value = []
}

function removeItem(item) {
    router.delete(route('admin.home-page.sections.items.destroy', [props.section.id, item.id]), { preserveScroll: true })
}

/* ---------------- Image upload ---------------- */
const imageTitle = ref('')
const imageLink = ref('')
const imageFile = ref(null)
const imageFileName = ref('')
const uploadingImage = ref(false)

function onImageFileChange(event) {
    const file = event.target.files?.[0] ?? null
    imageFile.value = file
    imageFileName.value = file?.name ?? ''
}

function uploadImage() {
    if (!imageFile.value) return

    uploadingImage.value = true

    router.post(route('admin.home-page.sections.images.store', props.section.id), {
        image: imageFile.value,
        title: imageTitle.value.trim() || null,
        link_url: imageLink.value.trim() || null,
    }, {
        preserveScroll: true,
        onSuccess: () => toast.add({ severity: 'success', summary: 'Uploaded', life: 3000 }),
        onError: () => toast.add({ severity: 'error', summary: 'Upload failed', life: 3000 }),
        onFinish: () => {
            uploadingImage.value = false
            imageTitle.value = ''
            imageLink.value = ''
            imageFile.value = null
            imageFileName.value = ''
        },
    })
}

function deleteImage(image) {
    router.delete(route('admin.home-page.sections.images.destroy', [props.section.id, image.id]), { preserveScroll: true })
}

/* ---------------- Image edit (title/link) ---------------- */
const editDialogVisible = ref(false)
const editingImage = ref(null)
const editTitle = ref('')
const editLink = ref('')

function startEditImage(image) {
    editingImage.value = image
    editTitle.value = image.title ?? ''
    editLink.value = image.link_url ?? ''
    editDialogVisible.value = true
}

function saveImageEdit() {
    router.put(route('admin.home-page.sections.images.update', [props.section.id, editingImage.value.id]), {
        title: editTitle.value.trim() || null,
        link_url: editLink.value.trim() || null,
    }, {
        preserveScroll: true,
        onSuccess: () => { editDialogVisible.value = false },
    })
}
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">
        <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
                <span class="w-7 h-7 flex items-center justify-center rounded-full bg-brand-500 text-white text-xs font-bold shrink-0">{{ index }}</span>
                <span v-if="section.is_hidden" class="flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-full font-medium bg-red-500 text-white">
                    <i class="pi pi-eye-slash text-xs"></i>
                    Hidden Section
                </span>
            </div>
            <div class="flex items-center gap-2">
                <Button
                    :label="section.is_hidden ? 'Show' : 'Hide'"
                    :icon="section.is_hidden ? 'pi pi-eye-slash' : 'pi pi-eye'"
                    size="small"
                    severity="secondary"
                    outlined
                    @click="toggleHidden"
                />
                <Button
                    label="Delete"
                    icon="pi pi-trash"
                    size="small"
                    severity="danger"
                    outlined
                    @click="deleteSection"
                />
            </div>
        </div>

        <!-- Carousel -->
        <div class="space-y-3 pt-2 border-t border-gray-100">
            <div>
                <label class="text-sm font-semibold text-gray-500 mb-1 block">Carousel Header</label>
                <PrimeInputText v-model="carouselTitle" @blur="saveTitles" placeholder="e.g. Featured Products" class="w-full sm:w-96 rounded-lg!" />
            </div>

            <span class="relative inline-block w-full sm:w-96">
                <i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                <PrimeInputText
                    v-model="query"
                    @input="onSearchInput"
                    placeholder="Search by item No. or name..."
                    class="w-full pl-9! rounded-lg!"
                />
            </span>

            <div v-if="searching" class="flex items-center gap-2 text-sm text-gray-400">
                <i class="pi pi-spinner pi-spin"></i> Searching...
            </div>

            <div v-else-if="query.trim().length >= 2 && results.length === 0" class="text-sm text-gray-400">
                No items found for "{{ query }}".
            </div>

            <div v-else-if="results.length" class="border border-gray-100 rounded-xl overflow-hidden">
                <div class="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100">
                    <span class="text-xs font-medium text-gray-400">{{ results.length }} result(s)</span>
                    <button @click="closeResults" class="text-gray-400 hover:text-gray-700" v-tooltip.top="'Close'">
                        <i class="pi pi-times text-xs"></i>
                    </button>
                </div>
                <ul class="divide-y divide-gray-100">
                    <li v-for="item in results" :key="item.id" class="flex items-center gap-3 py-2 px-3">
                        <div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            <img v-if="item.images?.length" :src="imageUrl(item)" :alt="item.name" class="w-full h-full object-cover" />
                            <div v-else class="w-full h-full flex items-center justify-center">
                                <i class="pi pi-image text-gray-300 text-sm"></i>
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-800 truncate">{{ item.name }}</p>
                            <p class="text-xs text-gray-400 font-mono">{{ item.no }}</p>
                        </div>
                        <Button label="Add" icon="pi pi-plus" size="small" severity="secondary" outlined @click="addItem(item)" />
                    </li>
                </ul>
            </div>

            <div v-if="section.items?.length" class="flex flex-wrap gap-2">
                <span
                    v-for="item in section.items"
                    :key="item.id"
                    class="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
                >
                    <span class="w-6 h-6 rounded-full overflow-hidden bg-gray-200 shrink-0">
                        <img v-if="item.images?.length" :src="imageUrl(item)" :alt="item.name" class="w-full h-full object-cover" />
                    </span>
                    <span class="truncate max-w-40">{{ item.name }}</span>
                    <button @click="removeItem(item)" class="text-gray-400 hover:text-red-500">
                        <i class="pi pi-times text-xs"></i>
                    </button>
                </span>
            </div>
            <p v-else class="text-sm text-gray-400 italic">No items in this carousel yet.</p>
        </div>

        <!-- Gallery -->
        <div class="space-y-3 pt-4 border-t border-gray-100">
            <div>
                <label class="text-sm font-semibold text-gray-500 mb-1 block">Gallery Header</label>
                <PrimeInputText v-model="galleryTitle" @blur="saveTitles" placeholder="e.g. Shop by Room" class="w-full sm:w-96 rounded-lg!" />
            </div>

            <div class="flex flex-wrap items-end gap-2">
                <div class="flex-1 min-w-40">
                    <label class="text-xs font-medium text-gray-500 mb-1 block">Title (optional)</label>
                    <PrimeInputText v-model="imageTitle" placeholder="e.g ანჯამები" class="w-full rounded-lg!" />
                </div>
                <div class="flex-1 min-w-40">
                    <label class="text-xs font-medium text-gray-500 mb-1 block">Link (optional)</label>
                    <PrimeInputText v-model="imageLink" placeholder="https://..." class="w-full rounded-lg!" />
                </div>
                <label
                    class="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                    <i class="pi pi-image text-xs"></i>
                    {{ imageFileName || 'Choose Image' }}
                    <input type="file" accept="image/*" class="hidden" @change="onImageFileChange" />
                </label>
                <Button
                    label="Add"
                    icon="pi pi-plus"
                    :loading="uploadingImage"
                    :disabled="!imageFile"
                    @click="uploadImage"
                />
            </div>

            <div v-if="section.images?.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div
                    v-for="image in section.images"
                    :key="image.id"
                    class="relative group rounded-xl overflow-hidden aspect-video bg-gray-100 shadow-md"
                >
                    <img :src="image.image_url" :alt="image.title || ''" class="w-full h-full object-cover" />
                    <span v-if="image.title" class="absolute bottom-0 left-0 right-0 px-2 py-1 text-[11px] font-medium text-white bg-black/60 truncate">
                        {{ image.title }}
                    </span>

                    <div class="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button @click="startEditImage(image)" class="text-white">
                            <i class="pi pi-pencil text-lg"></i>
                        </button>
                        <button @click="deleteImage(image)" class="text-white">
                            <i class="pi pi-trash text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
            <p v-else class="text-sm text-gray-400 italic">No images uploaded yet.</p>
        </div>

        <Dialog v-model:visible="editDialogVisible" modal header="Edit Image" :style="{ width: '24rem' }">
            <div class="space-y-4">
                <div>
                    <label class="text-sm font-semibold text-gray-500 mb-1 block">Title</label>
                    <PrimeInputText v-model="editTitle" class="w-full rounded-lg!" fluid />
                </div>
                <div>
                    <label class="text-sm font-semibold text-gray-500 mb-1 block">Link</label>
                    <PrimeInputText v-model="editLink" class="w-full rounded-lg!" fluid />
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" size="small" severity="secondary" variant="text" @click="editDialogVisible = false" />
                <Button label="Save" size="small" icon="pi pi-check" @click="saveImageEdit" />
            </template>
        </Dialog>
    </div>
</template>
