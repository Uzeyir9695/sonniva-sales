<script setup>
import AdminLayout from "../AdminLayout.vue";
import {computed, ref} from "vue";

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import {Deferred, router, usePage} from "@inertiajs/vue3";
import TableSkeleton from '@/Shared/components/TableSkeleton.vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useDebounceFn } from '@vueuse/core';
import EditUser from "../../Account/Index.vue";
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue';

defineOptions({ layout: AdminLayout });

const confirm = useConfirm();
const toast = useToast();

const isAdmin = computed(() => usePage().props.isAdmin);

const props = defineProps({
    users: Object,
    paidOrdersTotal: Number,
    onlineUsers: Number,
});

const user = ref(null)
const visible = ref(false)
const metaKey = ref(true);
const initialQuery = new URLSearchParams(usePage().url.split('?')[1] ?? '');

const filters = ref({
    tax_id:    { value: initialQuery.get('tax_id'), matchMode: FilterMatchMode.EQUALS },
    full_name: { value: initialQuery.get('name'), matchMode: FilterMatchMode.CONTAINS },
    phone:     { value: initialQuery.get('phone'), matchMode: FilterMatchMode.CONTAINS },
});

const currentFilterParams = computed(() => {
    const params = {};
    if (filters.value.full_name.value) params.name = filters.value.full_name.value;
    if (filters.value.tax_id.value) params.tax_id = filters.value.tax_id.value;
    if (filters.value.phone.value) params.phone = filters.value.phone.value;
    return params;
});

const onFilter = useDebounceFn(() => {
    router.get(route('admin.users.index'), currentFilterParams.value, {
        only: ['users', 'paidOrdersTotal'],
        preserveState: true,
        preserveScroll: true,
    });
}, 350);

function onPage(event) {
    router.get(route('admin.users.index'), { ...currentFilterParams.value, page: event.page + 1, per_page: event.rows }, {
        only: ['users'],
        preserveState: true,
        preserveScroll: true,
    });
}

function exportCSV() {
    window.location.href = route('admin.users.export', currentFilterParams.value);
}

function deleteUser(id) {
    confirm.require({
        message: 'Do you want to delete this user?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            router.delete(route('admin.users.delete', id), {
                onSuccess: (res) => toast.add({ severity: 'success', summary: 'Confirmed', detail: res.props.flash.message, life: 3000 }),
                onError: () => toast.add({ severity: 'danger', summary: 'Error', detail: 'Something went wrong, please try again.', life: 3000 })
            })

        },
        reject: () => {

        }
    });
}

async function editUser(id) {
    await axios(route('admin.users.get-user', id))
        .then((res) => {
            user.value = res.data.user
            visible.value = true;
        }).catch((error) => {
        console.log(error.response.data)
        });
}

function userProfileUpdated(status) {
    visible.value = false;
    if(status === 200) {
        toast.add({ severity: 'success', summary: 'Confirmed', detail: 'User profile updated successfully', life: 3000 })
    }
    if(status === 422) {
        toast.add({ severity: 'danger', summary: 'Error', detail: 'Something went wrong', life: 3000 })
    }
}
</script>

<template>
    <ConfirmDialog></ConfirmDialog>

    <Dialog v-model:visible="visible" modal header="Edit user" class="w-[90%] sm:w-[60%]" pt:mask:class="backdrop-blur-sm">
        <EditUser
            :user="user"
            :errors="[]"
            :editing-by-admin="true"
            @closeEditor="userProfileUpdated"
        />
    </Dialog>

    <Deferred :data="['users', 'paidOrdersTotal']">
        <template #fallback>
            <div class="p-4">
                <TableSkeleton />
            </div>
        </template>

        <div class="rounded-xl overflow-hidden">
            <DataTable
                v-model:filters="filters"
                filterDisplay="row"
                :value="users?.data ?? []"
                lazy
                paginator
                :rows="users?.per_page ?? 15"
                :totalRecords="users?.total ?? 0"
                :first="((users?.current_page ?? 1) - 1) * (users?.per_page ?? 15)"
                :rowsPerPageOptions="[5, 10, 15, 20, 50]"
                @page="onPage"
                @filter="onFilter"
                dataKey="id"
                tableStyle="min-width: 50rem"
                class="text-sm"
            >
                <template #header>
                    <div class="flex justify-between">
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <h2 class="text-lg font-semibold text-gray-900">{{ users?.total ?? 0 }} Users</h2>
                            </div>

                            <h1 class="text-lg text-green-500">- {{ onlineUsers }} Online</h1>
                        </div>


                        <div class="flex items-center gap-3">
                            <div class="text-end">
                                <Button icon="pi pi-file-export" size="small" label="Export" :disabled="!users?.total" @click="exportCSV" />
                            </div>
                        </div>
                    </div>
                </template>

                <Column header="#" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ ((users?.current_page ?? 1) - 1) * (users?.per_page ?? 15) + slotProps.index + 1 }}
                    </template>
                </Column>

                <Column field="name" filterField="full_name" header="Full Name" style="min-width: 11rem">
                    <template #body="{ data }">
                        {{ data.name }} {{ data.lastname?? '' }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <PrimeInputText v-model="filterModel.value" type="text" size="small" class="text-sm" fluid @input="filterCallback()" placeholder="Search name" />
                    </template>
                </Column>

                <Column field="tax_id" header="User ID" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.tax_id }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <PrimeInputText v-model="filterModel.value" type="text" size="small" class="text-sm" fluid @input="filterCallback()" placeholder="Search ID" />
                    </template>
                </Column>

                <Column field="phone" header="Phone" style="min-width: 11rem">
                    <template #body="{ data }">
                        {{ data.phone }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <PrimeInputText v-model="filterModel.value" type="text" size="small" class="text-sm" fluid @input="filterCallback()" placeholder="Search phone" />
                    </template>
                </Column>

                <Column field="paid_orders_count" header="Paid Orders">
                    <template #body="{ data }">
                        {{ data.paid_orders_count ?? 0 }}
                    </template>
                    <template #footer>
                        <div class="space-x-1 inline-block mb-6">
                            <i class="pi pi-calculator text-sm"></i>
                            <span class="font-semibold text-gray-500">Totals</span>
                            <div class="font-semibold text-blue-500">
                                {{ $formatNumber(paidOrdersTotal ?? 0) }}
                            </div>
                        </div>
                    </template>
                </Column>

                <Column field="is_handyman" header="Handyman" >
                    <template #body="{ data }">
                        <span>{{ data.is_handyman ? 'Yes' : 'No' }}</span>
                    </template>
                </Column>

                <Column field="created_at" header="Joined" style="min-width: 7rem" />

                <Column header="Actions" v-if="isAdmin">
                    <template #body="slotProps">
                        <div class="flex gap-2">
                            <Button @click="editUser(slotProps.data.id)" icon="pi pi-user-edit" severity="info" size="small" variant="text" raised rounded aria-label="Edit" />
                            <Button @click="deleteUser(slotProps.data.id)" icon="pi pi-trash" severity="danger" size="small" variant="text" raised rounded aria-label="Delete" />
                        </div>
                    </template>
                </Column>

                <template #empty>
                    <div class="flex flex-col items-center justify-center h-40">
                        <i class="pi pi-users text-5xl text-gray-400 mb-3"></i>
                        <p class="text-gray-600">No users found.</p>
                    </div>
                </template>
            </DataTable>
        </div>
    </Deferred>
</template>

<style scoped>
:deep(.p-datatable-column-filter-button) {
    display: none;
}
</style>
