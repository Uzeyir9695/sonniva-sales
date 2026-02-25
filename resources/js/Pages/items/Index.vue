<script setup>
import { Deferred, Link, router } from '@inertiajs/vue3';
import { onMounted, ref, watch } from 'vue';
import GridSkeletonLoader from '@/Shared/skeleton-loaders/GridSkeletonLoader.vue';
import Paginate from '@/Shared/components/Paginate.vue';
import debounce from 'lodash/debounce';

const props = defineProps({
    items: Object,
    attributes: Array,
})

const loading = ref(false);

const selected = ref(
    Object.fromEntries(props.attributes.map(attr => [attr.name, []]))
);

const applyFilters = debounce((val) => {
    const filters = Object.fromEntries(
        Object.entries(val).filter(([, values]) => values.length > 0)
    );

    const query = {
        ...route().params,
        filters: Object.keys(filters).length
            ? JSON.stringify(filters)
            : undefined
    };

    router.get(route(route().current(), query), {}, {
        preserveState: true,
        replace: true,
        onFinish: () => loading.value = false,
    });
}, 1300);

watch(selected, (val) => {
    loading.value = true;
    applyFilters(val);
}, { deep: true });

</script>

<template>
        <div class="flex gap-6">
            <aside class="w-64 shrink-0">
                <div v-for="attr in attributes" :key="attr.id" class="mb-6">
                    <h4 class="font-semibold text-gray-800 mb-2">{{ attr.name }}</h4>
                    <div v-for="val in attr.values" :key="val" class="flex items-center gap-2 mb-1">
                        <Checkbox
                            :inputId="`attr-${attr.id}-${val}`"
                            :value="val"
                            v-model="selected[attr.id]"
                        />
                        <label :for="`attr-${attr.id}-${val}`" class="text-sm text-gray-600 cursor-pointer">{{ val }}</label>
                    </div>
                </div>
            </aside>


            <div class="flex-1">
                <GridSkeletonLoader v-if="loading" />
                <Deferred v-else data="items">
                    <div v-if="items.data?.length > 0" class="container mx-auto p-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div v-for="(item, index) in items?.data" :key="index" class="bg-white rounded-lg shadow p-4">
                                <h2 class="text-lg font-semibold mb-2">{{ item.name }}</h2>
                                <p class="text-gray-600 mb-4">{{ item.description }}</p>
                                <Link :href="route('items.show', item.id)" class="text-blue-500 hover:underline">View Details</Link>
                            </div>
                        </div>
                    </div>

                    <div v-else class="flex flex-col items-center justify-center h-64">
                        <i class="pi pi-th-large text-6xl text-gray-400 mb-4"></i>
                        <h3 class="text-xl text-gray-600">No items found.</h3>
                    </div>

                    <Paginate :data="items" class="mt-6"></Paginate>

                    <template #fallback>
                        <GridSkeletonLoader />
                    </template>
                </Deferred>
            </div>
        </div>
</template>

<style scoped>

</style>
