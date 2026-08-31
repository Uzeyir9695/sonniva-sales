<script setup>
import { ref, computed } from 'vue'
import { useClipboard } from '@vueuse/core'

const props = defineProps({
    url:   { type: String, default: '' },   // defaults to current page URL
    title: { type: String, default: '' },   // e.g. item name, used as share text
    size:  { type: String, default: 'md' },  // 'sm' | 'md' | 'lg'
})

// Component has two root nodes (button + Dialog), so class/attrs from the
// parent won't auto-inherit - bind them onto the trigger button explicitly.
defineOptions({ inheritAttrs: false })

const dialogVisible = ref(false)
const { copy: copyLink, copied } = useClipboard()

const shareUrl = computed(() => props.url || (typeof window !== 'undefined' ? window.location.href : ''))

const links = computed(() => {
    const u = encodeURIComponent(shareUrl.value)
    const t = encodeURIComponent(props.title)

    return [
        { key: 'facebook', label: 'Facebook', icon: 'pi pi-facebook', bg: 'bg-[#1877F2]', href: `https://www.messenger.com/t/?link=${u}` },
        { key: 'instagram', label: 'Instagram', icon: 'pi pi-instagram', bg: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]', href: 'https://www.instagram.com/direct/new/' },
        { key: 'whatsapp', label: 'WhatsApp', icon: 'pi pi-whatsapp', bg: 'bg-[#25D366]', href: `https://api.whatsapp.com/send?text=${t}%20${u}` },
        { key: 'viber', label: 'Viber', icon: 'fa-brands fa-viber', bg: 'bg-[#7360F2]', href: `viber://forward?text=${t}%20${u}` },
        { key: 'telegram', label: 'Telegram', icon: 'pi pi-telegram', bg: 'bg-[#26A5E4]', href: `https://t.me/share/url?url=${u}&text=${t}` },
        { key: 'twitter', label: 'X (Twitter)', icon: 'pi pi-twitter', bg: 'bg-black', href: `https://twitter.com/messages/compose?text=${t}%20${u}` },
        { key: 'linkedin', label: 'LinkedIn', icon: 'pi pi-linkedin', bg: 'bg-[#0A66C2]', href: 'https://www.linkedin.com/messaging/' },
    ]
})

const buttonSizeClass = { sm: 'w-7 h-7', md: 'w-8 h-8', lg: 'w-10 h-10' }[props.size]
const iconSizeClass = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' }[props.size]

function onLinkClick(link) {
    if (link.key === 'instagram' || link.key === 'linkedin') {
        copyLink(shareUrl.value)
    }
    dialogVisible.value = false
}
</script>

<template>
    <button
        type="button"
        v-bind="$attrs"
        @click.stop="dialogVisible = true"
        :aria-label="$t('share.share')"
        :class="[
            buttonSizeClass,
            'cursor-pointer inline-flex items-center justify-center rounded-full shadow-md',
            'bg-white border border-gray-200 text-gray-500',
            'hover:bg-brand-50 hover:border-brand-300 hover:text-brand-500',
            'transition-all duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
        ]"
    >
        <i :class="['fa-solid fa-arrow-up-from-bracket', iconSizeClass]"></i>
    </button>

    <Dialog
        v-model:visible="dialogVisible"
        modal
        :draggable="false"
        :dismissable-mask="true"
        :style="{ width: '380px', maxWidth: '92vw' }"
        :pt="{
            root: { class: '!rounded-3xl !overflow-hidden !border-0 !shadow-2xl' },
            mask: { class: 'backdrop-blur-sm' },
        }"
        @click.stop
    >
        <template #header>
            <span class="text-base font-bold text-gray-900">{{ $t('share.shareHeading') }}</span>
        </template>

        <div class="grid grid-cols-4 gap-1 pt-1 pb-2">
            <a
                v-for="link in links"
                :key="link.key"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                @click="onLinkClick(link)"
                class="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-gray-50 transition-colors"
            >
                <span :class="[link.bg, 'w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm']">
                    <i :class="[link.icon, 'text-lg']"></i>
                </span>
                <span class="text-[11px] text-gray-600 font-medium text-center leading-tight">{{ link.label }}</span>
            </a>

            <button
                type="button"
                @click="copyLink(shareUrl)"
                class="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
                <span :class="['w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm transition-colors', copied ? 'bg-emerald-500' : 'bg-gray-700']">
                    <i :class="['pi text-lg', copied ? 'pi-check' : 'pi-copy']"></i>
                </span>
                <span class="text-[11px] text-gray-600 font-medium text-center leading-tight">{{ copied ? $t('share.copied') : $t('share.copyLink') }}</span>
            </button>
        </div>
    </Dialog>
</template>
