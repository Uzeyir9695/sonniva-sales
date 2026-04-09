<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import {useToast} from "primevue/usetoast";

const toast = useToast();
const props = defineProps(['errors']);

const form = useForm({
    otp: '',
})
async function  verifyPhone(){
    form.post(route('forgot-password.verify-code'), {
        onSuccess: (res) => {
            form.reset();
        },
        onError: (error) => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong, please try again.', life: 12000 });
        }
    })
}
async function  resendCode(){
    form.post(route('forgot-password.resend-code'), {
        onSuccess: (res) => {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Verification code sent successfully.', life: 12000 });
        },
        onError: (error) => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong, please try again.', life: 12000 });
        }
    })
}
</script>

<template>
    <Head>
        <title>ტელეფონის იდენტიფიცირება</title>
    </Head>

    <div class="bg-white flex flex-col justify-evenly mx-3 sm:mx-auto shadow-lg rounded-xl border border-slate-200 mt-8  w-full sm:w-[450px] h-[400px]">
        <form @submit.prevent="verifyPhone" class="flex flex-col p-8 gap-6 self-center">
            <div class="flex flex-col items-center">
                <p class="text-surface-500 text-center block mb-8">შეიყვანე 6 ნიშნა კოდი</p>
                <!-- OTP Validation Error Messages -->
                <Message v-if="errors?.otp" severity="error" icon="pi pi-exclamation-circle" :closable="false">
                    {{ errors.otp }}
                </Message>

                <!-- Other Session Based Error Messages -->
                <Message v-if="$page.props.errors.message" severity="error" icon="pi pi-exclamation-circle" :closable="false">
                    {{ $page.props.errors.message }}
                </Message>

                <!-- Success Message -->
                <Message v-if="$page.props.flash.message" severity="success" icon="pi pi-check-circle" :closable="false">
                    {{ $page.props.flash.message }}
                </Message>

                <InputOtp v-model="form.otp" :length="6" class="mt-6" />
                <div v-if="form.errors.otp" class="text-red-500">{{ form.errors.otp }}</div>
                <div class="flex justify-between mt-8 self-stretch">
                    <Button @click="resendCode" label="ხელახლა გაგზავნა" icon="pi pi-refresh" link class="p-0"></Button>
                </div>
            </div>
            <div class="flex xs:flex-col gap-2 sm:justify-between sm:items-center">
                <Button :disabled="form.processing" type="submit" class="custom-button w-full" :label="form.processing ? 'გთხოვ დაიცადო...' : 'დადასტურება'" size="medium" :icon="form.processing ? 'pi pi-spin pi-spinner' :'pi pi-check-circle'" />
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>
