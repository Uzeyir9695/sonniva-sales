<script setup>
import {Link, usePage} from '@inertiajs/vue3';
import { computed } from "vue";

const page = usePage();
const user = computed(() => page.props.user);
const isAuthenticated = computed(() => page.props.isLoggedIn);

</script>

<template>
    <!--****************************************************
            Large screen devices navbar
    *****************************************************-->
    <header class="bg-sky-500 sticky top-0 flex justify-around items-center shadow-sm h-24 z-50">
        <div class="flex space-x-12 items-center">
<!--            <Link :href="route('home')" class="flex items-center h-16">-->
<!--                <img src="/logo/logo.png" alt="logo" class="w-32 h-full object-cover ">-->
<!--            </Link>-->

<!--            <div class="flex space-x-6">-->
<!--                <Link :href="route('about-us')" class="flex items-center hover:text-brand-500 h-16">-->
<!--                    {{ $t('menu.about_us') }}-->
<!--                </Link>-->
<!--                <Link :href="route('user.ordered-frames')" class="flex items-center hover:text-brand-500 h-16">-->
<!--                    {{ $t('menu.orders') }}-->
<!--                </Link>-->
<!--            </div>-->
        </div>
    </header>
</template>

<style scoped>

</style>
