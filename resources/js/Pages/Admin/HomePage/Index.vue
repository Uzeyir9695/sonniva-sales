<script setup>
import AdminLayout from '../AdminLayout.vue'
import { ref } from 'vue'
import HeroBannersTab from './HeroBannersTab.vue'
import HomeSectionsTab from './HomeSectionsTab.vue'

defineOptions({ layout: AdminLayout });

defineProps({
    banners: { type: Object, default: () => ({}) },
    sections: { type: Array, default: () => [] },
})

const activeTab = ref('0')
</script>

<template>
    <div class="p-6 max-w-5xl mx-auto space-y-6">
        <h1 class="text-xl font-bold text-gray-800">Manage Home Page</h1>

        <Tabs v-model:value="activeTab" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <TabList>
                <Tab value="0">Hero Banners</Tab>
                <Tab value="1">Home Sections</Tab>
            </TabList>

            <TabPanels>
                <TabPanel value="0"><HeroBannersTab :banners="banners" /></TabPanel>
                <TabPanel value="1"><HomeSectionsTab :sections="sections" /></TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>