<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { usePage } from '@inertiajs/vue3';

const taxIdRequired = computed(() => usePage().props.user?.role === 'manager');

const props = defineProps({
    modelValue: { type: Object, default: null },
});
const emit = defineEmits(['update:modelValue']);

const dialogVisible = ref(false);

// ── Search ───────────────────────────────────────────────────────────────────
const searchQuery       = ref('');
const searchResults     = ref([]);
const loadingSearch     = ref(false);
let   searchTimeout     = null;

const recentCustomers   = ref([]);
const loadingRecent     = ref(false);

const listToShow = computed(() =>
    searchQuery.value.trim() ? searchResults.value : recentCustomers.value
);

async function openDialog() {
    dialogVisible.value = true;
    showNewForm.value   = false;
    formErrors.value    = {};
    searchQuery.value   = '';
    searchResults.value = [];
    await fetchRecent();
}

async function fetchRecent() {
    loadingRecent.value = true;
    try {
        const { data } = await axios.get(route('cashier.customers.index'));
        recentCustomers.value = data.customers ?? [];
    } finally {
        loadingRecent.value = false;
    }
}

function onSearchInput() {
    clearTimeout(searchTimeout);
    const q = searchQuery.value.trim();
    if (!q) {
        searchResults.value = [];
        return;
    }
    searchTimeout = setTimeout(async () => {
        loadingSearch.value = true;
        try {
            const { data } = await axios.get(route('cashier.customers.index'), { params: { q } });
            searchResults.value = data.customers ?? [];
        } finally {
            loadingSearch.value = false;
        }
    }, 300);
}

// ── Select ───────────────────────────────────────────────────────────────────
function selectCustomer(customer) {
    emit('update:modelValue', customer);
    dialogVisible.value = false;
}

function clear() {
    emit('update:modelValue', null);
}

// ── New customer form ────────────────────────────────────────────────────────
const showNewForm = ref(false);
const form        = ref({ name: '', lastname: '', phone: '', email: '', tax_id: '', address: '' });
const formErrors  = ref({});
const saving      = ref(false);

async function saveCustomer() {
    formErrors.value = {};
    saving.value     = true;
    try {
        const { data } = await axios.post(route('cashier.customers.register'), form.value);
        recentCustomers.value.unshift(data.customer);
        selectCustomer(data.customer);
        form.value    = { name: '', lastname: '', phone: '', email: '', tax_id: '', address: '' };
        showNewForm.value = false;
    } catch (err) {
        if (err.response?.status === 422) {
            formErrors.value = err.response.data.errors ?? {};
        }
    } finally {
        saving.value = false;
    }
}
</script>

<template>
    <!-- Selected state -->
    <div v-if="modelValue" class="rounded-xl border-2 border-emerald-400 bg-gradient-to-r from-emerald-50 to-white p-4 shadow-sm">
        <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow">
                    <i class="pi pi-user text-white text-base"></i>
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-gray-900 text-base truncate">{{ modelValue.name }} {{ modelValue.lastname }}</p>
                    <div class="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                        <span class="flex items-center gap-1 text-sm text-gray-500">
                            <i class="pi pi-phone text-emerald-500 text-sm"></i>
                            {{ modelValue.local_phone || modelValue.phone }}
                        </span>
                        <span v-if="modelValue.tax_id" class="flex items-center gap-1 text-sm text-gray-500">
                            <i class="pi pi-id-card text-emerald-500 text-sm"></i>
                            {{ modelValue.tax_id }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-1.5 shrink-0">
                <button
                    type="button"
                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition-colors shadow-sm"
                    @click="openDialog"
                >
                    <i class="pi pi-pencil text-xs"></i> შეცვლა
                </button>
                <button
                    type="button"
                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors shadow-sm"
                    @click="clear"
                >
                    <i class="pi pi-times text-xs"></i> წაშლა
                </button>
            </div>
        </div>
    </div>

    <!-- Empty state trigger -->
    <button
        v-else
        type="button"
        class="w-full flex flex-col items-center justify-center gap-1 px-4 py-4 rounded-xl border-2 border-dashed border-emerald-400 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-500 transition-colors"
        @click="openDialog"
    >
        <span class="flex items-center gap-2 font-semibold text-sm">
            <i class="pi pi-user-plus text-base"></i>
            მომხმარებლის არჩევა
        </span>
        <span class="text-xs text-emerald-600 font-normal text-center leading-snug">
            აირჩიეთ მომხმარებელი რომლის სახელითაც გსურთ შეკვეთის განხორციელება
        </span>
    </button>

    <!-- Dialog -->
    <Dialog
        v-model:visible="dialogVisible"
        modal
        header="მომხმარებლის არჩევა"
        :style="{ width: '540px' }"
        :breakpoints="{ '640px': '95vw' }"
    >
        <!-- Search -->
        <div class="mb-4">
            <IconField>
                <InputIcon class="pi pi-search" />
                <InputText
                    v-model="searchQuery"
                    class="w-full"
                    placeholder="სახელი, ტელეფონი, ელ-ფოსტა ან საიდენტიფიკაციო კოდი…"
                    @input="onSearchInput"
                />
            </IconField>
        </div>

        <!-- List -->
        <div class="mb-5">
            <p v-if="!searchQuery.trim()" class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                ბოლოს დამატებული
            </p>
            <p v-else class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                ძიების შედეგები
            </p>

            <div v-if="loadingSearch || loadingRecent" class="flex justify-center py-6">
                <i class="pi pi-spinner pi-spin text-2xl text-gray-400"></i>
            </div>

            <div v-else-if="listToShow.length" class="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
                <button
                    v-for="c in listToShow"
                    :key="c.id"
                    type="button"
                    class="flex items-center gap-3 w-full text-left rounded-xl border-2 px-3 py-2.5 transition-all"
                    :class="modelValue?.id === c.id
                        ? 'border-emerald-400 bg-emerald-50 shadow-sm'
                        : 'border-transparent bg-gray-50 hover:bg-gray-100 hover:border-gray-200'"
                    @click="selectCustomer(c)"
                >
                    <div
                        class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                        :class="modelValue?.id === c.id ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'"
                    >
                        {{ c.name?.charAt(0).toUpperCase() }}
                    </div>
                    <div class="min-w-0 flex-1">
                        <p class="text-sm font-semibold text-gray-800 truncate">{{ c.name }} {{ c.lastname }}</p>
                        <div class="flex gap-3 mt-0.5">
                            <span class="flex items-center gap-1 text-xs text-gray-400">
                                <i class="pi pi-phone text-xs"></i>
                                {{ c.local_phone || c.phone }}
                            </span>
                            <span v-if="c.tax_id" class="flex items-center gap-1 text-xs text-gray-400">
                                <i class="pi pi-id-card text-xs"></i>
                                {{ c.tax_id }}
                            </span>
                        </div>
                    </div>
                    <div
                        class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all"
                        :class="modelValue?.id === c.id ? 'bg-emerald-500' : 'bg-gray-200'"
                    >
                        <i class="pi pi-check text-white" style="font-size:0.6rem"></i>
                    </div>
                </button>
            </div>

            <p v-else class="text-sm text-gray-400 text-center py-5">
                {{ searchQuery.trim() ? 'მომხმარებელი ვერ მოიძებნა.' : 'ბოლო მომხმარებლები არ არის.' }}
            </p>
        </div>

        <Divider />

        <!-- New customer form -->
        <div>
            <button
                type="button"
                class="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 mb-4"
                @click="showNewForm = !showNewForm"
            >
                <i :class="showNewForm ? 'pi pi-minus' : 'pi pi-plus'" class="text-xs"></i>
                {{ showNewForm ? 'გაუქმება' : 'ახალი მომხმარებლის დამატება' }}
            </button>

            <div v-if="showNewForm" class="flex flex-col gap-4">
                <div class="grid grid-cols-2 gap-3">
                    <div class="flex flex-col gap-1">
                        <label class="text-xs font-medium text-gray-600">სახელი <span class="text-red-500">*</span></label>
                        <InputText v-model="form.name" class="w-full" :class="{ 'p-invalid': formErrors.name }" placeholder="სახელი" />
                        <small v-if="formErrors.name" class="text-red-500 text-xs">{{ formErrors.name[0] }}</small>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="text-xs font-medium text-gray-600">გვარი <span class="text-red-500">*</span></label>
                        <InputText v-model="form.lastname" class="w-full" :class="{ 'p-invalid': formErrors.lastname }" placeholder="გვარი" />
                        <small v-if="formErrors.lastname" class="text-red-500 text-xs">{{ formErrors.lastname[0] }}</small>
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-xs font-medium text-gray-600">მობილური <span class="text-red-500">*</span></label>
                    <InputText v-model="form.phone" class="w-full" :class="{ 'p-invalid': formErrors.phone }" placeholder="5XX XXX XXX" />
                    <small v-if="formErrors.phone" class="text-red-500 text-xs">{{ formErrors.phone[0] }}</small>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="flex flex-col gap-1">
                        <label class="text-xs font-medium text-gray-600">ელ-ფოსტა</label>
                        <InputText v-model="form.email" type="email" class="w-full" :class="{ 'p-invalid': formErrors.email }" placeholder="email@example.com" />
                        <small v-if="formErrors.email" class="text-red-500 text-xs">{{ formErrors.email[0] }}</small>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="text-xs font-medium text-gray-600">საიდენტიფიკაციო კოდი <span v-if="taxIdRequired" class="text-red-500">*</span></label>
                        <InputText v-model="form.tax_id" class="w-full" :class="{ 'p-invalid': formErrors.tax_id }" placeholder="პირადი / საიდ. კოდი" />
                        <small v-if="formErrors.tax_id" class="text-red-500 text-xs">{{ formErrors.tax_id[0] }}</small>
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-xs font-medium text-gray-600">მისამართი</label>
                    <InputText v-model="form.address" class="w-full" placeholder="ქუჩა, ქალაქი…" />
                </div>

                <Button
                    label="შენახვა და არჩევა"
                    icon="pi pi-check"
                    class="w-full bg-brand-500 border-none mt-1"
                    :loading="saving"
                    :disabled="saving"
                    @click="saveCustomer"
                />
            </div>
        </div>
    </Dialog>
</template>
