<script setup>
import { ref, computed, reactive } from 'vue'
import { Link, router, usePage } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import { useCart } from '@/composables/useCart'
import PlacesAutocomplete from '@/Shared/components/PlacesAutocomplete.vue'
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue';

const props = defineProps({
    cartItems: { type: Array, required: true },
})

const page = usePage()
const toast = useToast()
const { getQuantity, uniqueCount } = useCart()

// ─── Tiered price helper ───────────────────────────────────────────────────

function calculateTierPrice(item, qty) {
    if (!item.prices?.length) return item.unit_price
    const tier = [...item.prices]
        .sort((a, b) => b.custMinQuantity - a.custMinQuantity)
        .find(p => qty >= p.custMinQuantity)
    return tier?.price ?? item.unit_price
}

// ─── Cart items with reactive quantities ──────────────────────────────────

const items = computed(() =>
    props.cartItems.map(c => ({
        ...c,
        qty: getQuantity(c.item_id) || c.quantity,
        unitPrice: calculateTierPrice(c.item, getQuantity(c.item_id) || c.quantity),
        rowTotal: calculateTierPrice(c.item, getQuantity(c.item_id) || c.quantity) * (getQuantity(c.item_id) || c.quantity),
    }))
)

const subtotal = computed(() =>
    items.value.reduce((sum, c) => sum + c.rowTotal, 0)
)

// ─── Delivery ─────────────────────────────────────────────────────────────

const deliveryTypes = [
    { key: 'office',   label: 'თვითგატანა ოფისიდან',   price: 0 },
    { key: 'tbilisi',  label: 'მიწოდება თბილისში',      price: 70 },
    { key: 'regions',  label: 'მიწოდება რეგიონებში',    price: 200 },
]

const selectedDelivery = ref(null)

const deliveryCost = computed(() => {
    if (!selectedDelivery.value) return 0
    if (selectedDelivery.value.key === 'tbilisi' && subtotal.value >= 1000) return 0
    return selectedDelivery.value.price
})

const total = computed(() => subtotal.value + deliveryCost.value)

const freeDeliveryNotice = computed(() =>
    selectedDelivery.value?.key === 'tbilisi' && subtotal.value >= 1000
)

// ─── Payment providers ────────────────────────────────────────────────────

const providers = [
    { name: 'PCB ბანკი', icon: '/payments/pcb.jpeg', code: 'pcb' },
    { name: 'BOG ბანკი',     icon: '/payments/bog.png',     code: 'bog' },
    { name: 'TBC ბანკი',     icon: '/payments/tbc.png',     code: 'tbc' },
    { name: 'ინვოისით გადახდა', icon: '/payments/invoice-icon.png', code: 'invoice' },
]

const selectedProvider = ref(null)

// ─── Form ─────────────────────────────────────────────────────────────────

const form = reactive({
    address: null,
    apartment_number: null,
    comment: null,
    agreement: false,
})

const loading = ref(false)

const formatted = (val) => Number(val).toFixed(2)

function showError(detail) {
    toast.add({ severity: 'error', summary: 'შეცდომა', detail, life: 5000 })
}

// ─── Validation & submit ──────────────────────────────────────────────────

function initiatePayment() {
    if (!selectedDelivery.value) {
        showError('გთხოვთ აირჩიოთ მიწოდების ტიპი')
        return
    }
    if (selectedDelivery.value.key !== 'office' && !form.address) {
        showError('გთხოვთ შეიყვანოთ მიწოდების მისამართი')
        return
    }
    if (!selectedProvider.value) {
        showError('გთხოვთ აირჩიოთ გადახდის მეთოდი')
        return
    }
    if (!form.agreement) {
        showError('გთხოვთ დაეთანხმოთ წესებსა და პირობებს')
        return
    }

    loading.value = true

    const data = {
        delivery_type:    selectedDelivery.value.key,
        delivery_cost:    deliveryCost.value,
        address:          form.address,
        apartment_number: form.apartment_number,
        comment:          form.comment,
        provider:         selectedProvider.value.code,
        item_ids: items.value.map(c => ( c.item_id)),
    }

    if (selectedProvider.value.code === 'invoice') {
        router.post(route('initiate.payment.invoice'), data, {
            onSuccess: () => { loading.value = false },
            onError: (err) => {
                showError(err?.message || 'დაფიქსირდა შეცდომა')
                loading.value = false
            },
        })
    } else {
        axios.post(route('payment.initiate'), data)
            .then(res => {
                if (res.data.redirect_url) {
                    window.location.href = res.data.redirect_url
                } else {
                    showError('ბანკიდან პასუხი ვერ მივიღეთ')
                    loading.value = false
                }
            })
            .catch(err => {
                showError(err.response?.data?.error || 'დაფიქსირდა შეცდომა')
                loading.value = false
            })
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

            <!-- Header -->
            <div class="mb-8">
                <Link
                    :href="route('cart.index')"
                    class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-4 cursor-pointer"
                >
                    <i class="pi pi-arrow-left text-xs"></i>
                    კალათაში დაბრუნება
                </Link>
                <h1 class="text-2xl font-bold text-gray-900">შეკვეთის გაფორმება</h1>
                <p class="text-gray-500 text-sm mt-1">{{ uniqueCount }} პროდუქტი</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- ── Left: Form ── -->
                <div class="lg:col-span-2 space-y-4">

                    <!-- Delivery type -->
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i class="pi pi-truck text-brand-500"></i>
                            მიწოდების ტიპი
                        </h2>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button
                                v-for="type in deliveryTypes"
                                :key="type.key"
                                @click="selectedDelivery = type"
                                class="relative flex flex-col items-start gap-1 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 text-left"
                                :class="selectedDelivery?.key === type.key
                                    ? 'border-brand-500 bg-brand-50/50'
                                    : 'border-gray-100 hover:border-gray-200 bg-white'"
                            >
                                <div class="flex items-center justify-between w-full">
                                    <span class="text-sm font-semibold text-gray-800">{{ type.label }}</span>
                                    <div
                                        class="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                                        :class="selectedDelivery?.key === type.key
                                            ? 'border-brand-500'
                                            : 'border-gray-300'"
                                    >
                                        <div v-if="selectedDelivery?.key === type.key" class="w-2 h-2 rounded-full bg-brand-500"></div>
                                    </div>
                                </div>
                                <span class="text-xs" :class="type.price === 0 ? 'text-emerald-600 font-medium' : 'text-gray-400'">
                                    {{ type.price === 0 ? 'უფასო' : type.price + ' ₾' }}
                                </span>
                            </button>
                        </div>

                        <!-- Free delivery notice -->
                        <div
                            v-if="freeDeliveryNotice"
                            class="mt-3 flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl"
                        >
                            <i class="pi pi-check-circle"></i>
                            შეკვეთა 1000₾-ზე მეტია — თბილისში მიწოდება უფასოა!
                        </div>

                        <!-- Tbilisi free delivery hint -->
                        <div
                            v-else-if="selectedDelivery?.key === 'tbilisi' && subtotal < 1000"
                            class="mt-3 flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-xl"
                        >
                            <i class="pi pi-info-circle"></i>
                            1000₾-ზე მეტ შეკვეთაზე თბილისში მიწოდება უფასოა
                        </div>
                    </div>

                    <!-- Address -->
                    <div
                        v-if="selectedDelivery && selectedDelivery.key !== 'office'"
                        class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                    >
                        <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i class="pi pi-map-marker text-brand-500"></i>
                            მიწოდების მისამართი
                        </h2>

                        <div class="space-y-4">
                            <PlacesAutocomplete v-model="form.address" />

                            <PrimeInputText
                                v-model="form.apartment_number"
                                placeholder="ბინის / ოფისის ნომერი (არასავალდებულო)"
                                class="p-2.5"
                            />
                        </div>
                    </div>

                    <!-- Office pickup info -->
                    <div
                        v-if="selectedDelivery?.key === 'office'"
                        class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                    >
                        <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i class="pi pi-building text-brand-500"></i>
                            გატანის წერტილები
                        </h2>
                        <ul class="space-y-2 text-sm text-gray-600">
                            <li class="flex items-start gap-2">
                                <i class="pi pi-map-marker text-brand-500 mt-0.5 shrink-0"></i>
                                <span>ავჭალა, შუშის ქუჩა 38 — ორშაბათი-პარასკევი 09:00-18:00</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="pi pi-map-marker text-brand-500 mt-0.5 shrink-0"></i>
                                <span>დიდუბე, მექანიზაციის ქუჩა 1 — ორშაბათი-პარასკევი 09:00-18:00</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Comment -->
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i class="pi pi-comment text-brand-500"></i>
                            კომენტარი
                            <span class="text-xs text-gray-400 font-normal">(არასავალდებულო)</span>
                        </h2>
                        <Textarea
                            v-model="form.comment"
                            placeholder="სპეციალური მოთხოვნები, შენიშვნები..."
                            rows="3"
                            class="w-full rounded-xl resize-none"
                        />
                    </div>

                    <!-- Payment method -->
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i class="pi pi-credit-card text-brand-500"></i>
                            გადახდის მეთოდი
                        </h2>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button
                                v-for="provider in providers"
                                :key="provider.code"
                                @click="selectedProvider = provider"
                                class="flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 text-left"
                                :class="selectedProvider?.code === provider.code
                                    ? 'border-brand-500 bg-brand-50/50'
                                    : 'border-gray-100 hover:border-gray-200 bg-white'"
                            >
                                <img
                                    :src="provider.icon"
                                    :alt="provider.name"
                                    class="w-8 h-8 object-contain rounded-lg shrink-0"
                                />
                                <span class="text-sm font-semibold text-gray-800">{{ provider.name }}</span>
                                <div class="ml-auto">
                                    <div
                                        class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                                        :class="selectedProvider?.code === provider.code
                                            ? 'border-brand-500'
                                            : 'border-gray-300'"
                                    >
                                        <div v-if="selectedProvider?.code === provider.code" class="w-2 h-2 rounded-full bg-brand-500"></div>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <!-- Card logos -->
                        <div class="mt-4 flex items-center gap-3">
                            <img src="/payments/payment-cards.jpeg" class="h-6 object-contain rounded" alt="payment cards" />
                            <span class="text-xs text-gray-400">Visa, Mastercard</span>
                        </div>
                    </div>

                    <!-- Agreement -->
                    <div class="flex items-start gap-3 px-1">
                        <Checkbox v-model="form.agreement" inputId="agreement" binary class="mt-0.5 cursor-pointer" />
                        <label for="agreement" class="text-sm text-gray-600 cursor-pointer leading-relaxed">
                            ვეთანხმები
                            <a :href="route('terms-of-service')" target="_blank" class="text-brand-500 hover:underline">წესებსა და პირობებს</a>
                        </label>
                    </div>

                </div>

                <!-- ── Right: Order summary ── -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
                        <h2 class="text-base font-bold text-gray-900 mb-5">შეკვეთის შეჯამება</h2>

                        <!-- Items list -->
                        <div class="space-y-3 mb-5 h-36 border border-gray-100 rounded-xl p-2 overflow-y-auto">
                            <div
                                v-for="cartItem in items"
                                :key="cartItem.item_id"
                                class="flex items-center gap-3"
                            >
                                <div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                                    <img
                                        v-if="cartItem.item.images?.length"
                                        :src="`${cartItem.item.storage_path}/${cartItem.item.images[0]}`"
                                        :alt="cartItem.item.name"
                                        class="w-full h-full object-cover"
                                    />
                                    <div v-else class="w-full h-full flex items-center justify-center">
                                        <i class="pi pi-image text-gray-300 text-xs"></i>
                                    </div>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-xs text-gray-700 font-medium line-clamp-1">{{ cartItem.item.name }}</p>
                                    <p class="text-xs text-gray-400 mt-0.5">{{ cartItem.qty }} × {{ formatted(cartItem.unitPrice) }} ₾</p>
                                </div>
                                <span class="text-sm font-semibold text-gray-800 shrink-0">{{ formatted(cartItem.rowTotal) }} ₾</span>
                            </div>
                        </div>

                        <div class="h-px bg-gray-100 mb-4"></div>

                        <!-- Totals -->
                        <div class="space-y-2.5 text-sm mb-5">
                            <div class="flex justify-between text-gray-500">
                                <span>{{ uniqueCount }} პროდუქტი</span>
                                <span class="font-medium text-gray-700">{{ formatted(subtotal) }} ₾</span>
                            </div>
                            <div class="flex justify-between text-gray-500">
                                <span>მიწოდება</span>
                                <span
                                    :class="deliveryCost === 0 ? 'text-emerald-600 font-medium' : 'font-medium text-gray-700'"
                                >
                                    {{ deliveryCost === 0 ? 'უფასო' : formatted(deliveryCost) + ' ₾' }}
                                </span>
                            </div>
                        </div>

                        <div class="h-px bg-gray-100 mb-4"></div>

                        <div class="flex justify-between items-center mb-6">
                            <span class="font-bold text-gray-900">სულ</span>
                            <span class="text-xl font-bold text-brand-500">{{ formatted(total) }} ₾</span>
                        </div>

                        <!-- Pay button -->
                        <button
                            @click="initiatePayment"
                            :disabled="loading"
                            class="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md cursor-pointer
                                   active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                            :class="loading
                                ? 'bg-brand-400 text-white'
                                : 'bg-brand-500 hover:bg-brand-400 text-white'"
                        >
                            <i :class="loading ? 'pi pi-spinner pi-spin mr-2' : 'pi pi-lock mr-2'"></i>
                            {{ loading ? 'მიმდინარეობს...' : 'გადახდა — ' + formatted(total) + ' ₾' }}
                        </button>

                        <div class="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <i class="pi pi-shield text-xs"></i>
                            უსაფრთხო გადახდა SSL დაშიფვრით
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
