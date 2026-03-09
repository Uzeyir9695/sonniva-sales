<script setup>
defineProps({
    chips: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['remove', 'reset'])
</script>

<template>
    <div
        v-if="chips.length"
        class="flex items-center gap-2 sm:mb-4 overflow-x-auto no-scrollbar scroll-smooth"
    >
        <div
            @click="emit('reset')"
            v-tooltip.top="'გასუფთავება'"
            class="flex items-center justify-center group p-2 rounded-lg bg-slate-100 cursor-pointer shrink-0"
        >
            <i class="pi pi-trash text-sm text-gray-500 group-hover:text-red-500"></i>
        </div>

        <div class="flex flex-row-reverse gap-x-2">
            <Chip
                v-for="chip in chips"
                :key="chip.id"
                :label="chip.label"
                removable
                @remove="emit('remove', chip)"
                class="text-xs whitespace-nowrap bg-green-600/10 font-bold text-green-700 shrink-0"
                pt:removeIcon:class="text-green-700"
            />
        </div>
    </div>
</template>
