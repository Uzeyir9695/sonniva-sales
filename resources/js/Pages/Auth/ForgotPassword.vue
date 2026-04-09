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
            toast.add({ severity: 'error', summary: 'Error', detail:error.email?? 'Something went wrong, try again.', life: 12000 });
        }
    })
}
</script>

<template>
    <Head>
        <title>დაგავიწყდა პაროლი</title>
    </Head>

    <div class="bg-white flex flex-col justify-evenly mx-3 sm:mx-auto shadow-lg rounded-xl border border-slate-200 mt-8 w-full sm:w-[450px] h-[400px]">
        <form @submit.prevent="forgotPassword" class="flex flex-col p-8 gap-6 self-center">
            <p class="text-center">შეიყვანე ტელეფონი, რომლითაც ხარ რეგისტრირებული</p>
            <!-- Error Message -->
            <Message v-if="Object.keys(errors)?.length > 0" severity="error" icon="pi pi-exclamation-circle" :closable="false">
                {{ errors.phone }}
            </Message>

            <FloatLabel variant="on">
                <InputText id="email" v-model="form.phone" class="p-3" :invalid="!!form.errors.phone" fluid />
                <label for="email">ტელეფონი</label>
            </FloatLabel>

            <div class="flex xs:flex-col gap-2 sm:justify-between sm:items-center">
                <Button :disabled="form.processing" type="submit" class="custom-button w-full" :label="form.processing ? 'გთხოვ დაიცადო...' : 'გაგრძელება'" size="medium" :icon="form.processing ? 'pi pi-spin pi-spinner' :'pi pi-user'" />
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>
