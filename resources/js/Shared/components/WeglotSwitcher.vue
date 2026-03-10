<script setup>
import { ref, onMounted } from 'vue'

const currentLang = ref('ka')
const languages = ref([])
const open = ref(false)

const flagMap = {
    ka: '🇬🇪',
    ru: '🇷🇺',
    en: '🇬🇧',
    tr: '🇹🇷',
}

const nameMap = {
    ka: 'GEO',
    ru: 'RUS',
    en: 'ENG',
    tr: 'TUR',
}

onMounted(() => {
    const init = () => {
        if (typeof Weglot === 'undefined') return

        const available = Weglot.options.languages
            .map(l => l.language_to)
            .concat(Weglot.options.language_from)

        languages.value = available
        currentLang.value = Weglot.getCurrentLang()

        Weglot.on('languageChanged', (lang) => {
            currentLang.value = lang
            open.value = false
        })
    }

    // Weglot might already be initialized or not yet
    if (typeof Weglot !== 'undefined' && Weglot.getCurrentLang) {
        init()
    } else {
        document.addEventListener('weglot:initialized', init)
        // fallback poll
        const interval = setInterval(() => {
            if (typeof Weglot !== 'undefined' && Weglot.getCurrentLang) {
                init()
                clearInterval(interval)
            }
        }, 200)
    }
})

function switchTo(lang) {
    if (typeof Weglot !== 'undefined') {
        Weglot.switchTo(lang)
    }
    open.value = false
}

function toggle() {
    open.value = !open.value
}

// Close on outside click
function onClickOutside(e) {
    if (!e.target.closest('.weglot-switcher')) {
        open.value = false
    }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
import { onUnmounted } from 'vue'
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<template>
    <div class="weglot-switcher relative">
        <!-- Trigger button -->
        <button
            @click="toggle"
            class="flex items-center justify-center w-12 h-12 rounded-full
           text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
        >
            <span class="text-2xl leading-none">{{ flagMap[currentLang] ?? '🌐' }}</span>
        </button>

        <!-- Dropdown -->
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
                class="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white rounded-2xl shadow-lg
                        border border-gray-100 overflow-hidden z-50 min-w-[110px]"
            >
                <button
                    v-for="lang in languages"
                    :key="lang"
                    @click="switchTo(lang)"
                    class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm cursor-pointer
                           hover:bg-gray-50 transition-colors"
                    :class="currentLang === lang
                        ? 'text-brand-500 font-semibold bg-brand-50/50'
                        : 'text-gray-700'"
                >
                    <span class="text-base">{{ flagMap[lang] ?? '🌐' }}</span>
                    <span>{{ nameMap[lang] ?? lang.toUpperCase() }}</span>
                    <i v-if="currentLang === lang" class="pi pi-check text-xs ml-auto text-brand-500"></i>
                </button>
            </div>
        </Transition>
    </div>
</template>
```
