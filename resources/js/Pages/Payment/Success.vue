<script setup>
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    invoiceNumber: { type: String, default: null },
})
</script>

<template>
    <div class="min-h-[calc(100vh-96px)] bg-gray-50 flex items-center justify-center p-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">

            <div class="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="pi pi-check text-white text-2xl"></i>
            </div>

            <h1 class="text-xl font-bold text-gray-900 mb-2">გადახდა წარმატებით შესრულდა</h1>

            <p v-if="invoiceNumber" class="text-sm text-gray-500 mb-1">
                შეკვეთის ნომერი
            </p>
            <p v-if="invoiceNumber" class="text-lg font-bold text-brand-500 mb-6">
                #{{ invoiceNumber }}
            </p>

            <p class="text-sm text-gray-400 mb-8">
                დადასტურების წერილი გამოგზავნილია თქვენს ელ-ფოსტაზე.
            </p>

            <div class="space-y-3">
                <Link
                    :href="route('home')"
                    class="block w-full bg-brand-500 hover:bg-brand-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                    მთავარზე დაბრუნება
                </Link>
            </div>
        </div>
    </div>
</template>
