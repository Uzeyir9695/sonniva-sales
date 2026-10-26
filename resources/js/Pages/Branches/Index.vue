<script setup>
import { Head } from '@inertiajs/vue3'

const branches = [
    { address: 'pol.delivery.avchalaAddress', mapUrl: 'https://maps.app.goo.gl/3YwH55CnhUUfJoYQ9' },
    { address: 'pol.delivery.didubeAddress', mapUrl: 'https://maps.app.goo.gl/mUedJ9Jf9j1tR9nt6' },
]
</script>

<template>
    <Head :title="$t('branches.title')">
        <meta name="description" :content="$t('branches.metaDescription')" />
    </Head>

    <div class="min-h-screen bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
            <div class="text-center space-y-3">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/10 mb-2">
                    <i class="fa-solid fa-location-dot text-3xl text-brand-500"></i>
                </div>
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('branches.title') }}</h1>
                <p class="text-gray-500 text-sm max-w-md mx-auto">{{ $t('branches.subheading') }}</p>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
                <div
                    v-for="branch in branches"
                    :key="branch.address"
                    class="flex items-start gap-2 text-sm text-gray-600 bg-white rounded-xl border border-gray-200 ring-1 ring-gray-100 shadow-sm p-4"
                >
                    <i class="pi pi-map-marker text-brand-500 mt-0.5 shrink-0"></i>
                    <div class="space-y-1">
                        <p class="font-medium text-gray-800">{{ $t(branch.address) }}</p>
                        <p class="text-xs text-gray-400 mt-0.5">{{ $t('pol.delivery.hours') }}</p>
                        <a :href="branch.mapUrl" target="_blank" rel="noopener noreferrer" class="text-brand-500 underline">
                            {{ $t('pol.delivery.mapLinkText') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
