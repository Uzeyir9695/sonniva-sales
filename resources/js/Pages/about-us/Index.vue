<script setup>
import { Head } from '@inertiajs/vue3'
</script>

<template>
    <Head :title="$t('pol.about.title')" />

    <div class="max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <div class="mb-10 border-b border-gray-200 pb-6">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ $t('pol.about.title') }}</h1>
        </div>

        <div class="space-y-6 text-gray-700 text-[15px] leading-8">
            <p v-for="n in 6" :key="n">{{ $t(`pol.about.p${n}`) }}</p>

            <div class="mt-8 pt-6 border-t border-gray-200">
                <p class="text-base font-semibold text-brand-600">{{ $t('pol.about.tagline') }}</p>
            </div>
        </div>
    </div>
</template>
