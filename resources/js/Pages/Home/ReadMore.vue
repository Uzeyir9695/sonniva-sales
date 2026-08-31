<script setup>
import { Head } from '@inertiajs/vue3'
</script>

<template>
    <Head :title="$t('seo.aboutTitle')">
        <meta name="description" :content="$t('seo.aboutDescription')" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sonniva" />
        <meta property="og:title" :content="`${$t('seo.aboutTitle')} - Sonniva`" />
        <meta property="og:description" :content="$t('seo.aboutDescription')" />
        <meta property="og:url" :content="$page.props.ziggy.location" />
        <meta property="og:image" :content="`${$page.props.ziggy.url}/logo/logo.png`" />
    </Head>

    <div class="min-h-screen bg-white">
        Read More Page
    </div>
</template>

<style scoped>

</style>
