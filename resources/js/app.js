import './bootstrap'
import '../css/app.css'
import {createApp, h} from 'vue'
import {createInertiaApp, router } from '@inertiajs/vue3'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { Head } from '@inertiajs/vue3'
import { ZiggyVue } from 'ziggy-js'
import Layout from "./Shared/Layout.vue"
import mitt from "mitt"
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


const emitter = mitt()
window.emitter = emitter // Make it globally accessible

// Primevue components
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import KeyFilter from 'primevue/keyfilter';
import ConfirmationService from 'primevue/confirmationservice';
import Select from 'primevue/select';
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";
import FloatLabel from "primevue/floatlabel";
import Ripple from "primevue/ripple";

const appName = import.meta.env.VITE_APP_NAME;

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#e6f4ec',
            100: '#cce9d9',
            200: '#99d4b3',
            300: '#66be8e',
            400: '#33a968',
            500: '#0b913a', // Primary color set to custom hex
            600: '#0a8234',
            700: '#086f2d',
            800: '#065c26',
            900: '#04491f',
            950: '#023617'
        },
        colorScheme: {
            light: {
                surface: {
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{slate.400}',
                    500: '{slate.500}',
                    600: '{slate.600}',
                    700: '{slate.700}',
                    800: '{slate.800}',
                    900: '{slate.900}',
                    950: '{slate.950}',
                },
                formField: {
                    background: '{slate.800}',
                    focusBorderColor: '{slate.400}',
                    placeholderColor: '{slate.400}'
                }
            }
        },
    },
});

createInertiaApp({
    progress: {
        // The delay after which the progress bar will appear, in milliseconds...
        delay: 150,

        // The color of the progress bar...
        color: 'red',

        // Whether to include the default NProgress styles...
        includeCSS: true,

        // Whether the NProgress spinner will be shown...
        showSpinner: false,
    },

    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: async name => {
        const page = await resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob("./Pages/**/*.vue"));
        page.default.layout ??= Layout;
        return page;
    },
    setup({ el, App, props, plugin }) {
        // window.Ziggy = props.initialPage.props.ziggy || {};

        const app = createApp({ render: () => h(App, props) });
        app.use(plugin);
        app.use(pinia);
        app.use(ZiggyVue);

        app.provide('emitter', emitter);

        app.component("Head", Head);
        app.component("Select", Select);
        app.component("FloatLabel", FloatLabel);

        app.directive('keyfilter', KeyFilter);
        app.directive("tooltip", Tooltip);
        app.directive("ripple", Ripple);

        app.use(ConfirmationService);
        app.use(ToastService);

        app.use(PrimeVue, {
            ripple: true,
            theme: {
                preset: MyPreset,
                options: {
                    darkModeSelector: '.my-app-dark',
                    cssLayer: {
                        name: 'primevue',
                        order: 'theme, base, primevue'
                    }
                }
            },
            pt: {
                selectbutton: {
                    pcToggleButton: {
                        root: {class: 'bg-transparent border-none max-h-12 text-sm'},
                        content: ({context}) => ({
                            class: context.active
                                ? 'bg-brand-500 border border-brand-300 text-white font-semibold rounded-md px-6 py-2'
                                : 'bg-transparent border border-slate-300 font-semibold rounded-md px-6 py-2'
                        })
                    }
                },
                select: {
                    listContainer: {class: 'text-sm'},
                },
                toast: {
                    root: () => ({
                        class: `!fixed max-sm:!bottom-14 sm:!right-4 !right-0 max-sm:!w-full px-4 pointer-events-none`
                    }),
                    // make the actual toast clickable again
                    message: () => ({
                        class: `
                          pointer-events-auto
                        `
                    }),
                    detail: () => ({
                        class: `text-[13px] sm:text-sm `
                    }),
                    summary: () => ({
                        class: `text-sm`
                    }),
                    messageIcon: () => ({
                        class: `w-4 h-4 mt-0.5`
                    })
                },

                global: {
                    css: `

                    `
                }
            }
        });

        app.mount(el);
        return app;
    },
})
