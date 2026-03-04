<template>
    <Link
        :href="route('wishlist.index')"
        class="relative inline-flex items-center justify-center w-10 h-10 rounded-full
           text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors duration-200
           focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        aria-label="Wishlist"
    >
        <i :class="count > 0 ? 'pi pi-heart-fill text-red-500' : 'pi pi-heart'" class="text-xl" />

        <Transition
            enter-active-class="transition-all duration-200 origin-center"
            enter-from-class="scale-0 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition-all duration-150"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-0 opacity-0"
        >
      <span
          v-if="count > 0"
          class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1
               flex items-center justify-center rounded-full
               bg-red-500 text-white text-[10px] font-bold leading-none"
      >
        {{ count > 99 ? '99+' : count }}
      </span>
        </Transition>
    </Link>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
import { useWishlist } from '@/composables/useWishlist'

const { count } = useWishlist()
</script>
