<script setup>
import { ref } from 'vue'
import AdminLayout from '../AdminLayout.vue'
import ManageItemsTab from './ManageItemsTab.vue'
import SyncCategoriesTab from './SyncCategoriesTab.vue'

defineOptions({ layout: AdminLayout })

const activeTab = ref('0')
</script>

<template>
    <div class="p-4 sm:p-6 space-y-4">
        <h1 class="text-xl font-bold text-gray-900">Manage Items</h1>

        <Tabs v-model:value="activeTab" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <TabList>
                <Tab value="0">Manage Items</Tab>
                <Tab value="1">Sync Categories</Tab>
            </TabList>

            <TabPanels>
                <TabPanel value="0">
                    <ManageItemsTab />
                </TabPanel>

                <TabPanel value="1">
                    <SyncCategoriesTab />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>