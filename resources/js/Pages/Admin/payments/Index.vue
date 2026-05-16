<script setup>
import AdminLayout from '../AdminLayout.vue';
import TableSkeleton from '@/Shared/components/TableSkeleton.vue';
import { ref, watch } from 'vue';
import { Deferred, router } from '@inertiajs/vue3';
import { FilterMatchMode } from '@primevue/core/api';
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue';

defineOptions({ layout: AdminLayout });

const props = defineProps({
    payments:      Array,
    paymentsCount: Number,
    dateFrom:      String,
    dateTo:        String,
});

const dt = ref();

const filters = ref({
    invoice_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_name:  { value: null, matchMode: FilterMatchMode.CONTAINS },
    provider:   { value: null, matchMode: FilterMatchMode.EQUALS },
    status:     { value: null, matchMode: FilterMatchMode.EQUALS },
});

const providers = ['tbc', 'bog', 'pcb', 'invoice'];
const statuses  = ['pending', 'completed', 'failed'];

const providerLabel = { tbc: 'TBC', bog: 'BOG', pcb: 'ProCredit', invoice: 'Invoice' };

const statusSeverity = {
    completed: 'success',
    pending:   'warn',
    failed:    'danger',
};

const dateRange = ref(
    props.dateFrom && props.dateTo
        ? [new Date(props.dateFrom), new Date(props.dateTo)]
        : null,
);

watch(dateRange, (val) => {
    if (val === null || (Array.isArray(val) && val[1])) {
        const from = val?.[0];
        const to   = val?.[1];
        router.get(
            route('admin.payments.index'),
            {
                date_from: from ? from.toISOString().slice(0, 10) : undefined,
                date_to:   to   ? to.toISOString().slice(0, 10)   : undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    }
});

const exportCSV = () => dt.value.exportCSV();
</script>

<template>
    <div class="space-y-4">
        <!-- Date Filter -->
        <div class="flex items-center gap-3">
            <DatePicker
                v-model="dateRange"
                selectionMode="range"
                :manualInput="false"
                showIcon
                iconDisplay="input"
                placeholder="Filter by date range"
                dateFormat="yy-mm-dd"
                size="small"
                class="w-64"
            />
            <Button
                v-if="dateRange"
                icon="pi pi-times"
                size="small"
                severity="secondary"
                variant="text"
                v-tooltip.top="'Clear dates'"
                @click="dateRange = null"
            />
        </div>

        <!-- Table -->
        <Deferred data="payments">
            <template #fallback>
                <TableSkeleton />
            </template>

        <div v-if="payments?.length > 0" class="rounded-xl border border-gray-200 overflow-hidden">
            <DataTable
                v-model:filters="filters"
                filterDisplay="row"
                scrollable
                :value="payments"
                paginator
                :rows="15"
                dataKey="id"
                tableStyle="min-width: 50rem"
                ref="dt"
                class="text-sm"
            >
                <template #header>
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <h2 class="text-lg font-semibold text-gray-900">{{ paymentsCount }} Payments</h2>
                        <Button icon="pi pi-file-export" size="small" label="Export" @click="exportCSV" />
                    </div>
                </template>

                <Column field="invoice_no" header="Invoice No" filterField="invoice_no" style="min-width: 10rem">
                    <template #body="{ data }">
                        <span class="font-mono text-xs">{{ data.invoice_no ?? '—' }}</span>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <PrimeInputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search INV" />
                    </template>
                </Column>

                <Column field="user_name" header="Customer" filterField="user_name" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div>
                            <div>{{ data.user_name ?? '—' }}</div>
                            <div class="text-xs text-gray-400">{{ data.user_email }}</div>
                        </div>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <PrimeInputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search name" />
                    </template>
                </Column>

                <Column field="provider" header="Provider" filterField="provider" style="min-width: 9rem">
                    <template #body="{ data }">
                        <span class="font-mono text-xs font-semibold uppercase">{{ providerLabel[data.provider] ?? data.provider }}</span>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <Select v-model="filterModel.value" :options="providers" placeholder="All" showClear size="small" class="w-full" @change="filterCallback()">
                            <template #option="{ option }">{{ providerLabel[option] ?? option }}</template>
                            <template #value="{ value }">{{ value ? (providerLabel[value] ?? value) : 'All' }}</template>
                        </Select>
                    </template>
                </Column>

                <Column field="status" header="Status" filterField="status" style="min-width: 9rem">
                    <template #body="{ data }">
                        <Tag :value="data.status" :severity="statusSeverity[data.status] ?? 'secondary'" class="capitalize" />
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <Select v-model="filterModel.value" :options="statuses" placeholder="All" showClear size="small" class="w-full" @change="filterCallback()" />
                    </template>
                </Column>

                <Column field="amount" header="Amount" style="min-width: 8rem">
                    <template #body="{ data }">
                        <span class="font-semibold">{{ data.amount }} {{ data.currency }}</span>
                    </template>
                </Column>

                <Column field="payment_method" header="Method" style="min-width: 8rem">
                    <template #body="{ data }">{{ data.payment_method ?? '—' }}</template>
                </Column>

                <Column field="transaction_id" header="Transaction ID" style="min-width: 13rem">
                    <template #body="{ data }">
                        <span class="font-mono text-xs text-gray-500 break-all">{{ data.transaction_id ?? '—' }}</span>
                    </template>
                </Column>

                <Column field="delivery_type" header="Delivery" style="min-width: 9rem">
                    <template #body="{ data }">
                        <span v-if="data.delivery_type" class="capitalize">{{ data.delivery_type }} ({{ data.delivery_cost }} ₾)</span>
                        <span v-else>—</span>
                    </template>
                </Column>

                <Column field="processed_at" header="Processed" style="min-width: 12rem">
                    <template #body="{ data }">
                        <span class="text-xs text-gray-500">{{ data.processed_at ?? '—' }}</span>
                    </template>
                </Column>

                <Column field="created_at" header="Date" style="min-width: 12rem">
                    <template #body="{ data }">
                        <span class="text-xs text-gray-500">{{ data.created_at }}</span>
                    </template>
                </Column>
            </DataTable>
        </div>

        <div v-else class="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-gray-200">
            <i class="pi pi-credit-card text-6xl text-gray-300 mb-4"></i>
            <h3 class="text-xl font-semibold text-gray-500">No payments found</h3>
        </div>

        </Deferred>
    </div>
</template>

<style scoped>
:deep(.p-datatable-column-filter-button) {
    display: none;
}
:deep(.p-datatable-column-filter .p-select .p-select-label) {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
}
</style>
