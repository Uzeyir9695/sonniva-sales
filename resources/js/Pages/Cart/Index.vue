<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { Link, router, usePage } from '@inertiajs/vue3'
import { useCart } from '@/composables/useCart'
import StockNotifyButton from '@/Shared/components/StockNotifyButton.vue'
import InputNumber from 'primevue/inputnumber'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import { calculateTierPrice, hasDiscount } from '@/composables/usePricing.js'

const props = defineProps({
    cartItems: { type: Array, required: true },
    subscribedItemIds: { type: Array, default: () => [] },
})

const { removeFromCart, updateQuantity, isLoading, getQuantity, count, syncFromServer } = useCart()
const page = usePage()
const isVip = computed(() => page.props.user?.can_view_vip ?? false)

// Unique key per cart row: UUID when available, fallback composite
const rowKey = (c) => c.id ?? (c.selected_uom ? `${c.item_id}__${c.selected_uom}` : c.item_id)

// If server says cart is empty but local state still has items (e.g. after payment),
// sync local state immediately so the badge clears, then reload to confirm.
onMounted(() => {
    if (props.cartItems.length === 0 && count.value > 0) {
        syncFromServer()
        router.reload({ only: ['cartItems'] })
    }
})

const overLimit = (cartItem) => getQuantity(cartItem.item_id, cartItem.selected_uom) > cartItem.item.inventory

const anyOverLimit = computed(() => selectedItems.value.some(c => overLimit(c)))

// Filter out items removed client-side
const items = computed(() =>
    props.cartItems.filter(c => !removedIds.value.includes(rowKey(c)))
)

const removedIds = ref([])

async function handleRemove(cartItem) {
    const key = rowKey(cartItem)
    removedIds.value.push(key)
    selectedIds.value = selectedIds.value.filter(id => id !== key)
    await removeFromCart(cartItem.item_id, cartItem.selected_uom)
}

const formatted = (val) => Number(val).toFixed(2)

function getRetailPrice(item, selectedUOM = null) {
    if (item.unit_price > 0) return item.unit_price
    if (!selectedUOM || !item.prices?.length) return null
    return item.prices.find(p => p.UOM === selectedUOM && p.priceGroup === 'Retail')?.price ?? null
}

function isVipPriceActive(item, qty, selectedUOM = null) {
    if (!isVip.value) return false
    return calculateTierPrice(item, qty, selectedUOM, true) < calculateTierPrice(item, qty, selectedUOM, false)
}


// ─── Selection ────────────────────────────────────────────────────────────────

const SELECTION_KEY = STORAGE_KEYS.cartSelection

const selectedIds = ref([])

// Use row UUID as selection key so same item with different UOMs can be selected independently
const allIds = computed(() => items.value.map(c => rowKey(c)))
const inStockIds = computed(() => items.value.filter(c => c.item.inventory > 0).map(c => rowKey(c)))

// Restore persisted selection, keeping only keys still present in the current cart
try {
    const saved = JSON.parse(localStorage.getItem(SELECTION_KEY) ?? '[]')
    const validKeys = new Set(allIds.value)
    selectedIds.value = saved.filter(k => validKeys.has(k))
} catch {
    selectedIds.value = []
}

watch(selectedIds, (val) => {
    localStorage.setItem(SELECTION_KEY, JSON.stringify(val))
}, { deep: true })

const sortedItems = computed(() =>
    [...items.value].sort((a, b) => {
        const aChecked = selectedIds.value.includes(rowKey(a)) ? 0 : 1
        const bChecked = selectedIds.value.includes(rowKey(b)) ? 0 : 1
        return aChecked - bChecked
    })
)

const allSelected = computed(() =>
    inStockIds.value.length > 0 && selectedIds.value.length === inStockIds.value.length
)

const someSelected = computed(() =>
    selectedIds.value.length > 0 && selectedIds.value.length < inStockIds.value.length
)

function toggleAll() {
    if (allSelected.value) {
        selectedIds.value = []
    } else {
        selectedIds.value = [...inStockIds.value]
    }
}

function toggleItem(cartItem) {
    const key = rowKey(cartItem)
    if (selectedIds.value.includes(key)) {
        selectedIds.value = selectedIds.value.filter(id => id !== key)
    } else {
        selectedIds.value = [...selectedIds.value, key]
    }
}

// ─── Selected items only ──────────────────────────────────────────────────────

const selectedItems = computed(() =>
    items.value.filter(c => selectedIds.value.includes(rowKey(c)))
)

const subtotal = computed(() =>
    selectedItems.value.reduce((sum, c) => {
        const qty = getQuantity(c.item_id, c.selected_uom)
        return sum + (calculateTierPrice(c.item, qty, c.selected_uom, isVip.value) * qty)
    }, 0)
)

const totalSavings = computed(() =>
    selectedItems.value.reduce((sum, c) => {
        const qty = getQuantity(c.item_id, c.selected_uom)
        const originalTotal = c.item.unit_price * qty
        const tieredTotal = calculateTierPrice(c.item, qty, c.selected_uom, isVip.value) * qty
        return sum + Math.max(0, originalTotal - tieredTotal)
    }, 0)
)

// ─── Checkout ─────────────────────────────────────────────────────────────────

function goToCheckout() {
    // Pass cart row UUIDs so the server can uniquely identify each row
    // (same item with different UOMs would collide if we passed item_ids)
    const cartIds = selectedItems.value.map(c => c.id)
    router.get(route('checkout.index'), { cart_ids: cartIds })
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 sm:my-4 sm:rounded-2xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-2xl font-bold text-gray-900">კალათა</h1>
                <p class="text-gray-500 text-sm mt-1">
                    {{ items.length }} პროდუქტი
                </p>
            </div>

            <!-- Empty state -->
            <div
                v-if="!items.length"
                class="flex flex-col items-center justify-center py-32 text-center"
            >
                <i class="pi pi-shopping-cart text-gray-200 text-7xl mb-6"></i>
                <h2 class="text-lg font-semibold text-gray-700 mb-2">კალათა ცარიელია</h2>
                <p class="text-gray-400 text-sm mb-8 max-w-xs">
                    დაამატე პროდუქტები კალათაში და შემდეგ გააგრძელე შეძენა.
                </p>
                <Link
                    :href="route('home')"
                    class="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400
                           text-white rounded-2xl px-6 py-3 text-sm font-semibold
                           active:scale-[0.98] transition-all cursor-pointer"
                >
                    <i class="pi pi-arrow-left text-xs"></i>
                    შოპინგის გაგრძელება
                </Link>
            </div>

            <!-- Cart layout -->
            <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- ── Item list ── -->
                <div class="lg:col-span-2 flex flex-col gap-3">

                    <!-- Select all row -->
                    <div class="flex items-center gap-3 px-1 pb-1">
                        <Checkbox
                            :modelValue="allSelected"
                            :indeterminate="someSelected"
                            binary
                            @change="toggleAll"
                            inputId="select-all"
                            class="cursor-pointer"
                        />
                        <label for="select-all" class="text-sm text-gray-500 cursor-pointer select-none">
                            ყველას არჩევა ({{ items.length }})
                        </label>
                        <span v-if="selectedIds.length > 0" class="text-xs text-gray-400 ml-auto">
                            {{ selectedIds.length }} არჩეულია
                        </span>
                    </div>

                    <TransitionGroup name="cart-item">
                        <div
                            v-for="cartItem in sortedItems"
                            :key="rowKey(cartItem)"
                            class="relative bg-white rounded-2xl border shadow-sm p-4 transition-all duration-150"
                            :class="cartItem.item.inventory <= 0
                                ? 'border-gray-100'
                                : selectedIds.includes(rowKey(cartItem))
                                    ? 'border-brand-200 bg-brand-50/20'
                                    : 'border-gray-100'"
                        >
                        <span
                            v-if="hasDiscount(cartItem.item)"
                            class="absolute top-2 left-3 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white shadow-md"
                        >-{{ Number(cartItem.item.discount) }}%</span>
                        <div class="flex items-center gap-4">
                            <!-- Checkbox -->
                            <Checkbox
                                :modelValue="selectedIds.includes(rowKey(cartItem))"
                                binary
                                :disabled="cartItem.item.inventory <= 0"
                                @change="cartItem.item.inventory > 0 && toggleItem(cartItem)"
                                class="shrink-0"
                                :class="cartItem.item.inventory > 0 ? 'cursor-pointer' : 'cursor-not-allowed'"
                            />

                            <!-- Image -->
                            <div class="w-18 h-18 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                <img
                                    v-if="cartItem.item.images?.length"
                                    :src="`${cartItem.item.storage_path}/${cartItem.item.images[0]}`"
                                    :alt="cartItem.item.name"
                                    class="w-full h-full object-cover"
                                    :class="cartItem.item.inventory <= 0 ? ' opacity-60' : ''"
                                />
                                <div v-else class="w-full h-full flex items-center justify-center">
                                    <i class="pi pi-image text-gray-300 text-sm"></i>
                                </div>
                            </div>

                            <!-- Info -->
                            <div class="flex-1 min-w-0">
                                <Link
                                    :href="route('items.show', cartItem.item.slug)"
                                    class="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug hover:text-brand-500 transition-colors"
                                >
                                    {{ cartItem.item.name }}
                                </Link>

                                <div v-if="cartItem.item.inventory <= 0" class="flex items-center gap-1 mt-1 text-red-600 bg-red-100 px-2 py-0.5 rounded-full w-fit">
                                    <div class="w-2 h-2 rounded-full bg-red-500"></div>
                                    <span
                                        v-if="cartItem.item.inventory <= 0"
                                        class="inline-flex items-center gap-1 text-xs font-medium"
                                    >
                                        მარაგში არ არის
                                    </span>
                                </div>

                                <div class="flex items-center gap-2 mt-1">
                                    <span
                                        v-if="getRetailPrice(cartItem.item, cartItem.selected_uom) !== null && calculateTierPrice(cartItem.item, getQuantity(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom, isVip) < getRetailPrice(cartItem.item, cartItem.selected_uom)"
                                        class="text-sm text-gray-400 line-through"
                                    >
                                        {{ formatted(getRetailPrice(cartItem.item, cartItem.selected_uom)) }} ₾
                                    </span>
                                    <p class="text-brand-500 font-bold text-base"
                                       :class="cartItem.item.inventory <= 0 ? ' opacity-60' : ''"
                                    >
                                        {{ formatted(calculateTierPrice(cartItem.item, getQuantity(cartItem.item_id), cartItem.selected_uom, isVip)) }} ₾
                                        <span v-if="cartItem.selected_uom" class="text-xs font-normal text-gray-400">/ {{ cartItem.selected_uom }}</span>
                                    </p>
                                    <span
                                        v-if="isVipPriceActive(cartItem.item, getQuantity(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom)"
                                        class="text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full"
                                    >VIP</span>
                                </div>

                                <!-- Quantity stepper (in-stock only) -->
                                <div v-if="cartItem.item.inventory > 0" class="flex items-center gap-3 mt-3 flex-wrap">
                                    <div :class="overLimit(cartItem) ? 'border-red-500' : ''" class="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm w-fit">
                                        <button
                                            @click="updateQuantity(cartItem.item_id, getQuantity(cartItem.item_id, cartItem.selected_uom) - 1, cartItem.selected_uom)"
                                            :disabled="getQuantity(cartItem.item_id, cartItem.selected_uom) <= 1 || isLoading(cartItem.item_id, cartItem.selected_uom)"
                                            class="w-8 h-8 flex items-center justify-center cursor-pointer text-gray-500
                                                   hover:bg-gray-50 transition disabled:text-gray-300 disabled:cursor-not-allowed"
                                        >
                                            <i class="pi pi-minus text-xs"></i>
                                        </button>

                                        <InputNumber
                                            :model-value="getQuantity(cartItem.item_id, cartItem.selected_uom)"
                                            :min="1"
                                            :use-grouping="false"
                                            @input="e => { if (e.value !== null) updateQuantity(cartItem.item_id, e.value, cartItem.selected_uom) }"
                                            :input-style="{ width: '2.5rem', textAlign: 'center', padding: '0', boxShadow: 'none', border: 'none', fontWeight: '600', fontSize: '0.875rem' }"
                                        />

                                        <button
                                            @click="updateQuantity(cartItem.item_id, getQuantity(cartItem.item_id, cartItem.selected_uom) + 1, cartItem.selected_uom)"
                                            :disabled="isLoading(cartItem.item_id, cartItem.selected_uom) || getQuantity(cartItem.item_id, cartItem.selected_uom) >= cartItem.item.inventory"
                                            class="w-8 h-8 flex items-center justify-center cursor-pointer text-gray-500
                                                   hover:bg-gray-50 transition disabled:text-gray-300 disabled:cursor-not-allowed"
                                        >
                                            <i class="pi pi-plus text-xs"></i>
                                        </button>
                                    </div>

                                    <!-- Row total -->
                                    <span class="text-sm text-gray-400">
                                        სულ: <span class="font-semibold text-gray-700">{{ formatted(calculateTierPrice(cartItem.item, getQuantity(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom, isVip) * getQuantity(cartItem.item_id, cartItem.selected_uom)) }} ₾</span>
                                    </span>

                                    <!-- Savings badge -->
                                    <span
                                        v-if="getRetailPrice(cartItem.item, cartItem.selected_uom) !== null && calculateTierPrice(cartItem.item, getQuantity(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom, isVip) < getRetailPrice(cartItem.item, cartItem.selected_uom)"
                                        :class="isVipPriceActive(cartItem.item, getQuantity(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom)
                                            ? 'flex items-center text-xs text-purple-600 font-medium bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full'
                                            : 'flex items-center text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full'"
                                    >
                                        <i class="pi pi-tag text-xs mr-1"></i>
                                        <template v-if="isVipPriceActive(cartItem.item, getQuantity(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom)">
                                            VIP დანაზოგი: {{ formatted((getRetailPrice(cartItem.item, cartItem.selected_uom) - calculateTierPrice(cartItem.item, getQuantity(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom, isVip)) * getQuantity(cartItem.item_id, cartItem.selected_uom)) }} ₾
                                        </template>
                                        <template v-else>
                                            დანაზოგი: {{ formatted((getRetailPrice(cartItem.item, cartItem.selected_uom) - calculateTierPrice(cartItem.item, getQuantity(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom, isVip)) * getQuantity(cartItem.item_id, cartItem.selected_uom)) }} ₾
                                        </template>
                                    </span>

                                    <p v-if="overLimit(cartItem)" class="text-xs text-red-600">
                                        ხელმისაწვდომი რაოდენობაა {{ cartItem.item.inventory }}
                                    </p>
                                </div>

                            </div>

                            <!-- Remove -->
                            <button
                                @click="handleRemove(cartItem)"
                                :disabled="isLoading(cartItem.item_id)"
                                class="shrink-0 self-start w-8 h-8 flex items-center justify-center cursor-pointer rounded-xl
                                       text-gray-300 hover:text-red-400 hover:bg-red-50
                                       transition-all duration-150 disabled:opacity-50"
                            >
                                <i class="pi pi-trash text-sm"></i>
                            </button>
                        </div>

                        <!-- Stock notify — full width below the main row -->
                        <div v-if="cartItem.item.inventory < 1" class="mt-3 w-full max-w-80 max-md:mx-auto ml-auto">
                            <StockNotifyButton
                                :item="cartItem.item"
                                :isSubscribed="subscribedItemIds.includes(cartItem.item_id)"
                            />
                        </div>
                        </div>
                    </TransitionGroup>

                    <Link
                        :href="route('home')"
                        class="self-start flex items-center gap-1.5 text-sm text-gray-400
                               hover:text-gray-700 transition-colors mt-2"
                    >
                        <i class="pi pi-arrow-left text-xs"></i>
                        შოპინგის გაგრძელება
                    </Link>
                </div>

                <!-- ── Order summary ── -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
                        <h2 class="text-base font-bold text-gray-900 mb-5">შეკვეთის შეჯამება</h2>

                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between text-gray-500">
                                <span>{{ selectedItems.length }} პროდუქტი</span>
                                <span class="font-medium text-gray-700">
                                    <span v-if="totalSavings > 0" class="line-through text-gray-400 mr-1">{{ formatted(subtotal + totalSavings) }} ₾</span>
                                    <span>{{ formatted(subtotal) }} ₾</span>
                                </span>
                            </div>

                            <!-- Savings -->
                            <div
                                v-if="totalSavings > 0"
                                class="flex justify-between text-emerald-600"
                            >
                                <span class="flex items-center gap-1">
                                    <i class="pi pi-tag text-xs"></i>
                                    ჯამური დანაზოგი
                                </span>
                                <span class="font-medium">-{{ formatted(totalSavings) }} ₾</span>
                            </div>
                        </div>

                        <div class="h-px bg-gray-100 my-5"></div>

                        <div class="flex justify-between items-center mb-6">
                            <span class="font-bold text-gray-900">სულ</span>
                            <span class="text-xl font-bold text-brand-500">{{ formatted(subtotal) }} ₾</span>
                        </div>

                        <button
                            @click="goToCheckout"
                            :disabled="selectedIds.length === 0 || anyOverLimit"
                            class="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md cursor-pointer
                                   active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            :class="selectedIds.length > 0 && !anyOverLimit
                                ? 'bg-brand-500 hover:bg-brand-400 text-white'
                                : 'bg-gray-100 text-gray-400'"
                        >
                            <i class="pi pi-wallet mr-2"></i>
                            შეკვეთის გაფორმება
                            <span v-if="selectedIds.length > 0" class="ml-1 opacity-75">({{ selectedIds.length }})</span>
                        </button>

                        <div class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <i class="pi pi-lock text-xs"></i>
                            უსაფრთხო გადახდა
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
    transition: all 0.25s ease;
}
.cart-item-enter-from {
    opacity: 0;
    transform: translateY(-8px);
}
.cart-item-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
</style>
