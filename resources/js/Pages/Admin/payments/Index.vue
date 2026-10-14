<script setup>
import AdminLayout from '../AdminLayout.vue';
import TableSkeleton from '@/Shared/components/TableSkeleton.vue';
import { computed, ref, watch } from 'vue';
import { Deferred, router, usePage } from '@inertiajs/vue3';
import { FilterMatchMode } from '@primevue/core/api';
import { useDebounceFn } from '@vueuse/core';
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue';

defineOptions({ layout: AdminLayout });

const props = defineProps({
    payments: Object,
    dateFrom: String,
    dateTo:   String,
});

const initialQuery = new URLSearchParams(usePage().url.split('?')[1] ?? '');

const filters = ref({
    invoice_no: { value: initialQuery.get('invoice_no'), matchMode: FilterMatchMode.STARTS_WITH },
    user_name:  { value: initialQuery.get('customer_name'), matchMode: FilterMatchMode.CONTAINS },
    provider:   { value: initialQuery.get('provider'), matchMode: FilterMatchMode.EQUALS },
    status:     { value: initialQuery.get('status'), matchMode: FilterMatchMode.EQUALS },
});

const providers = ['tbc', 'bog', 'pcb', 'invoice', 'cash'];
const statuses  = ['pending', 'completed', 'failed'];

const providerLabel = { tbc: 'TBC', bog: 'BOG', pcb: 'ProCredit', invoice: 'Invoice', cash: 'Cash' };

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

const fmt = (d) => d.toLocaleDateString('en-CA');

const currentFilterParams = computed(() => {
    const params = {};
    if (dateRange.value?.[0] && dateRange.value?.[1]) {
        params.date_from = fmt(dateRange.value[0]);
        params.date_to   = fmt(dateRange.value[1]);
    }
    if (filters.value.invoice_no.value) params.invoice_no = filters.value.invoice_no.value;
    if (filters.value.user_name.value) params.customer_name = filters.value.user_name.value;
    if (filters.value.provider.value) params.provider = filters.value.provider.value;
    if (filters.value.status.value) params.status = filters.value.status.value;
    return params;
});

function reload(params = {}) {
    router.get(route('admin.payments.index'), { ...currentFilterParams.value, ...params }, {
        only: ['payments'],
        preserveState: true,
        preserveScroll: true,
    });
}

watch(dateRange, (val) => {
    if (val === null || (Array.isArray(val) && val[1])) reload();
});

const onFilter = useDebounceFn(() => reload(), 350);

function onPage(event) {
    reload({ page: event.page + 1, per_page: event.rows });
}

function exportCSV() {
    window.location.href = route('admin.payments.export', currentFilterParams.value);
}
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

        <div class="rounded-xl border border-gray-200 overflow-hidden">
            <DataTable
                v-model:filters="filters"
                filterDisplay="row"
                scrollable
                :value="payments?.data ?? []"
                lazy
                paginator
                :rows="payments?.per_page ?? 15"
                :totalRecords="payments?.total ?? 0"
                :first="((payments?.current_page ?? 1) - 1) * (payments?.per_page ?? 15)"
                :rowsPerPageOptions="[15, 30, 50]"
                @page="onPage"
                @filter="onFilter"
                dataKey="id"
                tableStyle="min-width: 50rem"
                class="text-sm"
            >
                <template #header>
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <h2 class="text-lg font-semibold text-gray-900">{{ payments?.total ?? 0 }} Payments</h2>
                        <Button icon="pi pi-file-export" size="small" label="Export" :disabled="!payments?.total" @click="exportCSV" />
                    </div>
                </template>

                <Column field="invoice_no" header="Order №" filterField="invoice_no" style="min-width: 10rem">
                    <template #body="{ data }">
                        <span class="font-mono ">{{ data.invoice_no ?? '—' }}</span>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <PrimeInputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search order #" />
                    </template>
                </Column>

                <Column field="user_name" header="Customer" filterField="user_name" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div>
                            <div>{{ data.user_name ?? '—' }}</div>
                            <div class=" text-gray-400">{{ data.user_email }}</div>
                        </div>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <PrimeInputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search name" />
                    </template>
                </Column>

                <Column field="provider" header="Provider" filterField="provider" style="min-width: 9rem">
                    <template #body="{ data }">
                        <span class="font-mono  font-semibold uppercase">{{ providerLabel[data.provider] ?? data.provider }}</span>
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
                        <span class="font-mono text-gray-500 break-all">{{ data.transaction_id ?? '—' }}</span>
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
                        <span class="text-gray-500">{{ data.processed_at ?? '—' }}</span>
                    </template>
                </Column>

                <Column field="created_at" header="Date" style="min-width: 12rem">
                    <template #body="{ data }">
                        <span class="text-gray-500">{{ data.created_at }}</span>
                    </template>
                </Column>

                <template #empty>
                    <div class="flex flex-col items-center justify-center h-40">
                        <i class="pi pi-credit-card text-5xl text-gray-300 mb-3"></i>
                        <p class="font-semibold text-gray-500">No payments found</p>
                    </div>
                </template>
            </DataTable>
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
