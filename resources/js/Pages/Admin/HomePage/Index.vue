<script setup>
import AdminLayout from '../AdminLayout.vue'
import { router } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

defineOptions({ layout: AdminLayout });

const props = defineProps({
    banners: { type: Object, default: () => ({}) },
})

const toast = useToast()

const slots = [
    { key: 'main',   label: 'Main Banner (large left)'       },
    { key: 'doors',  label: 'Doors Carousel (top right)'    },
    { key: 'frames', label: 'Frames Carousel (bottom right)' },
]

const uploading = ref({})

function imagesFor(slot) {
    return props.banners[slot] ?? []
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
</script>

<template>
        <div class="p-6 max-w-5xl mx-auto space-y-6">
            <h1 class="text-xl font-bold text-gray-800">Manage Home Page</h1>

            <div v-for="slot in slots" :key="slot.key" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
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
