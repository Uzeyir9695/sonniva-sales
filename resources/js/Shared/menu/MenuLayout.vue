<script setup>
import LargeDeviceMenu from "./LargeDeviceMenu.vue";
import SmallDeviceMenu from "./SmallDeviceMenu.vue";
</script>

<template>
    <!--****************************************************
            Large screen devices navbar
        *****************************************************-->
    <large-device-menu class="hidden lg:flex"></large-device-menu>

    <!--****************************************************
        Small screen devices navbar
     ****************************************************-->
    <small-device-menu class="block lg:hidden"></small-device-menu>
</template>

<style scoped>

</style>
