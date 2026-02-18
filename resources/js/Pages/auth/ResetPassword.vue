<template>
    <Head>
        <title>Reset Password</title>
    </Head>

    <div class="flex mt-8 flex-col justify-evenly">
        <form @submit.prevent="resetPassword" class="flex flex-col bg-white p-8 gap-6 self-center w-full w-[250px] sm:w-[450px] rounded-lg">
            <div class="flex flex-col space-y-5">
                <div class="self-center text-2xl font-semibold">New password</div>
            </div>
            <Message
                v-if="$page.props.flash.message"
                pt:content:class="flex flex-col"
                pt:text:class="text-justify"
                pt:icon:class="mb-4 text-3xl"
                severity="success"
                icon="pi pi-check-circle"
            >
                {{ $page.props.flash.message }}
            </Message>

            <!-- Form Validation Errors -->
            <div v-if="Object.keys(errors).length > 0"
                 class="mb-6 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700/50 rounded-lg p-4 flex justify-between">
                <div class="text-red-600 dark:text-red-200 text-sm">
                    <p v-for="(error, key, index) in errors" :key="key">{{index+1}}) {{ error }}</p>
                </div>
                <i class="pi pi-exclamation-circle text-red-400 mr-3 mt-0.5"></i>
            </div>

            <FloatLabel variant="on">
                <InputText id="phone" v-model="form.phone" :invalid="form.errors.phone" fluid/>
                <label for="phone">Phone Number</label>
            </FloatLabel>

            <FloatLabel variant="on">
                <Password
                    :feedback="false"
                    toggleMask
                    inputClass="w-full rounded-md focus:shadow-none"
                    :invalid="form.errors.password"
                    class="w-full"
                    v-model="form.password"
                    inputId="password"
                />
                <label for="password">New password</label>
            </FloatLabel>

            <FloatLabel variant="on">
                <Password toggleMask :feedback="false" inputClass="w-full rounded-md focus:shadow-none" :invalid="form.errors.password_confirmation" class="w-full" v-model="form.password_confirmation" inputId="password_confirmation" />
                <label for="password_confirmation">Repeat new password</label>
            </FloatLabel>

            <div class="flex xs:flex-col gap-2 sm:justify-between sm:items-center">
                <Button :disabled="form.processing" type="submit" class="custom-button w-full" :label="form.processing ? 'Please wait...' : 'Submit'" size="medium" :icon="form.processing ? 'pi pi-spin pi-spinner' :''" />
            </div>
        </form>
    </div>
    <Toast position="bottom-right" group="reset-password" />
</template>

<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import {useToast} from "primevue/usetoast";

const toast = useToast();
const props = defineProps(['errors']);

const form = useForm({
    phone: null,
    password: null,
    password_confirmation: null,
})

async function  resetPassword(){
    form.post(route('forgot-password.reset'), {
        onSuccess: (page) => {
            form.reset();
        },
        onError: (error) => {

        }
    })
}

</script>

<style scoped>

</style>
