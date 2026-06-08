import { reactive, computed, watch } from "vue";
import { usePage, router } from "@inertiajs/vue3";
import axios from "axios";
import { u as useToast } from "./index-Qb24q4w2.js";
const state = reactive({
  items: {},
  // { [cartKey]: quantity } — cartKey = itemId or "itemId__uom"
  uoms: {},
  // { [cartKey]: selectedUOM }
  loading: {},
  ready: false
});
function cartKey(itemId, uom = null) {
  return uom ? `${String(itemId)}__${uom}` : String(itemId);
}
function useCart() {
  const page = usePage();
  useToast();
  const isLoggedIn = computed(() => !!page.props.user);
  function setup() {
    if (state.ready) return;
    if (isLoggedIn.value) {
      const serverItems = Object.fromEntries(
        Object.entries(page.props.cart?.items ?? {}).map(([k, v]) => [String(k), v])
      );
      const serverUoms = Object.fromEntries(
        Object.entries(page.props.cart?.uoms ?? {}).map(([k, v]) => [String(k), v])
      );
      Object.assign(state.items, serverItems);
      Object.assign(state.uoms, serverUoms);
    } else {
      const storage = loadFromStorage();
      Object.assign(state.items, storage.items);
      Object.assign(state.uoms, storage.uoms);
    }
    state.ready = true;
  }
  async function addToCart(itemId, quantity = 1, selectedUOM = null) {
    const key = cartKey(itemId, selectedUOM);
    const qty = parseInt(quantity) || 1;
    if (state.loading[key]) return;
    state.loading[key] = true;
    const previous = state.items[key] ?? 0;
    state.items[key] = previous + qty;
    if (selectedUOM) state.uoms[key] = selectedUOM;
    try {
      if (isLoggedIn.value) {
        const { data } = await axios.post(route("api.cart.add", String(itemId)), {
          quantity: qty,
          selected_uom: selectedUOM ?? null
        });
        state.items[key] = data.quantity;
      } else {
        saveToStorage();
      }
    } catch (error) {
      state.items[key] = previous;
      if (previous === 0) delete state.items[key];
      console.error("[Cart] add failed", error);
    } finally {
      delete state.loading[key];
    }
  }
  async function updateQuantity(itemId, quantity, selectedUOM = null) {
    const key = cartKey(itemId, selectedUOM);
    const qty = parseInt(quantity);
    if (!qty || qty < 1) return;
    const previous = state.items[key] ?? 0;
    state.items[key] = qty;
    try {
      if (isLoggedIn.value) {
        const { data } = await axios.put(route("api.cart.update", String(itemId)), {
          quantity: qty,
          selected_uom: selectedUOM ?? null
        });
        state.items[key] = data.quantity;
      } else {
        saveToStorage();
      }
    } catch (error) {
      state.items[key] = previous;
      console.error("[Cart] update failed", error);
    }
  }
  async function removeFromCart(itemId, selectedUOM = null) {
    const key = cartKey(itemId, selectedUOM);
    const previous = state.items[key];
    const previousUom = state.uoms[key];
    delete state.items[key];
    delete state.uoms[key];
    try {
      if (isLoggedIn.value) {
        await axios.delete(route("api.cart.remove", String(itemId)), {
          data: { selected_uom: selectedUOM ?? null }
        });
      } else {
        saveToStorage();
      }
    } catch (error) {
      state.items[key] = previous;
      if (previousUom) state.uoms[key] = previousUom;
      console.error("[Cart] remove failed", error);
    }
  }
  async function buyNow(itemId, quantity = 1, selectedUOM = null) {
    if (isInCart(itemId)) {
      await updateQuantity(itemId, quantity, selectedUOM);
    } else {
      await addToCart(itemId, quantity, selectedUOM);
    }
    router.visit(route("checkout.index", { item_ids: [itemId] }));
  }
  function isInCart(itemId) {
    const prefix = String(itemId);
    return Object.keys(state.items).some(
      (k) => k === prefix || k.startsWith(prefix + "__")
    );
  }
  function getQuantity(itemId, uom = null) {
    if (uom !== null) {
      return state.items[cartKey(itemId, uom)] ?? 0;
    }
    const prefix = String(itemId);
    return Object.entries(state.items).filter(([k]) => k === prefix || k.startsWith(prefix + "__")).reduce((sum, [, qty]) => sum + qty, 0);
  }
  function getSelectedUOM(itemId, uom = null) {
    return state.uoms[cartKey(itemId, uom)] ?? null;
  }
  function isLoading(itemId, uom = null) {
    return !!state.loading[cartKey(itemId, uom)];
  }
  function syncFromServer() {
    if (!isLoggedIn.value) return;
    const serverItems = Object.fromEntries(
      Object.entries(page.props.cart?.items ?? {}).map(([k, v]) => [String(k), v])
    );
    const serverUoms = Object.fromEntries(
      Object.entries(page.props.cart?.uoms ?? {}).map(([k, v]) => [String(k), v])
    );
    Object.keys(state.items).forEach((k) => delete state.items[k]);
    Object.keys(state.uoms).forEach((k) => delete state.uoms[k]);
    Object.assign(state.items, serverItems);
    Object.assign(state.uoms, serverUoms);
  }
  const uniqueCount = computed(
    () => Object.keys(state.items).filter((k) => state.items[k] > 0).length
  );
  const count = computed(
    () => Object.values(state.items).reduce((sum, qty) => sum + qty, 0)
  );
  watch(isLoggedIn, async (newVal, oldVal) => {
    if (oldVal === true && newVal === false) {
      saveToStorage();
    }
    const guestItems = { ...state.items };
    ({ ...state.uoms });
    state.ready = false;
    Object.keys(state.items).forEach((k) => delete state.items[k]);
    Object.keys(state.uoms).forEach((k) => delete state.uoms[k]);
    Object.keys(state.loading).forEach((k) => delete state.loading[k]);
    if (newVal === true && oldVal === false && Object.keys(guestItems).length > 0) {
      try {
        const items = Object.entries(guestItems).map(([key, quantity]) => {
          const [id, uom] = key.split("__");
          return { id, quantity, uom: uom ?? null };
        });
        const { data } = await axios.post(route("api.cart.sync"), { items });
        Object.assign(state.items, data.items ?? {});
        localStorage.removeItem("guest_cart");
        state.ready = true;
        return;
      } catch (e) {
        console.error("[Cart] sync failed", e);
      }
    }
    setup();
  });
  function loadFromStorage() {
    try {
      const saved = localStorage.getItem("guest_cart");
      if (!saved) return { items: {}, uoms: {} };
      const parsed = JSON.parse(saved);
      if (!parsed.items) return { items: parsed, uoms: {} };
      return { items: parsed.items ?? {}, uoms: parsed.uoms ?? {} };
    } catch {
      return { items: {}, uoms: {} };
    }
  }
  function saveToStorage() {
    try {
      localStorage.setItem("guest_cart", JSON.stringify({
        items: state.items,
        uoms: state.uoms
      }));
    } catch {
    }
  }
  setup();
  watch(
    () => ({ ...state.items }),
    () => saveToStorage(),
    { deep: true }
  );
  return { addToCart, buyNow, updateQuantity, removeFromCart, isInCart, getQuantity, getSelectedUOM, isLoading, uniqueCount, count, syncFromServer };
}
export {
  useCart as u
};
//# sourceMappingURL=useCart-9AA8qz7k.js.map
