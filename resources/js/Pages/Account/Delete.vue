<script setup>
import { computed } from 'vue'
import { Head, Link, useForm, usePage } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialog from 'primevue/confirmdialog'

const { t, tm, rt } = useI18n()
const page = usePage()
const confirm = useConfirm()

const user = computed(() => page.props.user)

const form = useForm({
    password: null,
})

function deleteAccount() {
    confirm.require({
        header: t('account.delete.confirmTitle'),
        message: t('account.delete.confirmMessage'),
        icon: 'pi pi-exclamation-triangle',
        rejectProps: { label: t('account.delete.cancel'), severity: 'secondary', outlined: true },
        acceptProps: { label: t('account.delete.confirm'), severity: 'danger' },
        accept: () => form.delete(route('account.destroy'), { preserveScroll: true }),
    })
}
</script>

<template>
    <Head>
        <title>{{ $t('account.delete.title') }}</title>
    </Head>

    <ConfirmDialog />

    <div class="flex flex-col gap-y-6 rounded-lg bg-slate-200/30 sm:max-w-[600px] px-6 py-10 lg:py-16 mx-auto">
        <h1 class="text-lg sm:text-xl font-semibold">{{ $t('account.delete.title') }}</h1>

        <p class="text-sm text-slate-600">{{ $t('account.delete.intro') }}</p>

        <div class="flex flex-col gap-2">
            <h2 class="text-base font-semibold">{{ $t('account.delete.deletedTitle') }}</h2>
            <ul class="list-disc pl-5 text-sm text-slate-600">
                <li v-for="(line, index) in tm('account.delete.deletedItems')" :key="index">{{ rt(line) }}</li>
            </ul>
        </div>

        <div class="flex flex-col gap-2">
            <h2 class="text-base font-semibold">{{ $t('account.delete.keptTitle') }}</h2>
            <p class="text-sm text-slate-600">{{ $t('account.delete.keptText') }}</p>
        </div>

        <div class="flex flex-col gap-2">
            <h2 class="text-base font-semibold">{{ $t('account.delete.appTitle') }}</h2>
            <p class="text-sm text-slate-600">{{ $t('account.delete.appText') }}</p>
        </div>

        <div v-if="Object.keys(form.errors).length"
             class="bg-red-50 border border-red-200 rounded-lg p-4 flex justify-between w-full">
            <div class="text-red-600 text-sm">
                <p v-for="(error, key) in form.errors" :key="key">{{ error }}</p>
            </div>
            <i class="pi pi-exclamation-circle text-red-400 mr-3 mt-0.5"></i>
        </div>

        <form v-if="user" @submit.prevent="deleteAccount" class="flex flex-col gap-6 w-full">
            <FloatLabel variant="on">
                <Password
                    v-model="form.password"
                    toggleMask
                    pt:maskIcon:class="z-10"
                    pt:unmaskIcon:class="z-10"
                    :feedback="false"
                    :invalid="!!form.errors.password"
                    inputId="password"
                    fluid
                />
                <label for="password">{{ $t('account.delete.password') }}</label>
            </FloatLabel>

            <Button :disabled="form.processing || !form.password"
                    type="submit"
                    severity="danger"
                    :label="form.processing ? $t('common.pleaseWait') : $t('account.delete.button')"
                    size="small"
                    :icon="form.processing ? 'pi pi-spin pi-spinner' : 'pi pi-trash'"
            />
        </form>

        <div v-else class="flex flex-col gap-3">
            <p class="text-sm text-slate-600">{{ $t('account.delete.loginRequired') }}</p>
            <Link :href="route('login')" class="self-start">
                <Button class="shadow-none bg-brand-500 text-white" :label="$t('account.delete.login')" text raised size="small" />
            </Link>
        </div>
    </div>
</template>
