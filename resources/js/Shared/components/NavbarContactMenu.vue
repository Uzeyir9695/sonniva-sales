<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const whatsappLink = import.meta.env.VITE_COMPANY_WHATSAPP_LINK;
const companyPhone = import.meta.env.VITE_COMPANY_PHONE;
const viberCallLink = `viber://call?number=${companyPhone}`;

const items = ref([
    {
        label: 'WhatsApp Chat',
        icon: 'pi pi-whatsapp',
        bg: 'bg-green-500',
        command: () => {
            window.open(whatsappLink, 'callWhatsApp');
        }
    },
    {
        label: 'Phone Call',
        icon: 'fa-solid fa-phone-volume',
        bg: 'bg-sky-500',
        command: () => {
            window.open(`tel:${companyPhone}`, 'callPhone');
        }
    },
    {
        label: 'Viber Chat',
        icon: 'fa-brands fa-viber',
        bg: 'bg-[#7b68ee]',
        command: () => {
            window.open(viberCallLink, 'callViber');
        }
    },
])

const open = ref(false)
const menuRef = ref(null)

function handleClickOutside(e) {
    if (menuRef.value && !menuRef.value.contains(e.target)) {
        open.value = false
    }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<template>
    <!-- <SpeedDial
        :model="items"
        direction="down"
        :tooltipOptions="{ position: 'bottom' }"
        pt:root:class="relative"
        pt:list:class="absolute right-0 top-full mt-2 z-50"
    >
        <template #button="{ toggleCallback }">
            <button
                @click="toggleCallback"
                class="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 transition-all"
                aria-label="დაგვიკავშირდით"
            >
                <i class="pi pi-phone text-xl"></i>
            </button>
        </template>
        <template #item="{ item }">
            <Button severity="success" size="medium" variant="outlined" pt:icon:class="text-white" :class="item.bg" v-tooltip="item.label" rounded :icon="item.icon" :aria-label="item.label" @click="() => item.command()" />
        </template>
    </SpeedDial> -->

    <div class="relative" ref="menuRef">
        <button
            @click="open = !open"
            class="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 transition-all"
            aria-label="დაგვიკავშირდით"
        >
            <i class="pi pi-phone text-xl"></i>
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
                class="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black/5 z-50 overflow-hidden origin-top-left py-1"
            >
                <button
                    v-for="item in items"
                    :key="item.label"
                    type="button"
                    @click="() => { item.command(); open = false }"
                    class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <span :class="['flex items-center justify-center w-7 h-7 rounded-full text-white text-xs shrink-0', item.bg]">
                        <i :class="item.icon"></i>
                    </span>
                    {{ item.label }}
                </button>
            </div>
        </Transition>
    </div>
</template>
