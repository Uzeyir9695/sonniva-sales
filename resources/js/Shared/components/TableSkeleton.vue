<script setup>
const rows = 8;
const columns = [
    { width: '3rem' },
    { width: '8rem' },
    { width: null, double: true }, // flex, two lines (e.g. name + phone)
    { width: '6rem' },
    { width: '7rem' },
    { width: '6rem' },
    { width: '7rem' },
    { width: '7rem' },
    { width: '6rem' },
];

const cellWidths = ['55%', '70%', '85%', '60%', '75%', '90%', '50%', '80%'];
function cellWidth(colIndex, rowIndex) {
    return cellWidths[(colIndex + rowIndex * 3) % cellWidths.length];
}
</script>

<template>
    <div class="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm mt-4">
        <!-- Header -->
        <div class="flex items-center gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div
                v-for="(col, i) in columns"
                :key="i"
                :style="col.width ? `width:${col.width};flex-shrink:0` : 'flex:1'"
            >
                <Skeleton height="0.7rem" :width="i === 0 ? '50%' : '70%'" class="bg-gray-200!" borderRadius="4px" />
            </div>
        </div>

        <!-- Rows -->
        <div
            v-for="row in rows"
            :key="row"
            :class="[
                'flex items-center gap-4 px-4 py-3 border-b border-gray-100 last:border-b-0',
                row % 2 === 0 ? 'bg-white' : 'bg-gray-50/40',
            ]"
        >
            <div
                v-for="(col, i) in columns"
                :key="i"
                :style="col.width ? `width:${col.width};flex-shrink:0` : 'flex:1'"
                class="flex flex-col gap-1.5"
            >
                <Skeleton height="0.7rem" :width="cellWidth(i, row)" class="bg-gray-200!" borderRadius="4px" />
                <Skeleton
                    v-if="col.double"
                    height="0.6rem"
                    width="45%"
                    class="bg-gray-100!"
                    borderRadius="4px"
                />
            </div>
        </div>
    </div>
</template>
