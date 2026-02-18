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
        <title>Login</title>
    </Head>

    <div class="w-full max-w-md mx-auto mt-6">
        <!-- Login Card -->
        <div class="bg-white dark:secondary-dark-bg rounded-xl shadow-lg transition-shadow duration-500 ease-in-out hover:dark:shadow-blue-500/30 border border-slate-300 dark:border-slate-700/50 p-8">
            <h1 class="text-2xl font-bold dark:primary-dark-mode-text mb-6 text-center">Sign in</h1>
            <!-- Form Validation Errors -->
<!--            <div v-if="Object.keys(errors).length > 0" class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex">-->
<!--                <i class="pi pi-exclamation-circle text-red-400 mr-3 mt-0.5"></i>-->
<!--                <div class="text-red-600 dark:text-red-200 text-sm">-->
<!--                    <p v-for="(error, key) in errors" :key="key">{{ error }}</p>-->
<!--                </div>-->
<!--            </div>-->

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
                            <InputText id="email_or_phone" v-model="form.login" pt:root:class="rounded-l-none border-slate-300 dark:border-slate-100/20 focus:dark:border-slate-100/20" :class="{ 'p-invalid': form.errors.login }" />
                            <label for="email_or_phone">Email or Phone</label>
                        </FloatLabel>
                    </InputGroup>

                    <!-- Password Field -->
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-lock"></i>
                        </InputGroupAddon>
                        <FloatLabel variant="on">
                            <Password toggleMask pt:unmaskIcon:class="-mt -2" :feedback="false" inputClass="w-full rounded-md focus:shadow-none rounded-l-none border-slate-300 dark:border-slate-100/20 focus:dark:border-slate-100/20" :class="{ 'p-invalid': form.errors.password }" class="w-full" v-model="form.password" inputId="password" />
                            <label for="password" :class="{'text-danger': form.errors.password }">Password</label>
                        </FloatLabel>
                    </InputGroup>

                    <!-- Remember Me and Forgot Password -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <Checkbox v-model="form.remember" inputId="remember" binary />
                            <label for="remember" class="max-sm:!text-xs">
                                Remember Me
                            </label>
                        </div>

                        <Link :href="route('show.forgot.password')" class="text-xs sm:text-sm text-slate-800 dark:secondary-dark-mode-text">
                            Forgot Password?
                        </Link>
                    </div>
                    <!-- Submit Button -->
                    <div>
                        <Button
                            type="submit"
                            icon="pi pi-user"
                            label="Sign in"
                            class="w-full flex justify-center items-center py-2.5 px-4 rounded-lg border-none shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-500/90"
                        />
                    </div>
                </div>
            </form>

            <div class="mt-6">
                <Divider/>
                <p class="text-center text-sm dark:secondary-dark-mode-text">
                    Don't have an account?
                    <Link :href="route('register.show')" class="font-medium text-blue-500 hover:text-brand-500/80 transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>

            <!-- Social Login -->
            <div class="space-y-3">
<!--                <Divider align="center" pt:content:class="dark:secondary-dark-bg">-->
<!--                    <label for="social" class="ml-2 block text-sm text-slate-800 dark:secondary-dark-mode-text">OR</label>-->
<!--                </Divider>-->

<!--                <div class="gap-3">-->
<!--                    <button @click="loginWith('google')" class="w-full inline-flex gap-x-2 font-bold items-center justify-center py-3.5 px-4 bg-brand-300/20 text-sm dark:primary-dark-bg rounded-lg">-->
<!--&lt;!&ndash;                        <img src="/icons/google.png" class="w-5 h-5 object-cover" alt="google" />&ndash;&gt;-->
<!--                        <i class="pi pi-google text-blue-500"></i>-->
<!--                        <span>Continue with Google</span>-->
<!--                    </button>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<style scoped>
.p-inputtext:focus {
    box-shadow: none !important;
}

</style>
