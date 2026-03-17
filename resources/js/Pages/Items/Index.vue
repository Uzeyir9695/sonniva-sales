<script setup>
import { Deferred, Link, router } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import GridSkeletonLoader from '@/Shared/skeletonLoaders/GridSkeletonLoader.vue';
import debounce from 'lodash/debounce';
import ActiveFilterChips from '@/Pages/Items/ActiveFilterChips.vue';
import ItemsGrid from '@/Shared/components/ItemsGrid.vue';
import Breadcrumbs from '@/Shared/components/Breadcrumbs.vue';

const props = defineProps({
    items: Object,
    attributes: Array,
    breadcrumbs: Array,
    relatedCategories: Array,
    relatedCategoriesParent: Object,
    currentCategorySlug: String,
})

const loading = ref(false);
const attrSearch = ref({})
const sidebarOpen = ref(false);

const priceMin = ref(null);
const priceMax = ref(null);

const stockOptions = [
    { label: 'ყველა', value: '' },
    { label: 'მარაგშია', value: 'in' },
    { label: 'მარაგში არაა', value: 'out' },
];

const stockFilter = ref({ label: 'ყველა', value: '' });

const selected = ref(
    Object.fromEntries((props.attributes ?? []).map(attr => [attr.name, []]))
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

const resetFilters = () => {
    loading.value = true;

    // Reset attribute checkboxes
    selected.value = Object.fromEntries(
        (props.attributes ?? []).map(attr => [attr.id, []])
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

const activeChips = computed(() => {
    const chips = []

    // Price first
    if (priceMin.value || priceMax.value) {
        chips.push({
            id: 'price',                  // unique id
            type: 'price',
            label: `${priceMin.value || 0} - ${priceMax.value || '∞'} ₾`
        })
    }

    // Stock
    if (stockFilter.value?.value) {
        chips.push({
            id: 'stock',                  // unique id
            type: 'stock',
            value: stockFilter.value.value,
            label: stockFilter.value.label
        })
    }

    // Attributes
    Object.entries(selected.value).forEach(([attrId, values]) => {
        values.forEach(val => {
            chips.push({
                id: `attr-${attrId}-${val}`, // unique id
                type: 'attribute',
                attrId,
                value: val,
                label: val
            })
        })
    })

    return chips
})

function removeChip(chip) {
    loading.value = true

    switch(chip.type) {
        case 'attribute':
            selected.value[chip.attrId] = selected.value[chip.attrId].filter(v => v !== chip.value)
            break
        case 'price':
            priceMin.value = null
            priceMax.value = null
            break
        case 'stock':
            stockFilter.value = { label: 'ყველა', value: '' }
            break
    }
}
</script>

<template>
    <Head :title="decodeURIComponent(Object.values(route().params).filter(Boolean)[0] || 'Home')" />


    <div class="min-h-[calc(100vh-80px)] bg-[#f7f6f 3]">

        <!-- ================= BREADCRUMBS ================= -->
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>

        <!-- Mobile Filter Toggle Bar -->
        <div class="lg:hidden sticky top-28 z-20 bg-white border-b border-gray-100 px-2 py-1 flex items-center gap-2 shadow-sm"
             :class="activeChips?.length > 0 ? ' justify-between' : 'justify-end'"
        >
            <ActiveFilterChips
                :chips="activeChips"
                @remove="removeChip"
                @reset="resetFilters"
                class="sm:hidden"
            />
            <button
                @click="sidebarOpen = !sidebarOpen"
                class="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <i class="pi pi-sliders-h text-xs"></i>
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

        <div class="max-w-screen-2xl max-sm:mx-3 py-6 flex gap-6 relative">
            <!-- SIDEBAR -->
            <div class="shrink-0 w-72 max-sm:pt-3 lg:block lg:sticky top-20 lg:top-32 fixed left-0 h-full space-y-5
                     max-h-[calc(100vh-80px)] lg:max-h-[690px]
                     overflow-x-hidden overflow-y-auto transition-all duration-300 z-40 lg:z-auto
                    "
                 :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
            >

                <!-- Related Categories -->
                <div v-if="relatedCategories?.length" class="bg-white max-sm:mx-2 border rounded-xl shadow-xs border-gray-100 px-5 py-3">
                    <Panel
                        toggleable
                        :collapsed="true"
                    >
                        <template #header>
                            <span class="text-sm font-bold text-gray-500">კატეგორიები</span>
                        </template>
                        <template #toggleicon="{ collapsed }">
                            <i :class="['pi text-xs text-gray-400', collapsed ? 'pi-chevron-down' : 'pi-chevron-up']"></i>
                        </template>

                        <!-- Parent / "View all" link -->
                        <Link
                            v-if="relatedCategoriesParent"
                            :href="route('items.index', [relatedCategoriesParent.slug])"
                            class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-brand-500 hover:bg-brand-50 transition-colors mb-1"
                        >
                            <i class="pi pi-th-large text-xs"></i>
                            {{ relatedCategoriesParent.name }}
                        </Link>

                        <!-- Category links -->
                        <Link
                            v-for="cat in relatedCategories"
                            :key="cat.slug"
                            :href="route('items.index', [cat.slug])"
                            class="flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors"
                            :class="cat.slug === currentCategorySlug
                            ? 'bg-brand-50 text-brand-500 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
                        >
                            <span>{{ cat.name }}</span>
                            <i v-if="cat.slug === currentCategorySlug" class="pi pi-check text-xs text-brand-400"></i>
                        </Link>
                    </Panel>
                </div>

                <aside
                    class="bg-white min-w-[288px] border lg:rounded-2xl border-gray-100 shadow-xs"
                >
                    <div class="px-5 py-6">
                        <!-- Filter Reset -->
                        <div class="items-center mt-2 justify-between mb-5 flex">
                            <div class="items-center gap-x-1.5 flex">
                                <i class="pi pi-sliders-h"></i>
                                <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">ფილტრი</p>
                            </div>
                            <div class="items-center gap-x-1 rounded-xl bg-slate-100 cursor-pointer px-2 py-1 flex">
                                <i class="text-sm pi pi-refresh text-gray-500"></i>
                                <button
                                    @click="resetFilters"
                                    class="text-xs text-gray-400 cursor-pointer hover:text-gray-900 transition-colors"
                                >
                                    გასუფთავება
                                </button>
                            </div>
                            <button @click="sidebarOpen = false" class="text-gray-400 hover:text-gray-700 sm:hidden">
                                <i class="pi pi-times"></i>
                            </button>
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
            </div>

            <!-- MAIN CONTENT -->
            <div class="flex-1 min-w-0">

                <ActiveFilterChips
                    :chips="activeChips"
                    @remove="removeChip"
                    @reset="resetFilters"
                    class="max-sm:hidden"
                />

                <GridSkeletonLoader v-if="loading" />

                <Deferred v-else data="items">
                    <template #default>
                        <ItemsGrid :items="items" />
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

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
