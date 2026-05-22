<script setup>
import { computed } from 'vue'
import { router, Deferred } from '@inertiajs/vue3'
import AdminLayout from '../AdminLayout.vue'

defineOptions({ layout: AdminLayout })

const props = defineProps({
    days:        { type: Number, default: 30 },
    configured:      { type: Boolean, default: false },
    summary:         { type: Object, default: () => ({}) },
    topPages:        { type: Array, default: () => [] },
    userTypes:       { type: Array, default: () => [] },
    topSearchTerms:  { type: Array, default: () => [] },
    topViewedItems:  { type: Array, default: () => [] },
    topSoldItems:    { type: Array, default: () => [] },
})

const periods = [
    { label: '7 days',  value: 7 },
    { label: '30 days', value: 30 },
    { label: '90 days', value: 90 },
]

function setPeriod(days) {
    router.get(route('admin.analytics.index'), { days }, { preserveState: false })
}

const totalUsers = computed(() =>
    props.userTypes.reduce((s, r) => s + (r.users ?? 0), 0)
)

const fmt = (n) => Number(n ?? 0).toLocaleString()
</script>

<template>
    <div class="p-6 space-y-6">

        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
            </div>

            <!-- Period selector -->
            <div class="flex gap-2">
                <button
                    v-for="p in periods"
                    :key="p.value"
                    @click="setPeriod(p.value)"
                    class="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                    :class="days === p.value
                        ? 'bg-brand-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'"
                >
                    {{ p.label }}
                </button>
            </div>
        </div>

        <!-- Not configured state -->
        <div v-if="!configured" class="bg-white rounded-2xl border border-amber-200 p-8 text-center">
            <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-cog text-amber-500 text-2xl"></i>
            </div>
            <h2 class="text-lg font-bold text-gray-900 mb-2">Analytics not configured</h2>
            <p class="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                To display GA4 data, complete the following steps:
            </p>
            <ol class="text-sm text-left text-gray-600 space-y-2 max-w-md mx-auto">
                <li class="flex gap-2"><span class="font-bold text-brand-500">1.</span> Create a Google Service Account and enable the <strong>Google Analytics Data API</strong></li>
                <li class="flex gap-2"><span class="font-bold text-brand-500">2.</span> Grant the service account email <strong>Analyst</strong> access in GA4 property settings</li>
                <li class="flex gap-2"><span class="font-bold text-brand-500">3.</span> Download the JSON key → place at <code class="bg-gray-100 px-1 rounded">storage/app/analytics/service-account-credentials.json</code></li>
                <li class="flex gap-2"><span class="font-bold text-brand-500">4.</span> Add <code class="bg-gray-100 px-1 rounded">ANALYTICS_PROPERTY_ID=your_numeric_id</code> to <code class="bg-gray-100 px-1 rounded">.env</code></li>
            </ol>
        </div>

        <!-- Data -->
        <template v-else>

            <!-- Summary cards -->
            <Deferred :data="['summary']">
                <template #fallback>
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div v-for="i in 4" :key="i" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
                            <div class="h-3 bg-gray-200 rounded w-24 mb-3"></div>
                            <div class="h-8 bg-gray-200 rounded w-16"></div>
                        </div>
                    </div>
                </template>

                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Active Users</p>
                        <p class="text-2xl font-bold text-gray-900">{{ fmt(summary?.activeUsers) }}</p>
                    </div>
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Page Views</p>
                        <p class="text-2xl font-bold text-gray-900">{{ fmt(summary?.screenPageViews) }}</p>
                    </div>
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Sessions</p>
                        <p class="text-2xl font-bold text-gray-900">{{ fmt(summary?.sessions) }}</p>
                    </div>
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">New Users</p>
                        <p class="text-2xl font-bold text-gray-900">{{ fmt(summary?.newUsers) }}</p>
                    </div>
                </div>
            </Deferred>

            <Deferred :data="['topPages', 'userTypes']">
                <template #fallback>
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
                            <div class="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                            <div v-for="i in 6" :key="i" class="flex items-center gap-3 px-3 py-2.5">
                                <div class="h-3 bg-gray-200 rounded w-4 shrink-0"></div>
                                <div class="flex-1 space-y-1.5">
                                    <div class="h-3 bg-gray-200 rounded w-3/4"></div>
                                    <div class="h-2.5 bg-gray-100 rounded w-1/2"></div>
                                </div>
                                <div class="h-3 bg-gray-200 rounded w-10 shrink-0"></div>
                            </div>
                        </div>
                        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
                            <div class="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                            <div v-for="i in 2" :key="i" class="mb-4">
                                <div class="flex justify-between mb-1.5">
                                    <div class="h-3 bg-gray-200 rounded w-20"></div>
                                    <div class="h-3 bg-gray-200 rounded w-10"></div>
                                </div>
                                <div class="h-2 bg-gray-100 rounded-full w-full"></div>
                            </div>
                        </div>
                    </div>
                </template>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <!-- Top pages -->
                    <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-sm font-bold text-gray-700 mb-4">Top Pages</h2>

                        <div v-if="!topPages?.length" class="text-sm text-gray-400 py-6 text-center">No data</div>

                        <div v-else class="space-y-1">
                            <div
                                v-for="(page, i) in topPages"
                                :key="i"
                                class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <span class="text-xs font-bold text-gray-300 w-5 shrink-0">{{ i + 1 }}</span>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-800 truncate">{{ page.title }}</p>
                                    <p class="text-xs text-gray-400 truncate">{{ page.url }}</p>
                                </div>
                                <div class="text-right shrink-0">
                                    <p class="text-sm font-semibold text-gray-800">{{ fmt(page.views) }}</p>
                                    <p class="text-xs text-gray-400">page views</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- User types -->
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-sm font-bold text-gray-700 mb-4">New vs Returning</h2>

                        <div v-if="!userTypes?.length" class="text-sm text-gray-400 py-6 text-center">No data</div>

                        <div v-else class="space-y-4">
                            <div v-for="(row, i) in userTypes" :key="i">
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-sm text-gray-600 capitalize">{{ row.type }}</span>
                                    <span class="text-sm font-semibold text-gray-800">{{ fmt(row.users) }}</span>
                                </div>
                                <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        class="h-full rounded-full transition-all duration-500"
                                        :class="i === 0 ? 'bg-brand-500' : 'bg-brand-200'"
                                        :style="{ width: totalUsers > 0 ? (row.users / totalUsers * 100).toFixed(1) + '%' : '0%' }"
                                    />
                                </div>
                                <p class="text-xs text-gray-400 mt-0.5">
                                    {{ totalUsers > 0 ? (row.users / totalUsers * 100).toFixed(1) : 0 }}%
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Deferred>

            <Deferred :data="['topSearchTerms', 'topViewedItems']">
                <template #fallback>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div v-for="i in 2" :key="i" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
                            <div class="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                            <div v-for="j in 5" :key="j" class="flex items-center gap-3 px-3 py-2.5">
                                <div class="h-3 bg-gray-200 rounded w-4 shrink-0"></div>
                                <div class="flex-1 h-3 bg-gray-200 rounded"></div>
                                <div class="h-3 bg-gray-200 rounded w-8 shrink-0"></div>
                            </div>
                        </div>
                    </div>
                </template>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <!-- Top search terms -->
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-sm font-bold text-gray-700 mb-4">Top Searches</h2>

                        <div v-if="!topSearchTerms?.length" class="text-sm text-gray-400 py-6 text-center">No data</div>

                        <div v-else class="space-y-1">
                            <div
                                v-for="(row, i) in topSearchTerms"
                                :key="i"
                                class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <span class="text-xs font-bold text-gray-300 w-5 shrink-0">{{ i + 1 }}</span>
                                <p class="flex-1 text-sm font-medium text-gray-800 truncate">{{ row.term }}</p>
                                <span class="text-sm font-semibold text-gray-800 shrink-0">{{ fmt(row.count) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Top viewed items -->
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-sm font-bold text-gray-700 mb-4">Most Viewed Items</h2>

                        <div v-if="!topViewedItems?.length" class="text-sm text-gray-400 py-6 text-center">No data</div>

                        <div v-else class="space-y-1">
                            <div
                                v-for="(row, i) in topViewedItems"
                                :key="i"
                                class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <span class="text-xs font-bold text-gray-300 w-5 shrink-0">{{ i + 1 }}</span>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-800 truncate">{{ row.name }}</p>
                                    <p class="text-xs text-gray-400">ID: {{ row.id }}</p>
                                </div>
                                <span class="text-sm font-semibold text-gray-800 shrink-0">{{ fmt(row.views) }}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </Deferred>

        <!-- Top sold items — always shown, no GA4 dependency -->
        <Deferred :data="['topSoldItems']">
            <template #fallback>
                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
                    <div class="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                    <div v-for="i in 8" :key="i" class="flex items-center gap-3 px-3 py-2.5">
                        <div class="h-3 bg-gray-200 rounded w-4 shrink-0"></div>
                        <div class="flex-1 space-y-1.5">
                            <div class="h-3 bg-gray-200 rounded w-2/3"></div>
                            <div class="h-2.5 bg-gray-100 rounded w-1/3"></div>
                        </div>
                        <div class="h-3 bg-gray-200 rounded w-12 shrink-0"></div>
                        <div class="h-3 bg-gray-200 rounded w-16 shrink-0"></div>
                    </div>
                </div>
            </template>

            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 class="text-sm font-bold text-gray-700 mb-4">Top Sold Items</h2>

                <div v-if="!topSoldItems?.length" class="text-sm text-gray-400 py-6 text-center">No sales data yet</div>

                <div v-else>
                    <div class="grid grid-cols-[1.5rem_1fr_6rem_7rem] text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">
                        <span>#</span>
                        <span>Item</span>
                        <span class="text-right">Units Sold</span>
                        <span class="text-right">Revenue</span>
                    </div>
                    <div
                        v-for="(row, i) in topSoldItems"
                        :key="i"
                        class="grid grid-cols-[1.5rem_1fr_6rem_7rem] items-center px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <span class="text-xs font-bold text-gray-300">{{ i + 1 }}</span>
                        <div class="min-w-0">
                            <p class="text-sm font-medium text-gray-800 truncate">{{ row.name }}</p>
                            <p class="text-xs text-gray-400">{{ row.no }}</p>
                        </div>
                        <p class="text-sm font-semibold text-gray-800 text-right">{{ fmt(row.total_sold) }}</p>
                        <p class="text-sm font-semibold text-gray-800 text-right">{{ fmt(row.total_revenue) }} ₾</p>
                    </div>
                </div>
            </div>
        </Deferred>

        </template>
    </div>
</template>
