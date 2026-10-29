<script setup>
import { Deferred, Head } from '@inertiajs/vue3'
import GridSkeletonLoader from '@/Shared/skeletonLoaders/GridSkeletonLoader.vue'
import ItemsGrid from '@/Shared/components/ItemsGrid.vue'

defineProps({
    items: Object,
})

const perks = [
    { icon: 'pi pi-box', key: 'liquidation.perkLimited' },
    { icon: 'pi pi-tag', key: 'liquidation.perkPrice' },
    { icon: 'pi pi-verified', key: 'liquidation.perkQuality' },
]
</script>

<template>
    <Head :title="$t('liquidation.title')">
        <meta name="description" :content="$t('liquidation.metaDescription')" />
    </Head>

    <div class="min-h-[calc(100vh-80px)] max-lg:mx-4">
        <section class="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 mt-4 px-5 py-8 sm:px-10 sm:py-14">
            <div class="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-500/30 blur-3xl"></div>
            <div class="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-brand-400/20 blur-3xl"></div>
            <i class="pi pi-box absolute right-6 top-1/2 -translate-y-1/2 text-[11rem] text-white/5 -rotate-12 max-sm:hidden"></i>

            <div class="relative max-w-2xl">
                <span class="inline-flex items-center gap-2 bg-brand-500/15 ring-1 ring-brand-400/40 text-brand-400 text-xs sm:text-sm font-semibold tracking-wider px-3 py-1 rounded-full mb-4">
                    <span class="relative flex size-2">
                        <span class="absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75 animate-ping"></span>
                        <span class="relative inline-flex size-2 rounded-full bg-brand-400"></span>
                    </span>
                    {{ $t('liquidation.badge') }}
                </span>

                <h1 class="text-3xl sm:text-5xl font-extrabold tracking-wider text-white mb-3">
                    {{ $t('liquidation.heading') }}
                </h1>
                <p class="text-white/75 text-sm sm:text-lg leading-relaxed tracking-wide mb-6">
                    {{ $t('liquidation.subheading') }}
                </p>

                <ul class="flex flex-wrap gap-2 sm:gap-3">
                    <li
                        v-for="perk in perks"
                        :key="perk.key"
                        class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium tracking-wide px-3 py-1.5 rounded-xl"
                    >
                        <i :class="perk.icon" class="text-brand-400 text-sm"></i>
                        {{ $t(perk.key) }}
                    </li>
                </ul>
            </div>
        </section>

        <div class="py-6">
            <Deferred data="items">
                <template #default>
                    <template v-if="items.data?.length">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="h-6 w-1 rounded-full bg-brand-500"></span>
                            <p class="text-sm font-semibold tracking-wide text-gray-700">
                                {{ $t('liquidation.count', { count: items.total }) }}
                            </p>
                        </div>
                        <ItemsGrid :items="items" is-sale-page />
                    </template>

                    <div v-else class="flex flex-col items-center justify-center h-72 text-center">
                        <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <i class="pi pi-box text-3xl text-gray-300"></i>
                        </div>
                        <h3 class="text-lg font-medium tracking-wide text-gray-500">{{ $t('liquidation.empty') }}</h3>
                    </div>
                </template>
                <template #fallback>
                    <GridSkeletonLoader is-sale-page />
                </template>
            </Deferred>
        </div>
    </div>
</template>
