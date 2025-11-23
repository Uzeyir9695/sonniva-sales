import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { ZiggyVue } from 'ziggy-js';
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
import Layout from "./Shared/Layout.vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
/***********************************************************************************************************************
 * PRIMEVUE package Components
 ***********************************************************************************************************************
 */
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import KeyFilter from 'primevue/keyfilter';
import ConfirmationService from 'primevue/confirmationservice';
import Select from 'primevue/select';
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";
import FloatLabel from "primevue/floatlabel";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import {i18nVue} from "laravel-vue-i18n";

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
    components: {
        slider: {
            colorScheme: {
                light: {
                    root: {
                        background: '{red.550}',
                        color: '{red.700}'
                    },
                }
            }
        }
    }
});


createServer.default((page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: async name => {
        const page = await resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob("./Pages/**/*.vue"));
        page.default.layout ??= Layout;
        return page;
    },
    setup({ app, props, plugin }) {
        const ssr = createSSRApp({ render: () => h(app, props) });
        ssr.use(plugin);
        ssr.use(pinia);
        ssr.use(ZiggyVue, {
            ...page.props.ziggy,
            location: new URL(page.props.ziggy.location),
        })
        ssr.use(i18nVue, {
            lang: 'ka',
            resolve: lang => {
                const langs = import.meta.glob('../../lang/*.json', { eager: true });
                return langs[`../../lang/${lang}.json`].default;
            },
        })
        ssr.provide('emitter', emitter);

        ssr.component("Select", Select);
        ssr.component("FloatLabel", FloatLabel);

        // Reusable PrimeVue components
        ssr.component("PrimeSelect", PrimeSelect);
        ssr.component("PrimeInputNumber", PrimeInputNumber);
        ssr.component("PrimeToggleSwitch", PrimeToggleSwitch);
        ssr.component("PrimeInputText", PrimeInputText);
        ssr.component("PrimeSelectButton", PrimeSelectButton);
        ssr.component("PrimeDatePicker", PrimeDatePicker);

        ssr.directive('keyfilter', KeyFilter);
        ssr.directive("tooltip", Tooltip);
        ssr.directive("ripple", Ripple);
        ssr.directive("styleclass", StyleClass);

        ssr.use(ConfirmationService);
        ssr.use(ToastService);
        ssr.use(PrimeVue, {
            ripple: false,
            theme: {
                preset: MyPreset,
                options: {
                    darkModeSelector: '.my-app-dark',
                    cssLayer: {
                        name: 'primevue',
                        order: 'tailwind-base, primevue, tailwind-utilities'
                    }
                }
            },
            pt: {
                selectbutton: {
                    pcToggleButton: {
                        root: {class: 'bg-white dark:bg-slate-800 border-none max-h-12 rounded-full'},
                        content: ({context}) => ({
                            class: context.active
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-lg'
                                : 'bg-transparent border border-slate-300 dark:border-slate-600 text-slate-600 dark:primary-dark-mode-text rounded-lg'
                        })
                    }
                },
                global: {
                    css: `

                    `
                }
            }
        });

        ssr.mount(el);

        return ssr;
    },
}))


