<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import StockNotifyDialog from '@/Shared/components/StockNotifyDialog.vue';

defineProps({
    item: { type: Object, required: true },
    isSubscribed: { type: Boolean, default: false },
});

const showDialog = ref(false);
</script>

<template>
    <div>
        <button
            v-if="!isSubscribed"
            @click="showDialog = true"
            class="w-full py-1.5 sm:py-2 rounded-2xl border-2 border-dashed border-slate-400 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
            <i class="pi pi-bell font-bold"></i>
            შემატყობინეთ როცა შეივსება
        </button>
        <div v-else class="rounded-2xl bg-brand-100 border border-brand-300 px-4 py-3">
            <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2 text-brand-800 text-sm font-medium">
                    <i class="pi pi-bell text-brand-600"></i>
                    შეტყობინება ჩართულია
                </div>
                <button
                    @click="router.delete(route('stock-notifications.unsubscribe', item.slug))"
                    class="text-xs text-brand-600 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                >
                    გაუქმება
                </button>
            </div>
            <p class="text-xs text-brand-700 mt-1.5">
                მარაგი როგორც კი შეივსება, მიიღებთ შეტყობინებას SMS-ის სახით.
            </p>
        </div>

        <StockNotifyDialog v-model:visible="showDialog" :item="item" />
    </div>
</template>
