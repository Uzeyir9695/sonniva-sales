<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const visible = ref(false);
const loading = ref(false);
const order = ref(null);

async function open(id) {
    loading.value = true;
    visible.value = true;
    order.value = null;
    try {
        const res = await axios.get(route('user-orders.show', id));
        order.value = res.data.order;
    } catch {
        toast.add({ severity: 'error', summary: 'შეცდომა', detail: 'შეკვეთის ჩატვირთვა ვერ მოხერხდა.', life: 3000 });
        visible.value = false;
    } finally {
        loading.value = false;
    }
}

defineExpose({ open });

const statusSeverity = {
    awaiting_payment: 'secondary',
    pending:          'warn',
    paid:             'info',
    ready:            'success',
    cancelled:        'danger',
};

const statusLabel = {
    awaiting_payment: 'გადახდის მოლოდინში',
    pending:          'ინვოისირებული',
    paid:             'გადახდილი',
    ready:            'მზადაა',
    cancelled:        'გაუქმებული',
};

const deliveryLabel = {
    office:  'ოფისიდან გატანა',
    tbilisi: 'თბილისი',
    regions: 'რეგიონები',
};

const providerLabel = {
    bog:     'BOG',
    tbc:     'TBC',
    pcb:     'ProCredit',
    invoice: 'ინვოისი',
};
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        :header="order ? `შეკვეთა #${order.invoice_no ?? order.id?.slice(0, 8)}` : 'შეკვეთის დეტალები'"
        class="w-[95%] sm:w-[75%] lg:w-[58%]"
        pt:header:class="border-b border-gray-100"
    >
        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-16 gap-3">
            <i class="pi pi-spinner pi-spin text-4xl text-brand-400"></i>
            <span class="text-sm text-gray-400">იტვირთება...</span>
        </div>

        <div v-else-if="order" class="text-sm">

            <!-- Status banner -->
            <div class="flex items-center justify-between bg-brand-50 border-b border-brand-100 px-5 py-3 -mx-5 -mt-1 mb-5">
                <div class="flex items-center gap-2 text-brand-700">
                    <i class="pi pi-calendar text-xs"></i>
                    <span class="text-xs">{{ order.created_at }}</span>
                </div>
                <Tag :value="statusLabel[order.status] ?? order.status" :severity="statusSeverity[order.status]" />
            </div>

            <!-- Delivery & Payment -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div class="border border-gray-200 rounded-xl overflow-hidden">
                    <div class="flex items-center gap-2 bg-gray-50 border-b border-gray-200 px-3 py-2">
                        <i class="pi pi-truck text-brand-500 text-xs"></i>
                        <span class="font-semibold text-gray-700 text-xs uppercase tracking-wide">მიწოდება</span>
                    </div>
                    <div class="px-3 py-3 space-y-1.5">
                        <p class="font-semibold text-gray-800">{{ deliveryLabel[order.delivery_type] ?? order.delivery_type }}</p>
                        <p v-if="order.address" class="flex items-start gap-1.5 text-gray-500">
                            <i class="pi pi-map-marker text-xs text-brand-400 mt-0.5"></i>
                            {{ order.address }}<span v-if="order.apartment_number">, apt {{ order.apartment_number }}</span>
                        </p>
                        <p class="flex items-center gap-1.5 text-gray-500">
                            <i class="pi pi-tag text-xs text-brand-400"></i>
                            მიწოდება: <span class="font-medium text-gray-700 ml-1">{{ order.delivery_cost }} ₾</span>
                        </p>
                    </div>
                </div>

                <div v-if="order.payment" class="border border-blue-200 rounded-xl overflow-hidden">
                    <div class="flex items-center gap-2 bg-blue-50 border-b border-blue-200 px-3 py-2">
                        <i class="pi pi-credit-card text-blue-500 text-xs"></i>
                        <span class="font-semibold text-blue-700 text-xs uppercase tracking-wide">გადახდა</span>
                    </div>
                    <div class="px-3 py-3 flex flex-wrap gap-5 text-gray-600">
                        <div>
                            <p class="text-xs text-gray-400 mb-0.5">პროვაიდერი</p>
                            <p class="font-semibold text-gray-800">{{ providerLabel[order.payment.provider] ?? order.payment.provider }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-400 mb-0.5">სტატუსი</p>
                            <Tag
                                :value="order.payment.status === 'completed' ? 'დასრულებული' : order.payment.status"
                                :severity="order.payment.status === 'completed' ? 'success' : 'warn'"
                                class="text-xs"
                            />
                        </div>
                        <div v-if="order.payment.transaction_id">
                            <p class="text-xs text-gray-400 mb-0.5">ტრანზაქციის ID</p>
                            <code class="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">{{ order.payment.transaction_id }}</code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Comment -->
            <div v-if="order.comment" class="border border-brand-200 rounded-xl overflow-hidden mb-4">
                <div class="flex items-center gap-2 bg-brand-50 border-b border-brand-200 px-3 py-2">
                    <i class="pi pi-comment text-brand-500 text-xs"></i>
                    <span class="font-semibold text-brand-700 text-xs uppercase tracking-wide">კომენტარი</span>
                </div>
                <p class="px-3 py-3 text-gray-600 italic">{{ order.comment }}</p>
            </div>

            <!-- Items -->
            <div class="border border-gray-200 rounded-xl overflow-hidden mb-4">
                <div class="flex items-center gap-2 bg-gray-50 border-b border-gray-200 px-3 py-2">
                    <i class="pi pi-shopping-bag text-brand-500 text-xs"></i>
                    <span class="font-semibold text-gray-700 text-xs uppercase tracking-wide">პროდუქცია</span>
                </div>
                <DataTable :value="order.items" size="small" class="text-sm">
                    <Column field="item_no" header="კოდი" />
                    <Column field="item_name" header="დასახელება" />
                    <Column field="quantity" header="რაოდ." />
                    <Column field="unit_price" header="ერთ. ფასი">
                        <template #body="{ data }">{{ data.unit_price }} ₾</template>
                    </Column>
                    <Column field="subtotal" header="სულ">
                        <template #body="{ data }">
                            <span class="font-semibold text-gray-800">{{ data.subtotal }} ₾</span>
                        </template>
                    </Column>
                </DataTable>

                <div class="flex items-center justify-end gap-6 px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <span class="text-gray-500">ჯამი: <span class="font-medium text-gray-700">{{ order.subtotal }} ₾</span></span>
                    <span class="text-gray-800 font-bold">
                        სულ: <span class="text-brand-600 text-base">{{ order.total }} ₾</span>
                    </span>
                </div>
            </div>

            <!-- Download invoice -->
            <div v-if="order.payment?.invoice_no" class="flex justify-end">
                <a :href="route('download.file', order.payment.invoice_no)" target="_blank">
                    <Button label="ინვოისის ჩამოტვირთვა" icon="pi pi-download" severity="secondary" size="small" outlined />
                </a>
            </div>
        </div>
    </Dialog>
</template>