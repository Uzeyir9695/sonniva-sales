<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import {useToast} from "primevue/usetoast";
import {ref} from "vue";

const toast = useToast();
const props = defineProps(['errors']);
const selectedCountryCode = ref('GE');

const form = useForm({
    phone_country: selectedCountryCode.value,
    phone: null,
})
async function  forgotPassword(){
    form.post(route('forgot-password.send-verification-code'), {
        preserveState: true,
        onSuccess: (page) => {
            form.reset();
        },
        onError: (error) => {
            console.log(error);
            toast.add({ severity: 'error', summary: 'Error', detail:error.email?? 'Something went wrong, try again.', group: 'reset-password', life: 12000 });
        }
    })
}
</script>

<template>
    <Head>
        <title>Forgot Password</title>
    </Head>

    <div class="flex mt-8 flex-col h-[400px] justify-evenly">
        <form @submit.prevent="forgotPassword" class="flex flex-col bg-white p-8 gap-6 self-center w-full sm:w-[450px] rounded-lg">
            <p class="text-center">{{ $t('authorize.forgot_password_header') }}</p>
            <!-- Error Message -->
            <Message v-if="Object.keys(errors)?.length > 0" severity="error" icon="pi pi-exclamation-circle" :closable="false">
                {{ errors.phone }}
            </Message>

            <FloatLabel variant="on">
                <InputText id="email" v-model="form.phone" class="p-3" :invalid="!!form.errors.phone" fluid />
                <label for="email">{{ $t('authorize.phone_number') }}</label>
            </FloatLabel>

            <div class="flex xs:flex-col gap-2 sm:justify-between sm:items-center">
                <Button :disabled="form.processing" type="submit" class="custom-button w-full" :label="form.processing ? $t('authorize.wait') : $t('authorize.continue')" size="medium" :icon="form.processing ? 'pi pi-spin pi-spinner' :'pi pi-user'" />
            </div>
        </form>
    </div>
    <Toast position="bottom-right" group="reset-password" />
</template>

<style scoped>

</style>
