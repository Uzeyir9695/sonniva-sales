<script setup>
import { Head } from '@inertiajs/vue3'

const GOOGLE_PRIVACY_URL = 'https://policies.google.com/privacy'
const GA_OPT_OUT_URL = 'https://tools.google.com/dlpage/gaoptout'
</script>

<template>
    <Head :title="$t('pol.cookie.title')" />

    <div class="max-w-3xl mx-auto py-12 px-6 text-gray-800">
        <h1 class="text-3xl font-bold mb-6">{{ $t('pol.cookie.title') }}</h1>
        <p class="text-sm text-gray-500 mb-6">{{ $t('pol.cookie.lastUpdated') }}</p>

        <p class="mb-4">{{ $t('pol.cookie.intro') }}</p>

        <h2 class="text-xl font-semibold mt-8 mb-3">{{ $t('pol.cookie.whatH') }}</h2>
        <p class="mb-4">{{ $t('pol.cookie.whatP') }}</p>

        <h2 class="text-xl font-semibold mt-8 mb-3">{{ $t('pol.cookie.useH') }}</h2>

        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">

            <div>
                <h3 class="font-semibold">{{ $t('pol.cookie.c1h') }}</h3>
                <p class="text-gray-700">{{ $t('pol.cookie.c1p') }}</p>
                <ul class="list-disc ml-6 mt-2 text-gray-700">
                    <li>{{ $t('pol.cookie.c1i1') }}</li>
                    <li>{{ $t('pol.cookie.c1i2') }}</li>
                </ul>
            </div>

            <div>
                <h3 class="font-semibold">{{ $t('pol.cookie.c2h') }}</h3>
                <p class="text-gray-700">{{ $t('pol.cookie.c2p1') }}</p>
                <i18n-t keypath="pol.cookie.c2p2" tag="p" class="mt-2 text-gray-700">
                    <template #strong><strong>{{ $t('pol.cookie.c2p2strong') }}</strong></template>
                    <template #link>
                        <a :href="GOOGLE_PRIVACY_URL" class="text-blue-600 underline" target="_blank" rel="noopener">{{ $t('pol.cookie.googlePrivacyDat') }}</a>
                    </template>
                </i18n-t>
            </div>

            <div>
                <h3 class="font-semibold">{{ $t('pol.cookie.c3h') }}</h3>
                <p class="text-gray-700">{{ $t('pol.cookie.c3p1') }}</p>
                <table class="w-full mt-2 text-sm text-gray-700 border border-gray-200 rounded">
                    <thead class="bg-gray-100">
                    <tr>
                        <th class="text-left px-3 py-2">{{ $t('pol.cookie.thCookie') }}</th>
                        <th class="text-left px-3 py-2">{{ $t('pol.cookie.thPurpose') }}</th>
                        <th class="text-left px-3 py-2">{{ $t('pol.cookie.thExpiry') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="border-t border-gray-200">
                        <td class="px-3 py-2 font-mono">_GRECAPTCHA</td>
                        <td class="px-3 py-2">{{ $t('pol.cookie.grecaptchaPurpose') }}</td>
                        <td class="px-3 py-2">{{ $t('pol.cookie.sixMonths') }}</td>
                    </tr>
                    </tbody>
                </table>
                <i18n-t keypath="pol.cookie.c3p2" tag="p" class="mt-3 text-gray-700">
                    <template #link>
                        <a :href="GOOGLE_PRIVACY_URL" class="text-blue-600 underline" target="_blank" rel="noopener">{{ $t('pol.cookie.googlePrivacyDat') }}</a>
                    </template>
                </i18n-t>
            </div>

            <div>
                <h3 class="font-semibold">{{ $t('pol.cookie.c4h') }}</h3>
                <p class="text-gray-700">{{ $t('pol.cookie.c4p1') }}</p>
                <p class="mt-2 text-gray-700">{{ $t('pol.cookie.c4p2') }}</p>
                <table class="w-full mt-2 text-sm text-gray-700 border border-gray-200 rounded">
                    <thead class="bg-gray-100">
                    <tr>
                        <th class="text-left px-3 py-2">{{ $t('pol.cookie.thCookie') }}</th>
                        <th class="text-left px-3 py-2">{{ $t('pol.cookie.thPurpose') }}</th>
                        <th class="text-left px-3 py-2">{{ $t('pol.cookie.thExpiry') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="border-t border-gray-200">
                        <td class="px-3 py-2 font-mono">_ga</td>
                        <td class="px-3 py-2">{{ $t('pol.cookie.gaPurpose') }}</td>
                        <td class="px-3 py-2">{{ $t('pol.cookie.twoYears') }}</td>
                    </tr>
                    <tr class="border-t border-gray-200">
                        <td class="px-3 py-2 font-mono">_gid</td>
                        <td class="px-3 py-2">{{ $t('pol.cookie.gaPurpose') }}</td>
                        <td class="px-3 py-2">{{ $t('pol.cookie.twentyFourHours') }}</td>
                    </tr>
                    <tr class="border-t border-gray-200">
                        <td class="px-3 py-2 font-mono">_ga_*</td>
                        <td class="px-3 py-2">{{ $t('pol.cookie.gaSessionPurpose') }}</td>
                        <td class="px-3 py-2">{{ $t('pol.cookie.twoYears') }}</td>
                    </tr>
                    </tbody>
                </table>
                <i18n-t keypath="pol.cookie.c4p3" tag="p" class="mt-3 text-gray-700">
                    <template #link>
                        <a :href="GOOGLE_PRIVACY_URL" class="text-blue-600 underline" target="_blank" rel="noopener">{{ $t('pol.cookie.googlePrivacyNom') }}</a>
                    </template>
                    <template #link2>
                        <a :href="GA_OPT_OUT_URL" class="text-blue-600 underline" target="_blank" rel="noopener">{{ $t('pol.cookie.gaOptOut') }}</a>
                    </template>
                </i18n-t>
            </div>
        </div>

        <h2 class="text-xl font-semibold mt-8 mb-3">{{ $t('pol.cookie.manageH') }}</h2>
        <p class="mb-4">{{ $t('pol.cookie.manageP1') }}</p>
        <p class="text-gray-700">{{ $t('pol.cookie.manageP2') }}</p>
    </div>
</template>
