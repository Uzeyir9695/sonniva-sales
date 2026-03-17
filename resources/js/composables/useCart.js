import { reactive, computed, watch } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
import axios from 'axios'
import { useToast } from 'primevue/usetoast';

const state = reactive({
    items:   {},  // { [itemId]: quantity }
    loading: {},
    ready:   false,
})

export function useCart() {
    const page = usePage()
    const toast = useToast()

    const isLoggedIn = computed(() => !!page.props.user)

    // ─── Setup ────────────────────────────────────────────────────────────────

    function setup() {
        if (state.ready) return

        if (isLoggedIn.value) {
            const serverItems = Object.fromEntries(
                Object.entries(page.props.cart?.items ?? {}).map(([k, v]) => [String(k), v])
            )
            Object.assign(state.items, serverItems)
        } else {
            Object.assign(state.items, loadFromStorage())
        }

        state.ready = true
    }

    // ─── Add to cart ──────────────────────────────────────────────────────────

    // quantity defaults to 1 — covers searchbar and quickview cases
    async function addToCart(itemId, quantity = 1) {
        const id  = String(itemId)
        const qty = parseInt(quantity) || 1

        if (state.loading[id]) return
        state.loading[id] = true

        const previous = state.items[id] ?? 0
        state.items[id] = previous + qty  // optimistic

        try {
            if (isLoggedIn.value) {
                const { data } = await axios.post(route('api.cart.add', id), { quantity: qty })
                state.items[id] = data.quantity
            } else {
                saveToStorage()
            }

            // toast.add({ severity: 'success', summary: 'Success', detail: qty + (qty > 1 ? ' პროდუქტი' : ' პროდუქტი') +' დაემატა შენს კალათაში', life: 3000 });

        } catch (error) {
            state.items[id] = previous  // rollback
            if (previous === 0) delete state.items[id]
            console.error('[Cart] add failed', error)
        } finally {
            delete state.loading[id]
        }
    }

    // ─── Update quantity (manual input) ───────────────────────────────────────

    async function updateQuantity(itemId, quantity) {
        const id  = String(itemId)
        const qty = parseInt(quantity)

        if (!qty || qty < 1) return

        const previous = state.items[id] ?? 0
        state.items[id] = qty

        try {
            if (isLoggedIn.value) {
                const { data } = await axios.put(route('api.cart.update', id), { quantity: qty })
                state.items[id] = data.quantity
            } else {
                saveToStorage()
            }
        } catch (error) {
            state.items[id] = previous
            console.error('[Cart] update failed', error)
        }
    }

    // ─── Remove ───────────────────────────────────────────────────────────────

    async function removeFromCart(itemId) {
        const id = String(itemId)
        const previous = state.items[id]
        delete state.items[id]

        try {
            if (isLoggedIn.value) {
                await axios.delete(route('api.cart.remove', id))
            } else {
                saveToStorage()
            }
        } catch (error) {
            state.items[id] = previous
            console.error('[Cart] remove failed', error)
        }
    }

    // ─── Buy Now ──────────────────────────────────────────────────────────────

    async function buyNow(itemId, quantity = 1) {
        if (isInCart(itemId)) {
            await updateQuantity(itemId, quantity)
        } else {
            await addToCart(itemId, quantity)
        }
        router.visit(route('checkout.index', { item_ids: [itemId] }))
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    function isInCart(itemId) {
        return !!state.items[String(itemId)]
    }

    function getQuantity(itemId) {
        return state.items[String(itemId)] ?? 0
    }

    function isLoading(itemId) {
        return !!state.loading[String(itemId)]
    }

    const uniqueCount = computed(() =>
        Object.keys(state.items).filter(id => state.items[id] > 0).length
    )

    // Sum of all quantities for navbar badge
    const count = computed(() =>
        Object.values(state.items).reduce((sum, qty) => sum + qty, 0)
    )


    // ─── Auth state changes ───────────────────────────────────────────────────

    watch(isLoggedIn, async (newVal, oldVal) => {
        if (oldVal === true && newVal === false) {
            saveToStorage()
        }

        // Capture guest items before clearing
        const guestItems = { ...state.items }

        state.ready = false
        Object.keys(state.items).forEach(k => delete state.items[k])
        Object.keys(state.loading).forEach(k => delete state.loading[k])

        if (newVal === true && oldVal === false && Object.keys(guestItems).length > 0) {
            try {
                const items = Object.entries(guestItems).map(([id, quantity]) => ({ id, quantity }))
                const { data } = await axios.post(route('api.cart.sync'), { items })
                Object.assign(state.items, data.items ?? {})
                localStorage.removeItem('guest_cart')
                state.ready = true
                return
            } catch (e) {
                console.error('[Cart] sync failed', e)
            }
        }

        setup()
    })

    // ─── localStorage ─────────────────────────────────────────────────────────

    function loadFromStorage() {
        try {
            const saved = localStorage.getItem('guest_cart')
            return saved ? JSON.parse(saved) : {}
        } catch {
            return {}
        }
    }

    function saveToStorage() {
        try {
            localStorage.setItem('guest_cart', JSON.stringify(state.items))
        } catch {}
    }

    setup()

    watch(
        () => ({ ...state.items }),
        () => saveToStorage(),
        { deep: true }
    )

    return { addToCart, buyNow, updateQuantity, removeFromCart, isInCart, getQuantity, isLoading, uniqueCount, count }
}
