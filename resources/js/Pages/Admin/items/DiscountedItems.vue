<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '../AdminLayout.vue'
import ManageItemDialog from './ManageItemDialog.vue'
import ManageItemDetailsDialog from './ManageItemDetailsDialog.vue'
import ItemsListing from './ItemsListing.vue'

defineOptions({ layout: AdminLayout })

defineProps({
    items: { type: Array, default: () => [] },
    title: { type: String, default: 'Managed Items' },
    description: { type: String, default: 'Items that currently have a discount or a video link assigned. Manage them directly here.' },
    emptyText: { type: String, default: 'No items have a discount or video link assigned yet.' },
})

const dialogRef = ref(null)

function openManageDialog(item) {
    dialogRef.value.open(item)
}

const detailsDialogRef = ref(null)

function openDetailsDialog(item) {
    detailsDialogRef.value.open(item)
}

function backToItems() {
    router.visit(route('admin.items.index'))
}
</script>

<template>
    <div class="p-4 sm:p-6">
        <div class="flex items-center justify-between mb-1">
            <h1 class="text-xl font-bold text-gray-900">{{ title }}</h1>
            <Button
                label="Back to Manage Items"
                icon="pi pi-arrow-left"
                size="small"
                severity="secondary"
                outlined
                @click="backToItems"
            />
        </div>
        <p class="text-sm text-gray-500 mb-4">{{ description }}</p>

        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <div v-if="!items.length" class="text-sm text-gray-400 py-4">
                {{ emptyText }}
            </div>

            <ul v-else class="divide-y divide-gray-100">
                <ItemsListing
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                    @manage="openManageDialog"
                    @manage-details="openDetailsDialog"
                />
            </ul>
        </div>

        <ManageItemDialog ref="dialogRef" />
        <ManageItemDetailsDialog ref="detailsDialogRef" />
    </div>
</template>
