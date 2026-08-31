<script setup>
const props = defineProps({
    visible: { type: Boolean, required: true },
})

const emit = defineEmits(['update:visible'])

const whatsappLink = import.meta.env.VITE_COMPANY_WHATSAPP_LINK

const confirm = () => {
    emit('update:visible', false)
    window.open(whatsappLink, '_blank', 'noopener')
}
</script>

<template>
    <Dialog :visible="visible" @update:visible="emit('update:visible', $event)" modal :style="{ width: '22rem' }">
        <template #header>
            <div class="flex items-center gap-2">
                <i class="pi pi-file-edit text-green-600"></i>
                <span class="font-semibold text-gray-800">{{ $t('whatsapp.requestOrder') }}</span>
            </div>
        </template>
        <p class="text-sm text-gray-600 leading-relaxed">
            {{ $t('whatsapp.redirectText') }}
        </p>
        <template #footer>
            <div class="flex justify-end gap-2">
                <Button :label="$t('common.cancel')" severity="secondary" text @click="emit('update:visible', false)" />
                <Button :label="$t('common.goTo')" icon="pi pi-whatsapp" class="bg-green-600! border-green-600! hover:bg-green-700!" @click="confirm" />
            </div>
        </template>
    </Dialog>
</template>
