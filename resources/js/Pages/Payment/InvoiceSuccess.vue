<template>
    <div class="flex items-center justify-center p-6">
        <div class="bg-white rounded-xl shadow-xl p-10 max-w-lg w-full text-center">

            <!-- Success Icon -->
            <div class="mb-6">
                <div class="w-14 lg:w-18 h-14 lg:h-18 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 lg:w-10 h-8 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
                <h1 class="text-xl lg:text-2xl font-extrabold text-gray-900">ინვოისი გაგზავნილია</h1>
                <p class="mt-2 text-gray-600">ინვოისი გაიგზავნა თქვენს ელ-ფოსტაზე</p>
            </div>

            <!-- Invoice Number -->
            <div class="my-6">
                <p class="text-sm text-gray-500">ინვოისის ნომერი</p>
                <p class="text-lg font-semibold text-gray-900">{{ invoiceNumber }}</p>
            </div>

            <!-- Optional Information -->
            <div class="mb-6 text-gray-600 text-sm">
                <p>შეამოწმეთ ელ-ფოსტა PDF ინვოისისთვის</p>
                <p class="mt-1">თუ წერილი არ მოგივიდათ, შეამოწმეთ სპამის საქაღალდე</p>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-3">
                <Link :href="route('home')" class="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition">
                    მთავარ გვერდზე დაბრუნება
                </Link>
            </div>

        </div>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
defineProps({
    invoiceNumber: {
        type: String,
        required: true,
    },
});
</script>
