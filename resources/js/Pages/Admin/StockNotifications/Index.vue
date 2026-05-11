<script setup>
import AdminLayout from '../AdminLayout.vue';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { FilterMatchMode } from '@primevue/core/api';

defineOptions({ layout: AdminLayout });

const props = defineProps({
    notifications: Object,
    counts: Object,
    tab: String,
});

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

function switchTab(t) {
    router.get(route('admin.stock-notifications.index'), { tab: t }, { preserveState: true, replace: true });
}

function deleteNotification(id) {
    router.delete(route('admin.stock-notifications.destroy', id), {}, { preserveScroll: true });
}
</script>

<template>
    <div class="p-6">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-xl font-bold text-gray-900">მარაგის შეტყობინებები</h1>
                <p class="text-sm text-gray-500 mt-0.5">მომხმარებლები, რომლებიც ელოდებიან პროდუქტის შევსებას</p>
            </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2 mb-5">
            <button
                @click="switchTab('pending')"
                class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                :class="tab === 'pending'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
            >
                <i class="pi pi-clock text-xs"></i>
                მოლოდინში
                <span class="text-xs font-bold px-1.5 py-0.5 rounded-full"
                    :class="tab === 'pending' ? 'bg-amber-200 text-amber-800' : 'bg-gray-200 text-gray-600'"
                >
                    {{ counts.pending }}
                </span>
            </button>

            <button
                @click="switchTab('sent')"
                class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                :class="tab === 'sent'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
            >
                <i class="pi pi-check-circle text-xs"></i>
                გაგზავნილი
                <span class="text-xs font-bold px-1.5 py-0.5 rounded-full"
                    :class="tab === 'sent' ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-200 text-gray-600'"
                >
                    {{ counts.sent }}
                </span>
            </button>
        </div>

        <DataTable
            :value="notifications.data"
            v-model:filters="filters"
            :globalFilterFields="['user.name', 'user.lastname', 'user.phone', 'item.no', 'item.name']"
            paginator
            :rows="50"
            dataKey="id"
            class="text-sm"
        >
            <template #empty>
                <div class="flex flex-col items-center justify-center py-12 text-gray-400">
                    <i class="pi pi-bell text-3xl mb-3"></i>
                    <p class="text-sm">შეტყობინება არ მოიძებნა</p>
                </div>
            </template>

            <Column field="item.no" header="კოდი" />

            <Column field="item.name" header="პროდუქტი">
                <template #body="{ data }">
                    <span class="text-gray-800">{{ data.item?.name }}</span>
                </template>
            </Column>

            <Column header="მომხმარებელი">
                <template #body="{ data }">
                    <span class="font-medium text-gray-800">{{ data.user?.name }} {{ data.user?.lastname }}</span>
                </template>
            </Column>

            <Column field="user.phone" header="ტელეფონი">
                <template #body="{ data }">
                    <a :href="`tel:${data.user?.phone}`" class="text-brand-500 hover:underline">
                        {{ data.user?.phone }}
                    </a>
                </template>
            </Column>

            <Column field="created_at" header="თარიღი">
                <template #body="{ data }">
                    <span class="text-gray-500 text-xs">{{ new Date(data.created_at).toLocaleDateString('ka-GE') }}</span>
                </template>
            </Column>

            <Column v-if="tab === 'sent'" field="notified_at" header="გაგზავნის თარიღი">
                <template #body="{ data }">
                    <span class="text-gray-500 text-xs">{{ new Date(data.notified_at).toLocaleDateString('ka-GE') }}</span>
                </template>
            </Column>

            <Column v-if="tab === 'sent'" header="">
                <template #body="{ data }">
                    <button
                        @click="deleteNotification(data.id)"
                        class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                        <i class="pi pi-trash text-sm"></i>
                    </button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>