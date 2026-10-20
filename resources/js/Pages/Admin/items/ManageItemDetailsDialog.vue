<script setup>
import { ref } from 'vue'
import { router, useHttp } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue'

const toast = useToast()

const languages = [
    { suffix: '', label: 'Georgian', flag: 'https://flagcdn.com/w40/ge.png' },
    { suffix: '_en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
    { suffix: '_ru', label: 'Russian', flag: 'https://flagcdn.com/w40/ru.png' },
    { suffix: '_tr', label: 'Turkish', flag: 'https://flagcdn.com/w40/tr.png' },
]

const emptyDetails = () => Object.fromEntries(
    languages.flatMap(({ suffix }) => [[`notice_title${suffix}`, ''], [`notice_description${suffix}`, '']])
)

const visible = ref(false)
const editingItem = ref(null)
const saving = ref(false)
const errors = ref({})
const details = useHttp(emptyDetails())

function open(item) {
    editingItem.value = item
    errors.value = {}
    Object.assign(details, emptyDetails())
    visible.value = true

    details.get(route('admin.items.details.show', item.id), {
        onSuccess: (data) => Object.assign(details, data),
        onError: () => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not load the item details.', life: 4000 })
        },
    })
}

defineExpose({ open })

function save() {
    saving.value = true
    const payload = Object.fromEntries(
        Object.keys(emptyDetails()).map(key => [key, details[key]?.trim() || null])
    )

    router.put(route('admin.items.details.update', editingItem.value.id), payload, {
        preserveScroll: true,
        onSuccess: (res) => {
            visible.value = false
            toast.add({ severity: 'success', summary: 'Saved', detail: res.props.flash.message, life: 3000 })
        },
        onError: (validationErrors) => {
            errors.value = validationErrors
        },
        onFinish: () => {
            saving.value = false
        },
    })
}
</script>

<template>
    <Dialog v-model:visible="visible" modal header="Manage Details" :style="{ width: '34rem' }">
        <div v-if="editingItem" class="space-y-4">
            <div>
                <p class="text-sm font-medium text-gray-800">{{ editingItem.name }}</p>
                <p class="text-xs text-gray-400 font-mono">{{ editingItem.no }}</p>
                <p class="text-xs text-gray-400 mt-1">Shown under the price on the item page. Leave a language empty to fall back to Georgian; leave everything empty to hide the box.</p>
            </div>

            <div v-if="details.processing" class="flex items-center gap-2 text-sm text-gray-400">
                <i class="pi pi-spinner pi-spin"></i> Loading details...
            </div>

            <template v-else>
                <div v-for="lang in languages" :key="lang.suffix" class="space-y-2">
                    <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                        <img :src="lang.flag" class="w-5 h-3.5 object-cover rounded-xs shrink-0" alt="" />
                        {{ lang.label }}
                    </label>
                    <PrimeInputText
                        v-model="details[`notice_title${lang.suffix}`]"
                        placeholder="Title"
                        :invalid="!!errors[`notice_title${lang.suffix}`]"
                        class="w-full"
                        fluid
                    />
                    <p v-if="errors[`notice_title${lang.suffix}`]" class="text-xs text-red-500">{{ errors[`notice_title${lang.suffix}`] }}</p>
                    <Textarea
                        v-model="details[`notice_description${lang.suffix}`]"
                        rows="3"
                        placeholder="Description"
                        :invalid="!!errors[`notice_description${lang.suffix}`]"
                        class="w-full rounded-xl text-sm"
                    />
                    <p v-if="errors[`notice_description${lang.suffix}`]" class="text-xs text-red-500">{{ errors[`notice_description${lang.suffix}`] }}</p>
                </div>
            </template>
        </div>

        <template #footer>
            <Button label="Cancel" size="small" severity="secondary" variant="text" @click="visible = false" />
            <Button
                label="Save"
                size="small"
                icon="pi pi-check"
                :loading="saving"
                :disabled="details.processing"
                @click="save"
            />
        </template>
    </Dialog>
</template>
