<script setup>
import Paginate from '@/Shared/components/Paginate.vue'
import QuickViewDialog from '@/Shared/components/QuickViewDialog.vue';
import ItemCard from '@/Shared/components/ItemCard.vue';
import { ref } from 'vue';

defineProps({
    items: { type: Object, required: true },
})

defineEmits(['quick-view'])

const quickViewItem = ref(null);
const quickViewOpen = ref(false);

function openQuickView(item) {
    quickViewItem.value = item;
    quickViewOpen.value = true;
}

</script>

<template>
    <div v-if="items.data?.length > 0">
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-3 sm:gap-4">
            <ItemCard
                v-for="(item, index) in items.data"
                :key="index"
                :item="item"
                @quick-view="openQuickView"
            />
        </div>

        <Paginate :data="items" class="mt-8" />
    </div>

    <div v-else class="flex flex-col items-center justify-center h-72 text-center">
        <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <i class="pi pi-th-large text-3xl text-gray-300"></i>
        </div>
        <h3 class="text-lg font-medium text-gray-500">პროდუქტი არ მოიძებნა</h3>
    </div>

    <!-- QUICK VIEW DIALOG -->
    <QuickViewDialog
        v-model:visible="quickViewOpen"
        :item="quickViewItem"
    />
</template>
