<script setup>
import { Link } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import { useClipboard } from '@vueuse/core';
import SimilarItems from '@/Pages/items/SimilarItems.vue';
import ItemGallery from '@/Pages/items/ItemGallery.vue';
import WishlistButton from '@/Shared/components/WishlistButton.vue';
import { useCart } from '@/composables/useCart.js';
import Breadcrumbs from '@/Shared/components/Breadcrumbs.vue';

const props = defineProps({
    item: Object,
    similarItems: Array,
    attributes: Array,
    breadcrumbs: Array,
    inventory: Object,
})

const { addToCart } = useCart()

const source = ref(props.item?.no);
const { copy, copied } = useClipboard({ source });

const images = computed(() => {
    if (props.item?.images?.length) return props.item.images
    if (props.item?.image) return [props.item.image]
    return []
})

/* ---------------- Quantity ---------------- */
const quantity = ref(1)

const inStock = computed(() => props.item?.inventory > 0)
const atMax = computed(() => quantity.value >= props.item?.inventory)
const overLimit = computed(() => quantity.value > props.item?.inventory)

/* ---------------- Tabs ---------------- */
const activeTab = ref('0')
</script>

<template>
    <Head :title="item?.slug" />

    <div class="min-h-screen bg-[#f8f7 f4]">

        <!-- ================= BREADCRUMBS ================= -->
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>

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

                        <div class="flex items-center gap-2">
                            <span v-if="copied" class="text-emerald-500 text-xs">დაკოპირებულია</span>

                            <div
                                @click="copy(item.no)"
                                v-tooltip.bottom="'დააკოპირე პროდუქტის კოდი'"
                                class="flex items-center justify-center w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 cursor-pointer"
                            >
                                <i v-if="copied" class="pi pi-check text-emerald-500 text-xs"></i>
                                <i v-else class="pi pi-copy text-gray-400 text-xs"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Title -->
                    <h1 class="sm:text-xl font-semibold text-gray-900 leading-snug mb-5">
                        {{ item.name }}
                    </h1>

                    <!-- Price -->
                    <div class="flex items-center gap-3 mb-8">
                        <span class="text-lg sm:text-2xl font-bold text-brand-500 tracking-tight">
                         {{ item.unit_price }} ₾
                        </span>
                                <span v-if="item.base_uom_desc" class="text-sm text-gray-400">
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

                    <template v-for="price in item.prices" :key="price.id">
                        <div class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-2 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-150">
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-gray-800 mb-1">
                                    {{ price.priceGroup }}
                                </p>
                                <div class="flex items-center gap-1.5">
                                    <i class="pi pi-box text-gray-400 text-xs"></i>
                                    <p class="text-xs text-gray-400">
                                        მინ. რაოდენობა: <span class="text-gray-600 font-medium">{{ price.custMinQuantity }}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="text-right ml-4">
                                <p class="text-xs text-gray-400 mb-0.5">ცალის ფასი</p>
                                <p class="text-brand-500 font-bold text-xl">
                                    {{ price.price }}<span class="text-sm ml-0.5">₾</span>
                                </p>
                            </div>
                        </div>
                    </template>

                    <!-- Divider -->
                    <div class="h-px bg-gray-200 mb-8"></div>

                    <!-- Action Buttons -->
                    <div class="space-y-3">

                        <div class="flex items-center gap-3">
                            <!-- Quantity -->
                            <div class="flex flex-col justify-center gap-y-1">
                                <div class="flex items-center border border-gray-200 rounded-2xl overflow-hidden w-fit shadow-sm bg-white">

                                    <button
                                        @click="quantity > 1 ? quantity-- : null"
                                        :class="quantity > 1 ? 'cursor-pointer' : 'cursor-not-allowed'"
                                        class="w-8 lg:w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                                    >
                                        <i class="pi pi-minus text-xs"></i>
                                    </button>

                                    <InputText
                                        v-model="quantity"
                                        inputmode="numeric"
                                        class="w-16 h-12 text-center font-semibold rounded-xl shadow-none border-none"
                                    />

                                    <button
                                        @click="!atMax ? quantity++ : null"
                                        :class="[
                                            'w-8 lg:w-12 h-12 flex items-center justify-center transition',
                                            atMax
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-500 cursor-pointer hover:bg-gray-50'
                                        ]"
                                    >
                                        <i class="pi pi-plus text-xs"></i>
                                    </button>
                                </div>

<!--                                <p v-if="overLimit" class="text-xs text-red-600">-->
<!--                                    მაქსიმუმ {{ item.inventory }} ერთეული-->
<!--                                </p>-->
                            </div>

                            <!-- Add to Cart -->
                            <button
                                @click="addToCart(item.id, quantity)"
                                class="w-full max-sm:px-2 max-sm:text-sm py-3 rounded-2xl cursor-pointer bg-brand-500 text-white font-semibold
                                hover:bg-brand-400 active:scale-[0.98] transition-all shadow-md"
                            >
                                <i class="pi pi-shopping-cart lg:mr-2"></i>
                                კალათაში დამატება
                            </button>
                        </div>

                        <div class="flex gap-2 mt-8">
                            <!-- Buy Now -->
                            <button v-if="inStock" class="w-full rounded-2xl max-sm:text-sm cursor-pointer border border-gray-500 text-gray-900 font-semibold hover:bg-gray-800 hover:text-white active:scale-[0.98] transition-all" >
                                <i class="pi pi-bolt mr-2"></i>
                                ახლავე შეძენა
                            </button>

                            <!-- Wishlist -->
                            <WishlistButton
                                :item-id="item.id"
                                size="lg"
                                variant="pill"
                                class="shrink-0"
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
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span><strong>თვითგატანა ოფისიდან:</strong> უფასო. გატანის წერტილები <a href="#" class="text-blue-500 hover:underline">რუკაზე</a></span></li>
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>მიწოდება თბილისში: 1000+ ₾ უფასო, 1000-მდე ₾ 70 </span></li>
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>მიწოდება რეგიონებში: 200 ლარიდან</span></li>
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <a href="#" class="text-blue-500 hover:underline">დეტალურად მიწოდების შესახებ</a></li>
                                <li class="flex gap-2"><span class="text-brand-500">→</span> <span>13:00-მდე გაფორმებულ შეკვეთებს გაწვდით იმავე დღეს!</span></li>
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
                                            class="flex justify-between bg-gray-50 px-5 py-3 rounded-xl text-sm"
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
</template>
