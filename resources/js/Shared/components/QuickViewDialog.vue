<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import ItemImageSwitcher from './ItemImageSwitcher.vue';
import WishlistButton from '@/Shared/components/WishlistButton.vue';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    item: Object,
})

const emit = defineEmits(['update:visible', 'details-clicked'])

const handleDetailsClick = () => {
    emit('update:visible', false)
    emit('details-clicked')
}

const show = computed({
    get: () => props.visible,
    set: (val) => emit('update:visible', val),
})

const inStock = computed(() => props.item?.inventory && props.item.inventory > 0)
</script>

<template>
    <Dialog
        v-model:visible="show"
        modal
        :closable="true"
        :draggable="false"
        :style="{ width: '990px', maxWidth: '95vw', borderRadius: '1.5rem', overflow: 'hidden' }"
        :pt="{
            root: { class: '!rounded-3xl !overflow-hidden !border-0 !shadow-2xl !mx-4' },
            header: {  class: 'self-end' },
            content: { class: '!p-0' },
            mask: { class: 'backdrop-blur-sm' },
            closeButton: { style: 'display:none' },
        }"
    >
        <template #header>

        </template>

        <div v-if="item" class="grid grid-cols-1 sm:grid-cols-5 p-3">
            <!-- Images -->
            <div class="col-span-2">
                <ItemImageSwitcher :item="item" :is-quick-view="true" />
            </div>

            <!-- Details -->
            <div class="col-span-3">
                <div class="p-6 sm:p-8 flex flex-col relative">
                    <!-- Stock badge -->
                    <div class="flex justify-between items-center mb-2">
                        <span
                            class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                            :class="inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'"
                        >
                            {{ inStock ? 'მარაგშია' : 'მარაგში არაა' }}
                        </span>

                    </div>

                    <h2 class="sm:text-xl font-semibold text-gray-900 mt-2 mb-2 leading-snug pr-6" style="font-family: 'Playfair Display', serif;">
                        {{ item.name }}
                    </h2>

                    <div v-if="item.attributes?.length" class="flex flex-col gap-1.5 my-4 flex-1">
                        <div
                            v-for="attr in item.attributes"
                            :key="attr.id"
                            class="flex items-center justify-between py-1.5 px-3 bg-gray-50 rounded-xl"
                        >
                            <span class="text-xs text-gray-500 font-medium">{{ attr.name }}</span>
                            <span class="text-xs text-gray-700 font-semibold">{{ attr.value }}</span>
                        </div>
                    </div>
                    <div v-else class="flex-1" />

                    <div class="border-t border-gray-100 pt-5 mt-2">
                        <div class="text-2xl font-bold text-gray-900 mb-4">
                            {{ item.unit_price ? `${item.unit_price} ₾` : '—' }}
                        </div>

                        <div class="flex items-center gap-2">
                            <button
                                :disabled="!inStock"
                                class="flex-1 flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold py-3 rounded-2xl border border-gray-500 text-gray-900 hover:bg-gray-800 hover:text-white active:scale-[0.98] transition-all"
                                :class="inStock
                                ? 'bg- brand-500 text- white hover:bg-brand-400'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
                            >
                                <i class="pi pi-bolt"></i>
                                შეუკვეთე ახლავე
                            </button> <button
                                :disabled="!inStock"
                                class="flex-1 flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold py-3 rounded-2xl transition-all duration-150"
                                :class="inStock
                                ? 'bg-brand-500 text-white hover:bg-brand-400'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
                            >
                                <i class="pi pi-cart-plus"></i>
                                კალათაში დამატება
                            </button>

                            <WishlistButton :item-id="item?.id" size="md" />
                        </div>

                        <Link
                            :href="route('items.show', item.slug)"
                            class="mt-3 w-full flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors py-2"
                            @click="handleDetailsClick"
                        >
                            დეტალურად ნახვა <i class="pi pi-arrow-right text-xs"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>
