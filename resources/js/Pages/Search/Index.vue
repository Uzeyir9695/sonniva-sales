<script setup>
import { Deferred, Head, router } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import debounce from 'lodash/debounce';
import GridSkeletonLoader from '@/Shared/skeletonLoaders/GridSkeletonLoader.vue';
import ItemsGrid from '@/Shared/components/ItemsGrid.vue';

const props = defineProps({
    query: String,
    items: Object,
});

const loading = ref(false);

const stockOptions = [
    { label: 'ყველა', value: '' },
    { label: 'მარაგშია', value: 'in' },
    { label: 'მარაგში არაა', value: 'out' },
];

const params = route().params;

const priceMin = ref(params.price_min ? Number(params.price_min) : null);
const priceMax = ref(params.price_max ? Number(params.price_max) : null);
const stockFilter = ref(stockOptions.find(o => o.value === (params.stock ?? '')) ?? stockOptions[0]);
const sidebarOpen = ref(false);

const activeChips = computed(() => {
    const chips = [];
    if (priceMin.value || priceMax.value) {
        chips.push({ id: 'price', type: 'price', label: `${priceMin.value || 0} – ${priceMax.value || '∞'} ₾` });
    }
    if (stockFilter.value?.value) {
        chips.push({ id: 'stock', type: 'stock', value: stockFilter.value.value, label: stockFilter.value.label });
    }
    return chips;
});

const applyFilters = debounce(() => {
    sidebarOpen.value = false;

    router.get(route('search.index'), {
        q: props.query,
        price_min: priceMin.value || undefined,
        price_max: priceMax.value || undefined,
        stock: stockFilter.value?.value || undefined,
    }, {
        preserveState: true,
        replace: true,
        onFinish: () => loading.value = false,
    });
}, 1300);

watch([priceMin, priceMax, stockFilter], () => {
    loading.value = true;
    applyFilters();
});

function resetFilters() {
    loading.value = true;
    priceMin.value = null;
    priceMax.value = null;
    stockFilter.value = stockOptions[0];
    applyFilters();
}

function removeChip(chip) {
    loading.value = true;
    if (chip.type === 'price') {
        priceMin.value = null;
        priceMax.value = null;
    } else if (chip.type === 'stock') {
        stockFilter.value = stockOptions[0];
    }
}
</script>

<template>
    <Head :title="`ძიება: ${query}`">
        <meta name="robots" content="noindex, nofollow" />
    </Head>

    <div class="min-h-[calc(100vh-80px)]">

        <!-- Top bar -->
        <div class="bg-white flex items-center justify-between sticky top-20 z-20 sm:mt-4 sm:rounded-xl shadow-xs px-4 sm:px-5 py-3">
            <div class="flex items-center gap-2 min-w-0">
                <i class="pi pi-search text-brand-400 shrink-0 text-sm"></i>
                <span v-if="items?.total !== undefined" class="text-xs text-gray-400 shrink-0 ml-1">
                    მოიძებნა {{ items.total }} პროდუქტი
                </span>
            </div>
            <button
                @click="sidebarOpen = !sidebarOpen"
                class="cursor-pointer lg:hidden flex items-center gap-2 font-medium text-gray-700 self-stretch pl-3 hover:text-brand-500 transition-colors shrink-0"
            >
                <i class="pi pi-sliders-h text-md"></i>
            </button>
        </div>

        <!-- Mobile active chips -->
        <div v-if="activeChips.length > 0" class="sm:hidden sticky top-28 z-20 bg-white border-b border-gray-100 px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <button @click="resetFilters" class="text-gray-400 hover:text-red-400 transition-colors shrink-0">
                <i class="pi pi-trash text-xs"></i>
            </button>
            <div class="flex gap-1.5 overflow-x-auto">
                <span
                    v-for="chip in activeChips"
                    :key="chip.id"
                    class="flex items-center gap-1 bg-brand-50 text-brand-600 text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
                >
                    {{ chip.label }}
                    <i class="pi pi-times text-[9px] cursor-pointer hover:text-brand-800" @click="removeChip(chip)"></i>
                </span>
            </div>
        </div>

        <!-- Mobile sidebar overlay -->
        <Transition name="fade">
            <div
                v-if="sidebarOpen"
                class="fixed inset-0 bg-black/40 z-30 lg:hidden"
                @click="sidebarOpen = false"
            />
        </Transition>

        <div class="max-w-screen-2xl max-sm:mx-3 py-6 flex gap-6 relative">

            <!-- SIDEBAR -->
            <div
                class="max-lg:bg-white shrink-0 w-72 max-lg:pt-2 lg:block lg:sticky top-20 fixed left-0 h-full
                       max-h-[calc(100vh-80px)] lg:max-h-[690px]
                       overflow-x-hidden overflow-y-auto transition-all duration-300 z-40 lg:z-auto"
                :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
            >
                <button @click="sidebarOpen = false" class="flex items-center ml-auto mr-2 mb-2 text-gray-400 hover:text-gray-700 lg:hidden">
                    <i class="pi pi-times"></i>
                </button>

                <aside class="bg-white min-w-[288px] border lg:rounded-2xl border-gray-100">
                    <div class="px-5 py-6">
                        <!-- Filter header -->
                        <div class="flex items-center justify-between mb-5">
                            <div class="flex items-center gap-x-1.5">
                                <i class="pi pi-sliders-h"></i>
                                <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">ფილტრი</p>
                            </div>
                            <div v-if="activeChips.length > 0" class="flex items-center gap-x-1 rounded-xl bg-slate-100 cursor-pointer px-2 py-1">
                                <i class="text-sm pi pi-refresh text-gray-500"></i>
                                <button @click="resetFilters" class="text-xs text-gray-400 cursor-pointer hover:text-gray-900 transition-colors">
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
                                    @input="(e) => priceMin = e.value"
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
                                    @input="(e) => priceMax = e.value"
                                />
                            </div>
                        </div>

                        <!-- Stock Filter -->
                        <div>
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
                    </div>
                </aside>
            </div>

            <!-- MAIN CONTENT -->
            <div class="flex-1 min-w-0">

                <!-- Desktop active chips -->
                <div v-if="activeChips.length > 0" class="max-sm:hidden flex items-center gap-2 mb-4 overflow-x-auto">
                    <button @click="resetFilters" class="text-gray-400 hover:text-red-400 transition-colors shrink-0">
                        <i class="pi pi-trash text-sm"></i>
                    </button>
                    <span
                        v-for="chip in activeChips"
                        :key="chip.id"
                        class="flex items-center gap-1.5 bg-brand-50 text-brand-600 text-xs font-medium px-3 py-1.5 rounded-full shrink-0"
                    >
                        {{ chip.label }}
                        <i class="pi pi-times text-[9px] cursor-pointer hover:text-brand-800" @click="removeChip(chip)"></i>
                    </span>
                </div>

                <Deferred data="items">
                    <template #default="{ reloading }">
                        <GridSkeletonLoader v-if="loading || reloading" />
                        <ItemsGrid v-else :items="items" />
                    </template>
                    <template #fallback>
                        <GridSkeletonLoader />
                    </template>
                </Deferred>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
