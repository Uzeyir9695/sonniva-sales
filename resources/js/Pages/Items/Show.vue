<script setup>
import { Head, usePage } from '@inertiajs/vue3'
import { ref, computed, onMounted, watch } from 'vue'
import { useGtag } from '@/composables/useGtag.js'
import { useClipboard } from '@vueuse/core';
import SimilarItems from '@/Pages/Items/SimilarItems.vue';
import ItemGallery from '@/Pages/Items/ItemGallery.vue';
import WishlistButton from '@/Shared/components/WishlistButton.vue';
import StockNotifyButton from '@/Shared/components/StockNotifyButton.vue';
import WhatsappOrderDialog from '@/Shared/components/WhatsappOrderDialog.vue';
import { useCart } from '@/composables/useCart.js';
import { usePricing } from '@/composables/usePricing.js';
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

const source = ref(props.item?.no);
const { copy, copied } = useClipboard({ source });

const images = computed(() => {
    if (props.item?.images?.length) return props.item.images
    if (props.item?.image) return [props.item.image]
    return []
})

/* ---------------- Pricing ---------------- */
const { isPackageItem, prices } = usePricing(() => props.item)
const selectedEntry = ref(null)
watch(prices, (val) => { selectedEntry.value = val[0] ?? null }, { immediate: true })

/* ---------------- Quantity ---------------- */
const quantity = ref(1)

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
                <div class="lg:col-span-4 lg:row-start-1 lg:row-end-2 order-1">
                    <ItemGallery :images="images" :item-name="item.name" :image-path="item.storage_path" />
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
                            <span>{{ inStock ? 'მარაგშია' : 'მარაგში არაა' }}</span>
                        </div>

                        <div class="flex items-center gap-3">
                            <!-- Wishlist -->
                            <WishlistButton
                                :item-id="item.id"
                                size="sm"
                                variant="pill"
                                class="border border-gray-100 rounded-lg! shrink-0"
                            />
                            <span v-if="copied" class="text-emerald-500 text-xs">დაკოპირებულია</span>

                            <div
                                @click="copy(item.no)"
                                v-tooltip.bottom="'დააკოპირე პროდუქტის კოდი'"
                                class="flex items-center justify-center w-7 h-7 border border-gray-200 rounded-lg shadow-md hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 cursor-pointer"
                            >
                                <i v-if="copied" class="pi pi-check text-emerald-500 text-xs"></i>
                                <i v-else class="pi pi-copy text-gray-400 text-sm"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Title -->
                    <h1 class="sm:text-xl font-semibold text-gray-900 leading-snug mb-2">
                        {{ item.name }}
                    </h1>
                    <!-- Item NO -->
<!--                    <h1 class="sm:text-xs font-semibold text-gray-900 leading-snug mb-5">-->
<!--                        {{ item.no }}-->
<!--                    </h1>-->

                    <!-- Price -->
                    <div class="flex items-center gap-3 mb-8">
                        <span class="text-lg sm:text-2xl font-bold text-brand-500 tracking-tight">
                            {{ isPackageItem ? selectedEntry?.price : item.unit_price }} ₾
                        </span>
                        <span v-if="isPackageItem && selectedEntry?.UOM" class="text-sm text-gray-400">
                            / {{ selectedEntry.UOM }}
                        </span>
                        <span v-else-if="item.base_uom_desc" class="text-sm text-gray-400">
                            / {{ item.base_uom_desc }}
                        </span>
                    </div>

<!--                    <div class="flex items-center gap-3 mt-4 mb-6">-->
<!--                        <div class="flex-1 flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">-->
<!--                            <div class="flex items-center gap-2">-->
<!--                                <i class="pi pi-warehouse text-brand-500 text-sm"></i>-->
<!--                                <span class="text-xs text-gray-500">მაღაზია 1</span>-->
<!--                            </div>-->
<!--                            <span class="text-sm font-semibold text-gray-800">{{ inventory.shop1Total }}</span>-->
<!--                        </div>-->

<!--                        <div class="flex-1 flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">-->
<!--                            <div class="flex items-center gap-2">-->
<!--                                <i class="pi pi-warehouse text-brand-500 text-sm"></i>-->
<!--                                <span class="text-xs text-gray-500">მაღაზია 2</span>-->
<!--                            </div>-->
<!--                            <span class="text-sm font-semibold text-gray-800">{{ inventory.shop2Total }}</span>-->
<!--                        </div>-->
<!--                    </div>-->

<!--                    <template v-for="price in item.prices" :key="price.id">-->
<!--                        <div class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-2 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-150">-->
<!--                            <div class="flex-1">-->
<!--                                <p class="text-sm font-semibold text-gray-800 mb-1">-->
<!--                                    {{ price.priceGroup }}-->
<!--                                </p>-->
<!--                                <div class="flex items-center gap-1.5">-->
<!--                                    <i class="pi pi-box text-gray-400 text-xs"></i>-->
<!--                                    <p class="text-xs text-gray-400">-->
<!--                                        მინ. რაოდენობა: <span class="text-gray-600 font-medium">{{ price.custMinQuantity }}</span>-->
<!--                                    </p>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="text-right ml-4">-->
<!--                                <p class="text-xs text-gray-400 mb-0.5">ცალის ფასი</p>-->
<!--                                <p class="text-brand-500 font-bold text-xl">-->
<!--                                    {{ price.price }}<span class="text-sm ml-0.5">₾</span>-->
<!--                                </p>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </template>-->

                    <!-- Divider -->
                    <div class="h-px bg-gray-200 mb-8"></div>

                    <!-- Package price selector (only for unit_price = 0 items) -->
                    <div v-if="isPackageItem" class="mb-6">
                        <p class="text-xs text-gray-400 mb-2">აირჩიეთ შეკვრა</p>
                        <div class="flex flex-wrap gap-2">
                            <button
                                v-for="entry in prices"
                                :key="entry.UOM"
                                @click="selectedEntry = entry"
                                class="flex flex-col items-center px-3 py-2 rounded-xl border font-medium transition-all duration-150 cursor-pointer"
                                :class="selectedEntry?.UOM === entry.UOM
                                    ? 'border-brand-500 bg-brand-50 text-brand-600'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'"
                            >
                                <span class="max-sm:text-sm mt-0.5" :class="selectedEntry?.UOM === entry.UOM ? 'text-brand-500' : 'text-gray-400'">
                                    {{ entry.price }} ₾
                                </span>
                                <span class="text-xs sm:text-sm font-semibold">{{ entry.UOM }}</span>
                            </button>
                        </div>
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
                                @click="addToCart(item.id, quantity, selectedEntry?.UOM ?? null).then(() => quantity = 1)"
                                class="relative w-full max-sm:px-2 max-sm:text-sm py-2.5 rounded-2xl cursor-pointer bg-brand-500 text-white font-semibold
                                hover:bg-brand-400 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-md"
                            >
                                <i :class="['lg:mr-2', isInCart(item.id) ? 'pi pi-shopping-cart' : 'pi pi-cart-plus']"></i>
                                კალათაში დამატება

                                <!-- Badge -->
                                <CartCountBadge class="sm:min-w-5! sm:h-5! min-w-4! h-4!" :item="item" />
                            </button>
                        </div>

                        <p v-if="overLimit" class="text-xs text-red-600">
                            ხელმისაწვდომი რაოდენობაა {{ item.inventory }}
                        </p>

                        <div class="mt-8 space-y-3">
                            <!-- Buy Now -->
                            <button v-if="inStock" @click="buyNow(item.id, quantity, selectedEntry?.UOM ?? null)" class="w-full py-2.5 rounded-2xl max-sm:text-sm cursor-pointer border border-gray-500 text-gray-900 font-semibold hover:bg-gray-800 hover:text-white active:scale-[0.98] transition-all" >
                                <i class="pi pi-bolt mr-2"></i>
                                ახლავე შეძენა
                            </button>

                            <!-- Order via WhatsApp -->
                            <button
                                v-if="!inStock"
                                @click="showWhatsappDialog = true"
                                class="w-full py-2.5 rounded-2xl max-sm:text-sm flex items-center justify-center gap-2 bg-slate-700 cursor-pointer border border-slate-800 text-white font-bold hover:bg-slate-800 active:scale-[0.98] transition-all"
                            >
                                <i class="pi pi-file-edit"></i>
                                მოითხოვე შეკვეთა
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
                                    <span class="text-sm font-semibold text-gray-800">მიწოდება</span>
                                </div>
                            </template>
                            <template #toggleicon="{ collapsed }">
                                <i :class="['pi text-xs text-gray-400', collapsed ? 'pi-plus' : 'pi-minus']"></i>
                            </template>
                            <ul class="space-y-2 text-xs text-gray-600">
                                <li class="flex gap-2">
                                    <span class="text-brand-500">→</span>
                                    <span>
                                        <strong>თვითგატანა ოფისიდან:</strong>
                                        უფასო. გატანის წერტილი
                                    <a href="https://maps.app.goo.gl/3YwH55CnhUUfJoYQ9" target="_blank" class="text-blue-500 hover:underline">
                                        რუკაზე
                                    </a>
                                </span>
                                </li>
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>მიწოდება თბილისში: 100+ ₾ უფასო </span></li>
                                <li class="flex gap-2">
                                    <span class="text-brand-500">→</span>
                                    <span>
                                        მიწოდება რეგიონებში:
                                        <a href="#" class="text-blue-500 hover:underline">იხილეთ მიწოდების ტარიფები</a>
                                    </span>
                                </li>
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>13:00-მდე გაფორმებულ შეკვეთებს თბილისში გაწვდით იმავე დღეს!</span></li>
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>მიტანის სერვისის ფარგლებში პროდუქციის მანქანიდან ჩამოტვირთვა და სართულზე ატანა არ შედის მომსახურებაში.</span></li>
                            </ul>
                        </Panel>

                        <Panel toggleable :collapsed="false" pt:root:class="px-4 py-3 !border-gray-100 !rounded-2xl !shadow-none">
                            <template #header>
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-credit-card text-brand-500"></i>
                                    <span class="text-sm font-semibold text-gray-800">გადახდის მეთოდები</span>
                                </div>
                            </template>
                            <template #toggleicon="{ collapsed }">
                                <i :class="['pi text-xs text-gray-400', collapsed ? 'pi-plus' : 'pi-minus']"></i>
                            </template>
                            <ul class="space-y-2 text-xs text-gray-600">
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>ბარათებით Visa, MasterCard, ლოიალობის ქულებით</span></li>
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>საბანკო გადარიცხვით</span></li>
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
                                    მახასიათებლები
                                </Tab>

                                <Tab
                                    value="1"
                                    pt:root:class="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition"
                                    pt:selected:class="text-gray-900"
                                >
                                    აღწერა
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
                                        მახასიათებლები არ არის მითითებული.
                                    </div>
                                </TabPanel>

                                <!-- Description -->
                                <TabPanel value="1">
                                    <div v-if="item.description" class="text-sm text-gray-600 leading-relaxed">
                                        {{ item.description }}
                                    </div>
                                    <div v-else class="text-sm text-gray-400 italic">
                                        აღწერა არ არის მითითებული.
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
