<script setup>
import { Link } from '@inertiajs/vue3'
import { useCart } from '@/composables/useCart'

const { count } = useCart()
</script>

<template>
    <Link
        :href="route('cart.index')"
        class="relative flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full
               text-gray-600 hover:bg-gray-100 transition-all"
        aria-label="Cart"
    >
        <i class="pi pi-shopping-cart text-xl"></i>

        <Transition
            enter-active-class="transition-all duration-200 origin-center"
            enter-from-class="scale-0 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition-all duration-150 origin-center"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-0 opacity-0"
        >
            <span
                v-if="count > 0"
                class="absolute top-1 right-1 min-w-4 h-4 px-1
                       flex items-center justify-center rounded-full
                       bg-brand-500 text-white text-[10px] font-bold leading-none"
            >
                {{ count > 99 ? '99+' : count }}
            </span>
        </Transition>
    </Link>
</template>
