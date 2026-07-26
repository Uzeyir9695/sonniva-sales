import { useHttp, router } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import { useCart } from '@/composables/useCart'

export function useReorder() {
    const toast = useToast()
    const http = useHttp({ order_item_ids: [] })
    const { syncFromServer } = useCart()

    // Pass orderItemIds to reorder only a subset; omit (or pass []) to reorder every item.
    function reorder(orderId, orderItemIds = []) {
        http.order_item_ids = orderItemIds

        http.post(route('user-orders.reorder', orderId), {
            onSuccess: ({ added, skipped_count: skippedCount, skipped_names: skippedNames }) => {
                if (added > 0) {
                    toast.add({
                        severity: 'success',
                        summary: 'დამატებულია კალათაში',
                        detail: `${added} პროდუქტი დაემატა კალათაში.`,
                        life: 3000,
                    })
                }

                if (skippedCount > 0) {
                    toast.add({
                        severity: 'warn',
                        summary: 'ზოგიერთი პროდუქტი არ დაემატა',
                        detail: skippedNames.length
                            ? `არ არის ხელმისაწვდომი: ${skippedNames.join(', ')}`
                            : `${skippedCount} პროდუქტი აღარ არის ხელმისაწვდომი.`,
                        life: 5000,
                    })
                }

                if (added > 0) {
                    router.visit(route('cart.index'), {
                        onSuccess: () => syncFromServer(),
                    })
                }
            },
            onError: () => {
                toast.add({
                    severity: 'error',
                    summary: 'შეცდომა',
                    detail: 'ხელახლა შეკვეთა ვერ მოხერხდა.',
                    life: 3000,
                })
            },
        })
    }

    return { reorder, processing: http.processing }
}
