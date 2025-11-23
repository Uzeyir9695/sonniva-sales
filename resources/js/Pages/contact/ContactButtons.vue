<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const whatsappGroupLink = import.meta.env.VITE_COMPANY_WHATSAPP_LINK;
const companyPhone = import.meta.env.VITE_COMPANY_PHONE;
const viberCallLink = `viber://call?number=${companyPhone}`;

const items = ref([
    {
        label: 'WhatsApp Chat',
        icon: 'pi pi-whatsapp',
        bg: 'bg-green-500',
        command: () => {
            window.open(whatsappGroupLink, 'callWhatsApp');
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

</script>

<template>
    <div>
        <SpeedDial :model="items" direction="up" class="fixed right-[0.5rem] lg:right-[1rem] bottom-[2rem] lg:bottom-[4rem]" :tooltipOptions="{ position: 'left' }">
            <template #button="{ toggleCallback }">
                <Button class="bg-brand-500 border-none hover:-rotate-10" rounded icon="pi pi-phone" @click="toggleCallback" />
            </template>
            <template #item="{ item, toggleCallback }">
                <Button  severity="success" size="medium" variant="outlined" pt:icon:class="text-white" :class="item.bg" v-tooltip="item.label" rounded :icon="item.icon" :aria-label="item.label" @click="() => { item.command(); }" />
            </template>
        </SpeedDial>
        <Toast />
    </div>
</template>
