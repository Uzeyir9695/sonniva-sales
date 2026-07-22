<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { formatDiscount } from '@/utils/numberFormat.js';

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
    dispatched:       'info',
    delivered:        'success',
    cancelled:        'danger',
};

const statusLabel = {
    awaiting_payment: 'გადახდის მოლოდინში',
    pending:          'დაუდასტურებელი',
    paid:             'გადახდილი',
    ready:            'მზადაა',
    dispatched:       'გაგზავნილია',
    delivered:        'მიწოდებულია',
    cancelled:        'გაუქმებული',
    limit:            'ლიმიტი',
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
        class="w-[95%] sm:w-[75%] lg:w-[65%]"
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
                        <p v-if="order.tracking_number" class="flex items-center gap-1.5 text-gray-500">
                            <i class="pi pi-hashtag text-xs text-brand-400"></i>
                            თრექინგის ნომერი: <span class="font-medium text-gray-700 ml-1">{{ order.tracking_number }}</span>
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

                <div class="px-4 py-3 border-t border-gray-200 bg-gray-50 space-y-1.5">
                    <div v-if="order.wholesale_discount > 0" class="flex justify-between text-sm text-gray-500">
                        <span>ჯამი</span>
                        <span>
                            <span class="line-through text-gray-400 mr-1">{{ (Number(order.subtotal) + Number(order.wholesale_discount)).toFixed(2) }} ₾</span>
                            <span class="font-medium text-emerald-600">{{ order.subtotal }} ₾</span>
                        </span>
                    </div>
                    <div v-else class="flex justify-between text-sm text-gray-500">
                        <span>ჯამი</span>
                        <span class="font-medium text-gray-700">{{ order.subtotal }} ₾</span>
                    </div>
                    <div v-if="order.wholesale_discount > 0" class="flex justify-between text-sm text-emerald-600">
                        <span>საბითუმო ფასდაკლება</span>
                        <span class="font-medium">-{{ order.wholesale_discount }} ₾</span>
                    </div>
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>მიწოდება</span>
                        <span class="font-medium text-gray-700">{{ order.delivery_cost }} ₾</span>
                    </div>
                    <div class="flex justify-between text-sm font-bold text-gray-800 border-t border-gray-200 pt-1.5 mt-1">
                        <span>სულ</span>
                        <span class="text-brand-600 text-base">{{ order.total }} ₾</span>
                    </div>
                </div>
            </div>

            <!-- Download invoice -->
            <div v-if="order.payment?.provider === 'invoice' && order.payment?.invoice_no" class="flex justify-end">
                <a :href="route('download.file', order.payment.invoice_no)" target="_blank">
                    <Button label="ინვოისის ჩამოტვირთვა" icon="pi pi-download" severity="secondary" size="small" outlined />
                </a>
            </div>
        </div>
    </Dialog>
</template>
