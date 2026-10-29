<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import { getOriginalPrice, getDisplayPrice } from '@/composables/usePricing.js'
import { formatDiscount } from '@/utils/numberFormat.js'

const props = defineProps({
    item: { type: Object, required: true },
})

defineEmits(['manage', 'manage-details'])

const toast = useToast()
const inLiquidation = ref(props.item.is_liquidation)
const togglingLiquidation = ref(false)

async function toggleLiquidation() {
    togglingLiquidation.value = true
    try {
        const res = await axios.post(route('admin.items.liquidation.toggle', props.item.id))
        inLiquidation.value = res.data.is_liquidation
        toast.add({
            severity: 'success',
            summary: inLiquidation.value ? 'Added to Liquidation' : 'Removed from Liquidation',
            detail: props.item.name,
            life: 3000,
        })
    } catch {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Could not update the liquidation list, please try again.', life: 4000 })
    } finally {
        togglingLiquidation.value = false
    }
}

function imageUrl(item) {
    return `${item.storage_path}/${item.images[0]}`
}
</script>

<template>
    <li class="flex items-center gap-3 py-3">
        <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
            <img
                v-if="item.images?.length"
                :src="imageUrl(item)"
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
            label="Manage Discount"
            icon="pi pi-percentage"
            size="small"
            severity="secondary"
            outlined
            @click="$emit('manage', item)"
        />

        <Button
            label="Manage Details"
            icon="pi pi-pen-to-square"
            size="small"
            severity="secondary"
            outlined
            @click="$emit('manage-details', item)"
        />

        <Button
            :label="inLiquidation ? 'In Liquidation' : 'Liquidation'"
            :icon="inLiquidation ? 'pi pi-check' : 'pi pi-box'"
            size="small"
            :severity="inLiquidation ? 'warn' : 'secondary'"
            :outlined="!inLiquidation"
            :loading="togglingLiquidation"
            v-tooltip.top="inLiquidation ? 'Remove from the liquidation list' : 'Add to the liquidation list'"
            @click="toggleLiquidation"
        />
    </li>
</template>
