<script setup>
import { Link } from '@inertiajs/vue3'

defineProps({
    provider: { type: String, default: null },
})
</script>

<template>
    <div class="min-h-[calc(100vh-96px)] bg-gray-50 flex items-center justify-center p-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">

            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="pi pi-times text-red-500 text-2xl"></i>
            </div>

            <h1 class="text-xl font-bold text-gray-900 mb-2">გადახდა უარყოფილია</h1>

            <p class="text-sm text-gray-400 mb-8">
                გადახდა ვერ განხორციელდა. სცადეთ თავიდან ან აირჩიეთ სხვა მეთოდი.
            </p>

            <div class="space-y-3">
                <Link
                    :href="route('checkout.index')"
                    class="block w-full bg-brand-500 hover:bg-brand-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                    თავიდან ცდა
                </Link>
                <Link
                    :href="route('home')"
                    class="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                    მთავარზე დაბრუნება
                </Link>
            </div>
        </div>
    </div>
</template>
