<script setup>
import { router, usePage } from '@inertiajs/vue3';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    item: { type: Object, required: true },
    isSubscribed: { type: Boolean, default: false },
});
</script>

<template>
    <div>
    <template v-if="$page.props?.user">
        <button
            v-if="!isSubscribed"
            @click="router.post(route('stock-notifications.subscribe', item.slug))"
            class="w-full py-3 rounded-2xl border border-dashed border-brand-400 text-brand-500 text-sm font-medium hover:bg-brand-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
            <i class="pi pi-bell"></i>
            შემატყობინეთ როცა შეივსება
        </button>
        <div v-else class="rounded-2xl bg-brand-100 border border-brand-300 px-4 py-3">
            <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2 text-brand-800 text-sm font-medium">
                    <i class="pi pi-bell text-brand-600"></i>
                    შეტყობინება ჩართულია
                </div>
                <button
                    @click="router.delete(route('stock-notifications.unsubscribe', item.slug))"
                    class="text-xs text-brand-600 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                >
                    გაუქმება
                </button>
            </div>
            <p class="text-xs text-brand-700 mt-1.5">
                მარაგი როგორც კი შეივსება, მიიღებთ შეტყობინებას SMS-ის სახით.
            </p>
        </div>
    </template>
    <Link
        v-else
        :href="route('login')"
        class="w-full py-3 rounded-2xl border border-dashed border-gray-300 text-gray-400 text-sm flex items-center justify-center gap-2 hover:border-brand-400 hover:text-brand-500 transition-colors"
    >
        <i class="pi pi-bell"></i>
        შემატყობინეთ როცა შეივსება
    </Link>
    </div>
</template>