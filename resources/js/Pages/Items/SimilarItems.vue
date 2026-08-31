<script setup>

import SwiperCarousel from '@/Shared/components/SwiperCarousel.vue';

defineProps({
    items: Array,
});

</script>

<template>
    <SwiperCarousel :items="items" :title="$t('item.similarProducts')" />
</template>

<style>

</style>
