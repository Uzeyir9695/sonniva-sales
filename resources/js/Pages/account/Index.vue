<script setup>
import { useForm, usePage, Head } from '@inertiajs/vue3';
import {computed, onMounted, ref} from "vue";
import {useToast} from "primevue/usetoast";
import UpdatePassword from "./UpdatePassword.vue";

const toast = useToast();
const page = usePage();
const isAdmin = computed(() => page.props.isAdmin);
const props = defineProps(['user', 'editingByAdmin']);
const emit = defineEmits(['closeEditor']);
const editableUser = props.user;
const activeTab = ref('0')
const userTypes = ref([
    { key: 'individual', value: 'Individual' },
    { key: 'legal_entity', value: 'Legal Entity' },
]);
const selectedUserType = ref(null);

const selectedCountryCode = ref('GE');

const form = useForm({
  name: null,
  email: null,
  lastname: null,
  is_handyman: false,
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
            //toast.add({ severity: 'success', summary: 'Success', detail: page.props.flash.message, group: 'update-account', life: 12000 });
        },
        onError: (error) => {
            emit('closeEditor', 422);
            //toast.add({ severity: 'error', summary: 'Error', detail: error.message, group: 'update-account', life: 12000 });
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

onMounted(() => {
    const user = props.user;
    selectedUserType.value = {key: user.user_type, value: user.user_type === 'individual' ? 'Individual' : 'Legal Entity'};
    form.name = user.name;
    form.email = user.email;
    form.lastname = user.lastname;
    form.is_handyman = user.is_handyman;
    form.tax_id = user.tax_id;
    form.phone = user.phone;
    form.address = user.address;
});

</script>

<template>
    <Toast position="bottom-right" group="update-account" />
  <Head>
    <title>Settings</title>
  </Head>
    <div class="w-full max-w-6xl mx-auto mt-6">
        <Tabs v-model:value="activeTab">
            <TabList>
                <Tab value="0">Profile</Tab>
                <Tab v-if="!editingByAdmin" value="1">Security</Tab>
            </TabList>

            <TabPanels>
                <TabPanel value="0">
                    <Message v-if="$page.props.flash.message" class="w-full max-w-[360px] mb-4 mx-auto" icon="pi pi-check-circle" :closable="true" severity="success">
                        {{$page.props.flash.message }}
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
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <FloatLabel variant="on" class="w-full">
                                <InputText class="w-full"
                                    id="name"
                                    v-model="form.name"
                                    :invalid="!!form.errors.name"
                                />
                                <label for="name">Name</label>
                            </FloatLabel>

                            <FloatLabel v-if="selectedUserType?.key === 'individual'" variant="on" class="w-full">
                                <InputText class="w-full"
                                    id="lastname"
                                    v-model="form.lastname"
                                    :invalid="!!form.errors.lastname"
                                />
                                <label for="lastname">Lastname</label>
                            </FloatLabel>

                            <FloatLabel v-if="editableUser.role !== 'admin'" variant="on" class="w-full">
                                <InputText class="w-full"
                                    id="tax_id"
                                    v-model="form.tax_id"
                                    :invalid="!!form.errors.tax_id"
                                />
                                <label for="tax_id">{{ selectedUserType?.key === 'legal_entity' ? 'TAX ID' : 'ID Number' }}</label>
                            </FloatLabel>

                            <FloatLabel variant="on" class="w-full">
                                <InputText class="w-full"
                                    id="phone"
                                    v-model="form.phone"
                                    :invalid="!!form.errors.phone"
                                />
                                <label for="phone">Phone Number</label>
                            </FloatLabel>

                            <FloatLabel variant="on">
                                <InputText class="w-full"
                                    id="email"
                                    v-model="form.email"
                                    :invalid="!!form.errors.email"
                                />
                                <label for="email">Email</label>
                            </FloatLabel>

                            <FloatLabel v-if="editableUser.role !== 'admin'" variant="on" class="w-full">
                                <InputText class="w-full"
                                    id="address"
                                    v-model="form.address"
                                    :invalid="!!form.errors.address"
                                />
                                <label for="address">Address</label>
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
                                <label for="user_type">User Type</label>
                            </FloatLabel>

                        </div>
                        <div v-if="selectedUserType?.key === 'individual'" class="flex items-center gap-2">
                            <Checkbox v-model="form.is_handyman" binary />
                            <label for="ingredient1"> I am a handyman </label>
                        </div>

                        <Button :disabled="form.processing"
                                type="submit"
                                class="bg-blue-500 border-none"
                                :label="form.processing ? 'Please wait...' : 'Save Changes'"
                                size="medium"
                                :icon="form.processing ? 'pi pi-spin pi-spinner' :'pi pi-save'"
                        />
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
