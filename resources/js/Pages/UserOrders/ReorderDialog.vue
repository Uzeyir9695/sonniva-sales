<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { formatDiscount } from '@/utils/numberFormat.js';
import { useReorder } from '@/composables/useReorder';

const toast = useToast();
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
        const res = await axios.get(route('user-orders.show', id));
        order.value = res.data.order;
        selectedItems.value = [...order.value.items];
    } catch {
        toast.add({ severity: 'error', summary: 'შეცდომა', detail: 'შეკვეთის ჩატვირთვა ვერ მოხერხდა.', life: 3000 });
        visible.value = false;
    } finally {
        loading.value = false;
    }
}

defineExpose({ open });

function submitReorder() {
    reorder(order.value.id, selectedItems.value.map((i) => i.id));
}
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        :header="order ? `თავიდან შეკვეთა #${order.invoice_no ?? order.id?.slice(0, 8)}` : 'თავიდან შეკვეთა'"
        class="w-[95%] sm:w-[75%] lg:w-[68%]"
        pt:header:class="border-b border-gray-100"
    >
        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-16 gap-3">
            <i class="pi pi-spinner pi-spin text-4xl text-brand-400"></i>
            <span class="text-sm text-gray-400">იტვირთება...</span>
        </div>

        <div v-else-if="order" class="text-sm">
            <div class="border border-gray-200 rounded-xl overflow-hidden mb-4">
                <DataTable v-model:selection="selectedItems" :value="order.items" dataKey="id" size="small" class="text-sm">
                    <Column selectionMode="multiple" headerStyle="width: 3rem" />
                    <Column field="item_no" header="კოდი" style="min-width: 10rem" />
                    <Column field="item_name" header="დასახელება" style="min-width: 16rem" />
                    <Column field="quantity" header="რაოდ." />
                    <Column field="unit_price" header="ერთ. ფასი" style="min-width: 7rem">
                        <template #body="{ data }">
                            <div v-if="data.wholesale_discount > 0" class="flex flex-col gap-0.5">
                                <div class="flex items-center gap-1.5">
                                    <span class="line-through text-gray-400 text-xs">{{ (Number(data.unit_price) + Number(data.wholesale_discount) / data.quantity).toFixed(2) }} ₾</span>
                                    <span class="font-medium text-emerald-600">{{ data.unit_price }} ₾</span>
                                </div>
                                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold w-fit">საბითუმო</span>
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
                            <span v-else>{{ data.unit_price }} ₾</span>
                        </template>
                    </Column>
                    <Column field="subtotal" header="სულ" style="min-width: 7rem">
                        <template #body="{ data }">
                            <span class="font-semibold text-gray-800">{{ data.subtotal }} ₾</span>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <!-- Actions -->
            <div class="flex justify-end gap-2">
                <Button
                    :label="`თავიდან შეკვეთა (${selectedItems.length})`"
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