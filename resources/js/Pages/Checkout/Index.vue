<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { Link, router, usePage } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import { useCart } from '@/composables/useCart'
import { calculateTierPrice } from '@/composables/usePricing.js'
import PlacesAutocomplete from '@/Shared/components/PlacesAutocomplete.vue'
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue'
import AutoComplete from 'primevue/autocomplete'

const props = defineProps({
    cartItems: { type: Array, required: true },
})

const page = usePage()
const toast = useToast()
const { getQuantity } = useCart()

const isVip = computed(() => page.props.user?.can_view_vip ?? false)

// ─── Cart items with reactive quantities ──────────────────────────────────

const items = computed(() =>
    props.cartItems.map(c => ({
        ...c,
        qty: getQuantity(c.item_id, c.selected_uom) || c.quantity,
        unitPrice: calculateTierPrice(c.item, getQuantity(c.item_id, c.selected_uom) || c.quantity, c.selected_uom, isVip.value),
        rowTotal: calculateTierPrice(c.item, getQuantity(c.item_id, c.selected_uom) || c.quantity, c.selected_uom, isVip.value) * (getQuantity(c.item_id, c.selected_uom) || c.quantity),
    }))
)

const subtotal = computed(() =>
    items.value.reduce((sum, c) => sum + c.rowTotal, 0)
)

// ─── Delivery ─────────────────────────────────────────────────────────────

const DELIVERY_RATES = [
    { maxKg: 1,    region: 10.5, office: 6,   village: 15.5 },
    { maxKg: 5,    region: 12.5, office: 6,   village: 17.5 },
    { maxKg: 10,   region: 16,   office: 10,  village: 21   },
    { maxKg: 15,   region: 21,   office: 15,  village: 26   },
    { maxKg: 20,   region: 26,   office: 20,  village: 31   },
    { maxKg: 30,   region: 36,   office: 30,  village: 45   },
    { maxKg: 50,   region: 65,   office: 50,  village: 80   },
    { maxKg: 100,  region: 105,  office: 80,  village: 120  },
    { maxKg: 150,  region: 145,  office: 110, village: 175  },
    { maxKg: 200,  region: 185,  office: 140, village: 215  },
    { maxKg: 250,  region: 220,  office: 170, village: 250  },
    { maxKg: 300,  region: 260,  office: 200, village: 290  },
    { maxKg: 500,  region: 340,  office: 280, village: 390  },
    { maxKg: 750,  region: 450,  office: 370, village: 500  },
    { maxKg: 1000, region: 700,  office: 510, village: 750  },
]

function calcDeliveryPrice(weightKg, type) {
    const rate = DELIVERY_RATES.find(r => weightKg <= r.maxKg)
    return (rate ?? DELIVERY_RATES[DELIVERY_RATES.length - 1])[type]
}

const deliveryTypes = [
    { key: 'office',   label: 'თვითგატანა სონივას ფილიალიდან' },
    { key: 'tbilisi',  label: 'მიწოდება თბილისში' },
    { key: 'regions',  label: 'მიწოდება რეგიონებში' },
]

const regionOptions = [
    { key: 'onway_office', label: 'OnWay-ის ფილიალიდან გატანა', icon: 'fa-solid fa-warehouse' },
    { key: 'address',      label: 'ადგილზე მიტანა',             icon: 'fa-solid fa-truck-fast' },
]

const onwayBranches = [
    'რუსთავი', 'ბათუმი', 'ზუგდიდი', 'ქუთაისი',
    'ფოთი', 'ზესტაფონი', 'ხაშური', 'ახალციხე', 'თელავი', 'სამტრედია',
]


const selectedDelivery = ref(null)
const selectedRegionOption = ref(null)
const selectedOnwayBranch = ref(null)
const selectedZone = ref(null)
const selectedTbilisiZone = ref(null)
const zones = ref([])
const zoneSuggestions = ref([])
const zonesLoading = ref(false)

const TBILISI_FREE_THRESHOLD = 500

const tbilisiZoneOptions = [
    {
        label: 'I ზონა – 40 ₾',
        price: 40,
        items: [
            'გლდანი', 'გლდანულა', 'სოფელი გლდანი', 'ზაჰესი', 'ავჭალა',
            'თემქა', 'მუხიანი', 'დიღომი 7', 'დიღმის მასივი', 'დიდი დიღომი', 'სოფელი დიღომი',
        ].map(name => ({ name, price: 40 })),
    },
    {
        label: 'II ზონა – 50 ₾',
        price: 50,
        items: [
            'ვაკე', 'საბურთალო', 'ბაგები', 'ლისი', 'ვაშლიჯვარი', 'ორთაჭალა',
            'მთაწმინდა', 'სოლოლაკი', 'ვერა', 'დიდუბე', 'ჩუღურეთი', 'ნაძალადევი',
        ].map(name => ({ name, price: 50 })),
    },
    {
        label: 'III ზონა – 60 ₾',
        price: 60,
        items: [
            'ისანი', 'სამგორი', 'ლილო', 'ორხევი', 'აეროპორტის დასახლება',
            'ქვემო ფონიჭალა', 'ზემო ფონიჭალა', 'რუსთავი', 'ვარკეთილი', 'წყნეთი',
            'კოჯორი', 'ტაბახმელა', 'წავკისი', 'შინდისი', 'ოქროყანა', 'ნაფეტვრები',
        ].map(name => ({ name, price: 60 })),
    },
]

const GEO_TO_LATIN = {
    'ა':'a','ბ':'b','გ':'g','დ':'d','ე':'e','ვ':'v','ზ':'z','თ':'t',
    'ი':'i','კ':'k','ლ':'l','მ':'m','ნ':'n','ო':'o','პ':'p','ჟ':'zh',
    'რ':'r','ს':'s','ტ':'t','უ':'u','ფ':'f','ქ':'k','ღ':'gh','ყ':'q',
    'შ':'sh','ჩ':'ch','ც':'ts','ძ':'dz','წ':'ts','ჭ':'ch','ხ':'kh',
    'ჯ':'j','ჰ':'h',
}

function geoToLatin(text) {
    return text.split('').map(c => GEO_TO_LATIN[c] ?? c).join('').toLowerCase()
}

function filterZones(event) {
    const query = event.query.toLowerCase()
    zoneSuggestions.value = query
        ? zones.value.filter(z =>
            z.name.toLowerCase().includes(query) ||
            geoToLatin(z.name).includes(query)
          )
        : zones.value
}

function selectDelivery(type) {
    selectedDelivery.value = type
    selectedRegionOption.value = null
    selectedOnwayBranch.value = null
    selectedZone.value = null
    selectedTbilisiZone.value = null
}

async function fetchZones() {
    if (zones.value.length) return
    zonesLoading.value = true
    try {
        const res = await axios.get(route('checkout.onway-regions'))
        zones.value = res.data.zones ?? []
    } catch {
        toast.add({ severity: 'error', summary: 'შეცდომა', detail: 'ზონების ჩატვირთვა ვერ მოხდა', life: 4000 })
    } finally {
        zonesLoading.value = false
    }
}

watch(selectedRegionOption, (val) => {
    if (val === 'address') fetchZones()
    selectedZone.value = null
})

const totalWeightKg = computed(() =>
    items.value.reduce((sum, cartItem) => {
        const item = cartItem.item
        const qty = cartItem.qty

        if (item.unit_price == 0 && cartItem.selected_uom) {
            const entry = (item.weights ?? []).find(w => w.uom === cartItem.selected_uom)
            return sum + (entry ? entry.weight * qty : 0)
        }

        return sum + ((item.weights?.[0]?.weight ?? 0) * qty)
    }, 0)
)

const deliveryPriceType = computed(() => {
    const key = selectedDelivery.value?.key
    if (!key || key === 'office') return null
    if (key === 'tbilisi') return 'tbilisi'
    if (key === 'regions') {
        if (selectedRegionOption.value === 'onway_office') return 'office'
        if (selectedRegionOption.value === 'address' && selectedZone.value?.name) {
            return selectedZone.value.name.includes('>') ? 'village' : 'region'
        }
    }
    return null
})

const deliveryCost = computed(() => {
    const key = selectedDelivery.value?.key
    if (!key) return null
    if (key === 'office') return 0
    if (key === 'tbilisi') {
        if (!selectedTbilisiZone.value) return null
        return subtotal.value >= TBILISI_FREE_THRESHOLD ? 0 : selectedTbilisiZone.value.price
    }
    const type = deliveryPriceType.value
    if (!type) return null
    return calcDeliveryPrice(totalWeightKg.value, type)
})

const total = computed(() => subtotal.value + (deliveryCost.value ?? 0))

const showAddressField = computed(() =>
    selectedDelivery.value?.key === 'tbilisi' ||
    (selectedDelivery.value?.key === 'regions' && selectedRegionOption.value === 'address')
)

// ─── Payment providers ────────────────────────────────────────────────────

const providers = [
    { name: 'PCB ბანკი',         icon: '/payments/pcb.jpeg',         code: 'pcb' },
    { name: 'BOG ბანკი',         icon: '/payments/bog.png',           code: 'bog' },
    { name: 'TBC ბანკი',         icon: '/payments/tbc.png',           code: 'tbc' },
    { name: 'საბანკო გადარიცხვა',  icon: '/payments/invoice-icon.png',  code: 'invoice' },
    { name: 'ლიმიტით გადახდა',   icon: '',  code: 'limit' },
]

const selectedProvider = ref(null)

// ─── Credit limit ─────────────────────────────────────────────────────────

const creditInfo = ref(null)
const creditLoading = ref(false)

async function fetchCreditInfo() {
    if (creditInfo.value !== null) return
    creditLoading.value = true
    try {
        const res = await axios.get(route('checkout.credit-info'))
        creditInfo.value = res.data
    } catch {
        creditInfo.value = { has_credit: false, available: 0, limit: 0, used: 0 }
    } finally {
        creditLoading.value = false
    }
}

watch(selectedProvider, (val) => {
    if (val?.code === 'limit') fetchCreditInfo()
})

const canPayWithLimit = computed(() => {
    if (!creditInfo.value) return false
    return creditInfo.value.has_credit && creditInfo.value.available >= total.value
})

const payButtonDisabled = computed(() =>
    loading.value || (selectedProvider.value?.code === 'limit' && !canPayWithLimit.value)
)

// ─── Form ─────────────────────────────────────────────────────────────────

const form = reactive({
    address: null,
    apartment_number: null,
    comment: null,
    agreement: false,
})

const loading = ref(false)

const formatted = (val) => Number(val).toFixed(2)

const errors = reactive({
    deliveryType: null,
    tbilisiZone: null,
    regionOption: null,
    onwayBranch: null,
    regionZone: null,
    address: null,
    provider: null,
    agreement: null,
})

function clearErrors() {
    Object.keys(errors).forEach(k => errors[k] = null)
}

watch(selectedDelivery, () => { errors.deliveryType = null })
watch(selectedTbilisiZone, () => { errors.tbilisiZone = null })
watch(selectedRegionOption, () => { errors.regionOption = null })
watch(selectedOnwayBranch, () => { errors.onwayBranch = null })
watch(selectedZone, () => { errors.regionZone = null })
watch(() => form.address, () => { errors.address = null })
watch(selectedProvider, () => { errors.provider = null })
watch(() => form.agreement, () => { errors.agreement = null })

// ─── Validation & submit ──────────────────────────────────────────────────

function validate() {
    clearErrors()
    let valid = true

    if (!selectedDelivery.value) {
        errors.deliveryType = 'გთხოვთ აირჩიოთ მიწოდების ტიპი'
        valid = false
    }
    if (selectedDelivery.value?.key === 'tbilisi' && !selectedTbilisiZone.value) {
        errors.tbilisiZone = 'გთხოვთ აირჩიოთ თბილისის ზონა'
        valid = false
    }
    if (selectedDelivery.value?.key === 'regions' && !selectedRegionOption.value) {
        errors.regionOption = 'გთხოვთ აირჩიოთ მიწოდების ვარიანტი'
        valid = false
    }
    if (selectedRegionOption.value === 'onway_office' && !selectedOnwayBranch.value) {
        errors.onwayBranch = 'გთხოვთ აირჩიოთ OnWay ფილიალი'
        valid = false
    }
    if (selectedRegionOption.value === 'address' && !selectedZone.value) {
        errors.regionZone = 'გთხოვთ აირჩიოთ ქალაქი/სოფელი'
        valid = false
    }
    if (showAddressField.value && !form.address) {
        errors.address = 'გთხოვთ შეიყვანოთ მიწოდების მისამართი'
        valid = false
    }
    if (!selectedProvider.value) {
        errors.provider = 'გთხოვთ აირჩიოთ გადახდის მეთოდი'
        valid = false
    }
    if (!form.agreement) {
        errors.agreement = 'გთხოვთ დაეთანხმოთ წესებსა და პირობებს'
        valid = false
    }

    return valid
}

function initiatePayment() {
    if (!validate()) {
        toast.add({
            severity: 'error',
            summary: 'შეცდომა',
            detail: 'გთხოვთ შეასწოროთ მონიშნული ველები გაგრძელებამდე',
            life: 5000,
        })
        return
    }

    loading.value = true

    const city = selectedTbilisiZone.value?.name ?? selectedOnwayBranch.value ?? selectedZone.value?.name ?? null

    const deliveryKey = selectedDelivery.value.key
    const branch = deliveryKey === 'office'
        ? 'sonniva'
        : (deliveryKey === 'regions' && selectedRegionOption.value === 'onway_office' ? 'onway' : null)

    const data = {
        delivery_type:       selectedDelivery.value.key,
        delivery_price_type: deliveryPriceType.value,
        delivery_cost:       deliveryCost.value ?? 0,
        city:             city,
        branch:           branch,
        address:          form.address,
        apartment_number: form.apartment_number,
        comment:          form.comment,
        provider:         selectedProvider.value.code,
        cart_ids: items.value.map(c => c.id),
    }

    if (selectedProvider.value.code === 'invoice') {
        router.post(route('initiate.payment.invoice'), data, {
            onSuccess: () => { loading.value = false },
            onError: (err) => {
                toast.add({ severity: 'error', summary: 'შეცდომა', detail: err?.message || 'დაფიქსირდა შეცდომა', life: 5000 })
                loading.value = false
            },
        })
    } else if (selectedProvider.value.code === 'limit') {
        router.post(route('initiate.payment.limit'), data, {
            onSuccess: () => { loading.value = false },
            onError: (err) => {
                toast.add({ severity: 'error', summary: 'შეცდომა', detail: err?.message || 'დაფიქსირდა შეცდომა', life: 5000 })
                loading.value = false
            },
        })
    } else {
        axios.post(route('payment.initiate'), data)
            .then(res => {
                if (res.data.redirect_url) {
                    window.location.href = res.data.redirect_url
                } else {
                    toast.add({ severity: 'error', summary: 'შეცდომა', detail: 'ბანკიდან პასუხი ვერ მივიღეთ', life: 5000 })
                    loading.value = false
                }
            })
            .catch(err => {
                toast.add({ severity: 'error', summary: 'შეცდომა', detail: err.response?.data?.error || 'დაფიქსირდა შეცდომა', life: 5000 })
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
                <p class="text-gray-500 text-sm mt-1">{{ items.length }} პროდუქტი</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- ── Left: Form ── -->
                <div class="lg:col-span-2 space-y-4">

                    <!-- Delivery type -->
                    <div class="bg-white rounded-2xl border shadow-sm p-6" :class="errors.deliveryType ? 'border-red-300' : 'border-gray-100'">
                        <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i class="pi pi-truck text-brand-500"></i>
                            მიწოდების ტიპი
                            <i class="pi pi-exclamation-circle text-sm text-red-500" v-tooltip.top="'სავალდებულო ველი'"></i>
                        </h2>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button
                                v-for="type in deliveryTypes"
                                :key="type.key"
                                @click="selectDelivery(type)"
                                class="relative flex flex-col items-start gap-1 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 text-left"
                                :class="selectedDelivery?.key === type.key
                                    ? 'border-brand-500 bg-brand-50/50'
                                    : 'border-gray-100 hover:border-gray-200 bg-white'"
                            >
                                <div class="flex items-center justify-between w-full">
                                    <div class="block space-x-2">
                                        <span class="text-sm font-semibold text-gray-800">{{ type.label }}</span>
                                        <span v-if="type.key === 'office'" class="text-sm font-semibold text-green-600">(უფასო)</span>
                                    </div>
                                    <div
                                        class="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                                        :class="selectedDelivery?.key === type.key
                                            ? 'border-brand-500'
                                            : 'border-gray-300'"
                                    >
                                        <div v-if="selectedDelivery?.key === type.key" class="w-2 h-2 rounded-full bg-brand-500"></div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <p v-if="errors.deliveryType" class="mt-3 text-sm text-red-500 flex items-center gap-1.5">
                            <i class="pi pi-exclamation-circle shrink-0"></i>
                            {{ errors.deliveryType }}
                        </p>
                    </div>

                    <!-- Address -->
                    <div v-if="selectedDelivery && selectedDelivery?.key !== 'office'" class="bg-white rounded-2xl border shadow-sm p-6" :class="errors.tbilisiZone || errors.regionOption || errors.onwayBranch || errors.regionZone || errors.address ? 'border-red-300' : 'border-gray-100'">
                        <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i class="pi pi-map-marker text-brand-500"></i>
                            მიწოდების მისამართი
                            <i class="pi pi-exclamation-circle text-sm text-red-500" v-tooltip.top="'სავალდებულო ველი'"></i>
                        </h2>

                        <!-- Region sub-options -->
                        <div v-if="selectedDelivery?.key === 'regions'" class="my-6 space-y-3">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    v-for="option in regionOptions"
                                    :key="option.key"
                                    @click="selectedRegionOption = option.key; selectedOnwayBranch = null"
                                    class="flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 text-left"
                                    :class="selectedRegionOption === option.key
                                        ? 'border-brand-500 bg-brand-50/50'
                                        : 'border-gray-100 hover:border-gray-200 bg-white'"
                                >
                                    <span class="flex items-center gap-2 text-sm font-semibold text-gray-800">
                                        <i :class="[option.icon, 'text-brand-500']"></i>
                                        {{ option.label }}
                                    </span>
                                    <div
                                        class="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                                        :class="selectedRegionOption === option.key ? 'border-brand-500' : 'border-gray-300'"
                                    >
                                        <div v-if="selectedRegionOption === option.key" class="w-2 h-2 rounded-full bg-brand-500"></div>
                                    </div>
                                </button>
                            </div>

                            <p v-if="errors.regionOption" class="mt-1 text-sm text-red-500 flex items-center gap-1.5">
                                <i class="pi pi-exclamation-circle shrink-0"></i>
                                {{ errors.regionOption }}
                            </p>

                            <!-- OnWay branch picker -->
                            <div v-if="selectedRegionOption === 'onway_office'">
                                <label for="select-branch" class="flex items-center-safe font-bold text-gray-700  text-sm mb-2 mt-5">
                                    აირჩიეთ OnWay-ის ფილიალი
                                    <i class="pi pi-exclamation-circle text-sm ml-1 text-red-500" v-tooltip.top="'სავალდებულო ველი'"></i>
                                </label>
                                <Select
                                    v-model="selectedOnwayBranch"
                                    inputId="select-branch"
                                    :options="onwayBranches"
                                    placeholder="არჩევა"
                                    class="w-full"
                                />
                                <p v-if="errors.onwayBranch" class="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                                    <i class="pi pi-exclamation-circle shrink-0"></i>
                                    {{ errors.onwayBranch }}
                                </p>
                            </div>

                            <!-- Zone picker for address delivery -->
                            <div v-if="selectedRegionOption === 'address'">
                                <label for="select-region" class="font-bold text-gray-700  text-sm mb-2 mt-5 block">
                                    აირჩიეთ ქალაქი/რაიონიო/სოფელი
                                    <i class="pi pi-exclamation-circle text-sm ml-1 text-red-500" v-tooltip.top="'სავალდებულო ველი'"></i>
                                </label>
                                <div class="relative">
                                    <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none text-sm"></i>
                                    <AutoComplete
                                        v-model="selectedZone"
                                        inputId="select-region"
                                        :suggestions="zoneSuggestions"
                                        option-label="name"
                                        dropdown
                                        placeholder="ძებნა..."
                                        :loading="zonesLoading"
                                        force-selection
                                        class="w-full rounded-l-xl"
                                        input-class="w-full rounded-l-xl"
                                        @complete="filterZones"
                                        emptySearchMessage="ვერ მოიძებნა"
                                        :pt="{ pcInputText: { root: { class: 'pl-8' } }, dropdown: { class: 'rounded-r-xl' } }"
                                    />
                                </div>
                                <p v-if="errors.regionZone" class="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                                    <i class="pi pi-exclamation-circle shrink-0"></i>
                                    {{ errors.regionZone }}
                                </p>
                            </div>
                        </div>

                        <!-- Tbilisi zone picker -->
                        <div v-if="selectedDelivery?.key === 'tbilisi'" class="mb-6">
                            <label class="font-bold text-gray-700 text-sm mb-2 block">
                                აირჩიეთ ზონა
                                <i class="pi pi-exclamation-circle text-sm ml-1 text-red-500" v-tooltip.top="'სავალდებულო ველი'"></i>
                            </label>
                            <Select
                                v-model="selectedTbilisiZone"
                                :options="tbilisiZoneOptions"
                                optionGroupLabel="label"
                                optionGroupChildren="items"
                                optionLabel="name"
                                placeholder="აირჩიეთ ზონა"
                                class="w-full"
                                filter
                                showClear
                                filterPlaceholder="ძებნა..."
                            >
                                <template #optiongroup="{ option }">
                                    <div class="flex items-center justify-between py-1">
                                        <span class="font-semibold text-gray-800 text-sm">{{ option.label }}</span>
                                        <span v-if="subtotal >= TBILISI_FREE_THRESHOLD" class="text-xs text-emerald-600 font-medium">უფასო</span>
                                    </div>
                                </template>
                            </Select>
                            <p v-if="subtotal >= TBILISI_FREE_THRESHOLD" class="mt-1.5 text-xs text-emerald-600 flex items-center gap-1">
                                <i class="pi pi-check-circle text-sm"></i>
                                შეკვეთა 500 ₾-ზე მეტია — თბილისში მიწოდება უფასოა
                            </p>
                            <p v-if="errors.tbilisiZone" class="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                                <i class="pi pi-exclamation-circle shrink-0"></i>
                                {{ errors.tbilisiZone }}
                            </p>
                        </div>

                        <div v-if="showAddressField" class="space-y-4">
                            <div>
                                <PlacesAutocomplete v-model="form.address" />
                                <p v-if="errors.address" class="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                                    <i class="pi pi-exclamation-circle shrink-0"></i>
                                    {{ errors.address }}
                                </p>
                            </div>

                            <PrimeInputText
                                v-model="form.apartment_number"
                                placeholder="ქუჩის ნომერი (არასავალდებულო)"
                                class="py-2.5!"
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
                        <div class="space-y-2 text-sm text-gray-600">
                            <div class="flex flex-col gap-1.5">
                                <div class="flex items-center gap-1">
                                    <i class="pi pi-map-marker text-brand-500 mt-0.5 shrink-0"></i>
                                    <span>ავჭალა, შუშის ქუჩა 38 — ორშაბათი-პარასკევი 09:00-18:00</span>
                                </div>
                                <a href="https://maps.app.goo.gl/3YwH55CnhUUfJoYQ9" target="_blank" class="text-brand-500 underline">
                                    დააჭირეთ ლინკზე მისამართის სანახავად
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Comment -->
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i class="pi pi-comment text-brand-500"></i>
                            კომენტარი
                        </h2>
                        <Textarea
                            v-model="form.comment"
                            placeholder="სპეციალური მოთხოვნები, შენიშვნები..."
                            rows="3"
                            class="w-full rounded-xl resize-none"
                        />
                    </div>

                    <!-- Payment method -->
                    <div class="bg-white rounded-2xl border shadow-sm p-6" :class="errors.provider ? 'border-red-300' : 'border-gray-100'">
                        <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i class="pi pi-credit-card text-brand-500"></i>
                            გადახდის მეთოდი
                            <i class="pi pi-exclamation-circle text-sm text-red-500" v-tooltip.top="'სავალდებულო ველი'"></i>
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
                                    v-if="provider.code !== 'limit'"
                                    :src="provider.icon"
                                    :alt="provider.name"
                                    class="w-8 h-8 object-contain rounded-lg shrink-0"
                                />

                                <i v-else class="pi pi-credit-card text-2xl"></i>
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

                        <p v-if="errors.provider" class="mt-3 text-sm text-red-500 flex items-center gap-1.5">
                            <i class="pi pi-exclamation-circle shrink-0"></i>
                            {{ errors.provider }}
                        </p>

                        <!-- Card logos -->
                        <div class="mt-4 flex items-center gap-3">
                            <img src="/payments/payment-cards.jpeg" class="h-6 object-contain rounded" alt="payment cards" />
                            <span class="text-xs text-gray-400">Visa, Mastercard</span>
                        </div>

                        <!-- Credit limit info -->
                        <div v-if="selectedProvider?.code === 'limit'" class="mt-4">
                            <div v-if="creditLoading" class="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 px-3 py-3 rounded-xl">
                                <i class="pi pi-spinner pi-spin"></i>
                                მიმდინარეობს ლიმიტის შემოწმება...
                            </div>
                            <template v-else-if="creditInfo">
                                <!-- No credit at all -->
                                <div v-if="!creditInfo.has_credit" class="flex items-start gap-2 text-xs text-red-600 bg-red-50 px-3 py-3 rounded-xl">
                                    <i class="pi pi-times-circle mt-0.5 shrink-0"></i>
                                    <span>თქვენ არ გაქვთ განსაზღვრული ლიმიტი. დაინტერესების შემთხვევაში დაგვიკავშირდით.</span>
                                </div>
                                <!-- Has credit but not enough / Enough credit -->
                                <div v-else class="rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden text-xs">
                                    <div v-if="!canPayWithLimit" class="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-500">
                                        <i class="pi pi-info-circle shrink-0"></i>
                                        <span>არასაკმარისი ლიმიტი!</span>
                                    </div>
                                    <div class="flex items-center justify-between px-3 py-2 bg-gray-50">
                                        <span class="flex items-center gap-1.5 text-gray-500">
                                            <i class="fa-solid fa-hourglass-start text-lg"></i>
                                            ლიმიტი
                                        </span>
                                        <strong class="text-gray-700">{{ formatted(creditInfo.limit) }} ₾</strong>
                                    </div>
                                    <div class="flex items-center justify-between px-3 py-2 bg-white">
                                        <span class="flex items-center gap-1.5 text-orange-500">
                                            <i class="fa-solid fa-hourglass-end text-lg"></i>
                                            გამოყენებული
                                        </span>
                                        <strong class="text-orange-600">{{ formatted(creditInfo.used) }} ₾</strong>
                                    </div>
                                    <div class="bg-emerald-50 flex items-center justify-between px-3 py-2">
                                        <span class="text-emerald-600 flex items-center gap-1.5">
<!--                                            <i class="pi pi-check-circle"></i>-->
                                            <i class="fa-solid fa-hourglass-half text-lg"></i>
                                            ხელმისაწვდომი
                                        </span>
                                        <strong class="text-emerald-700">{{ formatted(creditInfo.available) }} ₾</strong>
                                    </div>
                                    <div v-if="!canPayWithLimit" class="bg-amber-50 flex items-center justify-between px-3 py-2">
                                        <span class="text-amber-600 flex items-center gap-1.5">
                                            <i class="pi pi-wallet"></i>
                                            გადასახდელი თანხა
                                        </span>
                                        <strong class="text-amber-700">{{ formatted(total) }} ₾</strong>
                                    </div>
                                </div>
                            </template>
                        </div>
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
                                    <p v-tooltip.top="cartItem.item.name" class="text-xs text-gray-700 font-medium line-clamp-1">{{ cartItem.item.name }}</p>
                                    <p class="text-xs text-gray-400 mt-0.5">{{ cartItem.qty }} × {{ formatted(cartItem.unitPrice) }} ₾</p>
                                </div>
                                <span class="text-sm font-semibold text-gray-800 shrink-0">{{ formatted(cartItem.rowTotal) }} ₾</span>
                            </div>
                        </div>

                        <div class="h-px bg-gray-100 mb-4"></div>

                        <!-- Totals -->
                        <div class="space-y-2.5 text-sm mb-5">
                            <div class="flex justify-between text-gray-500">
                                <span>{{ items.length }} პროდუქტი</span>
                                <span class="font-medium text-gray-700">{{ formatted(subtotal) }} ₾</span>
                            </div>
                            <div class="flex justify-between text-gray-500">
                                <span>მიწოდება</span>
                                <span
                                    :class="deliveryCost === 0 ? 'text-emerald-600 font-medium' : 'font-medium text-gray-700'"
                                >
                                    <template v-if="deliveryCost === null">—</template>
                                    <template v-else-if="deliveryCost === 0">უფასო</template>
                                    <template v-else>{{ formatted(deliveryCost) }} ₾</template>
                                </span>
                            </div>
                        </div>

                        <div class="h-px bg-gray-100 mb-4"></div>

                        <div class="flex justify-between items-center mb-6">
                            <span class="font-bold text-gray-900">სულ</span>
                            <span class="text-xl font-bold text-brand-500">{{ formatted(total) }} ₾</span>
                        </div>


                        <!-- Agreement -->
                        <div class="px-1 space-y-1.5 rounded-2xl p-3 mb-3 border transition-colors" :class="errors.agreement ? 'border-red-300 bg-red-50/40' : 'border-transparent'">
                            <div class="flex items-start gap-3">
                                <Checkbox v-model="form.agreement" inputId="agreement" binary class="mt-0.5 cursor-pointer" />
                                <label for="agreement" class="text-sm text-gray-600 cursor-pointer leading-relaxed">
                                    ვეთანხმები
                                    <a :href="route('terms-of-service')" target="_blank" class="text-brand-500 hover:underline">წესებსა და პირობებს</a>
                                </label>
                            </div>
                            <p v-if="errors.agreement" class="text-sm text-red-500 flex items-center gap-1.5 pl-7">
                                <i class="pi pi-exclamation-circle shrink-0"></i>
                                {{ errors.agreement }}
                            </p>
                        </div>

                        <!-- Pay button -->
                        <button
                            @click="initiatePayment"
                            :disabled="payButtonDisabled"
                            class="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md cursor-pointer
                                   active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                            :class="payButtonDisabled
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
