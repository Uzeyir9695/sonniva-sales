<script setup>
import { Link } from '@inertiajs/vue3';

defineProps([
    'breadcrumbs'
])
</script>

<template>
    <div class="bg-white text-sm text-gray-500 sticky top-20 flex items-center text-nowrap overflow-x-auto sm:rounded-xl sm:mt-4 max-sm:px-3 px-5 py-3 shadow-xs no-scrollbar scroll-smooth z-20">
        <template v-for="(crumb, i) in breadcrumbs" :key="i">
            <template v-if="i < breadcrumbs.length - 1">
                <Link
                    :href="route('items.index', breadcrumbs.slice(0, i + 1).map(c => c.slug))"
                    class=""
                >
                    {{ crumb.label }}
                </Link>
            </template>

            <template v-else>
                    <span class="text-gray-400 cursor-not-allowed">
                        {{ crumb.label }}
                    </span>
            </template>

            <i v-if="i < breadcrumbs.length - 1" class="pi pi-chevron-right text-xs mx-1"></i>
        </template>
    </div>
</template>

<style scoped>

</style>
