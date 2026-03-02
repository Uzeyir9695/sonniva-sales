<script setup>
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    item: Object,
    isQuickView: {
        type: Boolean,
        default: false,
    },
})

const activeIndex = ref(0);

const images = computed(() => {
    if (props.item?.images?.length) return props.item.images;
    return null;
})

const imageUrl = (img) => `/storage/items/${img}`;

const displayImages = computed(() => {
    if (images.value?.length) return images.value;
    if (props.item?.image) return [props.item.image];
    return [];
})

function onMouseMove(e) {
    if (!displayImages.value || displayImages.value.length <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const zone = Math.floor((x / rect.width) * displayImages.value.length);
    activeIndex.value = Math.min(zone, displayImages.value.length - 1);
}

function onMouseLeave() {
    activeIndex.value = 0;
}

</script>

<template>
    <div
        class="relative select-none"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
    >
        <!-- Image area -->
        <div class="relative overflow-hidden aspect-square cursor-pointer">
            <template v-if="displayImages.length">
                <img
                    v-for="(img, i) in displayImages"
                    :key="i"
                    :src="imageUrl(img)"
                    :alt="item?.name"
                    class="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                    :class="i === activeIndex ? 'opacity-100' : 'opacity-0'"
                />
            </template>
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
                <i class="pi pi-image text-3xl text-gray-300"></i>
            </div>

            <!-- Slot for badges / hover actions passed from parent -->
            <slot />
        </div>

        <!-- Indicator Lines — outside overflow-hidden, below the image -->
        <div
            v-if="displayImages.length > 1"
            class="flex gap-1 px-3 pt-2 pb-1 opaci ty-0 group-hover:opacity-100 transition-opacity duration-200"
            :class="isQuickView ? 'opacity-100' : 'opacity-0'"
        >
            <div
                v-for="(_, i) in displayImages"
                :key="i"
                class="h-[3px] flex-1 rounded-full transition-all duration-150"
                :class="i === activeIndex ? 'bg-brand-300' : 'bg-gray-200'"
            />
        </div>
    </div>
</template>
