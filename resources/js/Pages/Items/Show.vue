<script setup>
import { Deferred, Head, Link, usePage } from '@inertiajs/vue3'
import { ref, computed, onMounted, watch } from 'vue'
import { useGtag } from '@/composables/useGtag.js'
import { useClipboard } from '@vueuse/core';
import SimilarItems from '@/Pages/Items/SimilarItems.vue';
import ItemGallery from '@/Pages/Items/ItemGallery.vue';
import WishlistButton from '@/Shared/components/WishlistButton.vue';
import ShareButton from '@/Shared/components/ShareButton.vue';
import StockNotifyButton from '@/Shared/components/StockNotifyButton.vue';
import WhatsappOrderDialog from '@/Shared/components/WhatsappOrderDialog.vue';
import { useCart } from '@/composables/useCart.js';
import { usePricing, discountedTierPrice } from '@/composables/usePricing.js';
import { formatDiscount } from '@/utils/numberFormat.js';
import Breadcrumbs from '@/Shared/components/Breadcrumbs.vue';
import CartCountBadge from '@/Shared/components/CartCountBadge.vue';
import InputNumber from 'primevue/inputnumber';

const props = defineProps({
    item: Object,
    similarItems: Array,
    attributes: Array,
    breadcrumbs: Array,
    inventory: Object,
    isSubscribedToNotification: Boolean,
    isOrderOnly: Boolean,
})

const showWhatsappDialog = ref(false)

const { addToCart, buyNow, isInCart } = useCart()
const { track } = useGtag()

onMounted(() => {
    track('view_item', {
        currency: 'GEL',
        value: props.item?.unit_price ?? 0,
        items: [{ item_id: String(props.item?.id), item_name: props.item?.name, price: props.item?.unit_price }],
    })
})

const { copy: copyNo, copied: copiedNo } = useClipboard();
const { copy: copyName, copied: copiedName } = useClipboard();

const images = computed(() => {
    if (props.item?.images?.length) return props.item.images
    if (props.item?.image) return [props.item.image]
    return []
})

/* ---------------- Pricing ---------------- */
const { isPackageItem, prices, displayPrice, hasDiscount, originalPrice } = usePricing(() => props.item)
const selectedEntry = ref(null)
watch(prices, (val) => { selectedEntry.value = val[0] ?? null }, { immediate: true })

/* ---------------- Quantity ---------------- */
const quantity = ref(1)

/* ---------------- Setup service ---------------- */
const withService = ref(false)

const inStock = computed(() => props.item?.inventory > 0)
const atMax = computed(() => quantity.value >= props.item?.inventory)
const overLimit = computed(() => props.item?.inventory > 0 && quantity.value > props.item?.inventory)

/* ---------------- Tabs ---------------- */
const activeTab = ref('0')

const metaDescription = computed(() => {
    const desc = props.item?.description
    if (desc) return desc.length > 155 ? desc.slice(0, 152) + '...' : desc
    return props.item?.name ?? ''
})

const ogImage = computed(() => {
    if (!images.value.length) return null
    return usePage().props.ziggy.url + props.item.storage_path + '/' + images.value[0]
})
</script>

<template>
    <Head :title="item?.name">
        <meta name="description" :content="metaDescription" />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Sonniva" />
        <meta property="og:title" :content="item?.name" />
        <meta property="og:description" :content="metaDescription" />
        <meta property="og:url" :content="$page.props.ziggy.location" />
        <meta v-if="ogImage" property="og:image" :content="ogImage" />
    </Head>

    <div class="min-h-screen bg-[#f8f7 f4]">

        <!-- ================= BREADCRUMBS ================= -->
        <Breadcrumbs :breadcrumbs="breadcrumbs" class="bg-white rounded-xl mt-3" />

        <div class="mx-auto py-5 sm:pb-10 max-sm:mx-3">
            <!-- ================= TOP SECTION ================= -->
            <div class="grid grid-cols-1 lg:grid-cols-7 gap-6">

                <!-- ========== LEFT: GALLERY ========== -->
                <div class="relative lg:col-span-4 lg:row-start-1 lg:row-end-2 order-1">
                    <ItemGallery :images="images" :item-name="item.name" :image-path="item.storage_path" :video-url="item.video_url">
                        <template #badge>
                            <span
                                v-if="hasDiscount"
                                class="absolute top-3 right-14 z-10 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full bg-red-500 text-white shadow-md"
                            >
                                -{{ formatDiscount(item.discount) }}%
                            </span>

                            <ShareButton
                                :title="item.name"
                                size="md"
                                class="absolute top-3 right-3 z-10"
                            />
                        </template>
                    </ItemGallery>
                </div>

                <!-- ========== RIGHT: DETAILS ========== -->
                <div class="bg-white lg:col-span-3 lg:row-start-1 lg:row-end-3 order-2 lg:sticky lg:top-28 h-fit border border-gray-100 p-3 rounded-2xl shadow-xs">

                    <!-- Stock -->
                    <div class="flex justify-between items-center mb-4">
                        <div
                            class="flex items-center gap-x-1 text-xs px-4 py-1.5 rounded-full font-medium tracking-wide"
                            :class="inStock
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-red-100 text-red-600'"
                        >
                            <div v-if="inStock" class="w-2 h-2 rounded-full bg-emerald-700 animate-pulse"></div>
                            <div v-if="!inStock" class="w-2 h-2 rounded-full bg-red-500"></div>
                            <span>{{ inStock ? $t('common.inStock') : $t('common.outOfStock') }}</span>
                        </div>

                        <div class="flex items-center gap-3">
                            <!-- Wishlist -->
                            <WishlistButton
                                :item-id="item.id"
                                size="sm"
                                variant="pill"
                                class="border border-gray-100 rounded-full shrink-0"
                            />

                        </div>
                    </div>

                    <div class="flex items-center gap-2 mb-2">
                        <p class="text-xs sm:text-sm font-semibold text-gray-500 leading-snug">
                            {{ item?.no }}
                        </p>
                        <div
                            @click="copyNo(item.no)"
                            v-tooltip.bottom="$t('item.copyCode')"
                            class="flex items-center justify-center w-5 h-5 cursor-pointer"
                        >
                            <i v-if="copiedNo" class="pi pi-check text-emerald-500 text-xs"></i>
                            <i v-else class="pi pi-copy text-gray-400 text-sm"></i>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <h1 class="sm:text-xl font-semibold text-gray-900 leading-snug">
                            {{ item.name }}
                        </h1>
                        <div
                            @click="copyName(item.name)"
                            v-tooltip.bottom="$t('item.copyName')"
                            class="flex items-center justify-center w-5 h-5 cursor-pointer shrink-0"
                        >
                            <i v-if="copiedName" class="pi pi-check text-emerald-500 text-xs"></i>
                            <i v-else class="pi pi-copy text-gray-400 text-sm"></i>
                        </div>
                    </div>
                    <!-- Item NO -->
<!--                    <h1 class="sm:text-xs font-semibold text-gray-900 leading-snug mb-5">-->
<!--                        {{ item.no }}-->
<!--                    </h1>-->

                    <!-- Price -->
                    <div class="flex items-center gap-3 mb-8 flex-wrap">
                        <span v-if="originalPrice" class="text-base sm:text-lg text-red-500 line-through">
                            {{ originalPrice }} ₾
                        </span>
                        <span class="text-lg sm:text-2xl font-bold text-brand-500 tracking-tight">
                            {{ isPackageItem ? (selectedEntry ? Number(discountedTierPrice(item, selectedEntry)).toFixed(2) : null) : displayPrice }} ₾
                        </span>
                        <span v-if="isPackageItem && selectedEntry?.UOM" class="text-sm text-gray-400">
                            / {{ selectedEntry.UOM }}
                        </span>
                        <span v-else-if="item.base_uom_desc" class="text-sm text-gray-400">
                            / {{ item.base_uom_desc }}
                        </span>
                    </div>

                    <Deferred data="inventory">
                        <template #fallback>
                            <div class="flex items-center gap-3 mt-4 mb-6">
                                <div class="flex-1 h-[52px] bg-gray-100 rounded-2xl animate-pulse" />
                                <div class="flex-1 h-[52px] bg-gray-100 rounded-2xl animate-pulse" />
                            </div>
                        </template>
                        <template #default>
                            <div class="flex flex-wrap items-center gap-3 mt-4 mb-6">
                                <div class="flex-1 flex flex-col sm:flex-row items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-2 sm:px-4 py-3">
                                    <div class="flex items-center gap-2 text-nowrap">
                                        <i class="pi pi-warehouse text-brand-500 text-sm"></i>
                                        <span class="text-xs sm:text-sm text-gray-500">{{ $t('item.branchAvchala') }}</span>
                                    </div>
                                    <span class="text-sm font-semibold text-gray-800">{{ inventory.shop2Total }}</span>
                                </div>

                                <div class="flex-1 flex flex-col sm:flex-row items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-2 sm:px-4 py-3">
                                    <div class="flex items-center gap-2 text-nowrap">
                                        <i class="pi pi-warehouse text-brand-500 text-sm"></i>
                                        <span class="text-xs sm:text-sm text-gray-500">{{ $t('item.branchDidube') }}</span>
                                    </div>
                                    <span class="text-sm font-semibold text-gray-800">{{ inventory.shop1Total }}</span>
                                </div>
                            </div>
                        </template>
                    </Deferred>

                    <template v-for="price in item.prices" :key="price.id">
                        <div v-if="(price.priceGroup === 'VIP' && $page.props.user?.can_view_vip) || (price.priceGroup !== 'VIP' && $page.props.user?.can_view_wholesales)" class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-2 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-150">
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-gray-800 mb-1">
                                    {{ price.priceGroup === 'VIP' ? 'VIP' : price.priceGroup === 'Wholesales' ? $t('item.wholesale') : (item?.unit_price === '0.00' ? $t('item.pack') : $t('item.retail'))}}
                                </p>
                                <div v-if="price.custMinQuantity > 0" class="flex items-center gap-1.5">
                                    <p class="text-sm text-gray-500">
                                        {{ $t('item.priceAppliesFrom') }}
                                        <span class="text-sm mx-1 text-gray-600 font-semibold">{{ price.custMinQuantity }}</span>
                                        {{ item?.unit_price === '0.00' ? $t('item.perPackPurchase') : $t('item.perUnitPurchase') }}
                                    </p>
                                </div>
                            </div>
                            <div class="text-right ml-4">
                                <p class="text-xs text-gray-400 mb-0.5">{{ item.unit_price === '0.00' ? $t('item.packPrice') : $t('item.unitPrice')}}</p>
                                <div class="flex items-center gap-2">
                                    <p class="text-brand-500 font-bold text-xl">
                                        {{ Number(discountedTierPrice(item, price)).toFixed(2) }}<span class="text-sm ml-0.5">₾</span>
                                    </p>
                                    <div v-if="price.UOM">
                                        <i class="pi pi-box text-gray-400 text-xs"></i>
                                        <p class="text-sm text-gray-400 mt-0.5">{{ price.UOM }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Divider -->
                    <div class="h-px bg-gray-200 mb-8"></div>

                    <!-- Package price selector (only for unit_price = 0 items) -->
                    <div v-if="isPackageItem" class="mb-6">
                        <p class="text-xs text-gray-400 mb-2">{{ $t('item.choosePack') }}</p>
                        <div class="flex flex-wrap gap-2">
                            <button
                                v-for="entry in prices"
                                :key="entry.UOM"
                                @click="selectedEntry = entry"
                                class="relative flex flex-col items-center px-3 py-2 rounded-xl border font-medium transition-all duration-150 cursor-pointer"
                                :class="selectedEntry?.UOM === entry.UOM
                                    ? 'border-brand-500 bg-brand-50 text-brand-600'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'"
                            >
                                <span
                                    v-if="hasDiscount"
                                    class="absolute -top-2 -right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white shadow-md"
                                >-{{ formatDiscount(item.discount) }}%</span>

                                <span class="max-sm:text-sm mt-0.5" :class="selectedEntry?.UOM === entry.UOM ? 'text-brand-500' : 'text-gray-400'">
                                    {{ Number(discountedTierPrice(item, entry)).toFixed(2) }} ₾
                                </span>
                                <span v-if="hasDiscount" class="text-sm text-red-500 line-through">
                                    {{ Number(entry.price).toFixed(2) }} ₾
                                </span>
                                <span class="text-xs sm:text-sm font-semibold">{{ entry.UOM }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- Setup service -->
                    <div
                        v-if="item.has_setup_service"
                        class="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-6"
                    >
                        <div class="flex items-center gap-2">
                            <i class="pi pi-wrench text-brand-500"></i>
                            <span class="text-sm font-medium text-gray-800">{{ $t('item.setupService') }}</span>
                            <span class="text-sm text-gray-400">+{{ item.setup_service_price }} ₾</span>
                        </div>
                        <ToggleSwitch v-model="withService" />
                    </div>

                    <!-- Action Buttons -->
                    <div class="space-y-3">

                        <div class="flex items-center gap-3">
                            <!-- Quantity -->
                            <div v-if="inStock" class="flex flex-col justify-center gap-y-1">
                                <div :class="overLimit ? 'border-red-500' : ''" class="flex items-center border max-sm:px-2 border-gray-100 rounded-2xl overflow-hidden w-fit shadow-sm bg-white">

                                    <button
                                        @click="quantity > 1 ? quantity-- : null"
                                        :class="quantity > 1 ? 'cursor-pointer' : 'cursor-not-allowed'"
                                        class="w-8 lg:w-12 sm:h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                                    >
                                        <i class="pi pi-minus text-xs"></i>
                                    </button>

                                    <InputNumber
                                        v-model="quantity"
                                        :min="1"
                                        :use-grouping="false"
                                        inputClass="h-10"
                                        @input="e => { if (e.value !== null) quantity = e.value }"
                                        :input-style="{ width: '4rem', textAlign: 'center', padding: '0', boxShadow: 'none', border: 'none', fontWeight: '600' }"
                                    />

                                    <button
                                        @click="!atMax ? quantity++ : null"
                                        :class="[
                                            'w-8 lg:w-12 sm:h-11 flex items-center justify-center transition',
                                            atMax
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-500 cursor-pointer hover:bg-gray-50'
                                        ]"
                                    >
                                        <i class="pi pi-plus text-xs"></i>
                                    </button>
                                </div>
                            </div>

                            <!-- Add to Cart -->
                            <button
                                :disabled="overLimit || (!inStock && isInCart(item.id))"
                                @click="addToCart(item.id, quantity, selectedEntry?.UOM ?? null, withService).then(() => quantity = 1)"
                                class="relative w-full max-sm:px-2 max-sm:text-sm py-2.5 rounded-2xl cursor-pointer bg-brand-500 text-white font-semibold
                                hover:bg-brand-400 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-md"
                            >
                                <i :class="['lg:mr-2', isInCart(item.id) ? 'pi pi-shopping-cart' : 'pi pi-cart-plus']"></i>
                                {{ $t('common.addToCart') }}

                                <!-- Badge -->
                                <CartCountBadge class="sm:min-w-5! sm:h-5! min-w-4! h-4!" :item="item" />
                            </button>
                        </div>

                        <p v-if="overLimit" class="text-xs text-red-600">
                            {{ $t('cart.availableQty', { count: item.inventory }) }}
                        </p>

                        <div class="mt-8 space-y-3">
                            <!-- Buy Now -->
                            <button v-if="inStock" @click="buyNow(item.id, quantity, selectedEntry?.UOM ?? null, withService)" class="w-full py-2.5 rounded-2xl max-sm:text-sm cursor-pointer border border-gray-500 text-gray-900 font-semibold hover:bg-gray-800 hover:text-white active:scale-[0.98] transition-all" >
                                <i class="pi pi-bolt mr-2"></i>
                                {{ $t('item.buyNow') }}
                            </button>

                            <!-- Notify when back in stock -->
                            <StockNotifyButton
                                v-if="!inStock && !isOrderOnly"
                                :item="item"
                                :is-subscribed="isSubscribedToNotification"
                            />
                        </div>
                    </div>

                    <!-- Delivery & Payment Info -->
                    <div class="mt-6 space-y-2">

                        <Panel toggleable :collapsed="false" pt:root:class="px-4 py-3 !border-gray-100 !rounded-2xl !shadow-none">
                            <template #header>
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-truck text-brand-500"></i>
                                    <span class="text-sm font-semibold text-gray-800">{{ $t('item.delivery') }}</span>
                                </div>
                            </template>
                            <template #toggleicon="{ collapsed }">
                                <i :class="['pi text-xs text-gray-400', collapsed ? 'pi-plus' : 'pi-minus']"></i>
                            </template>
                            <ul class="space-y-2 text-xs text-gray-600">
                                <li class="flex gap-2">
                                    <span class="text-brand-500">→</span>
                                    <span>
                                        <strong>{{ $t('item.deliverySelfPickup') }}</strong>
                                        {{ $t('item.deliverySelfPickupText') }}
                                    <a href="https://maps.app.goo.gl/3YwH55CnhUUfJoYQ9" target="_blank" class="text-blue-500 hover:underline">
                                        {{ $t('item.onMap') }}
                                    </a>
                                </span>
                                </li>
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>{{ $t('item.deliveryTbilisi') }}</span></li>
                                <li class="flex gap-2">
                                    <span class="text-brand-500">→</span>
                                    <span>
                                        {{ $t('item.deliveryRegions') }}
                                        <Link :href="route('delivery-rates')" class="text-blue-500 hover:underline">{{ $t('item.seeDeliveryRates') }}</Link>
                                    </span>
                                </li>
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>{{ $t('item.deliveryUnloadNote') }}</span></li>
                            </ul>
                        </Panel>

                        <Panel toggleable :collapsed="false" pt:root:class="px-4 py-3 !border-gray-100 !rounded-2xl !shadow-none">
                            <template #header>
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-credit-card text-brand-500"></i>
                                    <span class="text-sm font-semibold text-gray-800">{{ $t('item.paymentMethods') }}</span>
                                </div>
                            </template>
                            <template #toggleicon="{ collapsed }">
                                <i :class="['pi text-xs text-gray-400', collapsed ? 'pi-plus' : 'pi-minus']"></i>
                            </template>
                            <ul class="space-y-2 text-xs text-gray-600">
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>{{ $t('item.paymentCards') }}</span></li>
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>{{ $t('item.paymentBankTransfer') }}</span></li>
                           </ul>
                        </Panel>

                    </div>

                </div>

                <!-- ================= TABS ================= -->
                <div class="lg:col-span-4 lg:row-start-2 lg:row-end-6 order-3 sm:mt-10">
                    <div class="col-span-2">

                        <Tabs v-model:value="activeTab" class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

                            <!-- Tab Headers -->
                            <TabList
                                pt:root:class="border-b border-gray-100 bg-transparent px-6"
                                pt:activeBar:class="bg-brand-500 h-[2px]"
                            >
                                <Tab
                                    value="0"
                                    pt:root:class="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition"
                                    pt:selected:class="text-gray-900"
                                >
                                    {{ $t('item.specifications') }}
                                </Tab>

                                <Tab
                                    value="1"
                                    pt:root:class="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition"
                                    pt:selected:class="text-gray-900"
                                >
                                    {{ $t('item.descriptionTab') }}
                                </Tab>
                            </TabList>

                            <!-- Tab Content -->
                            <TabPanels pt:root:class="p-8">

                                <!-- Attributes -->
                                <TabPanel value="0">
                                    <div v-if="attributes?.length" class="grid gap-3">
                                        <div
                                            v-for="attr in attributes"
                                            :key="attr.id"
                                            class="flex justify-between bg-gray-50 px-5 py-3 gap-x-6 rounded-xl text-sm"
                                        >
                                            <span class="text-gray-500">{{ attr.name }}</span>
                                            <span class="font-medium text-gray-900">{{ attr.value }}</span>
                                        </div>
                                    </div>

                                    <div v-else class="text-sm text-gray-400 italic">
                                        {{ $t('item.noSpecifications') }}
                                    </div>
                                </TabPanel>

                                <!-- Description -->
                                <TabPanel value="1">
                                    <div v-if="item.description" class="text-sm text-gray-600 leading-relaxed">
                                        {{ item.description }}
                                    </div>
                                    <div v-else class="text-sm text-gray-400 italic">
                                        {{ $t('item.noDescription') }}
                                    </div>
                                </TabPanel>

                            </TabPanels>

                        </Tabs>
                    </div>
                </div>
            </div>
        </div>

        <SimilarItems :items="similarItems" />
    </div>

    <WhatsappOrderDialog v-model:visible="showWhatsappDialog" />
</template>
