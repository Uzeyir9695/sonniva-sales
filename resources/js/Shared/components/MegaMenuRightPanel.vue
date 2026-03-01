<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="flex flex-col gap-3 px-4 h-full">
        <!-- Top row: Hero + New Arrivals -->
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 flex-1">

            <!-- Hero Banner -->
            <div class="sm:col-span-3 relative bg-amber-50 rounded-2xl p-6 flex flex-col justify-between overflow-hidden min-h-[180px]">
                <!-- Decorative circle -->
                <div class="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-amber-100/60"></div>
                <div class="absolute -right-4 -bottom-10 w-28 h-28 rounded-full bg-orange-100/50"></div>

                <div class="relative z-10">
                    <span class="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        🔥 აქცია
                    </span>
                    <h2 class="text-2xl font-bold text-gray-900 leading-tight mb-2">
                        გაზაფხულის<br>კოლექცია
                    </h2>
                    <p class="text-sm text-gray-500">შეარჩიეთ საუკეთესო ავეჯი</p>
                </div>

                <Link href="#" class="relative z-10 inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-700 transition-all w-fit mt-4">
                    აღმოაჩინე →
                </Link>
            </div>

            <!-- New Arrivals -->
            <div class="sm:col-span-2 bg-emerald-50 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 min-h-[140px] sm:min-h-[180px]">
                <span class="text-4xl">🌿</span>
                <div>
                    <p class="font-semibold text-gray-800 text-sm">ახალი ჩამოსვლები</p>
                    <p class="text-xs text-gray-400 mt-0.5">ყოველ კვირას</p>
                </div>
            </div>

        </div>

        <!-- Bottom row: 3 feature cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">

            <div class="flex items-center gap-3 bg-blue-50 rounded-2xl px-4 py-3">
                <span class="text-2xl shrink-0">🚚</span>
                <div>
                    <p class="text-xs font-semibold text-gray-800">უფასო მიწოდება</p>
                    <p class="text-xs text-gray-400">100₾+</p>
                </div>
            </div>

            <div class="flex items-center gap-3 bg-pink-50 rounded-2xl px-4 py-3">
                <span class="text-2xl shrink-0">💎</span>
                <div>
                    <p class="text-xs font-semibold text-gray-800">ტოპ ბრენდები</p>
                    <p class="text-xs text-gray-400">პრემიუმ ხარისხი</p>
                </div>
            </div>

            <div class="flex items-center gap-3 bg-amber-50 rounded-2xl px-4 py-3">
                <span class="text-2xl shrink-0">⭐</span>
                <div>
                    <p class="text-xs font-semibold text-gray-800">ტოპ სელერი</p>
                    <p class="text-xs text-gray-400">პოპულარული</p>
                </div>
            </div>
        </div>
    </div>
</template>
