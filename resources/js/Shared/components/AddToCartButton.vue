<script setup>
import { ref } from 'vue'
import InputNumber from 'primevue/inputnumber'
import { useCart } from '@/composables/useCart.js';

const props = defineProps({
    item: { type: Object, required: true },
})

const { addToCart } = useCart()

const quantity = ref(1)
const showStepper = ref(false)

const isOutOfStock = !props.item.inventory || props.item.inventory === 0

function onMouseEnter() {
    if (!isOutOfStock) showStepper.value = true
}

function onMouseLeave() {
    showStepper.value = false
    quantity.value = 1
}
</script>

<template>
    <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">

        <!-- Default button -->
        <button
            :disabled="isOutOfStock"
            :class="isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-brand-500 text-white hover:bg-brand-400 active:scale-95 cursor-pointer'"
            class="flex items-center text-xs font-semibold p-2 rounded-xl transition-all duration-150"
        >
            <i class="pi pi-cart-plus"></i>
        </button>

        <!-- Stepper -->
        <div
            v-if="showStepper"
            class="absolute top-1/2 -translate-y-1/2 right-0
                   flex items-center gap-1 bg-white rounded-xl shadow-lg pl-2 py-1.5 border-gray-100"
        >
            <InputNumber
                v-model="quantity"
                show-buttons
                button-layout="horizontal"
                :min="1"
                :input-style="{ width: '2rem', textAlign: 'center', padding: '0', boxShadow: 'none', fontSize: '0.875rem', fontWeight: '600' }"
                class="cart-stepper"
                @click.stop
            >
                <template #incrementbuttonicon>
                    <i class="pi pi-plus text-xs" />
                </template>
                <template #decrementbuttonicon>
                    <i class="pi pi-minus text-xs" />
                </template>
            </InputNumber>

            <button
                @click.stop="addToCart(item.id, quantity)"
                class="flex items-center justify-center rounded-xl p-2
                       bg-brand-500 cursor-pointer hover:bg-brand-400 active:scale-95
                       text-white transition-all duration-150"
            >
                <i class="pi pi-cart-plus"></i>
            </button>
        </div>

    </div>
</template>

<style scoped>
/* Strip PrimeVue's default InputNumber chrome to match our design */
:deep(.cart-stepper .p-inputnumber-button) {
    background: transparent;
    border: none;
    color: #4b5563;
    padding: 0.25rem;
    width: 1.5rem;
    box-shadow: none;
}

:deep(.cart-stepper .p-inputnumber-button:hover) {
    color: #111827;
    background: transparent;
}

:deep(.cart-stepper .p-inputtext) {
    border: none;
    box-shadow: none;
    background: transparent;
}
</style>
