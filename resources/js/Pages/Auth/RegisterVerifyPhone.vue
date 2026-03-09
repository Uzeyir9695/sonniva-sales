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
        <title>ტელეფონის იდენტიფიცირება</title>
    </Head>

    <div class="bg-white flex flex-col justify-evenly mx-3 sm:mx-auto shadow-lg rounded-xl border border-slate-200 mt-8 w-full sm:w-[450px] h-[400px]">
        <form @submit.prevent="verifyPhone" class="flex flex-col p-8 gap-6 self-center">
            <div class="flex flex-col items-center">
                <p class="text-surface-500 dark:text-surface-400 block mb-8">შეიყვანე 6 ნიშნა კოდი</p>
                <InputOtp v-model="form.otp" :length="6" />
                <div class="flex justify-between mt-8 self-stretch">
                    <Button label="ხელახლა გაგზავნა" @click="resendCode" link class="p-0"></Button>
                </div>
            </div>
            <div class="flex xs:flex-col gap-2 sm:justify-between sm:items-center">
                <Button
                    :disabled="form.processing"
                    type="submit"
                    class="custom-button w-full"
                    :label="form.processing ? 'გთხოვ დაიცადო...' : 'დადასტურება'"
                    size="medium"
                    :icon="form.processing ? 'pi pi-spin pi-spinner' :'pi pi-check-circle'"
                />
            </div>
        </form>
    </div>
    <Toast position="bottom-right" group="register" />
</template>

<style scoped>

</style>
