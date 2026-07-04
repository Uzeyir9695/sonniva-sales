<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import AdminLayout from '../AdminLayout.vue'

defineOptions({ layout: AdminLayout })

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
</script>

<template>
    <div class="p-4 sm:p-6 space-y-4">
        <h1 class="text-xl font-bold text-gray-900">Manage Items</h1>

        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-base font-bold text-gray-900 mb-1">Sync Categories</h2>
            <p class="text-sm text-gray-500 mb-4">
                Updates the category structure and item category codes from Business Central.
            </p>
            <Button
                :loading="syncingCategories"
                @click="syncCategories"
                :label="syncingCategories ? 'Syncing...' : 'Sync Now'"
                icon="pi pi-refresh"
            />
        </div>
    </div>
</template>