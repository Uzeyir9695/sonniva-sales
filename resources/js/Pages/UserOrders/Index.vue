<script setup>
import { ref } from 'vue';
import { Head, Deferred } from '@inertiajs/vue3';
import TableSkeleton from '@/Shared/components/TableSkeleton.vue';
import OrderDetailDialog from './OrderDetailDialog.vue';

defineProps({
    orders: Object,
});

const detailDialog = ref(null);

const statusSeverity = {
    pending:   'warn',
    paid:      'info',
    ready:     'success',
    cancelled: 'danger',
};

const statusLabel = {
    pending:   'დაუდასტურებელი',
    paid:      'გადახდილი',
    ready:     'მზადაა',
    cancelled: 'უარყოფილი',
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
    <Head title="ჩემი შეკვეთები" />

    <OrderDetailDialog ref="detailDialog" />

    <div class="max-w-5xl mx-auto py-8 px-4">
        <h1 class="text-xl font-semibold text-gray-800 mb-6">ჩემი შეკვეთები</h1>

        <Deferred data="orders">
            <template #fallback>
                <TableSkeleton />
            </template>

            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <DataTable
                    :value="orders?.data ?? []"
                    dataKey="id"
                    :rows="10"
                    paginator
                    :rowsPerPageOptions="[10, 20, 50]"
                    class="text-sm"
                >
                    <template #header>
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-gray-700">
                                {{ orders.data.length }} შეკვეთა
                            </span>
                        </div>
                    </template>

                    <Column header="#" headerStyle="width:3rem">
                        <template #body="{ index }">{{ index + 1 }}</template>
                    </Column>

                    <Column field="invoice_no" header="ინვოისი">
                        <template #body="{ data }">
                            <span class="font-mono text-xs">{{ data.invoice_no ?? '—' }}</span>
                        </template>
                    </Column>

                    <Column header="სულ">
                        <template #body="{ data }">
                            <span class="font-semibold">{{ data.total }} ₾</span>
                        </template>
                    </Column>

                    <Column header="მიწოდება">
                        <template #body="{ data }">
                            {{ deliveryLabel[data.delivery_type] ?? data.delivery_type }}
                        </template>
                    </Column>

                    <Column header="გადახდა">
                        <template #body="{ data }">
                            <span v-if="data.payment" class="uppercase text-xs font-semibold text-gray-500">
                                {{ providerLabel[data.payment.provider] ?? data.payment.provider }}
                            </span>
                            <span v-else class="text-gray-300">—</span>
                        </template>
                    </Column>

                    <Column header="სტატუსი">
                        <template #body="{ data }">
                            <Tag :value="statusLabel[data.status] ?? data.status" :severity="statusSeverity[data.status]" />
                        </template>
                    </Column>

                    <Column field="created_at" header="თარიღი" />

                    <Column header="">
                        <template #body="{ data }">
                            <Button
                                icon="pi pi-eye"
                                size="small"
                                variant="text"
                                raised
                                rounded
                                severity="secondary"
                                @click="detailDialog.open(data.id)"
                                v-tooltip.top="'დეტალები'"
                            />
                        </template>
                    </Column>

                    <template #empty>
                        <div class="flex flex-col items-center justify-center h-40">
                            <i class="pi pi-inbox text-5xl text-gray-300 mb-3"></i>
                            <p class="text-gray-500">შეკვეთები არ მოიძებნა.</p>
                        </div>
                    </template>
                </DataTable>
            </div>
        </Deferred>
    </div>
</template>
