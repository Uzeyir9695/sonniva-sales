<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
const modelValue = defineModel()
</script>

<template>
    <InputText
        v-model="modelValue"
        v-bind="attrs"
        class="w-full rounded-xl text-sm py-1.5!"
    />
</template>
