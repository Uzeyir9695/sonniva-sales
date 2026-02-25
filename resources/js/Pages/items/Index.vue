<script setup>
import { Deferred, Link } from '@inertiajs/vue3';
import { onMounted } from 'vue';
import GridSkeletonLoader from '@/Shared/skeleton-loaders/GridSkeletonLoader.vue';
import Paginate from '@/Shared/components/Paginate.vue';

const props = defineProps({
    items: Object,
})

onMounted(() => {
    console.log(props.items?.data);
})
</script>

<template>
    <Deferred data="items">
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
</template>

<style scoped>

</style>
