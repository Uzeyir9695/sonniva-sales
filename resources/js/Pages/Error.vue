<script setup>
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    status: { type: Number, required: true },
})

const page = computed(() => ({
    404: { title: '404', message: 'Sorry, the page you are looking for could not be found.' },
    403: { title: '403', message: 'Sorry, you are not authorized to access this page.' },
    500: { title: '500', message: 'Something went wrong on our end. Please try again later.' },
    503: { title: '503', message: 'We are down for maintenance. Please check back soon.' },
}[props.status] ?? { title: props.status, message: 'An unexpected error occurred.' }))
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-[calc(100vh-96px)] gap-6">
        <h1 class="text-6xl font-bold text-gray-800">{{ page.title }}</h1>
        <p class="text-lg text-gray-600">{{ page.message }}</p>
        <Link href="/" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Go to Home</Link>
    </div>
</template>
