import { reactive, computed, watch } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { STORAGE_KEYS } from '@/constants/storageKeys'

const state = reactive({
    items:   {},  // { [cartKey]: quantity } — cartKey = itemId or "itemId__uom"
    uoms:    {},  // { [cartKey]: selectedUOM }
    loading: {},
    ready:   false,
})

// Tracks login state from the last setup() run so we can detect transitions
// without relying on the auth watcher (which is torn down on component unmount).
let lastSetupLoginState = null

// Composite key: plain itemId for regular items, "itemId__uom" for package items
function cartKey(itemId, uom = null) {
    return uom ? `${String(itemId)}__${uom}` : String(itemId)
}

// Extract itemId from a composite key
function itemIdFromKey(key) {
    return key.split('__')[0]
}

export function useCart() {
    const page = usePage()
    const toast = useToast()

    const isLoggedIn = computed(() => !!page.props.user)

    // ─── Setup ────────────────────────────────────────────────────────────────

    function setup() {
        const currentLoginState = isLoggedIn.value

        // Detect login/logout transitions. The auth watcher can't be relied on
        // because it's registered per-component and gets torn down on unmount —
        // often missing the transition entirely. Instead we compare against the
        // module-level lastSetupLoginState which persists across navigations.
        if (state.ready && lastSetupLoginState !== null && lastSetupLoginState !== currentLoginState) {
            clearState()  // sets state.ready = false; falls through to re-initialize
        }

        if (state.ready) return

        lastSetupLoginState = currentLoginState

        if (isLoggedIn.value) {
            const serverItems = Object.fromEntries(
                Object.entries(page.props.cart?.items ?? {}).map(([k, v]) => [String(k), v])
            )
            const serverUoms = Object.fromEntries(
                Object.entries(page.props.cart?.uoms ?? {}).map(([k, v]) => [String(k), v])
            )

            // Sync any localStorage items not yet in the server cart.
            // loadFromStorage() runs synchronously before the saveToStorage watcher
            // fires, so guest_cart still holds guest items even after clearState().
            const storage = loadFromStorage()
            const unsyncedKeys = Object.keys(storage.items).filter(k => !(k in serverItems))

            if (unsyncedKeys.length) {
                const items = unsyncedKeys.map(key => {
                    const [id, uom] = key.split('__')
                    return { id, quantity: storage.items[key], uom: uom ?? null }
                })
                axios.post(route('api.cart.sync'), { items }).then(({ data }) => {
                    Object.keys(state.items).forEach(k => delete state.items[k])
                    Object.keys(state.uoms).forEach(k => delete state.uoms[k])
                    Object.assign(state.items, data.items ?? {})
                    Object.assign(state.uoms, data.uoms ?? {})
                    localStorage.removeItem(STORAGE_KEYS.guestCart)
                    if (page.component === 'Cart/Index') router.reload({ only: ['cartItems'] })
                }).catch(() => {})
            }

            Object.assign(state.items, serverItems)
            unsyncedKeys.forEach(k => {
                state.items[k] = storage.items[k]
                if (storage.uoms[k]) state.uoms[k] = storage.uoms[k]
            })
            Object.assign(state.uoms, serverUoms)
        } else {
            const storage = loadFromStorage()
            Object.assign(state.items, storage.items)
            Object.assign(state.uoms, storage.uoms)
        }

        state.ready = true
    }

    // ─── Add to cart ──────────────────────────────────────────────────────────

    async function addToCart(itemId, quantity = 1, selectedUOM = null) {
        const key = cartKey(itemId, selectedUOM)
        const qty = parseInt(quantity) || 1

        if (state.loading[key]) return
        state.loading[key] = true

        const previous = state.items[key] ?? 0
        state.items[key] = previous + qty  // optimistic

        if (selectedUOM) state.uoms[key] = selectedUOM

        try {
            if (isLoggedIn.value) {
                const { data } = await axios.post(route('api.cart.add', String(itemId)), {
                    quantity: qty,
                    selected_uom: selectedUOM ?? null,
                })
                state.items[key] = data.quantity
            } else {
                saveToStorage()
            }
        } catch (error) {
            state.items[key] = previous
            if (previous === 0) delete state.items[key]
            console.error('[Cart] add failed', error)
        } finally {
            delete state.loading[key]
        }
    }

    // ─── Update quantity (manual input) ───────────────────────────────────────

    async function updateQuantity(itemId, quantity, selectedUOM = null) {
        const key = cartKey(itemId, selectedUOM)
        const qty = parseInt(quantity)

        if (!qty || qty < 1) return

        const previous = state.items[key] ?? 0
        state.items[key] = qty

        try {
            if (isLoggedIn.value) {
                const { data } = await axios.put(route('api.cart.update', String(itemId)), {
                    quantity: qty,
                    selected_uom: selectedUOM ?? null,
                })
                state.items[key] = data.quantity
            } else {
                saveToStorage()
            }
        } catch (error) {
            state.items[key] = previous
            console.error('[Cart] update failed', error)
        }
    }

    // ─── Remove ───────────────────────────────────────────────────────────────

    async function removeFromCart(itemId, selectedUOM = null) {
        const key = cartKey(itemId, selectedUOM)
        const previous = state.items[key]
        const previousUom = state.uoms[key]
        delete state.items[key]
        delete state.uoms[key]

        try {
            if (isLoggedIn.value) {
                await axios.delete(route('api.cart.remove', String(itemId)), {
                    data: { selected_uom: selectedUOM ?? null },
                })
            } else {
                saveToStorage()
            }
        } catch (error) {
            state.items[key] = previous
            if (previousUom) state.uoms[key] = previousUom
            console.error('[Cart] remove failed', error)
        }
    }

    // ─── Buy Now ──────────────────────────────────────────────────────────────

    async function buyNow(itemId, quantity = 1, selectedUOM = null) {
        if (isInCart(itemId, selectedUOM)) {
            await updateQuantity(itemId, quantity, selectedUOM)
        } else {
            await addToCart(itemId, quantity, selectedUOM)
        }
        router.visit(route('checkout.index', { item_ids: [itemId] }))
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    // Returns true if any entry for this itemId exists (regardless of UOM)
    function isInCart(itemId) {
        const prefix = String(itemId)
        return Object.keys(state.items).some(
            k => k === prefix || k.startsWith(prefix + '__')
        )
    }

    // Returns quantity for specific uom, or total across all UOMs when uom is null
    function getQuantity(itemId, uom = null) {
        if (uom !== null) {
            return state.items[cartKey(itemId, uom)] ?? 0
        }
        const prefix = String(itemId)
        return Object.entries(state.items)
            .filter(([k]) => k === prefix || k.startsWith(prefix + '__'))
            .reduce((sum, [, qty]) => sum + qty, 0)
    }

    function getSelectedUOM(itemId, uom = null) {
        return state.uoms[cartKey(itemId, uom)] ?? null
    }

    function isLoading(itemId, uom = null) {
        return !!state.loading[cartKey(itemId, uom)]
    }

    function syncFromServer() {
        if (!isLoggedIn.value) return
        const serverItems = Object.fromEntries(
            Object.entries(page.props.cart?.items ?? {}).map(([k, v]) => [String(k), v])
        )
        const serverUoms = Object.fromEntries(
            Object.entries(page.props.cart?.uoms ?? {}).map(([k, v]) => [String(k), v])
        )
        Object.keys(state.items).forEach(k => delete state.items[k])
        Object.keys(state.uoms).forEach(k => delete state.uoms[k])
        Object.assign(state.items, serverItems)
        Object.assign(state.uoms, serverUoms)
    }

    const uniqueCount = computed(() =>
        Object.keys(state.items).filter(k => state.items[k] > 0).length
    )

    const count = computed(() =>
        Object.values(state.items).reduce((sum, qty) => sum + qty, 0)
    )

    // ─── Auth state changes ───────────────────────────────────────────────────

    function clearState() {
        Object.keys(state.items).forEach(k => delete state.items[k])
        Object.keys(state.uoms).forEach(k => delete state.uoms[k])
        Object.keys(state.loading).forEach(k => delete state.loading[k])
        state.ready = false
    }

    // ─── localStorage ─────────────────────────────────────────────────────────

    function loadFromStorage() {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.guestCart)
            if (!saved) return { items: {}, uoms: {} }
            const parsed = JSON.parse(saved)
            if (!parsed.items) return { items: parsed, uoms: {} }
            return { items: parsed.items ?? {}, uoms: parsed.uoms ?? {} }
        } catch {
            return { items: {}, uoms: {} }
        }
    }

    function saveToStorage() {
        try {
            localStorage.setItem(STORAGE_KEYS.guestCart, JSON.stringify({
                items: state.items,
                uoms:  state.uoms,
            }))
        } catch {}
    }

    setup()

    watch(
        () => ({ ...state.items }),
        () => saveToStorage(),
        { deep: true }
    )

    return { addToCart, buyNow, updateQuantity, removeFromCart, isInCart, getQuantity, getSelectedUOM, isLoading, uniqueCount, count, syncFromServer }
}