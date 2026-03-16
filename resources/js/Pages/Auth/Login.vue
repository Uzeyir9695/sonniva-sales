<script setup>
import { ref } from 'vue';
import {Link, useForm, router, Head} from '@inertiajs/vue3';
import { Divider } from 'primevue';

const props = defineProps(['errors']);
const remember = ref(false);

const form = useForm({
    login: null,   // <-- single field for email or mobile
    password: null,
    remember: false,
})

function login() {
    form.post(route('login.post'), {
        replace: true,
        preserveState: true,
        onSuccess: () => {

        },
        onError: (error) => {
            console.log(error)
        },
    });
}

</script>

<template>
    <Head>
        <title>აუტორიზაცია</title>
    </Head>

    <div class="w-full max-w-md mx-auto mt-6">
        <!-- Login Card -->
        <div class="bg-white mx-3 rounded-xl shadow-lg transition-shadow duration-500 ease-in-out border border-slate-200 p-8">
            <h1 class="text-2xl font-bold mb-6 text-center">აუტორიზაცია</h1>

            <!-- Error Message -->
            <Message v-if="$page.props.errors.message" class="mb-8" severity="error" icon="pi pi-exclamation-circle" :closable="true">
                {{ $page.props.errors.message }}
            </Message>

            <!-- Success Message -->
            <Message v-if="$page.props.flash.message" class="mb-8" severity="success" icon="pi pi-check-circle" :closable="true">
                {{ $page.props.flash.message }}
            </Message>

            <!-- Login Form -->
            <form @submit.prevent="login">
                <div class="space-y-5">
                    <!-- Email Field -->
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-envelope"></i>
                        </InputGroupAddon>
                        <FloatLabel variant="on">
                            <InputText id="email_or_phone" v-model="form.login" :invalid="!!form.errors.login" />
                            <label for="email_or_phone">ელ.ფოსტა ან ტელეფონი</label>
                        </FloatLabel>
                    </InputGroup>

                    <!-- Password Field -->
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-lock"></i>
                        </InputGroupAddon>
                        <FloatLabel variant="on">
                            <Password
                                v-model="form.password"
                                  toggleMask
                                  pt:unmaskIcon:class="-mt -2"
                                  :feedback="false"
                                  :invalid="!!form.errors.password"
                                  class="w-full" inputId="password" />
                            <label for="password" :class="{'text-danger': form.errors.password }">
                                პაროლი
                            </label>
                        </FloatLabel>
                    </InputGroup>

                    <!-- Remember Me and Forgot Password -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <Checkbox v-model="form.remember" size="small" inputId="remember" binary />
                            <label for="remember" class="text-sm max-sm:text-xs!">
                                დამახსოვრება
                            </label>
                        </div>

                        <Link :href="route('show.forgot.password')" class="text-xs sm:text-sm text-slate-800">
                            დაგავიწყდა პაროლი?
                        </Link>
                    </div>
                    <!-- Submit Button -->
                    <div>
                        <Button
                            type="submit"
                            icon="pi pi-user"
                            label="შესვლა"
                            class="w-full flex justify-center items-center py-2.5 px-4 rounded-lg border-none shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-500/90"
                        />
                    </div>
                </div>
            </form>

            <div class="mt-6">
                <Divider/>
                <p class="text-center text-sm">
                    არ ხარ რეგისტრირებული?
                    <Link :href="route('register.show')" class="font-medium text-blue-500 hover:text-brand-500/80 transition-colors">
                        დარეგისტრირდი
                    </Link>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.p-inputtext:focus {
    box-shadow: none !important;
}

</style>
