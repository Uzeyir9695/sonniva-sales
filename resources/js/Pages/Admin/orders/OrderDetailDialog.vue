<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { formatDiscount } from '@/utils/numberFormat.js';

const toast = useToast();
const confirm = useConfirm();

const visible = ref(false);
const loading = ref(false);
const order = ref(null);

async function open(id) {
    loading.value = true;
    visible.value = true;
    order.value = null;
    try {
        const res = await axios.get(route('admin.orders.show', id));
        order.value = res.data.order;
    } catch {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load order details.', life: 3000 });
        visible.value = false;
    } finally {
        loading.value = false;
    }
}

defineExpose({ open });

function confirmStatusChange(newStatus) {
    const labels     = { paid: 'Mark Paid', ready: 'Mark Ready', cancelled: 'Cancel' };
    const severities = { paid: 'info',      ready: 'success',    cancelled: 'danger' };

    confirm.require({
        message: `Change order ${order.value.invoice_no ?? order.value.id.slice(0, 8)} status to "${newStatus}"?`,
        header: 'Confirm Status Change',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: { label: 'No', severity: 'secondary', outlined: true },
        acceptProps: { label: labels[newStatus], severity: severities[newStatus] },
        accept: () => updateStatus(newStatus),
    });
}

function updateStatus(newStatus) {
    const routeMap = {
        paid:      { name: 'admin.orders.approve', params: {} },
        ready:     { name: 'admin.orders.ready',   params: { inform_user: true } },
        cancelled: { name: 'admin.orders.cancel',  params: {} },
    };

    const { name, params } = routeMap[newStatus];

    router.put(route(name, order.value.id), params, {
        preserveScroll: true,
        onSuccess: () => {
            toast.add({ severity: 'success', summary: 'Updated', detail: 'Order status changed.', life: 3000 });
            visible.value = false;
        },
        onError: () => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update status.', life: 3000 });
        },
    });
}

const statusSeverity = {
    awaiting_payment: 'secondary',
    pending:          'warn',
    paid:             'info',
    ready:            'success',
    cancelled:        'danger',
};

const deliveryLabel = {
    office:  'Office Pickup',
    tbilisi: 'Tbilisi',
    regions: 'Regions',
};

const providerLabel = {
    bog:     'BOG',
    tbc:     'TBC',
    pcb:     'ProCredit',
    invoice: 'Invoice',
};
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        :header="order ? `Order #${order.invoice_no ?? order.id?.slice(0, 8)}` : 'Order Details'"
        class="w-[95%] sm:w-[75%] lg:w-[65%]"
        pt:header:class="border-b border-gray-100"
    >
        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-16 gap-3">
            <i class="pi pi-spinner pi-spin text-4xl text-brand-400"></i>
            <span class="text-sm text-gray-400">Loading order...</span>
        </div>

        <div v-else-if="order" class="text-sm">

            <!-- Status banner -->
            <div class="flex items-center justify-between bg-brand-50 border-b border-brand-100 px-5 py-3 -mx-5 -mt-1 mb-5">
                <div class="flex items-center gap-2 text-brand-700">
                    <i class="pi pi-calendar text-xs"></i>
                    <span class="text-xs">{{ order.created_at }}</span>
                </div>
                <Tag :value="order.status" :severity="statusSeverity[order.status]" class="capitalize" />
            </div>

            <!-- Customer & Delivery -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <!-- Customer card -->
                <div class="border border-gray-200 rounded-xl overflow-hidden">
                    <div class="flex items-center gap-2 bg-gray-50 border-b border-gray-200 px-3 py-2">
                        <i class="pi pi-user text-brand-500 text-xs"></i>
                        <span class="font-semibold text-gray-700 text-xs uppercase tracking-wide">Customer</span>
                    </div>
                    <div class="px-3 py-3 space-y-1.5">
                        <p class="font-semibold text-gray-800">{{ order.user?.name }}</p>
                        <p class="flex items-center gap-1.5 text-gray-500">
                            <i class="pi pi-phone text-xs text-brand-400"></i>
                            {{ order.user?.phone }}
                        </p>
                        <p class="flex items-center gap-1.5 text-gray-500">
                            <i class="pi pi-id-card text-xs text-brand-400"></i>
                            {{ order.user?.tax_id }}
                        </p>
                    </div>
                </div>

                <!-- Delivery card -->
                <div class="border border-gray-200 rounded-xl overflow-hidden">
                    <div class="flex items-center gap-2 bg-gray-50 border-b border-gray-200 px-3 py-2">
                        <i class="pi pi-truck text-brand-500 text-xs"></i>
                        <span class="font-semibold text-gray-700 text-xs uppercase tracking-wide">Delivery</span>
                    </div>
                    <div class="px-3 py-3 space-y-1.5">
                        <p class="font-semibold text-gray-800">{{ deliveryLabel[order.delivery_type] ?? order.delivery_type }}</p>
                        <p v-if="order.branch" class="flex items-center gap-1.5 text-gray-500">
                            <i class="pi pi-building text-xs text-brand-400"></i>
                            Pickup: <span class="font-medium text-gray-700 ml-1 capitalize">{{ order.branch }} Office</span>
                        </p>
                        <p v-if="order.city" class="flex items-center gap-1.5 text-gray-500">
                            <i class="pi pi-map-marker text-xs text-brand-400"></i>
                            City: {{ order.city }}
                        </p>
                        <p v-if="order.address" class="flex items-start gap-1.5 text-gray-500">
                            <i class="pi pi-map-marker text-xs text-brand-400 mt-0.5"></i>
                            {{ order.address }}<span v-if="order.apartment_number">, apt {{ order.apartment_number }}</span>
                        </p>
                        <p class="flex items-center gap-1.5 text-gray-500">
                            <i class="pi pi-tag text-xs text-brand-400"></i>
                            Delivery: <span class="font-medium text-gray-700 ml-1">{{ order.delivery_cost }} ₾</span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Payment -->
            <div v-if="order.payment" class="border border-blue-200 rounded-xl overflow-hidden mb-4">
                <div class="flex items-center gap-2 bg-blue-50 border-b border-blue-200 px-3 py-2">
                    <i class="pi pi-credit-card text-blue-500 text-xs"></i>
                    <span class="font-semibold text-blue-700 text-xs uppercase tracking-wide">Payment</span>
                </div>
                <div class="px-3 py-3 flex flex-wrap gap-5 text-gray-600">
                    <div>
                        <p class="text-xs text-gray-400 mb-0.5">Provider</p>
                        <p class="font-semibold text-gray-800">{{ providerLabel[order.payment.provider] ?? order.payment.provider }}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-400 mb-0.5">Status</p>
                        <Tag :value="order.payment.status" class="capitalize text-xs" :severity="order.payment.status === 'completed' ? 'success' : 'warn'" />
                    </div>
                    <div v-if="order.payment.transaction_id">
                        <p class="text-xs text-gray-400 mb-0.5">Transaction ID</p>
                        <code class="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">{{ order.payment.transaction_id }}</code>
                    </div>
                </div>
            </div>

            <!-- Comment -->
            <div v-if="order.comment" class="border border-brand-200 rounded-xl overflow-hidden mb-4">
                <div class="flex items-center gap-2 bg-brand-50 border-b border-brand-200 px-3 py-2">
                    <i class="pi pi-comment text-brand-500 text-xs"></i>
                    <span class="font-semibold text-brand-700 text-xs uppercase tracking-wide">Comment</span>
                </div>
                <p class="px-3 py-3 text-gray-600 italic">{{ order.comment }}</p>
            </div>

            <!-- Items -->
            <div class="border border-gray-200 rounded-xl overflow-hidden mb-4">
                <div class="flex items-center gap-2 bg-gray-50 border-b border-gray-200 px-3 py-2">
                    <i class="pi pi-shopping-bag text-brand-500 text-xs"></i>
                    <span class="font-semibold text-gray-700 text-xs uppercase tracking-wide">Items</span>
                </div>
                <DataTable :value="order.items" size="small" class="text-sm">
                    <Column field="item_no" header="No" />
                    <Column field="item_name" header="Name" />
                    <Column field="quantity" header="Qty" />
                    <Column header="Weight" style="min-width: 8rem">
                        <template #body="{ data }">
                            <span class="text-gray-500">{{ (data.unit_weight * data.quantity).toFixed(3) }} kg</span>
                        </template>
                    </Column>
                    <Column field="unit_price" header="Unit Price" style="min-width: 11rem">
                        <template #body="{ data }">
                            <div v-if="data.wholesale_discount > 0" class="flex flex-col gap-0.5">
                                <div class="flex items-center gap-1.5">
                                    <span class="line-through text-gray-400 text-xs">{{ (Number(data.unit_price) + Number(data.wholesale_discount) / data.quantity).toFixed(2) }} ₾</span>
                                    <span class="font-medium text-emerald-600">{{ data.unit_price }} ₾</span>
                                </div>
                                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold w-fit">Wholesale</span>
                            </div>
                            <div v-else-if="data.discount > 0" class="flex flex-col gap-0.5">
                                <div class="flex items-center gap-1.5">
                                    <span class="line-through text-gray-400 text-xs">{{ (Number(data.unit_price) / (1 - Number(data.discount) / 100)).toFixed(2) }} ₾</span>
                                    <span class="font-medium text-red-600">{{ data.unit_price }} ₾</span>
                                </div>
                                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold w-fit">-{{ formatDiscount(data.discount) }}%</span>
                            </div>
                            <span v-else>{{ data.unit_price }} ₾</span>
                        </template>
                    </Column>
                    <Column field="subtotal" header="Subtotal" style="min-width: 11rem">
                        <template #body="{ data }">
                            <div v-if="data.wholesale_discount > 0" class="flex items-center gap-1.5">
                                <span class="line-through text-gray-400 text-xs">{{ (Number(data.subtotal) + Number(data.wholesale_discount)).toFixed(2) }} ₾</span>
                                <span class="font-semibold text-emerald-600">{{ data.subtotal }} ₾</span>
                            </div>
                            <div v-else-if="data.discount > 0" class="flex items-center gap-1.5">
                                <span class="line-through text-gray-400 text-xs">{{ (Number(data.subtotal) / (1 - Number(data.discount) / 100)).toFixed(2) }} ₾</span>
                                <span class="font-semibold text-red-600">{{ data.subtotal }} ₾</span>
                            </div>
                            <span v-else class="font-semibold text-gray-800">{{ data.subtotal }} ₾</span>
                        </template>
                    </Column>
                </DataTable>

                <!-- Totals row -->
                <div class="px-4 py-3 border-t border-gray-200 bg-gray-50 space-y-1.5">
                    <div v-if="order.wholesale_discount > 0" class="flex justify-between text-sm text-gray-500">
                        <span>Subtotal</span>
                        <span>
                            <span class="line-through text-gray-400 mr-1">{{ (Number(order.subtotal) + Number(order.wholesale_discount)).toFixed(2) }} ₾</span>
                            <span class="font-medium text-emerald-600">{{ order.subtotal }} ₾</span>
                        </span>
                    </div>
                    <div v-else class="flex justify-between text-sm text-gray-500">
                        <span>Subtotal</span>
                        <span class="font-medium text-gray-700">{{ order.subtotal }} ₾</span>
                    </div>
                    <div v-if="order.wholesale_discount > 0" class="flex justify-between text-sm text-emerald-600">
                        <span>Wholesale discount</span>
                        <span class="font-medium">-{{ order.wholesale_discount }} ₾</span>
                    </div>
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>Delivery</span>
                        <span class="font-medium text-gray-700">{{ order.delivery_cost }} ₾</span>
                    </div>
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>Total weight</span>
                        <span class="font-medium text-gray-700">{{ order.items.reduce((s, i) => s + i.unit_weight * i.quantity, 0).toFixed(3) }} kg</span>
                    </div>
                    <div class="flex justify-between text-sm font-bold text-gray-800 border-t border-gray-200 pt-1.5 mt-1">
                        <span>Total</span>
                        <span class="text-brand-600 text-base">{{ order.total }} ₾</span>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 flex-wrap pt-1">
                <Button
                    v-if="order.status === 'pending'"
                    label="Mark Paid"
                    icon="pi pi-check"
                    severity="info"
                    size="small"
                    @click="confirmStatusChange('paid')"
                />
                <Button
                    v-if="order.status === 'paid'"
                    label="Mark Ready"
                    icon="pi pi-box"
                    severity="success"
                    size="small"
                    @click="confirmStatusChange('ready')"
                />
                <Button
                    v-if="!['cancelled', 'ready'].includes(order.status)"
                    label="Cancel Order"
                    icon="pi pi-times"
                    severity="danger"
                    size="small"
                    outlined
                    @click="confirmStatusChange('cancelled')"
                />
                <a
                    v-if="order.payment?.provider === 'invoice' && order.payment?.invoice_no"
                    :href="route('download.file', order.payment.invoice_no)"
                    target="_blank"
                >
                    <Button label="Download Invoice" icon="pi pi-download" severity="secondary" size="small" outlined />
                </a>
            </div>
        </div>
    </Dialog>
</template>
