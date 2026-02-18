<script setup>
import AdminLayout from "../AdminLayout.vue";
import {computed, ref} from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import {Deferred, router, usePage} from "@inertiajs/vue3";
import { FilterMatchMode } from '@primevue/core/api';
import EditUser from "../../account/Index.vue";

const confirm = useConfirm();
const toast = useToast();

const isAdmin = computed(() => usePage().props.isAdmin);

const props = defineProps({
    users: Array,
    usersCount: Number,
    onlineUsers: Number,
});

const user = ref(null)
const visible = ref(false)
const metaKey = ref(true);
const dates = ref(null);
const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};

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
                onSuccess: (res) => toast.add({ severity: 'success', summary: 'Confirmed', detail: res.props.flash.message, group: 'admin-user', life: 3000 }),
                onError: () => toast.add({ severity: 'danger', summary: 'Error', detail: 'Something went wrong, please try again.', group: 'admin-user', life: 3000 })
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
        toast.add({ severity: 'success', summary: 'Confirmed', detail: 'User profile updated successfully', group: 'admin-user', life: 3000 })
    }
    if(status === 422) {
        toast.add({ severity: 'danger', summary: 'Error', detail: 'Something went wrong', group: 'admin-user', life: 3000 })
    }
}

function filterByDate() {
    const startDate = dates.value[0];
    const endDate = dates.value[1];

    if (dates.value && startDate && endDate) {
        router.get(route('admin.users.index'),
            {
                start_date: startDate,
                end_date: endDate,
            },
            {
                preserveState: true,
            }
        );
    }
}

function resetSelectedDate() {
    dates.value = null;
    router.get(route('admin.users.index'), {}, { preserveState: true });
}

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tax_id: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    created_at: { value: null, matchMode: FilterMatchMode.EQUALS },
});
</script>

<template>
    <AdminLayout>
        <Toast position="bottom-right" group="admin-user"/>
        <ConfirmDialog></ConfirmDialog>

        <Dialog v-model:visible="visible" modal header="Edit user" class="w-[90%] sm:w-[60%]" pt:mask:class="backdrop-blur-sm">
            <EditUser
                :user="user"
                :errors="[]"
                :editing-by-admin="true"
                @closeEditor="userProfileUpdated"
            />
        </Dialog>

        <Deferred data="users">
            <template #fallback>
                <div class="p-4">
                    <Skeleton width="100%" height="30rem" class="bg-slate-200"></Skeleton>
                </div>
            </template>

            <div v-if="users.length > 0" class="container mx-auto p-4">
                <DataTable
                    v-model:filters="filters"
                    filterDisplay="row"
                    :globalFilterFields="['tax_id', 'name', 'phone']"
                    :value="users"
                    paginator
                    :rows="15"
                    :rowsPerPageOptions="[5, 10, 15, 20, 50]"
                    dataKey="id"
                    tableStyle="min-width: 50rem"
                    ref="dt"
                    class="text-sm"
                >
                    <template #header>
                        <div class="flex justify-between">
                            <div class="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <h2 class="text-lg font-semibold text-gray-900">{{ usersCount }} Users</h2>
                                </div>

                                <h1 class="text-lg text-green-500">- {{ onlineUsers }} Online</h1>
                            </div>


                            <div class="flex items-center gap-3">
                                <div class="text-end">
                                    <Button icon="pi pi-file-export" size="small" label="Export" @click="exportCSV($event)" />
                                </div>

                                <IconField>
                                    <InputIcon>
                                        <i class="pi pi-search" />
                                    </InputIcon>
                                    <InputText v-model="filters['global'].value" placeholder="Global Search" size="small" />
                                </IconField>
                            </div>
                        </div>
                    </template>

                    <Column header="#" headerStyle="width:3rem">
                        <template #body="slotProps">
                            {{ slotProps.index + 1 }}
                        </template>
                    </Column>

                    <Column field="name" header="Full Name">
                        <template #body="{ data }">
                            {{ data.name }} {{ data.lastname?? '' }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" size="small" class="py-1 text-sm w-full" @input="filterCallback()" placeholder="Search by name" />
                        </template>
                    </Column>

                    <Column field="tax_id" header="User ID">
                        <template #body="{ data }">
                            {{ data.tax_id }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" size="small" class="py-1 text-sm w-full" @input="filterCallback()" placeholder="Search by ID" />
                        </template>
                    </Column>

                    <Column field="phone" header="Phone">
                        <template #body="{ data }">
                            {{ data.phone }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" size="small" class="py-1 text-sm w-full" @input="filterCallback()" placeholder="Search by phone" />
                        </template>
                    </Column>

                    <Column field="paid_items_count" header="Paid Orders">
                        <template #footer>
                            <div class="space-x-1 inline-block mb-6">
                                <i class="pi pi-calculator text-sm"></i>
                                <span class="font-semibold text-gray-500">Totals</span>
                                <div class="font-semibold text-blue-500">
                                    {{
                                        $formatNumber(
                                            users.reduce((acc, user) => acc + user.paid_items_count, 0)
                                        )
                                    }}
                                </div>
                            </div>
                        </template>
                    </Column>

                    <Column field="created_at" header="Joined" style="width: 20%;">
                        <template #filter>
                            <div class="flex gap-1">
                                <DatePicker v-model="dates" showIcon showButtonBar @clear-click="resetSelectedDate" placeholder="DD/MM/YY" selectionMode="range" hideOnRangeSelection @update:modelValue="filterByDate" size="small" :minDate="new Date(2025, 8, 31)" :maxDate="new Date()" :manualInput="false" />
                            </div>
                        </template>
                        <template #filtericon></template>
                    </Column>

                    <Column header="Actions" v-if="isAdmin">
                        <template #body="slotProps">
                            <div class="flex gap-2">
                                <Button @click="editUser(slotProps.data.id)" icon="pi pi-user-edit" severity="info" size="small" variant="text" raised rounded aria-label="Edit" />
                                <Button @click="deleteUser(slotProps.data.id)" icon="pi pi-trash" severity="danger" size="small" variant="text" raised rounded aria-label="Delete" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <div v-else class="flex flex-col items-center justify-center h-64">
                <i class="pi pi-users text-6xl text-gray-400 mb-4"></i>
                <h3 class="text-xl text-gray-600">No users found.</h3>
            </div>
        </Deferred>
    </AdminLayout>
</template>

<style scoped>

</style>
