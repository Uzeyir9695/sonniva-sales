<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
const modelValue = defineModel()
</script>

<template>
    <InputText
        v-model="modelValue"
        v-bind="attrs"
        class="w-full rounded-md text-sm sm:text-base"
    />
</template>
