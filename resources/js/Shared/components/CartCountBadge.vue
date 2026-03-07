<script setup>
import { useCart } from '@/composables/useCart.js';

const { isInCart, getQuantity } = useCart()

const props = defineProps({
    item: {
        type: Object,
    }
})

</script>

<template>
  <span
      v-if="isInCart(item.id)"
      class="absolute -top-1.5 -right-1.5 min-w-4 h-4
               flex items-center justify-center rounded-full
               bg-white text-brand-500 text-[10px] font-bold leading-none
               ring-2 ring-brand-500 z-1"
  >
                {{ getQuantity(item.id) > 99 ? '99+' : getQuantity(item.id) }}
            </span>
</template>

<style scoped>

</style>
