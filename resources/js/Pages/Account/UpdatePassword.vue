<script setup>
import { useForm, usePage, Head } from '@inertiajs/vue3';
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
  <Head>
    <title>Settings</title>
  </Head>
    <div class="flex flex-col items-center gap-y-6 rounded-lg bg-slate-200/30 sm:max-w-[500px] px-6 py-10 lg:py-16 mx-auto">
        <div class="text-lg sm:text-xl font-semibold">შეცვალე პაროლი</div>

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
                <Password
                    v-model="passwordForm.current_password"
                    toggleMask
                    pt:maskIcon:class="z-10"
                    pt:unmaskIcon:class="z-10"
                    :feedback="false"
                    :invalid="!!passwordForm.errors.current_password"
                    inputId="current_password"
                    fluid
                />
                <label for="current_password">მიმდინარე პაროლი</label>
            </FloatLabel>

            <FloatLabel variant="on">
                <Password
                    v-model="passwordForm.password"
                    toggleMask
                    pt:maskIcon:class="z-10"
                    pt:unmaskIcon:class="z-10"
                    :feedback="false"
                    :invalid="!!passwordForm.errors.password"
                    inputId="password"
                    fluid
                >
                </Password>
                <label for="password">ახალი პაროლი</label>
            </FloatLabel>

            <FloatLabel variant="on">
                <Password
                    v-model="passwordForm.password_confirmation"
                    toggleMask
                    pt:maskIcon:class="z-10"
                    pt:unmaskIcon:class="z-10"
                    :feedback="false"
                    :invalid="!!passwordForm.errors.password_confirmation"
                    inputId="password_confirmation"
                    fluid
                />
                <label for="password_confirmation">გაიმეორე ახალი პაროლი</label>
            </FloatLabel>

            <Button :disabled="passwordForm.processing"
                    type="submit"
                    class="shadow-none bg-brand-500 text-white"
                    :label="passwordForm.processing ? 'გთხოვთ დაელოდოთ...' : 'დადასტურება'"
                    text
                    raised
                    size="small"
                    :icon="passwordForm.processing ? 'pi pi-spin pi-spinner' :''"
            />
        </form>
    </div>
</template>

<style scoped>

</style>
