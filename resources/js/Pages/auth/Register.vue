<script setup>
import {Head, Link, useForm, usePage} from '@inertiajs/vue3';
import { Divider } from 'primevue';
import {ref} from "vue";

const props = defineProps(['errors']);
const page = usePage();
const recaptchaSiteKey = page.props.recaptcha_site_key;

const userTypes = ref([
    { key: 'individual', value: 'Individual' },
    { key: 'legal_entity', value: 'Legal Entity' },
]);
const selectedUserType = ref({ key: 'individual', value: 'Individual' });

const selectedCountryCode = ref('GE');

const form = useForm({
    user_type: null,
    name: null,
    lastname: null,
    phone_country: selectedCountryCode.value,
    phone: null,
    tax_id: null,
    email: null,
    password: null,
    password_confirmation: null,
    captcha_token: null,
})

async function register(){
    form.captcha_token = await grecaptcha.enterprise.execute(recaptchaSiteKey, { action: 'signup' });

    if (selectedUserType.value?.key !== 'individual') {
        delete form.lastname
    }

    form.transform((data) => ({
        ...data,
        user_type: selectedUserType.value ? selectedUserType.value?.key : null,
    })).post(route('register'), {
        preserveState: true,
    })
}

</script>

<template>
    <Head>
        <title>Register</title>
    </Head>

    <div class="w-full max-w-md mx-auto my-6">
        <!-- Register Card -->
        <div class="bg-white rounded-xl shadow-lg transition-shadow duration-500 ease-in-out border transiton-all border-gray-200 p-8">
            <h1 class="text-2xl font-bold text-gray-800 dark:primary-dark-mode-text text-center">Register</h1>

            <div class="flex justify-center my-4">
                <SelectButton v-model="selectedUserType" optionLabel="key" :allow-empty="false" :options="userTypes">
                    <template #option="slotProps">
                        <p>{{ slotProps.option.value }}</p>
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
                            Name
                        </label>
                    </FloatLabel>
                </InputGroup>

                <!-- Lastname Field -->
                <InputGroup v-if="selectedUserType?.key === 'individual'">
                    <InputGroupAddon>
                        <i class="pi pi-users text-gray-400"></i>
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <InputText
                            id="lastname"
                            v-model="form.lastname"
                            pt:root:class="rounded-l-none border-slate-300"
                            :invalid="!!form.errors.lastname"
                        />
                        <label for="lastname">
                            Lastname
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
                            Phone Number
                        </label>
                    </FloatLabel>
                </InputGroup>

                <!-- ID Number Field -->
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-id-card text-gray-400"></i>
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <InputText
                            v-keyfilter="{ pattern: /[\d+]+$/, validateOnly: true }"
                            id="id-number"
                            v-model="form.tax_id"
                            :maxlength="11"
                            pt:root:class="rounded-l-none border-slate-300"
                            :invalid="!!form.errors.tax_id"
                        />
                        <label for="id-number">{{ selectedUserType?.key === 'individual' ? 'ID Number' : 'Tax ID' }}</label>
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
                        <label for="email">Email</label>
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
                            Password
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
                            Repeat Password
                        </label>
                    </FloatLabel>
                </InputGroup>

                <!-- Submit Button -->
                <div>
                    <Button
                        type="submit"
                        icon="pi pi-user-plus"
                        label="Submit"
                        class="w-full bg-blue-500 hover:bg-blue-500/90 border-none text-white rounded-lg py-2.5"
                    />
                </div>

                <Divider pt:root:class="m-0"></Divider>
                <div>
                    <div class="flex justify-center gap-x-2 text-sm dark:secondary-dark-mode-text">
                        <p class="w-fit">Already have an account?</p>
                        <!-- Login Link -->
                        <div class="flex items-center w-fit gap-x-2 text-nowrap">
                            <i class="pi pi-user text-brand-500"></i>
                            <Link :href="route('login')" class="flex items-center text-brand-500 text-sm no-underline">
                                Sing in
                            </Link>
                        </div>
                    </div>

                    <div>
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
