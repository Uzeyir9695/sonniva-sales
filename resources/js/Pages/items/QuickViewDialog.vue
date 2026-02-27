<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import ItemImageSwitcher from './ItemImageSwitcher.vue';

const props = defineProps({
    visible: Boolean,
    item: Object,
})

const emit = defineEmits(['update:visible'])

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
        :style="{ width: '990px', maxWidth: '135vw', borderRadius: '1.5rem', overflow: 'hidden' }"
        :pt="{
            root: { class: '!rounded-3xl !overflow-hidden !border-0 !shadow-2xl' },
            header: { style: 'display:none' },
            content: { class: '!p-0' },
            mask: { class: 'backdrop-blur-sm' },
            closeButton: { style: 'display:none' },
        }"
    >
        <div v-if="item" class="grid grid-cols-1 sm:grid-cols-5 p-3">
            <!-- Images -->
            <div class="col-span-2">
                <ItemImageSwitcher :item="item" :is-quick-view="true" />
            </div>

            <!-- Details -->
            <div class="col-span-3">
                <div class="p-6 sm:p-8 flex flex-col relative">
                    <!-- Close button -->
                    <button
                        @click="show = false"
                        class="absolute top-1.5 right-1.5 w-6 h-6 cursor-pointer bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                    >
                        <i class="pi pi-times text-xs"></i>
                    </button>

                    <!-- Stock badge -->
                    <div class="flex justify-between items-center mb-2">
                        <span
                            class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                            :class="inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'"
                        >
                            {{ inStock ? 'მარაგშია' : 'მარაგში არაა' }}
                        </span>
<!--                        <span class="text-sm">-->
<!--                            {{ item.no }}-->
<!--                        </span>-->
                    </div>

                    <h2 class="text-xl font-semibold text-gray-900 mt-2 mb-2 leading-snug pr-6" style="font-family: 'Playfair Display', serif;">
                        {{ item.name }}
                    </h2>

                    <p v-if="item.description" class="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                        {{ item.description }}
                    </p>
                    <div v-else class="flex-1" />

                    <div class="border-t border-gray-100 pt-5 mt-2">
                        <div class="text-2xl font-bold text-gray-900 mb-4">
                            {{ item.unit_price ? `₾${item.unit_price}` : '—' }}
                        </div>

                        <div class="flex gap-2">
                            <button
                                :disabled="!inStock"
                                class="flex-1 flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold py-3 rounded-2xl transition-all duration-150"
                                :class="inStock
                                ? 'bg-brand-500 text-white hover:bg-brand-400'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
                            >
                                <i class="pi pi-cart-plus"></i>
                                კალათაში დამატება
                            </button>

                            <button class="w-12 h-12 rounded-2xl cursor-pointer border border-gray-200 flex items-center justify-center text-gray-500 hover:text-rose-500 hover:border-rose-200 transition-colors">
                                <i class="pi pi-heart"></i>
                            </button>
                        </div>

                        <Link
                            :href="route('items.show', item.id)"
                            class="mt-3 w-full flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors py-2"
                            @click="show = false"
                        >
                            დეტალურად ნახვა <i class="pi pi-arrow-right text-xs"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>
