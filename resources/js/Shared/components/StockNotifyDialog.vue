<script setup>
import { computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'

const props = defineProps({
    visible: { type: Boolean, required: true },
    item: { type: Object, required: true },
})

const emit = defineEmits(['update:visible'])

const page = usePage()
const isLoggedIn = computed(() => !!page.props.user)

const subscribe = () => {
    emit('update:visible', false)
    router.post(route('stock-notifications.subscribe', props.item.slug))
}

const goToLogin = () => {
    emit('update:visible', false)
    router.get(route('login'))
}
</script>

<template>
    <!-- Login required -->
    <Dialog v-if="!isLoggedIn" :visible="visible" @update:visible="emit('update:visible', $event)" modal :style="{ width: '22rem' }">
        <template #header>
            <div class="flex items-center gap-2">
                <i class="pi pi-lock text-gray-500"></i>
                <span class="font-semibold text-gray-800">{{ $t('stockNotify.loginRequired') }}</span>
            </div>
        </template>
        <p class="text-sm text-gray-600 leading-relaxed">
            {{ $t('stockNotify.loginRequiredText') }}
        </p>
        <template #footer>
            <div class="flex justify-end gap-2">
                <Button :label="$t('common.cancel')" severity="secondary" text @click="emit('update:visible', false)" />
                <Button :label="$t('nav.signIn')" icon="pi pi-sign-in" @click="goToLogin" />
            </div>
        </template>
    </Dialog>

    <!-- Subscribe confirmation -->
    <Dialog v-else :visible="visible" @update:visible="emit('update:visible', $event)" modal :style="{ width: '22rem' }">
        <template #header>
            <div class="flex items-center gap-2">
                <i class="pi pi-bell text-blue-500"></i>
                <span class="font-semibold text-gray-800">{{ $t('stockNotify.subscribeTitle') }}</span>
            </div>
        </template>
        <p class="text-sm text-gray-600 leading-relaxed">
            {{ $t('stockNotify.subscribeText') }}
        </p>
        <template #footer>
            <div class="flex justify-end gap-2">
                <Button :label="$t('common.no')" severity="secondary" text @click="emit('update:visible', false)" />
                <Button :label="$t('common.yes')" icon="pi pi-check" @click="subscribe" />
            </div>
        </template>
    </Dialog>
</template>
