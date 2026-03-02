<script setup>
import { Deferred, Link, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import GridSkeletonLoader from '@/Shared/skeleton-loaders/GridSkeletonLoader.vue';
import Paginate from '@/Shared/components/Paginate.vue';
import QuickViewDialog from '../../Shared/components/QuickViewDialog.vue';
import ItemImageSwitcher from './ItemImageSwitcher.vue';
import debounce from 'lodash/debounce';

const props = defineProps({
    items: Object,
    attributes: Array,
})

const loading = ref(false);
const attrSearch = ref({})
const sidebarOpen = ref(false);
const quickViewItem = ref(null);
const quickViewOpen = ref(false);

const priceMin = ref(null);
const priceMax = ref(null);

const stockOptions = [
    { label: 'ყველა', value: '' },
    { label: 'მარაგშია', value: 'in' },
    { label: 'მარაგში არაა', value: 'out' },
];

const stockFilter = ref({ label: 'ყველა', value: '' });

const selected = ref(
    Object.fromEntries(props.attributes.map(attr => [attr.name, []]))
);

const buildQuery = (attrVal) => {
    const filters = Object.fromEntries(
        Object.entries(attrVal).filter(([, values]) => values.length > 0)
    );
    return {
        ...route().params,
        filters: Object.keys(filters).length ? JSON.stringify(filters) : undefined,
        price_min: priceMin.value || undefined,
        price_max: priceMax.value || undefined,
        stock: stockFilter.value?.value || undefined,
    };
};

const applyFilters = debounce((val) => {
    router.get(route(route().current(), buildQuery(val)), {}, {
        preserveState: true,
        replace: true,
        onFinish: () => loading.value = false,
    });
}, 1300);

watch(selected, (val) => {
    loading.value = true;
    applyFilters(val);
}, { deep: true });

watch([priceMin, priceMax, stockFilter], () => {
    loading.value = true;
    applyFilters(selected.value);
});

function openQuickView(item) {
    quickViewItem.value = item;
    quickViewOpen.value = true;
}

function showItemDetailsPage(item) {
    router.get(route('items.show', item.slug));
}

const resetFilters = () => {
    loading.value = true;

    // Reset attribute checkboxes
    selected.value = Object.fromEntries(
        props.attributes.map(attr => [attr.id, []])
    );

    // Reset price
    priceMin.value = null;
    priceMax.value = null;

    // Reset stock
    stockFilter.value = { label: 'ყველა', value: '' };

    // Reset attribute search inputs
    attrSearch.value = {};

    // Reload without any filters
    applyFilters({});
};
</script>

<template>
    <Head :title="decodeURIComponent(Object.values(route().params).filter(Boolean)[0] || 'Home')" />
    <div class="min-h-screen bg-[#f7f6f 3]">
        <!-- Mobile Filter Toggle Bar -->
        <div class="lg:hidden sticky top-20 z-20 bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-between shadow-sm">
            <span class="text-sm font-semibold text-gray-700 tracking-wide uppercase"></span>
            <button
                @click="sidebarOpen = !sidebarOpen"
                class="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <i class="pi pi-sliders-h text-xs"></i>
                ფილტრაცია
            </button>
        </div>

        <!-- Mobile Sidebar Overlay -->
        <Transition name="fade">
            <div
                v-if="sidebarOpen"
                class="fixed inset-0 bg-black/40 z-30 lg:hidden"
                @click="sidebarOpen = false"
            />
        </Transition>

        <div class="max-w-screen-2xl mx-auto px-4 py-6 flex gap-6 relative">

            <!-- SIDEBAR -->
            <aside
                :class="[
                    'shrink-0 w-72 bg-white border lg:rounded-2xl border-gray-100 shadow-sm overflow-y-auto transition-all duration-300',
                    'lg:sticky lg:top-6 lg:h-[830px] lg:block',
                    'fixed top-20 lg:top-24 left-0 h-full z-40 lg:relative lg:z-auto',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                ]"
                style="min-width:288px;"
            >
                <div class="lg:hidden flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <span class="font-semibold text-sm text-gray-800">ფილტრაცია</span>
                    <button @click="sidebarOpen = false" class="text-gray-400 hover:text-gray-700">
                        <i class="pi pi-times"></i>
                    </button>
                </div>

                <div class="px-5 py-5">
                    <div class="items-center justify-between mb-5 hidden lg:flex">
                        <div class="items-center gap-x-3 mb- 5 hidden lg:flex">
                            <i class="pi pi-sliders-h"></i>
                            <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">ფილტრაცია</p>
                        </div>
                        <div class="items-center gap-x-1 mb- 5 rounded-xl bg-slate-100 cursor-pointer px-2 py-1 hidden lg:flex">
                            <i class="text-sm pi pi-refresh text-gray-500"></i>
                            <button
                                @click="resetFilters"
                                class="text-xs text-gray-400 cursor-pointer hover:text-gray-900 transition-colors"
                            >
                                გასუფთავება
                            </button>
                        </div>
                    </div>

                    <!-- Price Range -->
                    <div class="mb-4 border-b border-gray-100 pb-4">
                        <p class="text-sm font-semibold text-gray-500 mb-3">ფასი</p>
                        <div class="flex items-center gap-2">
                            <InputNumber
                                v-model="priceMin"
                                placeholder="მინ."
                                :min="0"
                                :useGrouping="false"
                                fluid
                                :minFractionDigits="0" :maxFractionDigits="2"
                                showButtons
                                suffix=" ₾"
                                pt:root:class="w-full"
                                pt:pcInputText:root:class="text-sm rounded-lg border-gray-200 py-1.5 w-full"
                            />
                            <span class="text-gray-300 shrink-0">—</span>
                            <InputNumber
                                v-model="priceMax"
                                placeholder="მაქს."
                                :min="0"
                                :useGrouping="false"
                                fluid
                                :minFractionDigits="0" :maxFractionDigits="2"
                                showButtons
                                suffix=" ₾"
                                pt:root:class="w-full"
                                pt:pcInputText:root:class="text-sm rounded-lg border-gray-200 py-1.5 w-full"
                            />
                        </div>
                    </div>

                    <!-- Stock Filter -->
                    <div class="mb-4 border-b border-gray-100 pb-4">
                        <p class="text-sm font-semibold text-gray-500 mb-3">მარაგი</p>
                        <Select
                            v-model="stockFilter"
                            :options="stockOptions"
                            optionLabel="label"
                            fluid
                            pt:root:class="w-full !rounded-lg !border-gray-200"
                            pt:label:class="!text-sm !py-1.5"
                        />
                    </div>

                    <!-- Dynamic Attribute Filters -->
                    <div v-for="attr in attributes" :key="attr.id" class="mb-4 border-b border-gray-100 pb-4">
                        <Panel
                            :header="attr.name"
                            toggleable
                            :collapsed="true"
                            pt:root:class="border-none !m-0"
                            pt:header:class="text-sm font-medium text-gray-500 !p-0"
                            pt:pcTogglebutton:root:class="size-5"
                            pt:content:class="mt-3 p-0!"
                        >
                            <template #toggleicon="{ collapsed }">
                                <i :class="['pi text-xs text-gray-400', collapsed ? 'pi-chevron-down' : 'pi-chevron-up']"></i>
                            </template>

                            <div v-if="attr.values.length > 5" class="relative mb-3">
                                <input
                                    v-model="attrSearch[attr.id]"
                                    type="text"
                                    placeholder="ძებნა..."
                                    class="w-full border border-gray-200 rounded-lg text-sm px-3 py-1.5 pr-7 outline-none focus:border-gray-400 bg-gray-50"
                                />
                                <i
                                    v-if="attrSearch[attr.id]"
                                    class="pi pi-times-circle absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer text-xs"
                                    @click="attrSearch[attr.id] = ''"
                                />
                            </div>

                            <div
                                v-for="val in attr.values.filter(v =>
                                    !attrSearch[attr.id] || v.toLowerCase().includes(attrSearch[attr.id].toLowerCase())
                                )"
                                :key="val"
                                class="flex items-center gap-2.5 mb-2"
                            >
                                <Checkbox
                                    :inputId="`attr-${attr.id}-${val}`"
                                    :value="val"
                                    v-model="selected[attr.id]"
                                />
                                <label :for="`attr-${attr.id}-${val}`" class="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">{{ val }}</label>
                            </div>
                        </Panel>
                    </div>
                </div>
            </aside>

            <!-- MAIN CONTENT -->
            <div class="flex-1 min-w-0">
                <GridSkeletonLoader v-if="loading" />

                <Deferred v-else data="items">
                    <template #default>
                        <div v-if="items.data?.length > 0">
                            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-3 sm:gap-4">
                                <div
                                    v-for="(item, index) in items.data"
                                    :key="index"
                                    @click.stop="showItemDetailsPage(item)"
                                    class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                                >
                                    <ItemImageSwitcher :item="item">
                                        <div class="absolute top-2.5 left-2.5">
                                            <span
                                                v-if="!item.inventory || item.inventory === 0"
                                                class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600"
                                            >მარაგში არაა</span>
                                            <span
                                                v-else
                                                class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"
                                            >მარაგშია</span>
                                        </div>

                                        <div class="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                                            <button class="w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-rose-500 hover:shadow-lg transition-all duration-150">
                                                <i class="pi pi-heart text-xs"></i>
                                            </button>
                                            <button class="w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-indigo-500 hover:shadow-lg transition-all duration-150">
                                                <i class="pi pi-arrows-h text-xs"></i>
                                            </button>
                                            <button
                                                @click.stop="openQuickView(item)"
                                                class="w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-lg transition-all duration-150"
                                            >
                                                <i class="pi pi-eye text-xs"></i>
                                            </button>
                                        </div>
                                    </ItemImageSwitcher>

                                    <div class="p-3 sm:p-4 flex flex-col flex-1">
                                        <Link :href="route('items.show', item.slug)" class="text-sm font-medium text-gray-900 leading-snug mb-1 line-clamp-2">
                                            {{ item.name }}
                                        </Link>

                                        <div class="mt-auto pt-3 flex items-center justify-between gap-2">
                                            <span class="text-base font-semibold text-gray-900">
                                                {{ item.unit_price ? `${item.unit_price} ₾` : '—' }}
                                            </span>

                                            <button
                                                :disabled="!item.inventory || item.inventory === 0"
                                                class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-150"
                                                :class="(!item.inventory || item.inventory === 0)
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-brand-500 text-white cursor-pointer hover:bg-brand-400 active:scale-95'"
                                            >
                                                <i class="pi pi-cart-plus text-xs"></i>
                                                <span class="hidden sm:inline">Add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Paginate :data="items" class="mt-8" />
                        </div>

                        <div v-else class="flex flex-col items-center justify-center h-72 text-center">
                            <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <i class="pi pi-th-large text-3xl text-gray-300"></i>
                            </div>
                            <h3 class="text-lg font-medium text-gray-500">პროდუქტი არ მოიძებნა</h3>
                            <p class="text-sm text-gray-400 mt-1">გამოიყენეთ სხვა ფილტრაცია</p>
                        </div>
                    </template>

                    <template #fallback>
                        <GridSkeletonLoader />
                    </template>
                </Deferred>
            </div>
        </div>

        <!-- QUICK VIEW DIALOG -->
        <QuickViewDialog
            v-model:visible="quickViewOpen"
            :item="quickViewItem"
        />
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
