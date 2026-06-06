<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import WishlistButton from '@/Shared/components/WishlistButton.vue'
import ItemImageSwitcher from '@/Shared/components/ItemImageSwitcher.vue'
import AddToCartButton from '@/Shared/components/AddToCartButton.vue'
import WhatsappOrderDialog from '@/Shared/components/WhatsappOrderDialog.vue'
import StockNotifyDialog from '@/Shared/components/StockNotifyDialog.vue'
import { usePricing } from '@/composables/usePricing.js'

const props = defineProps({
    item: { type: Object, required: true },
    isOrderOnly: { type: Boolean, default: false },
})

const { displayPrice, displayUOM } = usePricing(() => props.item)

const emit = defineEmits(['quick-view'])

const showWhatsappDialog = ref(false)
const showNotifyDialog = ref(false)

const viewItemDetails = (item) => {
    router.get(route('items.show', item.slug))
}
</script>

<template>
    <div @click="viewItemDetails(item)" class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col cursor-pointer h-full">
        <ItemImageSwitcher :item="item">
            <div class="absolute top-2.5 left-2.5">
                <span
                    v-if="item.inventory < 1"
                    class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600"
                >მარაგში არაა</span>
                <span
                    v-else
                    class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"
                >მარაგშია</span>
            </div>

            <div class="absolute top-2.5 right-2.5 flex flex-col gap-1.5 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">

                <!--  Wishlist -->
                <WishlistButton :item-id="item.id" />

                <!--  Quick view -->
                <button
                    @click.stop="emit('quick-view', item)"
                    class="w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-lg transition-all duration-150"
                >
                    <i class="pi pi-eye text-xs"></i>
                </button>

                <!--  Order via WhatsApp -->
                <button
                    v-if="item.inventory < 1"
                    @click.stop="showWhatsappDialog = true"
                    v-tooltip.left="'მოითხოვე შეკვეთა'"
                    class="w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-brand-600 hover:text-brand-700 hover:shadow-lg transition-all duration-150"
                >
                    <i class="pi pi-file-edit text-xs"></i>
                </button>

                <!--  Notify when back in stock -->
                <button
                    v-if="item.inventory < 1 && !isOrderOnly"
                    @click.stop="showNotifyDialog = true"
                    v-tooltip.left="'მიიღეთ შეტყობინება მარაგის შევსებისთანავე'"
                    class="w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-blue-500 hover:text-blue-600 hover:shadow-lg transition-all duration-150"
                >
                    <i class="pi pi-bell text-xs"></i>
                </button>
            </div>
        </ItemImageSwitcher>

        <div class="p-3 sm:p-4 flex flex-col flex-1">
            <span class="text-sm font-medium text-gray-900 leading-snug mb-1 line-clamp-2">
                {{ item.name }}
            </span>

            <div class="mt-auto pt-3 flex text-nowrap items-center justify-between gap-2">
                <span>
                    <template v-if="displayPrice">
                        <div class="flex flex-col gap-1">
                            <span v-if="displayUOM" class="text-xs text-blue-400">შეკვრა</span>
                                <div class="flex items-center gap-1 5">
                                <span class="text-base font-semibold text-gray-900">{{ displayPrice }} ₾</span>
                                <span v-if="displayUOM" class="text-xs text-gray-400">/ {{ displayUOM }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-else>—</template>
                </span>

                <AddToCartButton :item="item" />
            </div>
        </div>
    </div>

    <WhatsappOrderDialog v-model:visible="showWhatsappDialog" @click.stop />
    <StockNotifyDialog v-model:visible="showNotifyDialog" :item="item" @click.stop />
</template>
