<script setup>
import AdminLayout from '../AdminLayout.vue';
import TableSkeleton from '@/Shared/components/TableSkeleton.vue';
import OrderDetailDialog from './OrderDetailDialog.vue';
import { ref } from 'vue';
import { Deferred, router, usePoll } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { FilterMatchMode } from '@primevue/core/api';
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue';

defineOptions({ layout: AdminLayout });

const toast = useToast();
const confirm = useConfirm();

const props = defineProps({
    orders: Object,
    unseenCounts: Object,
    status: String,
});

usePoll(10000, {
    only: ['unseenCounts'],
    preserveScroll: true, preserveState: true
});

const invoicedAtDates  = ref(null);
const approvedAtDates  = ref(null);
const readyAtDates     = ref(null);

const fmt = (d) => d.toLocaleDateString('en-CA');

function filterByInvoicedAt() {
    const start = invoicedAtDates.value?.[0];
    const end   = invoicedAtDates.value?.[1];
    if (start && end) {
        router.get(route('admin.orders.index'), { status: props.status, start_date: fmt(start), end_date: fmt(end) }, { preserveState: true, preserveScroll: true });
    }
}

function resetInvoicedAt() {
    invoicedAtDates.value = null;
    router.get(route('admin.orders.index'), { status: props.status }, { preserveState: true, preserveScroll: true });
}

function filterByApprovedAt() {
    const start = approvedAtDates.value?.[0];
    const end   = approvedAtDates.value?.[1];
    if (start && end) {
        router.get(route('admin.orders.index'), { status: props.status, start_date: fmt(start), end_date: fmt(end) }, { preserveState: true, preserveScroll: true });
    }
}

function resetApprovedAt() {
    approvedAtDates.value = null;
    router.get(route('admin.orders.index'), { status: props.status }, { preserveState: true, preserveScroll: true });
}

function filterByReadyAt() {
    const start = readyAtDates.value?.[0];
    const end   = readyAtDates.value?.[1];
    if (start && end) {
        router.get(route('admin.orders.index'), {
            status:        props.status,
            ready_start:   fmt(start),
            ready_end:     fmt(end),
            ...(approvedAtDates.value?.[0] && approvedAtDates.value?.[1] ? { approved_start: fmt(approvedAtDates.value[0]), approved_end: fmt(approvedAtDates.value[1]) } : {}),
        }, { preserveState: true, preserveScroll: true });
    }
}

function resetReadyAt() {
    readyAtDates.value = null;
    router.get(route('admin.orders.index'), {
        status: props.status,
        ...(approvedAtDates.value?.[0] && approvedAtDates.value?.[1] ? { approved_start: fmt(approvedAtDates.value[0]), approved_end: fmt(approvedAtDates.value[1]) } : {}),
    }, { preserveState: true, preserveScroll: true });
}

function filterByApprovedAtReady() {
    const start = approvedAtDates.value?.[0];
    const end   = approvedAtDates.value?.[1];
    if (start && end) {
        router.get(route('admin.orders.index'), {
            status:         props.status,
            approved_start: fmt(start),
            approved_end:   fmt(end),
            ...(readyAtDates.value?.[0] && readyAtDates.value?.[1] ? { ready_start: fmt(readyAtDates.value[0]), ready_end: fmt(readyAtDates.value[1]) } : {}),
        }, { preserveState: true, preserveScroll: true });
    }
}

function resetApprovedAtReady() {
    approvedAtDates.value = null;
    router.get(route('admin.orders.index'), {
        status: props.status,
        ...(readyAtDates.value?.[0] && readyAtDates.value?.[1] ? { ready_start: fmt(readyAtDates.value[0]), ready_end: fmt(readyAtDates.value[1]) } : {}),
    }, { preserveState: true, preserveScroll: true });
}

const tabs = [
    { label: 'Invoiced',  value: 'pending',   badge: true,  icon: 'pi-clock' },
    { label: 'Paid',      value: 'paid',      badge: true,  icon: 'pi-check-circle' },
    { label: 'Ready',     value: 'ready',     badge: false, icon: 'pi-box' },
    { label: 'Cancelled', value: 'cancelled', badge: false, icon: 'pi-times-circle' },
];

function switchTab(value) {
    invoicedAtDates.value  = null;
    approvedAtDates.value  = null;
    readyAtDates.value     = null;
    router.get(route('admin.orders.index'), { status: value }, {
        only: ['orders', 'status'],
        preserveState: true,
        preserveScroll: true,
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

const filters = ref({
    invoice_no:    { value: null, matchMode: FilterMatchMode.EQUALS },
    'user.tax_id': { value: null, matchMode: FilterMatchMode.EQUALS },
    'user.name':   { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Detail dialog
const detailDialog = ref(null);

// Ellipsis menu
const rowMenus = ref({});

function getMenuItems(order) {
    return [
        {
            label:   'Send PDF',
            icon:    'pi pi-file-pdf',
            command: () => openSendPdfDialog(order),
        },
        {
            label:   'Delete',
            icon:    'pi pi-trash',
            command: () => confirmDelete(order),
        },
    ];
}

// Delete confirm
function confirmDelete(order) {
    confirm.require({
        message: `Delete order ${order.invoice_no ?? order.id.slice(0, 8)}? This cannot be undone.`,
        header:  'Delete Order',
        icon:    'pi pi-exclamation-triangle',
        rejectProps: { label: 'No',  severity: 'secondary', outlined: true },
        acceptProps: { label: 'Yes, Delete', severity: 'danger' },
        accept: () => {
            router.delete(route('admin.orders.destroy', order.id), {
                preserveScroll: true,
                onSuccess: () => toast.add({ severity: 'success', summary: 'Deleted', detail: 'Order deleted.', life: 3000 }),
                onError:   () => toast.add({ severity: 'error',   summary: 'Error',   detail: 'Failed to delete order.', life: 3000 }),
            });
        },
    });
}

// Send PDF dialog
const sendPdfVisible = ref(false);
const sendToEmail    = ref(true);
const sendToBC      = ref(true);

function openSendPdfDialog(order) {
    sendToEmail.value    = true;
    sendToBC.value      = true;
    sendPdfVisible.value = true;
}

function submitSendPdf() {
    sendPdfVisible.value = false;
    toast.add({ severity: 'info', summary: 'PDF Sent', detail: 'PDF has been sent.', life: 3000 });
}

// Inline status change (from table row buttons)
function confirmStatusChange(order, newStatus) {
    const labels     = { paid: 'Mark Paid', ready: 'Mark Ready', cancelled: 'Cancel' };
    const severities = { paid: 'info',      ready: 'success',    cancelled: 'danger' };

    confirm.require({
        message: `Change order ${order.invoice_no ?? order.id.slice(0, 8)} status to "${newStatus}"?`,
        header: 'Confirm Status Change',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: { label: 'No', severity: 'secondary', outlined: true },
        acceptProps: { label: labels[newStatus], severity: severities[newStatus] },
        accept: () => {
            router.put(route('admin.orders.update-status', order.id), { status: newStatus }, {
                preserveScroll: true,
                onSuccess: () => toast.add({ severity: 'success', summary: 'Updated', detail: 'Order status changed.', life: 3000 }),
                onError:   () => toast.add({ severity: 'error',   summary: 'Error',   detail: 'Failed to update status.',  life: 3000 }),
            });
        },
    });
}
</script>

<template>
    <ConfirmDialog />

    <!-- Send PDF Dialog -->
    <Dialog v-model:visible="sendPdfVisible" header="Send PDF" modal :style="{ width: '22rem' }">
        <div class="flex flex-col gap-3 py-2">
            <div class="flex items-center gap-2">
                <Checkbox v-model="sendToEmail" inputId="sendToEmail" binary />
                <label for="sendToEmail">Send to company email</label>
            </div>
            <div class="flex items-center gap-2">
                <Checkbox v-model="sendToBC" inputId="sendToBC" binary />
                <label for="sendToBC">Send to Business Central</label>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" size="small" severity="secondary" variant="text" @click="sendPdfVisible = false" />
            <Button label="Send" size="small" class="bg-brand-500 border-none" icon="pi pi-send" @click="submitSendPdf" />
        </template>
    </Dialog>

    <OrderDetailDialog ref="detailDialog" />

    <div class="rounded-xl overflow-hidden">
        <!-- Status Tabs -->
        <Tabs :value="status" @update:value="switchTab">
            <TabList>
                <Tab class="flex items-center text-sm" v-for="tab in tabs" :key="tab.value" :value="tab.value">
                    <i :class="['pi text-sm', tab.icon]"></i>
                    <span>{{ tab.label }}</span>
                    <Badge
                        v-if="tab.badge && unseenCounts?.[tab.value]"
                        :value="unseenCounts[tab.value]"
                        size="small"
                        :severity="tab.value === 'pending' ? 'warn' : 'success'"
                    />
                </Tab>
            </TabList>
        </Tabs>

        <!-- Table -->
        <Deferred data="orders">
            <template #fallback>
                <TableSkeleton />
            </template>

            <DataTable
                    :value="orders?.data ?? []"
                    dataKey="id"
                    :rows="10"
                    paginator
                    :rowsPerPageOptions="[10, 20, 50]"
                    tableStyle="min-width: 50rem"
                    class="text-sm"
                    v-model:filters="filters"
                    filterDisplay="row"
                >
                    <template #header>
                        <div class="flex items-center gap-2">
                            <i class="pi pi-shopping-cart text-gray-500"></i>
                            <span class="font-semibold text-gray-700">
                                {{ orders.data.length }} order{{ orders.data.length !== 1 ? 's' : '' }}
                                <span class="capitalize text-gray-400">({{ status }})</span>
                            </span>
                        </div>
                    </template>

                    <Column header="#" headerStyle="width:3rem">
                        <template #body="{ index }">
                            {{ index + 1 }}
                        </template>
                    </Column>

                    <Column field="invoice_no" header="Invoice" style="min-width: 10rem">
                        <template #body="{ data }">
                            <span class="font-mono text-xs">{{ data.invoice_no ?? '—' }}</span>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <PrimeInputText v-model="filterModel.value" size="small" class="text-xs w-36" @input="filterCallback()" placeholder="Search invoice" />
                        </template>
                    </Column>

                    <Column field="user.tax_id" header="User ID" style="min-width: 10rem;">
                        <template #body="{ data }">
                            <span class="font-mono text-xs text-gray-600">{{ data.user?.tax_id ?? '—' }}</span>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <PrimeInputText v-model="filterModel.value" size="small" class="text-xs w-36" @input="filterCallback()" placeholder="Search ID" />
                        </template>
                    </Column>

                    <Column field="user.name" header="Customer" style="min-width: 10rem;">
                        <template #body="{ data }">
                            <div>
                                <p class="font-medium">{{ data.user?.name ?? '—' }}</p>
                                <p class="text-xs text-gray-400">{{ data.user?.phone }}</p>
                            </div>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <PrimeInputText v-model="filterModel.value" size="small" class="text-xs w-36" @input="filterCallback()" placeholder="Search customer" />
                        </template>
                    </Column>

                    <Column header="Total" style="min-width: 7rem;">
                        <template #body="{ data }">
                            <span class="font-semibold">{{ data.total }} ₾</span>
                        </template>
                    </Column>

                    <Column header="Delivery">
                        <template #body="{ data }">
                            {{ deliveryLabel[data.delivery_type] ?? data.delivery_type }}
                        </template>
                    </Column>

                    <Column header="Payment">
                        <template #body="{ data }">
                            <span v-if="data.payment" class="uppercase text-xs font-semibold text-gray-500">
                                {{ providerLabel[data.payment.provider] ?? data.payment.provider }}
                            </span>
                            <span v-else class="text-gray-300">—</span>
                        </template>
                    </Column>

                    <Column field="status" header="Status">
                        <template #body="{ data }">
                            <Tag
                                :value="data.status"
                                :severity="statusSeverity[data.status]"
                                class="capitalize"
                            />
                        </template>
                    </Column>

                    <Column v-if="status === 'cancelled'" field="created_at" header="Date" />

                    <Column v-if="status === 'pending'" header="Invoiced At" style="min-width: 14rem">
                        <template #body="{ data }">{{ data.invoiced_at ?? '—' }}</template>
                        <template #filter>
                            <DatePicker
                                v-model="invoicedAtDates"
                                showIcon showButtonBar
                                @clear-click="resetInvoicedAt"
                                @update:modelValue="filterByInvoicedAt"
                                placeholder="DD/MM/YY"
                                selectionMode="range"
                                hideOnRangeSelection
                                size="small"
                                :maxDate="new Date()"
                                :manualInput="false"
                                inputClass="py-0.5 text-xs"
                            />
                        </template>
                        <template #filtericon />
                    </Column>

                    <Column v-if="status === 'paid'" header="Approved At" style="min-width: 14rem">
                        <template #body="{ data }">{{ data.approved_at ?? '—' }}</template>
                        <template #filter>
                            <DatePicker
                                v-model="approvedAtDates"
                                showIcon showButtonBar
                                @clear-click="resetApprovedAt"
                                @update:modelValue="filterByApprovedAt"
                                placeholder="DD/MM/YY"
                                selectionMode="range"
                                hideOnRangeSelection
                                size="small"
                                :maxDate="new Date()"
                                :manualInput="false"
                                inputClass="py-0.5 text-xs"
                            />
                        </template>
                        <template #filtericon />
                    </Column>

                    <Column v-if="status === 'ready'" header="Approved At" style="min-width: 14rem">
                        <template #body="{ data }">{{ data.approved_at ?? '—' }}</template>
                        <template #filter>
                            <DatePicker
                                v-model="approvedAtDates"
                                showIcon showButtonBar
                                @clear-click="resetApprovedAtReady"
                                @update:modelValue="filterByApprovedAtReady"
                                placeholder="DD/MM/YY"
                                selectionMode="range"
                                hideOnRangeSelection
                                size="small"
                                :maxDate="new Date()"
                                :manualInput="false"
                                inputClass="py-0.5 text-xs"
                            />
                        </template>
                        <template #filtericon />
                    </Column>

                    <Column v-if="status === 'ready'" header="Ready At" style="min-width: 14rem">
                        <template #body="{ data }">{{ data.ready_at ?? '—' }}</template>
                        <template #filter>
                            <DatePicker
                                v-model="readyAtDates"
                                showIcon showButtonBar
                                @clear-click="resetReadyAt"
                                @update:modelValue="filterByReadyAt"
                                placeholder="DD/MM/YY"
                                selectionMode="range"
                                hideOnRangeSelection
                                size="small"
                                :maxDate="new Date()"
                                :manualInput="false"
                                inputClass="py-0.5 text-xs"
                            />
                        </template>
                        <template #filtericon />
                    </Column>

                    <Column header="Actions">
                        <template #body="{ data }">
                            <div class="flex items-center gap-1">
                                <Button
                                    icon="pi pi-eye"
                                    size="small"
                                    variant="text"
                                    raised
                                    rounded
                                    severity="secondary"
                                    @click="detailDialog.open(data.id)"
                                    v-tooltip.top="'View'"
                                />
                                <Button
                                    v-if="data.status === 'pending'"
                                    icon="pi pi-check"
                                    size="small"
                                    variant="text"
                                    raised
                                    rounded
                                    severity="info"
                                    @click="confirmStatusChange(data, 'paid')"
                                    v-tooltip.top="'Mark Paid'"
                                />
                                <Button
                                    v-if="data.status === 'paid'"
                                    icon="pi pi-box"
                                    size="small"
                                    variant="text"
                                    raised
                                    rounded
                                    severity="success"
                                    @click="confirmStatusChange(data, 'ready')"
                                    v-tooltip.top="'Mark Ready'"
                                />
                                <Button
                                    v-if="data.status === 'pending'"
                                    icon="pi pi-times"
                                    size="small"
                                    variant="text"
                                    raised
                                    rounded
                                    severity="danger"
                                    @click="confirmStatusChange(data, 'cancelled')"
                                    v-tooltip.top="'Cancel'"
                                />
                                <Button
                                    icon="pi pi-ellipsis-v"
                                    size="small"
                                    variant="text"
                                    rounded
                                    severity="secondary"
                                    aria-haspopup="true"
                                    @click="(e) => rowMenus[data.id].toggle(e)"
                                />
                                <Menu
                                    :ref="(el) => { if (el) rowMenus[data.id] = el }"
                                    :model="getMenuItems(data)"
                                    popup
                                    class="text-sm"
                                />
                            </div>
                        </template>
                    </Column>
                    <template #empty>
                        <div class="flex flex-col items-center justify-center h-40">
                            <i class="pi pi-inbox text-5xl text-gray-300 mb-3"></i>
                            <p class="text-gray-500">No orders found.</p>
                        </div>
                    </template>
                </DataTable>
        </Deferred>
    </div>
</template>

<style scoped>
:deep(.p-datatable-column-filter-button) {
    display: none;
}
</style>
