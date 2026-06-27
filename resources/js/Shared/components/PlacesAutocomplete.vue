<script setup>
import { ref } from "vue";
import PrimeInputText from '@/Pages/PrimevueComponents/PrimeInputText.vue';

const props = defineProps({
    modelValue: String
});
const emits = defineEmits(["update:modelValue"]);

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const query = ref("");
const suggestions = ref([]);
const isConfirmed = ref(false);
const showWarning = ref(false);
let lastSeq = 0;

const debounceTimerRef = { t: null };
function debounce(fn, ms = 100) {
    return (...args) => {
        clearTimeout(debounceTimerRef.t);
        debounceTimerRef.t = setTimeout(() => fn(...args), ms);
    };
}

const doFetch = debounce(async (input, seq) => {
    if (!input) {
        suggestions.value = [];
        return;
    }

    try {
        const body = {
            input,
            includedRegionCodes: ['GE']
        };
        const resp = await fetch(`https://places.googleapis.com/v1/places:autocomplete?key=${GOOGLE_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await resp.json();

        if (seq < lastSeq) return;
        suggestions.value = data.suggestions || [];
    } catch (err) {
        console.error("[svc-debug] error in fetch", err);
        suggestions.value = [];
    }
}, 100);

function onInput() {
    isConfirmed.value = false;
    showWarning.value = false;
    emits("update:modelValue", "");
    const text = query.value.trim();
    const seq = ++lastSeq;
    doFetch(text, seq);
}

function onBlur() {
    if (query.value.trim() && !isConfirmed.value) {
        showWarning.value = true;
    }
}

function selectSuggestion(item) {
    query.value = item.placePrediction.text.text;
    suggestions.value = [];
    isConfirmed.value = true;
    showWarning.value = false;
    emits("update:modelValue", query.value);
}
</script>

<template>
    <div class="w-full">
        <div>
            <label for="city" class="text-sm font-semibold">
                ზუსტი მისამართი
                <i class="pi pi-exclamation-circle text-sm ml-1 text-red-500" v-tooltip.top="'სავალდებულო ველი'"></i>
            </label>
            <p v-if="showWarning" class="text-sm text-red-500 mt-1 mb-1">
                <i class="pi pi-exclamation-circle text-xs"></i>
                აირჩიეთ შესაბამისი მისამართი ქვემოთ მოცემული ლისტიდან
            </p>
            <div class="relative mt-2">
                <PrimeInputText id="city" class="py-2.5! w-full pr-8!" v-model="query" placeholder="მისამართი" @input="onInput" @blur="onBlur" />
                <span v-if="isConfirmed" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                    <i class="pi pi-check-circle text-base"></i>
                </span>
            </div>
        </div>
        <ul v-if="suggestions.length" class="border rounded-md bg-white mt-2 shadow-md">
            <li
                v-for="(item, i) in suggestions"
                :key="i"
                class="p-2 hover:bg-gray-100 cursor-pointer"
                @click="selectSuggestion(item)"
            >
                <strong>
                    {{ item.placePrediction.structuredFormat?.mainText?.text || item.placePrediction.text?.text }}
                </strong>
                <br v-if="item.placePrediction.structuredFormat?.secondaryText"/>
                <small v-if="item.placePrediction.structuredFormat?.secondaryText">
                    {{ item.placePrediction.structuredFormat.secondaryText.text }}
                </small>
            </li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
