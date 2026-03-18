<script setup>
import { Link, router } from '@inertiajs/vue3'
import WishlistButton from '@/Shared/components/WishlistButton.vue'
import ItemImageSwitcher from '@/Shared/components/ItemImageSwitcher.vue'
import AddToCartButton from '@/Shared/components/AddToCartButton.vue'

defineProps({
    item: { type: Object, required: true },
})

const emit = defineEmits(['quick-view'])
</script>

<template>
    <div
        @click.stop="router.get(route('items.show', item.slug))"
        class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col cursor-pointer"
    >
        <ItemImageSwitcher :item="item">
            <div class="absolute top-2.5 left-2.5">
                <span
                    v-if="!item.inventory || item.inventory === 0"
                    class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600"
                >მარაგში არაა</span>
                <span
                    v-else
                    class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"
                >მარაგშია</span>
            </div>

            <div class="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                <WishlistButton :item-id="item.id" />
                <button class="w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-indigo-500 hover:shadow-lg transition-all duration-150">
                    <i class="pi pi-arrows-h text-xs"></i>
                </button>
                <button
                    @click.stop="emit('quick-view', item)"
                    class="w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-lg transition-all duration-150"
                >
                    <i class="pi pi-eye text-xs"></i>
                </button>
            </div>
        </ItemImageSwitcher>

        <div class="p-3 sm:p-4 flex flex-col flex-1">
            <Link
                :href="route('items.show', item.slug)"
                @click.stop
                class="text-sm font-medium text-gray-900 leading-snug mb-1 line-clamp-2"
            >
                {{ item.name }}
            </Link>

            <div class="mt-auto pt-3 flex text-nowrap items-center justify-between gap-2">
                <span class="text-base font-semibold text-gray-900">
                    {{ item.unit_price ? `${item.unit_price} ₾` : '—' }}
                </span>

                <AddToCartButton :item="item" />
            </div>
        </div>
    </div>
</template>