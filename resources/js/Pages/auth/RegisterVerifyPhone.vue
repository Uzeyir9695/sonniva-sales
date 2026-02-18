<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import {useToast} from "primevue/usetoast";

const toast = useToast();
const props = defineProps(['errors']);

const form = useForm({
    otp: null,
})
async function  verifyPhone(){
    form.post(route('register.verify-code'), {
        onSuccess: (res) => {
            form.reset();
        },
        onError: (error) => {
            console.log(error)
            toast.add({ severity: 'error', summary: 'Error', detail: error.message, group: 'register', life: 12000 });
        }
    })
}

async function resendCode(){
    form.post(route('register.resend-code'), {
        onSuccess: (res) => {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Verification code sent successfully.', group: 'register', life: 12000 });
        },
        onError: (error) => {
            toast.add({ severity: 'error', summary: 'Error', detail: error.message, group: 'register', life: 12000 });
        }
    })
}
</script>

<template>
    <Head>
        <title>Verify phone number</title>
    </Head>

    <div class="flex mt-8 flex-col h-[400px] justify-evenly">
        <form @submit.prevent="verifyPhone" class="flex flex-col bg-white p-8 gap-6 self-center border border-slate-200 rounded-lg w-full sm:w-[450px]">
            <div class="flex flex-col items-center">
                <div class="font-bold text-xl mb-2">Authenticate your account</div>
                <p class="text-surface-500 dark:text-surface-400 block mb-8">Please enter the code sent to your phone.</p>
                <InputOtp v-model="form.otp" :length="6" />
                <div class="flex justify-between mt-8 self-stretch">
                    <Button label="Resend Code" @click="resendCode" link class="p-0"></Button>
                </div>
            </div>
            <div class="flex xs:flex-col gap-2 sm:justify-between sm:items-center">
                <Button :disabled="form.processing" type="submit" class="custom-button w-full" :label="form.processing ? 'Please wait...' : 'Submit'" size="medium" :icon="form.processing ? 'pi pi-spin pi-spinner' :'pi pi-check-circle'" />
            </div>
        </form>
    </div>
    <Toast position="bottom-right" group="register" />
</template>

<style scoped>

</style>
