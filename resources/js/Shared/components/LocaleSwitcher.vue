<script setup>
import { ref, computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { onClickOutside } from '@vueuse/core'

const DEFAULT_LOCALE = 'ka'
const LOCALES = ['ka', 'en', 'ru', 'tr']

const flagMap = {
    ka: '/flags/ge.png',
    en: '/flags/gb.png',
    ru: '/flags/ru.png',
    tr: '/flags/tr.png',
}
const nameMap = { ka: 'GEO', en: 'ENG', ru: 'RUS', tr: 'TUR' }
const fullNameMap = { ka: 'ქართული', en: 'English', ru: 'Русский', tr: 'Türkçe' }

const page = usePage()
const current = computed(() => page.props.locale ?? DEFAULT_LOCALE)

const rootRef = ref(null)
const open = ref(false)
onClickOutside(rootRef, () => (open.value = false))

function switchTo(locale) {
    open.value = false
    if (locale === current.value) return

    const { pathname, search, hash } = window.location
    const seg = pathname.split('/')[1]
    const bare = LOCALES.includes(seg) && seg !== DEFAULT_LOCALE
        ? pathname.slice(seg.length + 1) || '/'
        : pathname

    const target = locale === DEFAULT_LOCALE
        ? bare
        : '/' + locale + (bare === '/' ? '' : bare)

    // Full navigation, not router.visit(): a real load re-runs @routes, the
    // shared ziggy prop, and every layout component so every locale-dependent
    // value is guaranteed consistent.
    window.location.href = target + search + hash
}
</script>

<template>
    <div ref="rootRef" class="relative">
        <button
            type="button"
            @click="open = !open"
            class="flex items-center justify-center md:w-8 md:h-8 lg:w-10 lg:h-10 gap-1.5 rounded-full text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
        >
            <img :src="flagMap[current]" class="w-6 h-4 object-cover rounded-xs shrink-0" alt="" />
            <span class="sm:hidden text-sm font-medium text-gray-600">{{ fullNameMap[current] }}</span>
        </button>

        <Transition
            enter-active-class="transition-all duration-150 origin-top-right"
            enter-from-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition-all duration-100 origin-top-right"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0"
        >
            <div
                v-if="open"
                class="absolute sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50 min-w-[110px]"
            >
                <button
                    v-for="locale in LOCALES"
                    :key="locale"
                    @click="switchTo(locale)"
                    class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors"
                    :class="current === locale ? 'text-brand-500 font-semibold bg-brand-50/50' : 'text-gray-700'"
                >
                    <img :src="flagMap[locale]" class="w-5 h-3.5 object-cover rounded-xs shrink-0" alt="" />
                    <span class="hidden sm:inline">{{ nameMap[locale] }}</span>
                    <span class="sm:hidden">{{ fullNameMap[locale] }}</span>
                    <i v-if="current === locale" class="pi pi-check text-xs ml-auto text-brand-500"></i>
                </button>
            </div>
        </Transition>
    </div>
</template>
