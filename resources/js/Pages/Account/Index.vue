<script setup>
import { useForm, usePage, Head } from '@inertiajs/vue3';
import {computed, ref, watch} from "vue";
import { useI18n } from 'vue-i18n';
import UpdatePassword from "./UpdatePassword.vue";

const { t } = useI18n();
const page = usePage();
const isAdmin = computed(() => page.props.isAdmin);
const props = defineProps(['user', 'editingByAdmin']);
const emit = defineEmits(['closeEditor']);
const editableUser = props.user;
const activeTab = ref('0')
const userTypes = computed(() => [
    { key: 'individual', value: t('auth.individual') },
    { key: 'legal_entity', value: t('auth.legalEntity') },
]);
const selectedUserType = ref(null);

const selectedCountryCode = ref('GE');

const form = useForm({
  name: null,
  email: null,
  lastname: null,
  can_view_wholesales: false,
  can_view_vip: false,
  can_view_inventory: false,
  allow_cash_payment: false,
  is_handyman: false,
  is_entrepreneur: false,
  tax_id: null,
  phone_country: selectedCountryCode.value,
  phone: null,
  address: null,
  user_type: null,
});

async function updateAccount(){
    if (selectedUserType.value?.key !== 'individual') {
        delete form.lastname
    }

    if(!isAdmin.value) {
        form.user_type = selectedUserType.value ? selectedUserType.value?.key : null
    } else {
        delete form.user_type
    }

    form.put(route('account.update', editableUser?.id), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
            emit('closeEditor', 200);
        },
        onError: (error) => {
            console.log(error)
            // emit('closeEditor', 422);
        }
    })
}

const passwordForm = useForm({
  current_password: null,
  password: null,
  password_confirmation: null,
});

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

watch(() => props.user, (user) => {
    if (!user) return;
    selectedUserType.value = {key: user.user_type, value: user.user_type === 'individual' ? t('auth.individual') : t('auth.legalEntity')};
    form.name = user.name;
    form.email = user.email;
    form.lastname = user.lastname;
    form.is_handyman = user.is_handyman;
    form.is_entrepreneur = user.is_entrepreneur;
    form.can_view_wholesales = user.can_view_wholesales;
    form.can_view_vip = user.can_view_vip;
    form.can_view_inventory = user.can_view_inventory;
    form.allow_cash_payment = user.allow_cash_payment;
    form.tax_id = user.tax_id;
    form.phone = user.phone;
    form.address = user.address;
}, { immediate: true });

</script>

<template>
  <Head>
    <title>{{ $t('account.settingsTitle') }}</title>
  </Head>
    <div class="mt-6">
        <Tabs v-model:value="activeTab">
            <TabList>
                <Tab value="0">{{ $t('account.profile') }}</Tab>
                <Tab v-if="!editingByAdmin" value="1">{{ $t('account.security') }}</Tab>
            </TabList>

            <TabPanels>
                <TabPanel value="0">
                    <Message v-if="$page.props.flash.message" class="w-full max-w-[360px] mb-4 mx-auto" icon="pi pi-check-circle" :closable="true" severity="success">
                        {{ $page.props.flash.message }}
                    </Message>

                    <!-- Form Validation Errors -->
                    <div v-if="Object.keys(form.errors).length > 0"
                         class="mb-6 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700/50 rounded-lg p-4 flex justify-between">
                        <div class="text-red-600 dark:text-red-200 text-sm">
                            <p v-for="(error, key, index) in form.errors" :key="key">{{ index+1 }}) {{ error }}</p>
                        </div>
                        <i class="pi pi-exclamation-circle text-red-400 mr-3 mt-0.5"></i>
                    </div>

                    <form @submit.prevent="updateAccount" class="w-full space-y-6 py-6">
                        <div class="grid grid-cols-1 w-full max-w-md mx-auto gap-y-6">
                            <FloatLabel variant="on" class="w-full">
                                <InputText class="w-full"
                                    id="name"
                                    v-model="form.name"
                                    :invalid="!!form.errors.name"
                                />
                                <label for="name">{{ $t('account.firstName') }}</label>
                            </FloatLabel>

                            <FloatLabel v-if="selectedUserType?.key === 'individual'" variant="on" class="w-full">
                                <InputText class="w-full"
                                    id="lastname"
                                    v-model="form.lastname"
                                    :invalid="!!form.errors.lastname"
                                />
                                <label for="lastname">{{ $t('account.lastName') }}</label>
                            </FloatLabel>

                            <FloatLabel v-if="editableUser.role !== 'admin'" variant="on" class="w-full">
                                <InputText class="w-full"
                                    id="tax_id"
                                    v-model="form.tax_id"
                                    :invalid="!!form.errors.tax_id"
                                />
                                <label for="tax_id">{{ selectedUserType?.key === 'legal_entity' ? $t('account.taxId') : $t('account.idNumber') }}</label>
                            </FloatLabel>

                            <FloatLabel variant="on" class="w-full">
                                <InputText class="w-full"
                                    id="phone"
                                    v-model="form.phone"
                                    :invalid="!!form.errors.phone"
                                />
                                <label for="phone">{{ $t('account.phone') }}</label>
                            </FloatLabel>

                            <FloatLabel variant="on">
                                <InputText class="w-full"
                                    id="email"
                                    v-model="form.email"
                                    :invalid="!!form.errors.email"
                                />
                                <label for="email">{{ $t('account.email') }}</label>
                            </FloatLabel>

                            <FloatLabel v-if="editableUser.role !== 'admin'" variant="on" class="w-full">
                                <InputText class="w-full"
                                    id="address"
                                    v-model="form.address"
                                    :invalid="!!form.errors.address"
                                />
                                <label for="address">{{ $t('account.address') }}</label>
                            </FloatLabel>

                            <FloatLabel v-if="editableUser.role !== 'admin'" variant="on" class="w-full">
                                <Select
                                    v-model="selectedUserType"
                                    :options="userTypes"
                                    optionLabel="key"
                                    class="w-full"
                                >
                                    <template #option="slotProps">
                                        <p>{{ slotProps.option.value }}</p>
                                    </template>
                                    <template #value="slotProps">
                                        {{ slotProps.value?.value }}
                                    </template>
                                </Select>
                                <label for="user_type">{{ $t('account.userType') }}</label>
                            </FloatLabel>


                            <div v-if="editingByAdmin" class="space-y-2">
                                <p class="text-sm sm:text-lg font-bold text-gray-500 mb-1">Permissions</p>

                                <div class="flex items-center gap-2">
                                    <Checkbox v-model="form.can_view_wholesales" binary />
                                    <label for="ingredient1"> Can view wholesales </label>
                                </div>

                                <div class="flex items-center gap-2">
                                    <Checkbox v-model="form.can_view_vip" binary />
                                    <label for="ingredient1"> Can view VIP prices </label>
                                </div>

                                <div class="flex items-center gap-2">
                                    <Checkbox v-model="form.can_view_inventory" binary />
                                    <label for="ingredient1"> Can view inventory </label>
                                </div>

                                <div class="flex items-center gap-2">
                                    <Checkbox v-model="form.allow_cash_payment" binary />
                                    <label for="ingredient1"> Allow cash payment </label>
                                </div>

                                <div class="flex items-center gap-2">
                                    <Checkbox v-model="form.is_entrepreneur" binary />
                                    <label for="ingredient1"> Is entrepreneur </label>
                                </div>

                                <div class="flex items-center gap-2">
                                    <Checkbox v-model="form.is_handyman" binary />
                                    <label for="ingredient1"> Is handyman </label>
                                </div>
                            </div>

                            <Button :disabled="form.processing"
                                    type="submit"
                                    class="bg-brand-500 border-none"
                                    :label="form.processing ? $t('common.pleaseWait') : $t('common.save')"
                                    size="small"
                                    :icon="form.processing ? 'pi pi-spin pi-spinner' :'pi pi-check'"
                            />
                        </div>

                    </form>
                </TabPanel>

                <TabPanel v-if="!editingByAdmin" value="1">
                    <UpdatePassword />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<style scoped>

</style>
