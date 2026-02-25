<template>
    <Paginator
        v-if="data.total > data.per_page"
        :template="{
        '640px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        '641px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown'
    }"
        :rows="data.per_page"
        :totalRecords="data.total"
        :first="(data.current_page - 1) * data.per_page"
        :rowsPerPageOptions="[10, 15, 24, 30]"
        @page="onPageChange"
    >
    </Paginator>
</template>

<script setup>
import {router} from "@inertiajs/vue3";

const { data } = defineProps({
    data: {
        type: Object,
        required: true
    },
});

const onPageChange = (event) => {
    const newPage = event.page + 1; // PrimeVue uses 0-based index, Laravel uses 1-based
    const perPage = event.rows;
    router.get(window.location.pathname, { page: newPage, per_page: perPage }, { preserveState: true });
};
</script>

<style scoped>

</style>
