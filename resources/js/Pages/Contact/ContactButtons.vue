<script setup>
import { ref } from 'vue';

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
        <SpeedDial :model="items" direction="up" class="fixed right-[2.5rem] lg:right-[2.5rem] bottom-[5.5rem] lg:bottom-[6rem] z-10" :tooltipOptions="{ position: 'left' }">
            <template #button="{ toggleCallback }">
                <Button class="bg-brand-500 border-none hover:-rotate-10" rounded icon="pi pi-phone" @click="toggleCallback" />
            </template>
            <template #item="{ item, toggleCallback }">
                <Button  severity="success" size="medium" variant="outlined" pt:icon:class="text-white" :class="item.bg" v-tooltip="item.label" rounded :icon="item.icon" :aria-label="item.label" @click="() => { item.command(); }" />
            </template>
        </SpeedDial>
    </div>
</template>
