<template>
    <button
        type="button"
        :aria-label="isWishlisted(itemId) ? 'Remove from wishlist' : 'Add to wishlist'"
        :disabled="isLoading(itemId)"
        :class="buttonClasses"
        @click.prevent.stop="toggle(itemId)"
    >
        <i :class="['text-sm', isWishlisted(itemId) ? 'pi pi-heart-fill' : 'pi pi-heart']" />
    </button>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlist } from '@/composables/useWishlist'

const props = defineProps({
    itemId: { type: [Number, String], required: true },
    size:   { type: String, default: 'md' }, // 'sm' | 'md' | 'lg'
})

const { toggle, isWishlisted, isLoading } = useWishlist()

const buttonClasses = computed(() => [
    'relative cursor-pointer inline-flex items-center justify-center rounded-full shadow-md',
    'transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400',
    'disabled:cursor-wait disabled:opacity-60',

    { sm: 'w-7 h-7', md: 'w-8 h-8' }[props.size],

    isWishlisted(props.itemId)
        ? 'bg-red-50 border-red-300 text-red-500 hover:bg-red-100'
        : 'bg-white/80 border-gray-200 text-gray-400 hover:bg-red-50 hover:border-red-300 hover:text-red-400',
])
</script>
