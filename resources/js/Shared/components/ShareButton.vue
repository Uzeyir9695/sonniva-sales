<script setup>
import { ref, computed } from 'vue'
import { useClipboard, onClickOutside } from '@vueuse/core'

const props = defineProps({
    url:   { type: String, default: '' },   // defaults to current page URL
    title: { type: String, default: '' },   // e.g. item name, used as share text
    size:  { type: String, default: 'md' },  // 'sm' | 'md' | 'lg'
})

const open = ref(false)
const menuRef = ref(null)
const { copy: copyLink, copied } = useClipboard()

const shareUrl = computed(() => props.url || (typeof window !== 'undefined' ? window.location.href : ''))

const links = computed(() => {
    const u = encodeURIComponent(shareUrl.value)
    const t = encodeURIComponent(props.title)

    return [
        { key: 'facebook', label: 'Facebook', icon: 'pi pi-facebook', color: 'text-[#1877F2]', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
        { key: 'whatsapp', label: 'WhatsApp', icon: 'pi pi-whatsapp', color: 'text-[#25D366]', href: `https://api.whatsapp.com/send?text=${t}%20${u}` },
        { key: 'telegram', label: 'Telegram', icon: 'pi pi-telegram', color: 'text-[#26A5E4]', href: `https://t.me/share/url?url=${u}&text=${t}` },
        { key: 'twitter', label: 'X (Twitter)', icon: 'pi pi-twitter', color: 'text-gray-900', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
        { key: 'linkedin', label: 'LinkedIn', icon: 'pi pi-linkedin', color: 'text-[#0A66C2]', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    ]
})

const buttonSizeClass = { sm: 'w-7 h-7', md: 'w-8 h-8', lg: 'w-12 h-12' }[props.size]

onClickOutside(menuRef, () => open.value = false)
</script>

<template>
    <div class="relative" ref="menuRef">
        <button
            type="button"
            @click="open = !open"
            aria-label="გაზიარება"
            :class="[
                buttonSizeClass,
                'relative cursor-pointer inline-flex items-center justify-center rounded-full shadow-md',
                'bg-white/80 border border-gray-100 text-gray-400',
                'hover:bg-brand-50 hover:border-brand-300 hover:text-brand-500',
                'transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
            ]"
        >
            <i class="pi pi-share-alt text-sm"></i>
        </button>

        <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 translate-y-1 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-1 scale-95"
        >
            <div
                v-if="open"
                class="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg ring-1 ring-black/5 z-50 overflow-hidden origin-top-right py-1"
            >
                <a
                    v-for="link in links"
                    :key="link.key"
                    :href="link.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click="open = false"
                    class="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <i :class="[link.icon, link.color, 'text-sm w-4 text-center']"></i>
                    {{ link.label }}
                </a>

                <div class="border-t border-gray-100 mt-1 pt-1">
                    <button
                        type="button"
                        @click="copyLink(shareUrl)"
                        class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <i :class="['pi text-sm w-4 text-center', copied ? 'pi-check text-emerald-500' : 'pi-copy text-gray-400']"></i>
                        {{ copied ? 'დაკოპირდა!' : 'ბმულის კოპირება' }}
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>
