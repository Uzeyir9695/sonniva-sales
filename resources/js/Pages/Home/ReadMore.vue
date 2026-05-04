<script setup>
import { Head } from '@inertiajs/vue3'
</script>

<template>
    <Head title="ჩვენს შესახებ">
        <meta name="description" content="გაიგეთ მეტი Sonniva-ს შესახებ - ავეჯის ფიტინგებისა და სამშენებლო მასალების წამყვანი მომწოდებელი საქართველოში." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sonniva" />
        <meta property="og:title" content="ჩვენს შესახებ - Sonniva" />
        <meta property="og:description" content="გაიგეთ მეტი Sonniva-ს შესახებ - ავეჯის ფიტინგებისა და სამშენებლო მასალების წამყვანი მომწოდებელი საქართველოში." />
        <meta property="og:url" :content="$page.props.ziggy.location" />
        <meta property="og:image" :content="`${$page.props.ziggy.url}/logo/logo.png`" />
    </Head>

    <div class="min-h-screen bg-white">
        Read More Page
    </div>
</template>

<style scoped>

</style>
