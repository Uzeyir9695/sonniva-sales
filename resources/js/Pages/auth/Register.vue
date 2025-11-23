

<script setup>
import {Head, Link, useForm} from '@inertiajs/vue3';
import { Divider } from 'primevue';
import {ref} from "vue";
const props = defineProps(['errors']);

const userTypes = ref([
    { key: 'individual' },
    { key: 'legal_entity' },
]);
const selectedUserType = ref({ key: 'individual' });

const selectedCountryCode = ref('GE');

const form = useForm({
    user_type: selectedUserType.value?.key,
    name: null,
    phone_country: selectedCountryCode.value,
    phone: null,
    tax_id: null,
    email: null,
    password: null,
    password_confirmation: null,
})

async function register(){
    form.get(route('register'), {
        preserveState: true,
    })
}

const signUpWith = (provider) => {
    window.location.href = route('social.redirect', { provider });
}
</script>

<template>
    <Head>
        <title>Register</title>
    </Head>

    <div class="w-full max-w-md mx-auto my-6">
        <!-- Register Card -->
        <div class="bg-white rounded-xl shadow-lg transition-shadow duration-500 ease-in-out border transiton-all border-gray-200 p-8">
            <h1 class="text-2xl font-bold text-gray-800 dark:primary-dark-mode-text text-center">{{ $t('authorize.register') }}</h1>

            <div class="flex justify-center my-4">
                <SelectButton v-model="selectedUserType" optionLabel="key" :options="userTypes">
                    <template #option="slotProps">
                        <p>{{ $t('authorize.'+slotProps.option.key) }}</p>
                    </template>
                </SelectButton>
            </div>
            <!-- Form Validation Errors -->
            <div v-if="Object.keys(errors).length > 0" class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex">
                <i class="pi pi-exclamation-circle text-red-400 mr-3 mt-0.5"></i>
                <div class="text-red-600 dark:text-red-200 text-sm">
                    <p v-for="(error, key) in errors" :key="key">{{ error }}</p>
                </div>
            </div>

            <!-- Register Form -->
            <form @submit.prevent="register" class="flex flex-col gap-6">
                <!-- Name Field -->
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-user text-gray-400"></i>
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <InputText
                            id="name"
                            v-model="form.name"
                            pt:root:class="rounded-l-none border-slate-300"
                            :invalid="!!form.errors.name"
                        />
                        <label for="name">
                            {{ $t('authorize.name') }}  {{ $t('authorize.last_name') }}
                        </label>
                    </FloatLabel>
                </InputGroup>

                <!-- Mobile Field -->
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-mobile text-gray-400"></i>
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <InputText
                            v-keyfilter="{ pattern: /[\d+]+$/, validateOnly: true }"
                            id="phone"
                            v-model="form.phone"
                            pt:root:class="rounded-l-none border-slate-300"
                            :invalid="!!form.errors.phone"
                        />
                        <label for="phone">
                            {{ $t('authorize.phone_number') }}
                        </label>
                    </FloatLabel>
                </InputGroup>

                <!-- ID Number Field -->
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-id-card text-gray-400"></i>
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <InputNumber
                            :useGrouping="false"
                            :max="11"
                            id="id-number"
                            v-model="form.tax_id"
                            pt:root:class="rounded-l-none border-slate-300"
                            :invalid="!!form.errors.tax_id"
                        />
                        <label for="id-number">{{ selectedUserType?.key === 'individual' ? $t('authorize.id_number') : $t('authorize.tax_number') }}</label>
                    </FloatLabel>
                </InputGroup>

                <!-- Email Field -->
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-envelope text-gray-400"></i>
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <InputText
                            id="email"
                            v-model="form.email"
                            pt:root:class="rounded-l-none border-slate-300"
                            :invalid="!!form.errors.email"
                        />
                        <label for="email">{{ $t('authorize.email') }}</label>
                    </FloatLabel>
                </InputGroup>

                <!-- Password Field -->
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-lock text-gray-400 dark:text-slate-400"></i>
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <Password
                            v-model="form.password"
                            inputId="password"
                            toggleMask
                            :feedback="false"
                            class="w-full"
                            :invalid="!!form.errors.password"
                            inputClass="w-full border-left-none border border-gray-300 rounded-r-lg text-gray-800 focus:shadow-none"
                        />
                        <label for="password">
                            {{ $t('authorize.password') }}
                        </label>
                    </FloatLabel>
                </InputGroup>

                <!-- Confirm Password Field -->
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-lock text-gray-400 dark:text-slate-400"></i>
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <Password
                            v-model="form.password_confirmation"
                            inputId="password_confirm"
                            toggleMask
                            :feedback="false"
                            class="w-full"
                            :invalid="!!form.errors.password_confirmation"
                            inputClass="w-full border-left-none border border-gray-300 rounded-r-lg text-gray-800 focus:shadow-none"
                        />
                        <label for="password_confirm">
                            {{ $t('authorize.repeat_password') }}
                        </label>
                    </FloatLabel>
                </InputGroup>

                <!-- Submit Button -->
                <div>
                    <Button
                        type="submit"
                        icon="pi pi-user-plus"
                        :label="$t('authorize.submit')"
                        class="w-full bg-blue-500 hover:bg-blue-500/90 border-none text-white rounded-lg py-2.5"
                    />
                </div>

                <Divider pt:root:class="m-0"></Divider>
                <div>
                    <div class="flex justify-center gap-x-2 text-sm dark:secondary-dark-mode-text">
                        <p class="w-fit">{{ $t('authorize.already_have_account') }}</p>
                        <!-- Login Link -->
                        <div class="flex items-center w-fit gap-x-2 text-nowrap">
                            <i class="pi pi-user text-brand-500"></i>
                            <Link :href="route('login')" class="flex items-center text-brand-500 text-sm no-underline">
                                {{ $t('authorize.sign_in') }}
                            </Link>
                        </div>
                    </div>

                    <!-- Social Login -->
                    <div>
<!--                        <Divider align="center" pt:content:class="dark:secondary-dark-bg">-->
<!--                            <label for="continue" class="ml-2 block text-sm text-slate-800 dark:secondary-dark-mode-text">OR</label>-->
<!--                        </Divider>-->

<!--                        <div>-->
<!--                            <button @click="signUpWith('google')" class="w-full inline-flex gap-x-2 font-bold items-center justify-center py-3.5 px-4 bg-brand-300/20 text-sm dark:primary-dark-bg rounded-lg">-->
<!--                                <i class="pi pi-google text-blue-500"></i>-->
<!--                                <span>Sign up with Google</span>-->
<!--                            </button>-->
<!--                        </div>-->
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.p-inputtext:focus {
    box-shadow: none;
}
</style>
