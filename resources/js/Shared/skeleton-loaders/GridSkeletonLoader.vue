<script setup>
import Skeleton from 'primevue/skeleton';
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-5 mt-6 gap-4 sm:px-3">
        <div v-for="ad in 4" class="w-full p-2 mx-auto md:p-4 rounded-xl space-y-2">
            <div class=" w-full gap-1 shadow-xl rounded-xl overflow-hidden">
                <Skeleton class="bg-slate-200 dark:bg-slate-700"
                          height="12rem"
                          borderRadius="14px 14px 0px 0px">
                </Skeleton>
            </div>
            <Skeleton class="bg-slate-200 dark:bg-slate-700 mt-6" height="0.8rem" width="100%" borderRadius="2px"></Skeleton>
            <Skeleton class="bg-slate-200 dark:bg-slate-700" height="1.7rem" width="100%" borderRadius="4px"></Skeleton>
            <Skeleton class="bg-slate-200 dark:bg-slate-700" height="1.5rem" width="100%" borderRadius="4px"></Skeleton>
        </div>
    </div>
</template>

<style scoped>

</style>
