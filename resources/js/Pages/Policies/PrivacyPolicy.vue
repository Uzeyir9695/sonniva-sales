<script setup>
import { computed } from 'vue'
import { Head } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'

const { tm, rt, locale } = useI18n()

const sections = computed(() => {
    void locale.value
    return tm('pol.privacy.sections').map((s) => ({
        h: rt(s.h),
        body: (s.body ?? []).map(rt),
        intro: s.intro ? rt(s.intro) : null,
        items: (s.items ?? []).map(rt),
        outro: s.outro ? rt(s.outro) : null,
    }))
})
</script>

<template>
    <Head :title="$t('pol.privacy.title')" />

    <div class="max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <div class="mb-10 border-b border-gray-200 pb-6">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ $t('pol.privacy.title') }}</h1>
        </div>

        <div class="space-y-8 text-gray-700 text-[15px] leading-8">
            <section v-for="(s, i) in sections" :key="i">
                <h2 class="text-lg font-semibold text-gray-900 mb-3">{{ s.h }}</h2>

                <p v-for="(p, j) in s.body" :key="`b${j}`" :class="{ 'mt-3': j > 0 }">{{ p }}</p>

                <p v-if="s.intro" class="mb-3" :class="{ 'mb-4': i === sections.length - 1 }">{{ s.intro }}</p>

                <div v-if="i === sections.length - 1" class="rounded-xl border border-gray-200 p-4 space-y-1.5 text-sm">
                    <p class="font-semibold text-gray-800">{{ $t('pol.privacy.contactCompany') }}</p>
                    <p>{{ $t('pol.privacy.contactEmailLabel') }} <a href="mailto:eshop@sonniva.ge" class="text-brand-600 hover:underline">eshop@sonniva.ge</a></p>
                    <p>{{ $t('pol.privacy.contactWebLabel') }} <a href="https://www.sonniva.ge" class="text-brand-600 hover:underline">www.sonniva.ge</a></p>
                </div>

                <ul v-if="s.items.length" class="space-y-1.5" :class="{ 'mb-3': s.outro }">
                    <li v-for="(li, k) in s.items" :key="`i${k}`" class="flex items-start gap-2">
                        <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>{{ li }}
                    </li>
                </ul>

                <p v-if="s.outro" :class="{ 'mt-4': i === sections.length - 1 }">{{ s.outro }}</p>
            </section>
        </div>
    </div>
</template>
