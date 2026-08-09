<script setup>
import { ref } from 'vue';
import { Head, Deferred } from '@inertiajs/vue3';
import Paginate from '@/Shared/components/Paginate.vue';
import OrderDetailDialog from './OrderDetailDialog.vue';
import ReorderDialog from './ReorderDialog.vue';

defineProps({
    orders: Object,
});

const detailDialog = ref(null);
const reorderDialog = ref(null);

const MAX_ITEM_IMAGES = 5;

const statusSeverity = {
    pending:    'warn',
    paid:       'info',
    ready:      'success',
    dispatched: 'info',
    delivered:  'success',
    cancelled:  'danger',
};

const statusLabel = {
    pending:    'დაუდასტურებელი',
    paid:       'გადახდილი',
    ready:      'მზადაა',
    dispatched: 'გაგზავნილია',
    delivered:  'ჩაბარებულია',
    cancelled:  'უარყოფილი',
    limit:      'ლიმიტი',
};

function visibleImages(order) {
    return order.items?.slice(0, MAX_ITEM_IMAGES) ?? [];
}

function remainingItemCount(order) {
    return Math.max((order.items?.length ?? 0) - MAX_ITEM_IMAGES, 0);
}

function imageUrl(orderItem) {
    return `${orderItem.storage_path}/${orderItem.image}`;
}
</script>

<template>
    <Head title="ჩემი შეკვეთები" />

    <OrderDetailDialog ref="detailDialog" />
    <ReorderDialog ref="reorderDialog" />

    <div class="py-8 px-4">
        <h1 class="text-xl font-semibold text-gray-800 mb-6">ჩემი შეკვეთები</h1>

        <Deferred data="orders">
            <template #fallback>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div
                        v-for="n in 6"
                        :key="n"
                        class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-4"
                    >
                        <div class="flex items-start justify-between gap-2">
                            <Skeleton height="0.8rem" width="40%" class="bg-slate-200!" borderRadius="4px" />
                            <Skeleton height="1.4rem" width="5rem" class="bg-slate-200!" borderRadius="999px" />
                        </div>
                        <div class="flex items-center gap-2">
                            <Skeleton v-for="i in 4" :key="i" height="3rem" width="3rem" class="bg-slate-100!" borderRadius="8px" />
                        </div>
                        <div class="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                            <Skeleton height="0.7rem" width="70%" class="bg-slate-100!" borderRadius="4px" />
                            <Skeleton height="0.7rem" width="60%" class="bg-slate-100!" borderRadius="4px" />
                        </div>
                        <div class="flex gap-2 pt-1">
                            <Skeleton height="2.2rem" class="flex-1 bg-slate-100!" borderRadius="8px" />
                            <Skeleton height="2.2rem" class="flex-1 bg-slate-100!" borderRadius="8px" />
                        </div>
                    </div>
                </div>
            </template>

            <div
                v-if="orders.data?.some((o) => o.tracking_number)"
                class="flex flex-col sm:flex-row sm:items-center gap-2 bg-blue-50 text-blue-700 text-sm px-4 py-3 mb-4 rounded-xl"
            >
                <div class="flex items-start gap-2">
                    <i class="pi pi-info-circle mt-0.5 shrink-0"></i>
                    <span>შეკვეთის სტატუსისა და მიწოდების ინფორმაციის სანახავად გადადით ვებგვერდზე და შეიყვანეთ თრექინგის ნომერი.</span>
                </div>
                <a href="https://onway.ge/" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 font-semibold underline underline-offset-5 shrink-0">
                    <i class="pi pi-external-link text-xs"></i>
                    <span>სტატუსის შემოწმება</span>
                </a>
            </div>

            <div class="flex items-center gap-2 mb-4">
                <span class="font-semibold text-gray-700 text-sm">
                    {{ orders.total ?? orders.data.length }} შეკვეთა
                </span>
            </div>

            <div v-if="orders.data?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                    v-for="order in orders.data"
                    :key="order.id"
                    class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col gap-4"
                >
                    <div class="flex items-start justify-between gap-2">
                        <div>
                            <p class="text-xs text-gray-400">შეკვეთის №</p>
                            <p class="font-mono text-sm font-semibold text-gray-800">{{ order.invoice_no ?? '—' }}</p>
                        </div>
                        <Tag :value="statusLabel[order.status] ?? order.status" :severity="statusSeverity[order.status]" />
                    </div>

                    <div class="flex items-center gap-2">
                        <template v-if="order.items?.length">
                            <div
                                v-for="orderItem in visibleImages(order)"
                                :key="orderItem.id"
                                class="relative w-16 h-16 rounded-lg border border-gray-100 bg-gray-50 shrink-0"
                            >
                                <img
                                    v-if="orderItem.image"
                                    :src="imageUrl(orderItem)"
                                    :alt="orderItem.name"
                                    class="w-full h-full object-cover rounded-lg"
                                />
                                <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
                                    <i class="pi pi-image text-sm"></i>
                                </div>
                                <span
                                    v-if="orderItem.quantity > 1"
                                    class="absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-red-500 text-white text-[10px] leading-[1.1rem] font-semibold text-center shadow"
                                >x{{ orderItem.quantity }}</span>
                            </div>
                            <div
                                v-if="remainingItemCount(order) > 0"
                                class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500 shrink-0"
                            >
                                +{{ remainingItemCount(order) }}
                            </div>
                        </template>
                        <span v-else class="text-xs text-gray-300">პროდუქტები არ მოიძებნა</span>
                    </div>

                    <div class="grid grid-cols-2 gap-y-2 gap-x-3 text-sm border-t border-gray-100 pt-3">
                        <div>
                            <p class="text-xs text-gray-400">თარიღი</p>
                            <p class="text-gray-700">{{ order.created_at }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-400">სულ</p>
                            <p class="font-semibold text-gray-900">{{ order.total }} ₾</p>
                        </div>
                        <div v-if="order.tracking_number" class="col-span-2">
                            <p class="text-xs text-gray-400">თრექინგის ნომერი</p>
                            <p class="font-mono text-gray-700">{{ order.tracking_number }}</p>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row items-center justify-between flex-wrap gap-2 mt-auto pt-1">
                        <Button
                            label="დეტალები"
                            icon="pi pi-eye"
                            size="small"
                            severity="secondary"
                            class="2xl:flex-1 w-full hover:bg-blue-500! hover:border-blue-500! hover:text-white!"
                            @click="detailDialog.open(order.id)"
                        />
                        <Button
                            label="თავიდან შეკვეთა"
                            icon="pi pi-refresh"
                            size="small"
                            severity="secondary"
                            class="2xl:flex-1 w-full hover:bg-emerald-500! hover:border-emerald-500! hover:text-white!"
                            @click="reorderDialog.open(order.id)"
                        />
                    </div>
                </div>
            </div>

            <div v-else class="flex flex-col items-center justify-center h-60 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <i class="pi pi-inbox text-5xl text-gray-300 mb-3"></i>
                <p class="text-gray-500">შეკვეთები არ მოიძებნა.</p>
            </div>

            <Paginate :data="orders" class="mt-4" />
        </Deferred>
    </div>
</template>
