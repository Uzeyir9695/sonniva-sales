import { reactive, computed, watch } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { STORAGE_KEYS } from '@/constants/storageKeys'

const state = reactive({
    items:   {},  // { [cartKey]: quantity } — cartKey = itemId or "itemId__uom"
    uoms:    {},  // { [cartKey]: selectedUOM }
    services: {}, // { [cartKey]: true } — only present when the setup service is active
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

        // Capture whether this was a guest→logged-in transition before updating.
        // null  = full page reload for an already-logged-in user (e.g. after BOG redirect)
        // false = user was genuinely a guest and just logged in
        const wasGuest = lastSetupLoginState === false

        lastSetupLoginState = currentLoginState

        if (isLoggedIn.value) {
            const serverItems = Object.fromEntries(
                Object.entries(page.props.cart?.items ?? {}).map(([k, v]) => [String(k), v])
            )
            const serverUoms = Object.fromEntries(
                Object.entries(page.props.cart?.uoms ?? {}).map(([k, v]) => [String(k), v])
            )
            const serverServices = Object.fromEntries(
                Object.entries(page.props.cart?.services ?? {}).map(([k, v]) => [String(k), v])
            )

            // Only sync localStorage → server when the user just logged in from a guest session.
            // On a full page reload (e.g. after a payment redirect) lastSetupLoginState was null,
            // so wasGuest is false and we skip the re-sync — preventing paid items from being
            // restored from localStorage back to the server cart.
            const storage = loadFromStorage()
            const unsyncedKeys = wasGuest
                ? Object.keys(storage.items).filter(k => !(k in serverItems))
                : []

            if (unsyncedKeys.length) {
                const items = unsyncedKeys.map(key => {
                    const [id, uom] = key.split('__')
                    return { id, quantity: storage.items[key], uom: uom ?? null, with_service: storage.services[key] ?? false }
                })
                axios.post(route('api.cart.sync'), { items }).then(({ data }) => {
                    Object.keys(state.items).forEach(k => delete state.items[k])
                    Object.keys(state.uoms).forEach(k => delete state.uoms[k])
                    Object.keys(state.services).forEach(k => delete state.services[k])
                    Object.assign(state.items, data.items ?? {})
                    Object.assign(state.uoms, data.uoms ?? {})
                    Object.assign(state.services, data.services ?? {})
                    localStorage.removeItem(STORAGE_KEYS.guestCart)
                    if (page.component === 'Cart/Index') router.reload({ only: ['cartItems'] })
                }).catch(() => {})
            }

            Object.assign(state.items, serverItems)
            unsyncedKeys.forEach(k => {
                state.items[k] = storage.items[k]
                if (storage.uoms[k]) state.uoms[k] = storage.uoms[k]
                if (storage.services[k]) state.services[k] = true
            })
            Object.assign(state.uoms, serverUoms)
            Object.assign(state.services, serverServices)
        } else {
            const storage = loadFromStorage()
            Object.assign(state.items, storage.items)
            Object.assign(state.uoms, storage.uoms)
            Object.assign(state.services, storage.services)
        }

        state.ready = true
    }

    // ─── Add to cart ──────────────────────────────────────────────────────────

    async function addToCart(itemId, quantity = 1, selectedUOM = null, withService = false) {
        const key = cartKey(itemId, selectedUOM)
        const qty = parseInt(quantity) || 1

        if (state.loading[key]) return
        state.loading[key] = true

        const previous = state.items[key] ?? 0
        state.items[key] = previous + qty  // optimistic

        if (selectedUOM) state.uoms[key] = selectedUOM
        // Only ever set true here - never clear an existing line's service flag when
        // quick-adding more quantity via a caller that doesn't know about it.
        if (withService) state.services[key] = true

        try {
            if (isLoggedIn.value) {
                const { data } = await axios.post(route('api.cart.add', String(itemId)), {
                    quantity: qty,
                    selected_uom: selectedUOM ?? null,
                    with_service: withService,
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

    // ─── Setup service toggle ─────────────────────────────────────────────────

    async function toggleService(itemId, selectedUOM = null) {
        const key = cartKey(itemId, selectedUOM)
        const previous = !!state.services[key]
        state.services[key] = !previous  // optimistic

        try {
            if (isLoggedIn.value) {
                const { data } = await axios.post(route('api.cart.toggle-service', String(itemId)), {
                    selected_uom: selectedUOM ?? null,
                })
                state.services[key] = data.with_service
            } else {
                saveToStorage()
            }
        } catch (error) {
            state.services[key] = previous
            console.error('[Cart] toggle service failed', error)
        }
    }

    // ─── Buy Now ──────────────────────────────────────────────────────────────

    async function buyNow(itemId, quantity = 1, selectedUOM = null, withService = false) {
        if (isInCart(itemId, selectedUOM)) {
            await updateQuantity(itemId, quantity, selectedUOM)
        } else {
            await addToCart(itemId, quantity, selectedUOM, withService)
        }
        const params = { item_ids: [itemId] }
        if (selectedUOM) params.uom = selectedUOM
        router.visit(route('checkout.index', params))
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

    function hasService(itemId, uom = null) {
        return !!state.services[cartKey(itemId, uom)]
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
        const serverServices = Object.fromEntries(
            Object.entries(page.props.cart?.services ?? {}).map(([k, v]) => [String(k), v])
        )
        Object.keys(state.items).forEach(k => delete state.items[k])
        Object.keys(state.uoms).forEach(k => delete state.uoms[k])
        Object.keys(state.services).forEach(k => delete state.services[k])
        Object.assign(state.items, serverItems)
        Object.assign(state.uoms, serverUoms)
        Object.assign(state.services, serverServices)
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
        Object.keys(state.services).forEach(k => delete state.services[k])
        Object.keys(state.loading).forEach(k => delete state.loading[k])
        state.ready = false
    }

    // ─── localStorage ─────────────────────────────────────────────────────────

    function loadFromStorage() {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.guestCart)
            if (!saved) return { items: {}, uoms: {}, services: {} }
            const parsed = JSON.parse(saved)
            if (!parsed.items) return { items: parsed, uoms: {}, services: {} }
            return { items: parsed.items ?? {}, uoms: parsed.uoms ?? {}, services: parsed.services ?? {} }
        } catch {
            return { items: {}, uoms: {}, services: {} }
        }
    }

    function saveToStorage() {
        try {
            localStorage.setItem(STORAGE_KEYS.guestCart, JSON.stringify({
                items: state.items,
                uoms:  state.uoms,
                services: state.services,
            }))
        } catch {}
    }

    setup()

    watch(
        () => ({ ...state.items }),
        () => saveToStorage(),
        { deep: true }
    )

    return { addToCart, buyNow, updateQuantity, removeFromCart, toggleService, isInCart, getQuantity, getSelectedUOM, hasService, isLoading, uniqueCount, count, syncFromServer }
}