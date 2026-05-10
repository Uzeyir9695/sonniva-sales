<script setup>
import AdminLayout from '../AdminLayout.vue';
import { ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';

defineOptions({ layout: AdminLayout });

const props = defineProps({
    notifications: Object,
});

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
    <div class="p-6">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-xl font-bold text-gray-900">მარაგის შეტყობინებები</h1>
                <p class="text-sm text-gray-500 mt-0.5">მომხმარებლები, რომლებიც ელოდებიან პროდუქტის შევსებას</p>
            </div>
            <span class="text-xs font-semibold px-3 py-1 bg-brand-50 text-brand-600 rounded-full">
                სულ {{ notifications.total }}
            </span>
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
            <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="ძებნა..." class="text-sm" />
                    </IconField>
                </div>
            </template>

            <template #empty>
                <div class="flex flex-col items-center justify-center py-12 text-gray-400">
                    <i class="pi pi-bell text-3xl mb-3"></i>
                    <p class="text-sm">შეტყობინება არ მოიძებნა</p>
                </div>
            </template>

            <Column field="item.no" header="კოდი" sortable class="font-mono text-xs" />

            <Column field="item.name" header="პროდუქტი" sortable>
                <template #body="{ data }">
                    <span class="text-gray-800">{{ data.item?.name }}</span>
                </template>
            </Column>

            <Column header="მომხმარებელი" sortable sortField="user.name">
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

            <Column field="created_at" header="თარიღი" sortable>
                <template #body="{ data }">
                    <span class="text-gray-500 text-xs">{{ new Date(data.created_at).toLocaleDateString('ka-GE') }}</span>
                </template>
            </Column>

            <Column field="notified_at" header="სტატუსი" sortable>
                <template #body="{ data }">
                    <span
                        class="text-xs font-semibold px-2.5 py-1 rounded-full"
                        :class="data.notified_at
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'"
                    >
                        {{ data.notified_at ? 'შეტყობინდა' : 'მოლოდინში' }}
                    </span>
                </template>
            </Column>
        </DataTable>
    </div>
</template>