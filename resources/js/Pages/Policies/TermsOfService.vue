<script setup>
import { Head } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'

const { tm, rt, locale } = useI18n()

function list(key) {
    void locale.value
    return tm(`pol.terms.${key}`).map(rt)
}
</script>

<template>
    <Head :title="$t('pol.terms.title')" />

    <div class="max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <div class="mb-10 border-b border-gray-200 pb-6">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ $t('pol.terms.title') }}</h1>
        </div>

        <div class="space-y-10 text-gray-700 text-[15px] leading-8">

            <!-- Payment methods -->
            <section>
                <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('pol.terms.paymentH') }}</h2>
                <div class="space-y-5">
                    <div class="rounded-xl border border-gray-200 p-4">
                        <h3 class="font-semibold text-gray-800 mb-2">{{ $t('pol.terms.payCardH') }}</h3>
                        <p class="mb-3">{{ $t('pol.terms.payCardIntro') }}</p>
                        <ul class="space-y-1.5 mb-3">
                            <li v-for="c in ['VISA', 'MasterCard', 'American Express']" :key="c" class="flex items-start gap-2">
                                <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>{{ c }}
                            </li>
                        </ul>
                        <p>{{ $t('pol.terms.payCardOutro') }}</p>
                    </div>
                    <div class="rounded-xl border border-gray-200 p-4">
                        <h3 class="font-semibold text-gray-800 mb-2">{{ $t('pol.terms.payTransferH') }}</h3>
                        <p>{{ $t('pol.terms.payTransferP1') }}</p>
                        <p class="mt-2">{{ $t('pol.terms.payTransferP2') }}</p>
                    </div>
                    <div class="rounded-xl border border-gray-200 p-4">
                        <h3 class="font-semibold text-gray-800 mb-2">{{ $t('pol.terms.payContractH') }}</h3>
                        <p>{{ $t('pol.terms.payContractP') }}</p>
                    </div>
                </div>
            </section>

            <!-- Delivery -->
            <section>
                <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('pol.terms.deliveryH') }}</h2>
                <div class="space-y-5">
                    <div class="rounded-xl border border-gray-200 p-4">
                        <h3 class="font-semibold text-gray-800 mb-2">{{ $t('pol.terms.delFreeH') }}</h3>
                        <p>{{ $t('pol.terms.delFreeP') }}</p>
                    </div>
                    <div class="rounded-xl border border-gray-200 p-4">
                        <h3 class="font-semibold text-gray-800 mb-2">{{ $t('pol.terms.delRegionsH') }}</h3>
                        <p>{{ $t('pol.terms.delRegionsP') }}</p>
                    </div>

                    <div>
                        <h3 class="font-semibold text-gray-800 mb-3">{{ $t('pol.terms.delZonesH') }}</h3>
                        <div class="space-y-3">
                            <div v-for="z in [1, 2, 3]" :key="z" class="rounded-xl border border-gray-200 p-4">
                                <p class="font-semibold text-gray-800 mb-2">{{ $t(`pol.terms.zone${z}`) }}</p>
                                <ul class="space-y-1 text-sm">
                                    <li v-for="n in list(`zone${z}Items`)" :key="n" class="flex items-start gap-2">
                                        <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>{{ n }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="rounded-xl border border-gray-200 p-4">
                        <h3 class="font-semibold text-gray-800 mb-3">{{ $t('pol.terms.delAdditionalH') }}</h3>
                        <ul class="space-y-2">
                            <li v-for="(item, i) in list('delAdditionalItems')" :key="`a${i}`" class="flex items-start gap-2">
                                <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>{{ item }}
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>
                                <span>{{ $t('pol.terms.delFormulaItemPre') }} <span class="font-medium text-gray-800">{{ $t('pol.terms.delFormula') }}</span></span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>{{ $t('pol.terms.delMaxLengthItem') }}
                            </li>
                        </ul>
                        <p class="mt-4 text-sm text-gray-500">{{ $t('pol.terms.delContactNote') }}</p>
                    </div>
                </div>
            </section>

            <!-- Returns / exchange / storage / warranty -->
            <section>
                <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('pol.terms.returnsH') }}</h2>
                <div class="space-y-5">
                    <div class="rounded-xl border border-gray-200 p-4">
                        <h3 class="font-semibold text-gray-800 mb-2">{{ $t('pol.terms.warrantyH') }}</h3>
                        <p>{{ $t('pol.terms.warrantyP1') }}</p>
                        <p class="mt-2">{{ $t('pol.terms.warrantyP2') }}</p>
                        <p class="mt-3">{{ $t('pol.terms.warrantyIntro') }}</p>
                        <ul class="space-y-1.5 mt-2">
                            <li v-for="(item, i) in list('warrantyItems')" :key="`w${i}`" class="flex items-start gap-2">
                                <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>{{ item }}
                            </li>
                        </ul>
                        <p class="mt-3">{{ $t('pol.terms.warrantyOutro') }}</p>
                    </div>

                    <div class="rounded-xl border border-gray-200 p-4">
                        <h3 class="font-semibold text-gray-800 mb-2">{{ $t('pol.terms.exchangeH') }}</h3>
                        <p>{{ $t('pol.terms.exchangeIntro') }}</p>
                        <ul class="space-y-1.5 mt-2 mb-3">
                            <li v-for="(item, i) in list('exchangeItems')" :key="`e${i}`" class="flex items-start gap-2">
                                <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>{{ item }}
                            </li>
                        </ul>
                        <p>{{ $t('pol.terms.exchangeOutro') }}</p>
                    </div>

                    <div class="rounded-xl border border-gray-200 p-4">
                        <h3 class="font-semibold text-gray-800 mb-2">{{ $t('pol.terms.returnH') }}</h3>
                        <p>{{ $t('pol.terms.returnIntro') }}</p>
                        <ul class="space-y-1.5 mt-2 mb-3">
                            <li v-for="(item, i) in list('returnItems')" :key="`r${i}`" class="flex items-start gap-2">
                                <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>{{ item }}
                            </li>
                        </ul>
                        <p>{{ $t('pol.terms.returnOutro') }}</p>
                    </div>

                    <div class="rounded-xl border border-gray-200 p-4">
                        <h3 class="font-semibold text-gray-800 mb-2">{{ $t('pol.terms.storageH') }}</h3>
                        <p>{{ $t('pol.terms.storageP1') }}</p>
                        <p class="mt-3">{{ $t('pol.terms.storageIntro') }}</p>
                        <ul class="space-y-1.5 mt-2">
                            <li v-for="(item, i) in list('storageItems')" :key="`s${i}`" class="flex items-start gap-2">
                                <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>{{ item }}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

        </div>
    </div>
</template>
