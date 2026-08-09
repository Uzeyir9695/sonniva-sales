<script setup>
import { getOriginalPrice, getDisplayPrice } from '@/composables/usePricing.js'
import { formatDiscount } from '@/utils/numberFormat.js'

defineProps({
    item: { type: Object, required: true },
})

defineEmits(['manage'])

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
            label="Manage"
            icon="pi pi-pen-to-square"
            size="small"
            severity="secondary"
            outlined
            @click="$emit('manage', item)"
        />
    </li>
</template>
