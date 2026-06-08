// composables/useWishlist.js

import { reactive, computed, watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import axios from 'axios'

// Key-value map: { 42: true, 57: false, ... }
// Much simpler for per-item lookups than an array or Set.
const state = reactive({
    wishlisted: {},  // { [itemId]: true }
    loading: {},     // { [itemId]: true } while request is in flight
    ready: false,
})

let lastSetupLoginState = null

export function useWishlist() {
    const page = usePage()

    const isLoggedIn = computed(() => !!page.props?.isLoggedIn)

    // ─── Setup ────────────────────────────────────────────────────────────────

    function clearState() {
        Object.keys(state.wishlisted).forEach(k => delete state.wishlisted[k])
        Object.keys(state.loading).forEach(k => delete state.loading[k])
        state.ready = false
    }

    function setup() {
        const currentLoginState = isLoggedIn.value

        if (state.ready && lastSetupLoginState !== null && lastSetupLoginState !== currentLoginState) {
            clearState()
        }

        if (state.ready) return

        lastSetupLoginState = currentLoginState

        if (isLoggedIn.value) {
            const serverIds = new Set((page.props.wishlist?.ids ?? []).map(String))
            const guestIds = loadFromStorage().map(String)
            const unsyncedIds = guestIds.filter(id => !serverIds.has(id))

            if (unsyncedIds.length) {
                axios.post(route('api.wishlist.sync'), { item_ids: unsyncedIds })
                    .then(({ data }) => {
                        Object.keys(state.wishlisted).forEach(k => delete state.wishlisted[k])
                        ;(data.wishlisted_ids ?? []).forEach(id => { state.wishlisted[String(id)] = true })
                        localStorage.removeItem('guest_wishlist')
                    })
                    .catch(() => {})
            }

            serverIds.forEach(id => { state.wishlisted[id] = true })
            unsyncedIds.forEach(id => { state.wishlisted[id] = true })
        } else {
            loadFromStorage().forEach(id => { state.wishlisted[String(id)] = true })
        }

        state.ready = true
    }

    // ─── Toggle ───────────────────────────────────────────────────────────────

    async function toggle(itemId) {
        const id = String(itemId)

        if (state.loading[id]) return

        state.loading[id] = true

        const alreadySaved = !!state.wishlisted[id]

        // Optimistic update
        state.wishlisted[id] = !alreadySaved

        try {
            if (isLoggedIn.value) {
                const { data } = await axios.post(route('api.wishlist.toggle', id))
                // Confirm with server
                state.wishlisted[id] = data.wishlisted
            } else {
                saveToStorage()
            }
        } catch (error) {
            // Rollback
            state.wishlisted[id] = alreadySaved
            console.error('[Wishlist] toggle failed', error)
        } finally {
            delete state.loading[id]
        }
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    function isWishlisted(itemId) {
        return !!state.wishlisted[String(itemId)]
    }

    function isLoading(itemId) {
        return !!state.loading[String(itemId)]
    }

    const count = computed(() =>
        Object.values(state.wishlisted).filter(Boolean).length
    )


    // ─── localStorage ─────────────────────────────────────────────────────────

    function loadFromStorage() {
        try {
            const saved = localStorage.getItem('guest_wishlist')
            return saved ? JSON.parse(saved) : []
        } catch {
            return []
        }
    }

    function saveToStorage() {
        try {
            const ids = Object.keys(state.wishlisted)
                .filter(id => state.wishlisted[id])
            localStorage.setItem('guest_wishlist', JSON.stringify(ids))
        } catch {}
    }

    setup()

    watch(
        () => ({ ...state.wishlisted }),
        () => saveToStorage(),
        { deep: true }
    )

    return { toggle, isWishlisted, isLoading, count }
}
