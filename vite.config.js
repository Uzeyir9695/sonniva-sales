import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import inertia from '@inertiajs/vite';
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';
import path from 'path';

export default defineConfig(({ isSsrBuild }) => ({
    define: {
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
        __VUE_I18N_FULL_INSTALL__: 'true',
        __VUE_I18N_LEGACY_API__: 'false',
        __INTLIFY_PROD_DEVTOOLS__: 'false',
        __INTLIFY_JIT_COMPILATION__: 'true',
        __INTLIFY_DROP_MESSAGE_COMPILER__: 'false',
        // Vite leaves process.env.NODE_ENV unreplaced in SSR builds, so bundled deps
        // keep dev branches (vue-i18n's devtools plugin leaks per-render and OOMs the worker).
        ...(isSsrBuild ? { 'process.env.NODE_ENV': JSON.stringify('production') } : {}),
    },
    plugins: [
        laravel({
            input: ['resources/js/app.js',
                'resources/css/app.css',
            ],
            refresh: true,
        }),
        inertia(),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        Components({
            resolvers: [
                PrimeVueResolver()
            ]
        }),

        tailwindcss(),
    ],
    ssr: {
        noExternal: ['primevue', 'vue-i18n', /^@intlify\//],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            'ziggy-js': path.resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    optimizeDeps: {
        include: ['vue', '@inertiajs/vue3', 'primevue'],
    },
}));
