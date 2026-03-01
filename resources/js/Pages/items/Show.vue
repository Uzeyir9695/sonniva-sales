<script setup>
import { Link } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import { useClipboard } from '@vueuse/core';
import { ZoomImg } from 'vue3-zoomer';

const props = defineProps({
    item: Object,
    attributes: Array,
})

const source = ref(props.item?.no);
const { text, copy, copied, isSupported } = useClipboard({ source });

/* ---------------- Wishlist ---------------- */
const inWishlist = ref(false)
const toggleWishlist = () => {
    inWishlist.value = !inWishlist.value
}

/* ---------------- Images ---------------- */
const activeIndex = ref(0)

const images = computed(() => {
    if (props.item?.images?.length) return props.item.images
    if (props.item?.image) return [props.item.image]
    return []
})

const imageUrl = (img) => `/storage/items/${img}`

function prevImage() {
    activeIndex.value =
        activeIndex.value === 0
            ? images.value.length - 1
            : activeIndex.value - 1
}

function nextImage() {
    activeIndex.value =
        activeIndex.value === images.value.length - 1
            ? 0
            : activeIndex.value + 1
}

/* ---------------- Quantity ---------------- */
const quantity = ref(1)

const inStock = computed(() => props.item?.inventory > 0)
const atMax = computed(() => quantity.value >= props.item?.inventory)
const overLimit = computed(() => quantity.value > props.item?.inventory)

/* ---------------- Tabs ---------------- */
const activeTab = ref('0')
</script>

<template>
    <div class="min-h-screen bg-[#f8f7 f4]">
        <div class="mx-auto px-4 py-5 sm:py-10">

            <!-- ================= TOP SECTION ================= -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

                <!-- ========== LEFT: GALLERY ========== -->
                <div class="flex flex-col gap-4">

                    <!-- Main Image -->
                    <div class="relative bg-white rounded-3xl overflow-hidden aspect-square border border-gray-100 shadow-sm">

                        <template v-if="images.length">
<!--                            <img-->
<!--                                v-for="(img, i) in images"-->
<!--                                :key="i"-->
<!--                                :src="imageUrl(img)"-->
<!--                                :alt="item.name"-->
<!--                                class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"-->
<!--                                :class="i === activeIndex ? 'opacity-100' : 'opacity-0'"-->
<!--                            />-->
                            <ZoomImg
                                v-for="(img, i) in images"
                                :key="i"
                                :src="imageUrl(img)"
                                :alt="item.name"
                                class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                                :class="i === activeIndex ? 'opacity-100' : 'opacity-0'"
                                zoom-type="move"
                                trigger="click"
                                :zoom-scale="4"
                                :step="1"
                                :show-zoom-btns="false"
                            />
                        </template>

                        <div v-else class="w-full h-full flex items-center justify-center bg-gray-50">
                            <i class="pi pi-image text-5xl text-gray-300"></i>
                        </div>

                        <!-- Arrows -->
                        <template v-if="images.length > 1">
                            <button
                                @click="prevImage"
                                class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:scale-105 transition"
                            >
                                <i class="pi pi-chevron-left text-xs"></i>
                            </button>

                            <button
                                @click="nextImage"
                                class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:scale-105 transition"
                            >
                                <i class="pi pi-chevron-right text-xs"></i>
                            </button>
                        </template>

                        <!-- Counter -->
                        <div
                            v-if="images.length > 1"
                            class="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full"
                        >
                            {{ activeIndex + 1 }} / {{ images.length }}
                        </div>
                    </div>

                    <!-- Thumbnails -->
                    <div v-if="images.length > 1" class="flex gap-3 overflow-x-auto">
                        <button
                            v-for="(img, i) in images"
                            :key="i"
                            @click="activeIndex = i"
                            class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all"
                            :class="i === activeIndex
                        ? 'border-gray-500'
                        : 'border-transparent opacity-60 hover:opacity-100'"
                        >
                            <img :src="imageUrl(img)" class="w-full h-full object-cover" :alt="item.slug" />
                        </button>
                    </div>

                </div>

                <!-- ========== RIGHT: DETAILS ========== -->
                <div class="flex flex-col border border-gray-100 p-3 rounded-2xl shadow-xs">

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
                                v-tooltip.bottom="'პროდუქტის კოდის კოპირება'"
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
                            ₾{{ item.unit_price }}
                        </span>
                                <span v-if="item.base_uom_desc" class="text-sm text-gray-400">
                            / {{ item.base_uom_desc }}
                        </span>
                    </div>

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
                                class="w-full max-sm:px-2 max-sm:text-sm py-3.5 rounded-2xl cursor-pointer bg-brand-500 text-white font-semibold
                                hover:bg-brand-400 active:scale-[0.98] transition-all shadow-md"
                            >
                                <i class="pi pi-shopping-cart lg:mr-2"></i>
                                კალათაში დამატება
                            </button>
                        </div>

                        <div class="flex gap-3 mt-8">
                            <!-- Buy Now -->
                            <button v-if="inStock" class="w-full py-3.5 rounded-2xl max-sm:text-sm cursor-pointer border border-gray-500 text-gray-900 font-semibold hover:bg-gray-800 hover:text-white active:scale-[0.98] transition-all" >
                                <i class="pi pi-bolt mr-2"></i>
                                ახლავე შეძენა
                            </button>

                            <!-- Wishlist -->
                            <Button
                                @click="toggleWishlist"
                                :icon="inWishlist ? 'pi pi-heart-fill' : 'pi pi-heart'"
                                severity="secondary"
                                outlined
                                :class="inWishlist ? 'bg-red-50 border-red-200' : ' '"
                                class="px-6 rounded-2xl flex items-center justify-center ml-auto
                                   border-gray-500
                                   hover:bg-gray-100
                                   active:scale-[0.95] transition-all"
                                    :pt="{
                                        icon: {
                                            class: inWishlist ? 'text-red-500 text-xl' : 'text-gray-700 text-xl'
                                        }
                                    }"
                            />
                        </div>
                    </div>

                </div>
            </div>

            <!-- ================= TABS ================= -->
            <!-- ================= TABS ================= -->
            <div class="mt-16">

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
                            აღწერა
                        </Tab>

                        <Tab
                            value="1"
                            pt:root:class="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition"
                            pt:selected:class="text-gray-900"
                        >
                            მახასიათებლები
                        </Tab>
                    </TabList>

                    <!-- Tab Content -->
                    <TabPanels pt:root:class="p-8">

                        <!-- Description -->
                        <TabPanel value="0">
                            <div v-if="item.description" class="text-sm text-gray-600 leading-relaxed">
                                {{ item.description }}
                            </div>
                            <div v-else class="text-sm text-gray-400 italic">
                                აღწერა არ არის მითითებული.
                            </div>
                        </TabPanel>

                        <!-- Attributes -->
                        <TabPanel value="1">
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

                    </TabPanels>

                </Tabs>

            </div>

        </div>
    </div>
</template>
