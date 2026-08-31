<script setup>
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
    status: { type: Number, required: true },
})

const message = computed(() => ({
    404: t('error.notFound'),
    403: t('error.forbidden'),
    500: t('error.server'),
    503: t('error.maintenance'),
}[props.status] ?? t('error.unexpected')))
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-[calc(100vh-96px)] gap-6">
        <h1 class="text-6xl font-bold text-gray-800">{{ status }}</h1>
        <p class="text-lg text-gray-600">{{ message }}</p>
        <Link href="/" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">{{ $t('common.goToHome') }}</Link>
    </div>
</template>
