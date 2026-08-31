import './bootstrap'
import '../css/app.css'
import {createApp, h} from 'vue'
import {createInertiaApp, router} from '@inertiajs/vue3'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { Head } from '@inertiajs/vue3'
import { ZiggyVue } from 'ziggy-js'
import { Ziggy as staticZiggy } from './ziggy.js'
import { createI18n } from 'vue-i18n'
import ka from './locales/ka.json'
import en from './locales/en.json'
import ru from './locales/ru.json'
import tr from './locales/tr.json'
import Layout from "./Shared/Layout.vue"
import mitt from "mitt"

const DEFAULT_LOCALE = 'ka'
const PREFIXED_LOCALES = ['en', 'ru', 'tr']

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const emitter = mitt()
if (typeof window !== 'undefined') window.emitter = emitter

// route().current() matches window.location against route patterns that have
// no locale segment, so strip the /en|/ru|/tr prefix off the path Ziggy sees.
// route() generation stays prefixed via the shared ziggy prop's `url`.
const stripLocalePrefix = (pathname) => {
    const seg = pathname.split('/')[1]
    return PREFIXED_LOCALES.includes(seg) ? pathname.slice(seg.length + 1) || '/' : pathname
}

const ziggyLocation = typeof window !== 'undefined' ? {
    get host() { return window.location.host },
    get pathname() { return stripLocalePrefix(window.location.pathname) },
    get search() { return window.location.search },
} : undefined

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
import { formatNumber } from './utils/numberFormat.js';

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
        // staticZiggy (baked in at build time from `php artisan ziggy:generate`, wired
        // via the `prebuild` npm script) is a fallback for the routes list only - it
        // stops SSR from crashing if the real per-request ziggy prop is ever missing,
        // instead of Ziggy reading `.routes` off an empty config object. The build
        // always runs on a local machine, so its baked-in `url`/`port` reflect the
        // local dev environment - override those here so the fallback still points at
        // production. The live ziggy prop always wins over all of this when present.
        const ziggy = {
            ...staticZiggy,
            url: 'https://www.sonniva.ge',
            port: null,
            ...(props.initialPage.props.ziggy || {}),
        };
        // Client: swap in the prefix-stripping location so route().current() matches;
        // SSR: keep the server-provided location since window is unavailable.
        const { location: _ziggyLoc, ...ziggyConfig } = ziggy;
        const ziggyForVue = typeof window !== 'undefined' ? { ...ziggyConfig, location: ziggyLocation } : ziggy;

        const app = createApp({ render: () => h(App, props) });

        const i18n = createI18n({
            legacy: false,
            globalInjection: true,
            locale: props.initialPage.props.locale ?? DEFAULT_LOCALE,
            fallbackLocale: DEFAULT_LOCALE,
            messages: { ka, en, ru, tr },
        });
        // Inertia SPA visits don't re-run this setup, so keep vue-i18n in sync
        // with the shared `locale` prop on every navigation.
        router.on('success', (event) => {
            i18n.global.locale.value = event.detail.page.props.locale ?? DEFAULT_LOCALE
        });

        app.use(plugin);
        app.use(pinia);
        app.use(ZiggyVue, ziggyForVue);
        app.use(i18n);

        app.provide('emitter', emitter);

        app.config.globalProperties.$formatNumber = formatNumber;

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
            ptOptions: { mergeSections: true, mergeProps: true },
            pt: {
                button: {
                    root: { class: 'text-sm py-1.5 px-3' },
                    icon: { class: 'text-sm' },
                },

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
                    root: {class: 'focus-within:border-brand-400'},
                    pcFilter: {root: {class: 'rounded-xl'}},
                },

                // ── InputText ──────────────────────────────────────
                inputtext: {
                    root: ({ props, state }) => ({
                        class: [
                            'w-full px-3 py-2.5',
                            'border border-slate-300',
                            'text-sm font-medium text-slate-700',
                            'placeholder:text-slate-400',
                            'transition-all duration-200',
                            'outline-none',
                            state?.focused || props?.focused
                                ? 'border-brand-500 ring-3 ring-brand-500/15'
                                : '',
                            props?.disabled
                                ? 'opacity-50 cursor-not-allowed pointer-events-none'
                                : '',
                        ]
                    })
                },

                // PrimeVue force-focuses the header close button when a dialog opens
                // (no other autofocus target exists in header/footer/content), using
                // focus({ focusVisible: true }) - which paints the focus-visible ring
                // even though nothing was actually pressed. Suppress it there only.
                dialog: {
                    pcCloseButton: {
                        root: { class: 'focus-visible:outline-none focus-visible:shadow-none' },
                    },
                },

                panel: {
                    root: { class: 'border-none !m-0' },
                    header: {
                        class: 'text-sm font-medium text-gray-500 !p-0 cursor-pointer select-none',
                        onClick: (e) => {
                            if (!e.target.closest('button')) {
                                e.currentTarget.querySelector('button')?.click()
                            }
                        }
                    },
                    pcTogglebutton: {
                        root: { class: 'size-5' }
                    },
                    content: { class: 'mt-3 p-0!' },
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

        if (el) app.mount(el);
        return app;
    },
})
