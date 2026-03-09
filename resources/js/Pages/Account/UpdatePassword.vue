<script setup>
import { useForm, usePage, Head } from '@inertiajs/vue3';
import {useToast} from "primevue/usetoast";

const toast = useToast();
const page = usePage();

const passwordForm = useForm({
  current_password: null,
  password: null,
  password_confirmation: null,
})
async function changePassword(){
  passwordForm.put(route('account.change-password'), {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
        passwordForm.reset();
    },
    onError: (error) => {
    }
  })
}

</script>

<template>
    <Toast position="bottom-right" group="update-account" />
  <Head>
    <title>Settings</title>
  </Head>
    <div class="flex flex-col items-center gap-y-6 rounded-lg bg-slate-200/30 sm:max-w-[500px] px-6 py-10 lg:py-16 mx-auto">
        <div class="text-lg sm:text-xl font-semibold">Change Password</div>

        <!-- Form Validation Errors -->
        <div v-if="Object.keys(passwordForm.errors).length"
             class="bg-red-50 border border-red-200 rounded-lg p-4 flex justify-between w-full">
            <div class="text-red-600 dark:text-red-200 text-sm">
                <p v-for="(error, key) in passwordForm.errors" :key="key">{{ error }}</p>
            </div>
            <i class="pi pi-exclamation-circle text-red-400 mr-3 mt-0.5"></i>
        </div>

        <form @submit.prevent="changePassword" class="flex flex-col gap-8 w-full">
            <FloatLabel variant="on">
                <Password :feedback="false"
                          inputClass="w-full rounded-md focus:shadow-none"
                          :invalid="!!passwordForm.errors.current_password"
                          class="w-full"
                          v-model="passwordForm.current_password"
                          inputId="current_password"
                />
                <label for="current_password">Current password</label>
            </FloatLabel>

            <FloatLabel variant="on">
                <Password
                    :feedback="false"
                    inputClass="w-full rounded-md focus:shadow-none"
                    :invalid="!!passwordForm.errors.password"
                    class="w-full" v-model="passwordForm.password"
                    inputId="password"
                >
                </Password>
                <label for="password">New password</label>
            </FloatLabel>

            <FloatLabel variant="on">
                <Password :feedback="false"
                          inputClass="w-full rounded-md focus:shadow-none"
                          :invalid="!!passwordForm.errors.password_confirmation"
                          class="w-full" v-model="passwordForm.password_confirmation"
                          inputId="password_confirmation"
                />
                <label for="password_confirmation">Repeat new password</label>
            </FloatLabel>
            <Button :disabled="passwordForm.processing"
                    type="submit"
                    class="shadow-none bg-blue-500 text-white"
                    :label="passwordForm.processing ? 'Please wait...' : 'Submit'"
                    text
                    raised size="medium"
                    :icon="passwordForm.processing ? 'pi pi-spin pi-spinner' :''"
            />
        </form>
    </div>
</template>

<style scoped>

</style>
