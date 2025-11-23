<script setup>
import {ref} from "vue";
import {Link, usePage} from '@inertiajs/vue3';
import {computed} from "vue";
import { onClickOutside } from '@vueuse/core'

let page = usePage();
const user = computed(() => page.props.user);
const isAuthenticated = computed(() => page.props.isLoggedIn);
const visible = ref(false);
const showAuth = ref(false);

const dropdownRef = ref(null)

onClickOutside(dropdownRef, () => {
    showAuth.value = false
})
</script>

<template>
    <div class="sticky top-0 z-50 shadow-sm">

    </div>
</template>

<style scoped>

</style>
