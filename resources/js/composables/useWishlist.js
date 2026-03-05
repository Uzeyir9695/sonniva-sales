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

export function useWishlist() {
    const page = usePage()

    const isLoggedIn = computed(() => !!page.props?.isLoggedIn)

    // ─── Setup ────────────────────────────────────────────────────────────────

    function setup() {
        if (state.ready) return
        state.ready = true

        if (isLoggedIn.value) {
            const serverIds = Array.from(page.props.wishlist?.ids ?? [])
            serverIds.forEach(id => {
                state.wishlisted[String(id)] = true
            })
            mergeGuestItems()
        } else {
            // Load guest wishlist from localStorage
            loadFromStorage().forEach(id => {
                state.wishlisted[String(id)] = true
            })
        }
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

    // ─── Guest → Server merge ─────────────────────────────────────────────────

    async function mergeGuestItems() {
        const guestIds = loadFromStorage()
        if (!guestIds.length) return

        try {
            const { data } = await axios.post(route('api.wishlist.sync'), {
                item_ids: guestIds,
            })
            // Replace with merged server state
            state.wishlisted = {}
            data.wishlisted_ids.forEach(id => {
                state.wishlisted[id] = true
            })
            clearStorage()
        } catch (error) {
            console.error('[Wishlist] guest merge failed', error)
        }
    }

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

    function clearStorage() {
        localStorage.removeItem('guest_wishlist')
    }

    watch(isLoggedIn, (newVal, oldVal) => {
        // User just logged out — save their wishlist to localStorage
        // so the count persists for guests
        if (oldVal === true && newVal === false) {
            const ids = Object.keys(state.wishlisted).filter(id => state.wishlisted[id])
            if (ids.length) {
                localStorage.setItem('guest_wishlist', JSON.stringify(ids))
            }
        }

        state.ready = false
        Object.keys(state.wishlisted).forEach(key => delete state.wishlisted[key])
        Object.keys(state.loading).forEach(key => delete state.loading[key])
        setup()
    })


    setup()

    return { toggle, isWishlisted, isLoading, count }
}
