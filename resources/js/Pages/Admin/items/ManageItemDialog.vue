<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue'
import InputNumber from 'primevue/inputnumber'

const emit = defineEmits(['saved'])

const toast = useToast()

const visible = ref(false)
const editingItem = ref(null)

const manageForm = useForm({
    video_url: '',
    discount: null,
    discount_amount: null,
    wholesale_discount_percent: null,
    vip_discount_percent: null,
    bc_discount_percent: null,
    fake_price: null,
})

function open(item) {
    editingItem.value = item
    manageForm.clearErrors()
    manageForm.video_url = item.video_url ?? ''
    manageForm.discount = item.discount ?? null
    manageForm.wholesale_discount_percent = item.wholesale_discount_percent ?? null
    manageForm.vip_discount_percent = item.vip_discount_percent ?? null
    manageForm.bc_discount_percent = item.bc_discount_percent ?? null
    manageForm.fake_price = item.fake_price ?? null
    visible.value = true
}

defineExpose({ open })

function saveItem() {
    manageForm
        .transform(data => ({
            video_url: data.video_url.trim() || null,
            discount: data.discount || null,
            discount_amount: data.discount_amount || null,
            wholesale_discount_percent: data.wholesale_discount_percent || null,
            vip_discount_percent: data.vip_discount_percent || null,
            bc_discount_percent: data.bc_discount_percent || null,
            fake_price: data.fake_price || null,
        }))
        .put(route('admin.items.update', editingItem.value.id), {
            preserveScroll: true,
            onSuccess: (res) => {
                editingItem.value.video_url = manageForm.video_url.trim() || null
                editingItem.value.fake_price = manageForm.fake_price || null
                visible.value = false
                toast.add({ severity: 'success', summary: 'Saved', detail: res.props.flash.message, life: 3000 })
                // Discount may have been derived server-side from the ₾ amount -
                // let the parent refetch so the list shows the actual saved percentage/price.
                emit('saved')
            },
        })
}
</script>

<template>
    <Dialog v-model:visible="visible" modal header="Manage Item" :style="{ width: '28rem' }">
        <div v-if="editingItem" class="space-y-4">
            <div>
                <p class="text-sm font-medium text-gray-800">{{ editingItem.name }}</p>
                <p class="text-xs text-gray-400 font-mono">{{ editingItem.no }}</p>
            </div>

            <div>
                <label class="text-sm font-semibold text-gray-500 mb-1 block">Video Link</label>
                <PrimeInputText
                    v-model="manageForm.video_url"
                    placeholder="https://youtu.be/..."
                    :invalid="!!manageForm.errors.video_url"
                    class="w-full"
                    fluid
                />
                <p v-if="manageForm.errors.video_url" class="text-xs text-red-500 mt-1">{{ manageForm.errors.video_url }}</p>
                <p v-else class="text-xs text-gray-400 mt-1">Paste the link from YouTube's Share button. Leave empty to remove the video.</p>
            </div>

            <div>
                <label class="text-sm font-semibold text-gray-500 mb-1 block">Fake "Was" Price (₾)</label>
                <InputNumber
                    v-model="manageForm.fake_price"
                    :min="0"
                    :min-fraction-digits="0"
                    :max-fraction-digits="2"
                    suffix=" ₾"
                    placeholder="0"
                    :invalid="!!manageForm.errors.fake_price"
                    showClear
                    fluid
                />
                <p v-if="manageForm.errors.fake_price" class="text-xs text-red-500 mt-1">{{ manageForm.errors.fake_price }}</p>
                <p v-else class="text-xs text-gray-400 mt-1">Must be higher than the unit price ({{ Number(editingItem.unit_price).toFixed(2) }} ₾). Shown struck-through as the "was" price; the unit price stays the real charge. Leave empty to disable.</p>
            </div>

            <div>
                <label class="text-sm font-semibold text-gray-500 mb-1 block">Web Discount (in %)</label>
                <InputNumber
                    v-model="manageForm.discount"
                    :min="0"
                    :max="100"
                    :min-fraction-digits="0"
                    :max-fraction-digits="4"
                    suffix="%"
                    placeholder="0"
                    :invalid="!!manageForm.errors.discount"
                    showClear
                    fluid
                />
                <p v-if="manageForm.errors.discount" class="text-xs text-red-500 mt-1">{{ manageForm.errors.discount }}</p>
                <p v-else class="text-xs text-gray-400 mt-1">Percentage off unit price (off the fake price instead, if one is set). Leave empty for no discount.</p>
            </div>

            <div>
                <label class="text-sm font-semibold text-gray-500 mb-1 block">BC Discount (in %)</label>
                <InputNumber
                    v-model="manageForm.bc_discount_percent"
                    :min="0"
                    :max="100"
                    :min-fraction-digits="0"
                    :max-fraction-digits="4"
                    suffix="%"
                    placeholder="0"
                    :invalid="!!manageForm.errors.bc_discount_percent"
                    showClear
                    fluid
                />
                <p v-if="manageForm.errors.bc_discount_percent" class="text-xs text-red-500 mt-1">{{ manageForm.errors.bc_discount_percent }}</p>
                <p v-else class="text-xs text-gray-400 mt-1">Percentage sent to Business Central on regular (non-wholesale/VIP) orders. Independent of the Web Discount above unless an Amount Off is set below; leave empty to send no discount to BC.</p>
            </div>

            <div>
                <label class="text-sm font-semibold text-gray-500 mb-1 block">Amount Off (₾)</label>
                <InputNumber
                    v-model="manageForm.discount_amount"
                    :min="0"
                    :max="Number(editingItem.unit_price)"
                    :min-fraction-digits="0"
                    :max-fraction-digits="2"
                    suffix=" ₾"
                    placeholder="0"
                    :invalid="!!manageForm.errors.discount_amount"
                    showClear
                    fluid
                />
                <p v-if="manageForm.errors.discount_amount" class="text-xs text-red-500 mt-1">{{ manageForm.errors.discount_amount }}</p>
                <p v-else class="text-xs text-gray-400 mt-1">e.g. price is {{ Number(editingItem.unit_price).toFixed(2) }} ₾, enter 1 to make it {{ (editingItem.unit_price - 1).toFixed(2) }} ₾. Overrides both the Web Discount and BC Discount percentages above if filled.</p>
            </div>

            <div>
                <label class="text-sm font-semibold text-gray-500 mb-1 block">Wholesale Discount (in %)</label>
                <InputNumber
                    v-model="manageForm.wholesale_discount_percent"
                    :min="0"
                    :max="100"
                    :min-fraction-digits="0"
                    :max-fraction-digits="2"
                    suffix="%"
                    placeholder="0"
                    :invalid="!!manageForm.errors.wholesale_discount_percent"
                    showClear
                    fluid
                />
                <p v-if="manageForm.errors.wholesale_discount_percent" class="text-xs text-red-500 mt-1">{{ manageForm.errors.wholesale_discount_percent }}</p>
                <p v-else class="text-xs text-gray-400 mt-1">Percentage off the Wholesale tier price. Leave empty for no extra discount.</p>
            </div>

            <div>
                <label class="text-sm font-semibold text-gray-500 mb-1 block">VIP Discount (in %)</label>
                <InputNumber
                    v-model="manageForm.vip_discount_percent"
                    :min="0"
                    :max="100"
                    :min-fraction-digits="0"
                    :max-fraction-digits="2"
                    suffix="%"
                    placeholder="0"
                    :invalid="!!manageForm.errors.vip_discount_percent"
                    showClear
                    fluid
                />
                <p v-if="manageForm.errors.vip_discount_percent" class="text-xs text-red-500 mt-1">{{ manageForm.errors.vip_discount_percent }}</p>
                <p v-else class="text-xs text-gray-400 mt-1">Percentage off the VIP tier price. Leave empty for no extra discount.</p>
            </div>
        </div>

        <template #footer>
            <Button label="Cancel" size="small" severity="secondary" variant="text" @click="visible = false" />
            <Button
                label="Save"
                size="small"
                icon="pi pi-check"
                :loading="manageForm.processing"
                @click="saveItem"
            />
        </template>
    </Dialog>
</template>