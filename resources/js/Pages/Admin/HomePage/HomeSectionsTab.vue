<script setup>
import { router } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import HomeSectionCard from './HomeSectionCard.vue'

defineProps({
    sections: { type: Array, default: () => [] },
})

const toast = useToast()

function createSection() {
    router.post(route('admin.home-page.sections.store'), {}, {
        preserveScroll: true,
        onSuccess: (res) => toast.add({ severity: 'success', summary: 'Section created', detail: res.props.flash.message, life: 3000 }),
    })
}
</script>

<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">Sections appear on the homepage after the hero banner, in the order they were created.</p>
            <Button label="New Section" icon="pi pi-plus" @click="createSection" />
        </div>

        <p v-if="!sections.length" class="text-sm text-gray-400 italic">No sections yet.</p>

        <div class="flex flex-col-reverse gap-4">
            <HomeSectionCard v-for="(section, index) in sections" :key="section.id" :section="section" :index="index + 1" />
        </div>
    </div>
</template>