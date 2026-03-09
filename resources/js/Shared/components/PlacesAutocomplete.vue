<template>
    <div class="w-full">
        <FloatLabel variant="on">
            <PrimeInputText id="city" class="p-2.5" v-model="query" @input="onInput" />
            <label for="city">მისამართი <span class="text-red-500">*</span></label>
        </FloatLabel>
        <ul v-if="suggestions.length" class="border rounded-md bg-white mt-2 shadow-md">
            <li
                v-for="(item, i) in suggestions"
                :key="i"
                class="p-2 hover:bg-gray-100 cursor-pointer"
                @click="selectSuggestion(item)"
            >
                <!-- Use structuredFormat if available, else fallback to text.text -->
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
            includedRegionCodes: ['GE', 'DE', 'FR']
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
    const text = query.value.trim();
    const seq = ++lastSeq;
    doFetch(text, seq);
}

function selectSuggestion(item) {
    query.value = item.placePrediction.text.text;
    suggestions.value = [];
    emits("update:modelValue", query.value);
}
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
