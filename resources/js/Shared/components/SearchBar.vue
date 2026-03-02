<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';
import QuickViewDialog from '@/Shared/components/QuickViewDialog.vue';

const props = defineProps({
    placeholder: { type: String, default: 'მოძებნე ის რაც გჭირდება...' },
    inputClass:  { type: String, default: '' },
});

const emit = defineEmits(['close']);

const query       = ref('');
const results     = ref([]);
const loading     = ref(false);
const showDropdown = ref(false);
const inputRef    = ref(null);
const wrapperRef  = ref(null);
const quickViewOpen  = ref(false);
const quickViewItem = ref(null);

let debounceTimer = null;

watch(query, (val) => {
    clearTimeout(debounceTimer);
    if (val.trim().length < 2) {
        results.value = [];
        showDropdown.value = false;
        loading.value = false;
        return;
    }
    loading.value = true;
    debounceTimer = setTimeout(async () => {
        try {
            const res = await axios.get('/api/v1/search', { params: { q: val } });
            results.value = res.data;
            showDropdown.value = res.data.length > 0;
        } catch {
            results.value = [];
        } finally {
            loading.value = false;
        }
    }, 450);
});

function goToItem(item) {
    showDropdown.value = false;
    query.value = '';
    emit('close');
    router.get(route('items.show', item.slug));
}

function goToSearch() {
    if (!query.value.trim()) return;
    showDropdown.value = false;
    router.get(route('items.index', { q: query.value }));
}

function imageUrl(img) {
    return `/storage/items/${img}`;
}

// Close dropdown on outside click
function onClickOutside(e) {
    if (wrapperRef.value && !wrapperRef.value.contains(e.target)) {
        // don't close if quickview is open
        if (quickViewOpen.value) return;
        showDropdown.value = false;
    }
}

function openQuickView(item) {
    quickViewItem.value = item;
    quickViewOpen.value = true;
}

onMounted(() => document.addEventListener('mousedown', onClickOutside));
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside));

defineExpose({ inputRef });
</script>

<template>
    <Teleport to="body">
        <div
            v-if="showDropdown && results?.length > 0"
            class="fixed inset-0 z-30 backdrop-blur-sm bg-black/20"
            @clickr="results = []; showDropdown = false"
        />
    </Teleport>

    <div ref="wrapperRef" class="relative w-full">
        <!-- Input -->
        <div
            class="flex items-center bg-gray-100 rounded-xl px-4 h-11 gap-3 transition-all focus-within:border-2 focus-within:border-brand-400 focus-within:bg-white"
            :class="showDropdown ? 'rounded-b-none border-2 border-brand-400' : ''"
        >
            <i v-if="!loading" class="pi pi-search text-gray-400 text-sm shrink-0"></i>
            <i v-else class="pi pi-spinner pi-spin text-brand-400 text-sm shrink-0"></i>

            <input
                ref="inputRef"
                v-model="query"
                :placeholder="placeholder"
                @keydown.enter="goToSearch"
                @keydown.escape="showDropdown = false"
                class="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />

            <button
                v-if="query"
                @click="query = ''; results = []; showDropdown = false"
                class="text-gray-400 hover:text-gray-600 shrink-0"
            >
                <i class="pi pi-times text-xs"></i>
            </button>
        </div>

        <!-- Dropdown -->
        <div
            v-if="showDropdown"
            class="absolute left-0 right-0 top-full bg-white border-2 border-t-0 border-brand-400 rounded-b-xl shadow-xl z-50 max-h-[700px] overflow-y-auto"
        >
            <div
                class="flex items-center justify-center gap-2 sticky top-0 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors text-xs font-medium text-gray-500"
            >
                <i class="pi pi-search text-xs"></i>
                სულ მოიძებნა {{ results.length }} შედეგი
            </div>
            <ul>
                <li
                    v-for="item in results"
                    :key="item.id"
                    @click="goToItem(item)"
                    class="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0 group"
                >
                    <!-- Image -->
                    <div class="w-18 h-18 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img
                            v-if="item.images?.length"
                            :src="imageUrl(item.images[0])"
                            :alt="item.name"
                            class="w-full h-full object-cover"
                        />
                        <div v-else class="w-full h-full flex items-center justify-center">
                            <i class="pi pi-image text-gray-300 text-sm"></i>
                        </div>
                    </div>

                    <div class="flex flex-col flex-1 gap-3">
                        <!-- Name -->
                        <div class="flex-1">
                            <p class="text-sm text-gray-800 font-medium line-clamp-2 sm:line-clamp-2">{{ item.name }}</p>
                        </div>

                        <!-- Stock  + Price-->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <p class="text-xs sm:text-sm text-brand-500 font-bold mt-0.5">₾{{ item.unit_price }}</p>

                                <span
                                    class="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                                    :class="item.inventory > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-500'"
                                >
                                {{ item.inventory > 0 ? 'მარაგშია' : 'არაა' }}
                            </span>
                            </div>

                            <!-- Actions -->
                            <div class="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                                <button
                                    @click.stop
                                    class="w-5 sm:w-7 h-5 sm:h-7 rounded-lg cursor-pointer flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                                    v-tooltip.top="'სურვილების სია'"
                                >
                                    <i class="pi pi-heart text-xs"></i>
                                </button>
                                <button
                                    @click.stop
                                    class="w-5 sm:w-7 h-5 sm:h-7 rounded-lg cursor-pointer flex items-center justify-center text-gray-400 hover:text-brand-500 hover:bg-brand-50 transition-colors"
                                    v-tooltip.top="'დაამატე კალათაში'"
                                >
                                    <i class="pi pi-cart-plus text-xs"></i>
                                </button>
                                <button
                                    @click.stop="openQuickView(item)"
                                    class="w-5 sm:w-7 h-5 sm:h-7 rounded-lg cursor-pointer flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                    v-tooltip.top="'სწრაფი დათვალიერება'"
                                >
                                    <i class="pi pi-eye text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <!-- QUICK VIEW DIALOG -->
    <QuickViewDialog
        v-model:visible="quickViewOpen"
        :item="quickViewItem"
    />
</template>
