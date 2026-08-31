<script setup>
import { computed, ref } from 'vue';
import { useHttp } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { formatDiscount } from '@/utils/numberFormat.js';
import { useReorder } from '@/composables/useReorder';

const { t } = useI18n();
const toast = useToast();
const http = useHttp();
const { reorder, processing: reorderProcessing } = useReorder();

const visible = ref(false);
const loading = ref(false);
const order = ref(null);
const selectedItems = ref([]);

async function open(id) {
    loading.value = true;
    visible.value = true;
    order.value = null;
    selectedItems.value = [];
    try {
        const res = await http.get(route('user-orders.show', id));
        order.value = res.order;
        selectedItems.value = [...order.value.items];
    } catch {
        toast.add({ severity: 'error', summary: t('orders.errorSummary'), detail: t('orders.loadError'), life: 3000 });
        visible.value = false;
    } finally {
        loading.value = false;
    }
}

defineExpose({ open });

function submitReorder() {
    reorder(order.value.id, selectedItems.value.map((i) => i.id));
}

function isSelected(item) {
    return selectedItems.value.some((i) => i.id === item.id);
}

function toggleItem(item) {
    const idx = selectedItems.value.findIndex((i) => i.id === item.id);
    if (idx === -1) {
        selectedItems.value.push(item);
    } else {
        selectedItems.value.splice(idx, 1);
    }
}

const selectedTotal = computed(() =>
    selectedItems.value.reduce((sum, i) => sum + Number(i.subtotal), 0)
);
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        :header="order ? $t('orders.reorderTitle', { no: order.invoice_no ?? order.id?.slice(0, 8) }) : $t('orders.reorder')"
        class="w-[95%] sm:w-[75%] lg:w-[68%]"
        pt:header:class="border-b border-gray-100"
    >
        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-16 gap-3">
            <i class="pi pi-spinner pi-spin text-4xl text-brand-400"></i>
            <span class="text-sm text-gray-400">{{ $t('common.loading') }}</span>
        </div>

        <div v-else-if="order" class="text-sm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div
                    v-for="data in order.items"
                    :key="data.id"
                    class="border rounded-xl p-3 flex flex-col gap-2 cursor-pointer transition-colors"
                    :class="isSelected(data) ? 'border-brand-300 bg-brand-50/40' : 'border-gray-200 hover:border-gray-300'"
                    @click="toggleItem(data)"
                >
                    <div class="flex items-start justify-between gap-2">
                        <div class="flex items-start gap-2 min-w-0">
                            <Checkbox v-model="selectedItems" :value="data" @click.stop />
                            <div class="flex flex-col gap-0.5 min-w-0">
                                <span class="font-semibold text-gray-800">{{ data.item_name }}</span>
                                <span class="text-xs text-gray-400 font-mono">{{ data.item_no }}</span>
                            </div>
                        </div>
                        <span class="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">x{{ data.quantity }}</span>
                    </div>

                    <div class="flex items-end justify-between border-t border-gray-100 pt-2 mt-auto">
                        <div>
                            <p class="text-xs text-gray-400 mb-0.5">{{ $t('orders.unitPriceShort') }}</p>
                            <div v-if="data.wholesale_discount > 0" class="flex flex-col gap-0.5">
                                <div class="flex items-center gap-1.5">
                                    <span class="line-through text-gray-400 text-xs">{{ (Number(data.unit_price) + Number(data.wholesale_discount) / data.quantity).toFixed(2) }} ₾</span>
                                    <span class="font-medium text-emerald-600">{{ data.unit_price }} ₾</span>
                                </div>
                                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold w-fit">{{ $t('orders.wholesale') }}</span>
                            </div>
                            <div v-else-if="data.discount > 0" class="flex flex-col gap-0.5">
                                <div class="flex items-center gap-1.5">
                                    <span class="line-through text-gray-400 text-xs">{{ (Number(data.unit_price) / (1 - Number(data.discount) / 100)).toFixed(2) }} ₾</span>
                                    <span class="font-medium text-red-600">{{ data.unit_price }} ₾</span>
                                </div>
                                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold w-fit">-{{ formatDiscount(data.discount) }}%</span>
                            </div>
                            <div v-else-if="data.fake_price > 0" class="flex items-center gap-1.5">
                                <span class="line-through text-gray-400 text-xs">{{ Number(data.fake_price).toFixed(2) }} ₾</span>
                                <span class="font-medium text-red-600">{{ data.unit_price }} ₾</span>
                            </div>
                            <span v-else class="text-gray-700">{{ data.unit_price }} ₾</span>
                        </div>

                        <div class="text-right">
                            <p class="text-xs text-gray-400 mb-0.5">{{ $t('common.total') }}</p>
                            <span class="font-semibold text-gray-800">{{ data.subtotal }} ₾</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between gap-3">
                <div v-if="selectedItems.length">
                    <p class="text-sm text-gray-500 mb-0.5">{{ $t('orders.subtotal') }}</p>
                    <span class="font-semibold text-gray-800">{{ selectedTotal.toFixed(2) }} ₾</span>
                </div>
                <div v-else></div>
                <Button
                    :label="`${$t('orders.reorder')} (${selectedItems.length})`"
                    icon="pi pi-refresh"
                    size="small"
                    :disabled="selectedItems.length === 0"
                    :loading="reorderProcessing"
                    @click="submitReorder"
                />
            </div>
        </div>
    </Dialog>
</template>
