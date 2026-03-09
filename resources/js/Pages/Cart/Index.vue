<script setup>
import { computed, ref } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useCart } from '@/composables/useCart'
import ItemGallery from '@/Pages/Items/ItemGallery.vue';

const props = defineProps({
    cartItems: { type: Array, required: true },
})

const { removeFromCart, updateQuantity, isLoading, getQuantity, count } = useCart()

// Filter out items removed client-side
const items = computed(() =>
    props.cartItems.filter(c => !removedIds.value.includes(c.item_id))
)

const removedIds = ref([])

async function handleRemove(itemId) {
    removedIds.value.push(itemId)
    await removeFromCart(itemId)
}

const formatted = (val) => Number(val).toFixed(2)

function calculateTierPrice(item, qty) {
    if (!item.prices?.length) return item.unit_price

    const tier = [...item.prices]
        .sort((a, b) => b.custMinQuantity - a.custMinQuantity)
        .find(p => qty >= p.custMinQuantity)

    return tier?.price ?? item.unit_price
}

const subtotal = computed(() =>
    items.value.reduce((sum, c) => {
        const qty = getQuantity(c.item_id)
        return sum + (calculateTierPrice(c.item, qty) * qty)
    }, 0)
)
</script>

<template>
    <div class="min-h-screen bg-gray-50 sm:my-4 sm:rounded-2xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-2xl font-bold text-gray-900">კალათა</h1>
                <p class="text-gray-500 text-sm mt-1">
                    {{ count }} {{ count === 1 ? 'პროდუქტი' : 'პროდუქტი' }}
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
                           active:scale-[0.98] transition-all"
                >
                    <i class="pi pi-arrow-left text-xs"></i>
                    შოპინგის გაგრძელება
                </Link>
            </div>

            <!-- Cart layout -->
            <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- ── Item list ── -->
                <div class="lg:col-span-2 flex flex-col gap-3">
                    <TransitionGroup name="cart-item">
                        <div
                            v-for="cartItem in items"
                            :key="cartItem.item_id"
                            class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:bg-brand-50 0"
                        >
                            <!-- Image -->
                            <div class="w-18 h-18 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                <img
                                    v-if="cartItem.item.images?.length"
                                    :src="`${cartItem.item.storage_path}/${cartItem.item.images[0]}`"
                                    :alt="cartItem.item.name"
                                    class="w-full h-full object-cover"
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

                                <div class="flex items-center gap-2 mt-1">
                                    <span
                                        v-if="calculateTierPrice(cartItem.item, getQuantity(cartItem.item_id)) < cartItem.item.unit_price"
                                        class="text-sm text-gray-400 line-through"
                                    >
                                        {{ formatted(cartItem.item.unit_price) }} ₾
                                    </span>
                                    <p class="text-brand-500 font-bold text-base">
                                        {{ formatted(calculateTierPrice(cartItem.item, getQuantity(cartItem.item_id))) }} ₾
                                    </p>
                                </div>

                                <!-- Quantity stepper -->
                                <div class="flex items-center gap-3 mt-3">
                                    <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm w-fit">
                                        <button
                                            @click="updateQuantity(cartItem.item_id, getQuantity(cartItem.item_id) - 1)"
                                            :disabled="getQuantity(cartItem.item_id) <= 1 || isLoading(cartItem.item_id)"
                                            class="w-8 h-8 flex items-center justify-center cursor-pointer text-gray-500
                                                   hover:bg-gray-50 transition disabled:text-gray-300 disabled:cursor-not-allowed"
                                        >
                                            <i class="pi pi-minus text-xs"></i>
                                        </button>

                                        <input
                                            type="text"
                                            :value="getQuantity(cartItem.item_id)"
                                            @input="updateQuantity(cartItem.item_id, $event.target.value)"
                                            min="1"
                                            class="w-10 h-8 text-center text-sm font-semibold border-none outline-none bg-transparent"
                                        />

                                        <button
                                            @click="updateQuantity(cartItem.item_id, getQuantity(cartItem.item_id) + 1)"
                                            :disabled="isLoading(cartItem.item_id)"
                                            class="w-8 h-8 flex items-center justify-center cursor-pointer text-gray-500
                                                   hover:bg-gray-50 transition disabled:text-gray-300 disabled:cursor-not-allowed"
                                        >
                                            <i class="pi pi-plus text-xs"></i>
                                        </button>
                                    </div>

                                    <!-- Row total -->
                                    <span class="text-sm text-gray-400">
                                        სულ: <span class="font-semibold text-gray-700">{{ formatted(calculateTierPrice(cartItem.item, getQuantity(cartItem.item_id)) * getQuantity(cartItem.item_id)) }} ₾</span>
                                    </span>
                                    <!-- Savings badge -->
                                    <span
                                        v-if="calculateTierPrice(cartItem.item, getQuantity(cartItem.item_id)) < cartItem.item.unit_price"
                                        class="flex items-center text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full"
                                    >
                                        <i class="pi pi-tag text-xs mr-1"></i>
                                        დანაზოგი: {{ formatted((cartItem.item.unit_price - calculateTierPrice(cartItem.item, getQuantity(cartItem.item_id))) * getQuantity(cartItem.item_id)) }} ₾
                                    </span>
                                </div>
                            </div>

                            <!-- Remove -->
                            <button
                                @click="handleRemove(cartItem.item_id)"
                                :disabled="isLoading(cartItem.item_id)"
                                class="shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer rounded-xl
                                       text-gray-300 hover:text-red-400 hover:bg-red-50
                                       transition-all duration-150 disabled:opacity-50"
                            >
                                <i class="pi pi-trash text-sm"></i>
                            </button>
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
                                <span>პროდუქტები ({{ items.length }})</span>
                                <span class="font-medium text-gray-700">{{ formatted(subtotal) }} ₾</span>
                            </div>
                            <div class="flex justify-between text-gray-500">
                                <span>მიწოდება</span>
                                <span class="text-emerald-600 font-medium">ჯერჯერობით უფასო და, მერე ვნახოთ.</span>
                            </div>
                        </div>

                        <div class="h-px bg-gray-100 my-5"></div>

                        <div class="flex justify-between items-center mb-6">
                            <span class="font-bold text-gray-900">სულ</span>
                            <span class="text-xl font-bold text-brand-500">{{ formatted(subtotal) }} ₾</span>
                        </div>

                        <button
                            class="w-full py-3.5 rounded-2xl bg-brand-500 cursor-pointer hover:bg-brand-400
                                   text-white font-semibold text-sm
                                   active:scale-[0.98] transition-all shadow-md"
                        >
                            <i class="pi pi-wallet mr-2"></i>
                            შეკვეთის გაფორმება
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
