<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import LargeDeviceMegaMenu from '@/Shared/menu/LargeDeviceMegaMenu.vue';
import Navbar from '@/Shared/menu/Navbar.vue';
import SmallDeviceMegaMenu from '@/Shared/menu/SmallDeviceMegaMenu.vue';
import { usePage } from '@inertiajs/vue3';
import MegaMenuRightPanel from '@/Shared/components/MegaMenuRightPanel.vue';

const page = usePage()

const categories = page.props.categories ?? []

</script>

<template>
    <!-- Category Sidebar + Mega Menu -->
    <div class=" flex gap-x-4 mt-4">
        <LargeDeviceMegaMenu class="hidden lg:flex" :categories="categories"/>
        <div class="flex-1 rounded-lg">
            <MegaMenuRightPanel/>
        </div>
    </div>

    <div class="flex-1 ring ring-amber-400 rounded-lg h-96 items-center justify-center">

    </div>
</template>
