import axios from "axios";
import { mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext, computed, createApp, h as h$1 } from "vue";
import { Link, usePage, createInertiaApp, router, Head } from "@inertiajs/vue3";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createI18n } from "vue-i18n";
import { _ as _sfc_main$3, s as script, C as ConfirmationEventBus, T as ToastEventBus } from "./assets/index-CgDodCyb.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderSlot, renderToString } from "vue/server-renderer";
import { _ as _export_sfc } from "./assets/_plugin-vue_export-helper-1tPrXgE0.js";
import _sfc_main$4 from "./assets/ContactButtons-DEj4wxBE.js";
import mitt from "mitt";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import { K as KeyFilter } from "./assets/index-CpR3PScz.js";
import { P as PrimeVueConfirmSymbol } from "./assets/index-DPwr32It.js";
import { s as script$1 } from "./assets/index--B3DAMqV.js";
import { T as Tooltip } from "./assets/index-C3Ts-4IM.js";
import { P as PrimeVueToastSymbol } from "./assets/index-Qb24q4w2.js";
import { s as script$2 } from "./assets/index-1kO8dZCM.js";
import { R as Ripple } from "./assets/index-YvTnrAwi.js";
import { a as formatNumber } from "./assets/numberFormat-BgUHwZc2.js";
import createServer from "@inertiajs/vue3/server";
import PrimeVue from "@primevue/core/config";
import "@primeuix/utils";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/zindex";
import "./assets/index-zZrFrjQS.js";
import "@primeuix/utils/eventbus";
import "@primevue/core/basecomponent";
import "@primeuix/styles/toast";
import "@primevue/core/base/style";
import "@primevue/icons/check";
import "@primevue/icons/exclamationtriangle";
import "@primevue/icons/infocircle";
import "@primevue/icons/times";
import "@primevue/icons/timescircle";
import "@vueuse/core";
import "./assets/categoryIcons-dDFpexsr.js";
import "./assets/QuickViewDialog-N1KpTX5R.js";
import "./assets/index-D46B4f3g.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primevue/core/basedirective";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./assets/useCart-CLT7fb2x.js";
import "./assets/usePricing-BqOIsB71.js";
import "@primevue/icons/plus";
import "@primeuix/styles/speeddial";
import "@primevue/core/api";
import "@primevue/core/utils";
import "@primevue/icons/blank";
import "@primevue/icons/chevrondown";
import "@primevue/icons/search";
import "@primevue/icons/spinner";
import "@primeuix/styles/iconfield";
import "./assets/index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "./assets/index-rAVNvoJo.js";
import "@primeuix/styles/virtualscroller";
import "@primeuix/styles/select";
import "@primeuix/utils/uuid";
import "@primeuix/styles/tooltip";
import "@primeuix/styles/floatlabel";
import "@primeuix/styles/badge";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
if (typeof window !== "undefined") {
  window.axios = axios;
}
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page = pages[p2];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var o2 = arguments[e2];
      for (var n2 in o2) ({}).hasOwnProperty.call(o2, n2) && (t3[n2] = o2[n2]);
    }
    return t3;
  }, t.apply(null, arguments);
}
const e = String.prototype.replace, o = /%20/g, n = { RFC1738: function(t3) {
  return e.call(t3, o, "+");
}, RFC3986: function(t3) {
  return String(t3);
} };
var r = "RFC3986";
const i = Object.prototype.hasOwnProperty, s = Array.isArray, u = /* @__PURE__ */ new WeakMap();
var l = function(t3, e2) {
  return u.set(t3, e2), t3;
};
function c(t3) {
  return u.has(t3);
}
var a = function(t3) {
  return u.get(t3);
}, f = function(t3, e2) {
  u.set(t3, e2);
};
const p = (function() {
  const t3 = [];
  for (let e2 = 0; e2 < 256; ++e2) t3.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t3;
})(), y = function(t3, e2) {
  const o2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (let e3 = 0; e3 < t3.length; ++e3) void 0 !== t3[e3] && (o2[e3] = t3[e3]);
  return o2;
}, d = function t2(e2, o2, n2) {
  if (!o2) return e2;
  if ("object" != typeof o2) {
    if (s(e2)) e2.push(o2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, o2];
      if (c(e2)) {
        var r2 = a(e2) + 1;
        e2[r2] = o2, f(e2, r2);
      } else (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, o2)) && (e2[o2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) {
    if (c(o2)) {
      for (var u2 = Object.keys(o2), p2 = n2 && n2.plainObjects ? { __proto__: null, 0: e2 } : { 0: e2 }, d2 = 0; d2 < u2.length; d2++) p2[parseInt(u2[d2], 10) + 1] = o2[u2[d2]];
      return l(p2, a(o2) + 1);
    }
    return [e2].concat(o2);
  }
  let h2 = e2;
  return s(e2) && !s(o2) && (h2 = y(e2, n2)), s(e2) && s(o2) ? (o2.forEach(function(o3, r3) {
    if (i.call(e2, r3)) {
      const i2 = e2[r3];
      i2 && "object" == typeof i2 && o3 && "object" == typeof o3 ? e2[r3] = t2(i2, o3, n2) : e2.push(o3);
    } else e2[r3] = o3;
  }), e2) : Object.keys(o2).reduce(function(e3, r3) {
    const s2 = o2[r3];
    return e3[r3] = i.call(e3, r3) ? t2(e3[r3], s2, n2) : s2, e3;
  }, h2);
}, h = 1024, b = function(t3, e2, o2, n2) {
  if (c(t3)) {
    var r2 = a(t3) + 1;
    return t3[r2] = e2, f(t3, r2), t3;
  }
  var i2 = [].concat(t3, e2);
  return i2.length > o2 ? l(y(i2, { plainObjects: n2 }), i2.length - 1) : i2;
}, m = function(t3, e2) {
  if (s(t3)) {
    const o2 = [];
    for (let n2 = 0; n2 < t3.length; n2 += 1) o2.push(e2(t3[n2]));
    return o2;
  }
  return e2(t3);
}, g = Object.prototype.hasOwnProperty, w = { brackets: function(t3) {
  return t3 + "[]";
}, comma: "comma", indices: function(t3, e2) {
  return t3 + "[" + e2 + "]";
}, repeat: function(t3) {
  return t3;
} }, v = Array.isArray, j = Array.prototype.push, $ = function(t3, e2) {
  j.apply(t3, v(e2) ? e2 : [e2]);
}, E = Date.prototype.toISOString, O = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: function(t3, e2, o2, n2, r2) {
  if (0 === t3.length) return t3;
  let i2 = t3;
  if ("symbol" == typeof t3 ? i2 = Symbol.prototype.toString.call(t3) : "string" != typeof t3 && (i2 = String(t3)), "iso-8859-1" === o2) return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t4) {
    return "%26%23" + parseInt(t4.slice(2), 16) + "%3B";
  });
  let s2 = "";
  for (let t4 = 0; t4 < i2.length; t4 += h) {
    const e3 = i2.length >= h ? i2.slice(t4, t4 + h) : i2, o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      let n3 = e3.charCodeAt(t5);
      45 === n3 || 46 === n3 || 95 === n3 || 126 === n3 || n3 >= 48 && n3 <= 57 || n3 >= 65 && n3 <= 90 || n3 >= 97 && n3 <= 122 || "RFC1738" === r2 && (40 === n3 || 41 === n3) ? o3[o3.length] = e3.charAt(t5) : n3 < 128 ? o3[o3.length] = p[n3] : n3 < 2048 ? o3[o3.length] = p[192 | n3 >> 6] + p[128 | 63 & n3] : n3 < 55296 || n3 >= 57344 ? o3[o3.length] = p[224 | n3 >> 12] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3] : (t5 += 1, n3 = 65536 + ((1023 & n3) << 10 | 1023 & e3.charCodeAt(t5)), o3[o3.length] = p[240 | n3 >> 18] + p[128 | n3 >> 12 & 63] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3]);
    }
    s2 += o3.join("");
  }
  return s2;
}, encodeValuesOnly: false, format: r, formatter: n[r], indices: false, serializeDate: function(t3) {
  return E.call(t3);
}, skipNulls: false, strictNullHandling: false }, T = {}, R = function(t3, e2, o2, n2, r2, i2, s2, u2, l2, c2, a2, f2, p2, y2, d2, h2, b2, g2) {
  let w2 = t3, j2 = g2, E2 = 0, _2 = false;
  for (; void 0 !== (j2 = j2.get(T)) && !_2; ) {
    const e3 = j2.get(t3);
    if (E2 += 1, void 0 !== e3) {
      if (e3 === E2) throw new RangeError("Cyclic object value");
      _2 = true;
    }
    void 0 === j2.get(T) && (E2 = 0);
  }
  if ("function" == typeof c2 ? w2 = c2(e2, w2) : w2 instanceof Date ? w2 = p2(w2) : "comma" === o2 && v(w2) && (w2 = m(w2, function(t4) {
    return t4 instanceof Date ? p2(t4) : t4;
  })), null === w2) {
    if (i2) return l2 && !h2 ? l2(e2, O.encoder, b2, "key", y2) : e2;
    w2 = "";
  }
  if ("string" == typeof (I2 = w2) || "number" == typeof I2 || "boolean" == typeof I2 || "symbol" == typeof I2 || "bigint" == typeof I2 || (function(t4) {
    return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
  })(w2)) return l2 ? [d2(h2 ? e2 : l2(e2, O.encoder, b2, "key", y2)) + "=" + d2(l2(w2, O.encoder, b2, "value", y2))] : [d2(e2) + "=" + d2(String(w2))];
  var I2;
  const S2 = [];
  if (void 0 === w2) return S2;
  let A2;
  if ("comma" === o2 && v(w2)) h2 && l2 && (w2 = m(w2, l2)), A2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (v(c2)) A2 = c2;
  else {
    const t4 = Object.keys(w2);
    A2 = a2 ? t4.sort(a2) : t4;
  }
  const D2 = u2 ? e2.replace(/\./g, "%2E") : e2, k2 = n2 && v(w2) && 1 === w2.length ? D2 + "[]" : D2;
  if (r2 && v(w2) && 0 === w2.length) return k2 + "[]";
  for (let e3 = 0; e3 < A2.length; ++e3) {
    const m2 = A2[e3], j3 = "object" == typeof m2 && void 0 !== m2.value ? m2.value : w2[m2];
    if (s2 && null === j3) continue;
    const O2 = f2 && u2 ? m2.replace(/\./g, "%2E") : m2, _3 = v(w2) ? "function" == typeof o2 ? o2(k2, O2) : k2 : k2 + (f2 ? "." + O2 : "[" + O2 + "]");
    g2.set(t3, E2);
    const I3 = /* @__PURE__ */ new WeakMap();
    I3.set(T, g2), $(S2, R(j3, _3, o2, n2, r2, i2, s2, u2, "comma" === o2 && h2 && v(w2) ? null : l2, c2, a2, f2, p2, y2, d2, h2, b2, I3));
  }
  return S2;
}, _ = Object.prototype.hasOwnProperty, I = Array.isArray, S = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: function(t3, e2, o2) {
  const n2 = t3.replace(/\+/g, " ");
  if ("iso-8859-1" === o2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t4) {
    return n2;
  }
}, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, A = function(t3) {
  return t3.replace(/&#(\d+);/g, function(t4, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, D = function(t3, e2) {
  return t3 && "string" == typeof t3 && e2.comma && t3.indexOf(",") > -1 ? t3.split(",") : t3;
}, k = function(t3, e2, o2, n2) {
  if (!t3) return;
  const r2 = o2.allowDots ? t3.replace(/\.([^.[]+)/g, "[$1]") : t3, i2 = /(\[[^[\]]*])/g;
  let s2 = o2.depth > 0 && /(\[[^[\]]*])/.exec(r2);
  const u2 = s2 ? r2.slice(0, s2.index) : r2, l2 = [];
  if (u2) {
    if (!o2.plainObjects && _.call(Object.prototype, u2) && !o2.allowPrototypes) return;
    l2.push(u2);
  }
  let a2 = 0;
  for (; o2.depth > 0 && null !== (s2 = i2.exec(r2)) && a2 < o2.depth; ) {
    if (a2 += 1, !o2.plainObjects && _.call(Object.prototype, s2[1].slice(1, -1)) && !o2.allowPrototypes) return;
    l2.push(s2[1]);
  }
  return s2 && l2.push("[" + r2.slice(s2.index) + "]"), (function(t4, e3, o3, n3) {
    let r3 = n3 ? e3 : D(e3, o3);
    for (let e4 = t4.length - 1; e4 >= 0; --e4) {
      let n4;
      const i3 = t4[e4];
      if ("[]" === i3 && o3.parseArrays) n4 = c(r3) ? r3 : o3.allowEmptyArrays && ("" === r3 || o3.strictNullHandling && null === r3) ? [] : b([], r3, o3.arrayLimit, o3.plainObjects);
      else {
        n4 = o3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        const t5 = "[" === i3.charAt(0) && "]" === i3.charAt(i3.length - 1) ? i3.slice(1, -1) : i3, e5 = o3.decodeDotInKeys ? t5.replace(/%2E/g, ".") : t5, s3 = parseInt(e5, 10);
        o3.parseArrays || "" !== e5 ? !isNaN(s3) && i3 !== e5 && String(s3) === e5 && s3 >= 0 && o3.parseArrays && s3 <= o3.arrayLimit ? (n4 = [], n4[s3] = r3) : "__proto__" !== e5 && (n4[e5] = r3) : n4 = { 0: r3 };
      }
      r3 = n4;
    }
    return r3;
  })(l2, e2, o2, n2);
};
function N(t3, e2) {
  const o2 = /* @__PURE__ */ (function(t4) {
    return S;
  })();
  if ("" === t3 || null == t3) return o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const n2 = "string" == typeof t3 ? (function(t4, e3) {
    const o3 = { __proto__: null }, n3 = (e3.ignoreQueryPrefix ? t4.replace(/^\?/, "") : t4).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit);
    let r3, i3 = -1, s2 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < n3.length; ++r3) 0 === n3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === n3[r3] ? s2 = "utf-8" : "utf8=%26%2310003%3B" === n3[r3] && (s2 = "iso-8859-1"), i3 = r3, r3 = n3.length);
    for (r3 = 0; r3 < n3.length; ++r3) {
      if (r3 === i3) continue;
      const t5 = n3[r3], u2 = t5.indexOf("]="), l2 = -1 === u2 ? t5.indexOf("=") : u2 + 1;
      let c2, a2;
      -1 === l2 ? (c2 = e3.decoder(t5, S.decoder, s2, "key"), a2 = e3.strictNullHandling ? null : "") : (c2 = e3.decoder(t5.slice(0, l2), S.decoder, s2, "key"), a2 = m(D(t5.slice(l2 + 1), e3), function(t6) {
        return e3.decoder(t6, S.decoder, s2, "value");
      })), a2 && e3.interpretNumericEntities && "iso-8859-1" === s2 && (a2 = A(a2)), t5.indexOf("[]=") > -1 && (a2 = I(a2) ? [a2] : a2);
      const f2 = _.call(o3, c2);
      f2 && "combine" === e3.duplicates ? o3[c2] = b(o3[c2], a2, e3.arrayLimit, e3.plainObjects) : f2 && "last" !== e3.duplicates || (o3[c2] = a2);
    }
    return o3;
  })(t3, o2) : t3;
  let r2 = o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const i2 = Object.keys(n2);
  for (let e3 = 0; e3 < i2.length; ++e3) {
    const s2 = i2[e3], u2 = k(s2, n2[s2], o2, "string" == typeof t3);
    r2 = d(r2, u2, o2);
  }
  return true === o2.allowSparse ? r2 : (function(t4) {
    const e3 = [{ obj: { o: t4 }, prop: "o" }], o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      const n3 = e3[t5], r3 = n3.obj[n3.prop], i3 = Object.keys(r3);
      for (let t6 = 0; t6 < i3.length; ++t6) {
        const n4 = i3[t6], s2 = r3[n4];
        "object" == typeof s2 && null !== s2 && -1 === o3.indexOf(s2) && (e3.push({ obj: r3, prop: n4 }), o3.push(s2));
      }
    }
    return (function(t5) {
      for (; t5.length > 1; ) {
        const e4 = t5.pop(), o4 = e4.obj[e4.prop];
        if (s(o4)) {
          const t6 = [];
          for (let e5 = 0; e5 < o4.length; ++e5) void 0 !== o4[e5] && t6.push(o4[e5]);
          e4.obj[e4.prop] = t6;
        }
      }
    })(e3), t4;
  })(r2);
}
class x {
  constructor(t3, e2, o2) {
    var n2, r2;
    this.name = t3, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (r2 = e2.wheres) ? r2 : {}, this.config = o2;
  }
  get template() {
    const t3 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t3 ? "/" : t3;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t3, e2;
    return null != (t3 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t4) => ({ name: t4.replace(/{|\??}/g, ""), required: !/\?}$/.test(t4) }))) ? t3 : [];
  }
  matchesUrl(t3) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const o2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t4, e3, o3, n3) => {
      var r3;
      const i3 = `(?<${o3}>${(null == (r3 = this.wheres[o3]) ? void 0 : r3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, r2] = t3.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${o2}/?$`).exec(n2)) ? e2 : new RegExp(`^${o2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t4 in i2.groups) i2.groups[t4] = "string" == typeof i2.groups[t4] ? decodeURIComponent(i2.groups[t4]) : i2.groups[t4];
      return { params: i2.groups, query: N(r2) };
    }
    return false;
  }
  compile(t3) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, o2, n2) => {
      var r2, i2;
      if (!n2 && [null, void 0].includes(t3[o2])) throw new Error(`Ziggy error: '${o2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[o2] && !new RegExp(`^${n2 ? `(${this.wheres[o2]})?` : this.wheres[o2]}$`).test(null != (i2 = t3[o2]) ? i2 : "")) throw new Error(`Ziggy error: '${o2}' parameter '${t3[o2]}' does not match required format '${this.wheres[o2]}' for route '${this.name}'.`);
      return encodeURI(null != (r2 = t3[o2]) ? r2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class C extends String {
  constructor(e2, o2, n2 = true, r2) {
    if (super(), this.t = null != r2 ? r2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, !this.t && "undefined" != typeof document && document.getElementById("ziggy-routes-json") && (globalThis.Ziggy = JSON.parse(document.getElementById("ziggy-routes-json").textContent), this.t = globalThis.Ziggy), this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(o2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t3) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t3)).filter((t3) => "_query" !== t3).reduce((e3, o2) => t({}, e3, { [o2]: this.u[o2] }), {});
    return this.i.compile(this.u) + (function(t3, e3) {
      let o2 = t3;
      const i2 = (function(t4) {
        if (!t4) return O;
        if (void 0 !== t4.allowEmptyArrays && "boolean" != typeof t4.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        if (void 0 !== t4.encodeDotInKeys && "boolean" != typeof t4.encodeDotInKeys) throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
        if (null != t4.encoder && "function" != typeof t4.encoder) throw new TypeError("Encoder has to be a function.");
        const e4 = t4.charset || O.charset;
        if (void 0 !== t4.charset && "utf-8" !== t4.charset && "iso-8859-1" !== t4.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        let o3 = r;
        if (void 0 !== t4.format) {
          if (!g.call(n, t4.format)) throw new TypeError("Unknown format option provided.");
          o3 = t4.format;
        }
        const i3 = n[o3];
        let s3, u3 = O.filter;
        if (("function" == typeof t4.filter || v(t4.filter)) && (u3 = t4.filter), s3 = t4.arrayFormat in w ? t4.arrayFormat : "indices" in t4 ? t4.indices ? "indices" : "repeat" : O.arrayFormat, "commaRoundTrip" in t4 && "boolean" != typeof t4.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        return { addQueryPrefix: "boolean" == typeof t4.addQueryPrefix ? t4.addQueryPrefix : O.addQueryPrefix, allowDots: void 0 === t4.allowDots ? true === t4.encodeDotInKeys || O.allowDots : !!t4.allowDots, allowEmptyArrays: "boolean" == typeof t4.allowEmptyArrays ? !!t4.allowEmptyArrays : O.allowEmptyArrays, arrayFormat: s3, charset: e4, charsetSentinel: "boolean" == typeof t4.charsetSentinel ? t4.charsetSentinel : O.charsetSentinel, commaRoundTrip: t4.commaRoundTrip, delimiter: void 0 === t4.delimiter ? O.delimiter : t4.delimiter, encode: "boolean" == typeof t4.encode ? t4.encode : O.encode, encodeDotInKeys: "boolean" == typeof t4.encodeDotInKeys ? t4.encodeDotInKeys : O.encodeDotInKeys, encoder: "function" == typeof t4.encoder ? t4.encoder : O.encoder, encodeValuesOnly: "boolean" == typeof t4.encodeValuesOnly ? t4.encodeValuesOnly : O.encodeValuesOnly, filter: u3, format: o3, formatter: i3, serializeDate: "function" == typeof t4.serializeDate ? t4.serializeDate : O.serializeDate, skipNulls: "boolean" == typeof t4.skipNulls ? t4.skipNulls : O.skipNulls, sort: "function" == typeof t4.sort ? t4.sort : null, strictNullHandling: "boolean" == typeof t4.strictNullHandling ? t4.strictNullHandling : O.strictNullHandling };
      })(e3);
      let s2, u2;
      "function" == typeof i2.filter ? (u2 = i2.filter, o2 = u2("", o2)) : v(i2.filter) && (u2 = i2.filter, s2 = u2);
      const l2 = [];
      if ("object" != typeof o2 || null === o2) return "";
      const c2 = w[i2.arrayFormat], a2 = "comma" === c2 && i2.commaRoundTrip;
      s2 || (s2 = Object.keys(o2)), i2.sort && s2.sort(i2.sort);
      const f2 = /* @__PURE__ */ new WeakMap();
      for (let t4 = 0; t4 < s2.length; ++t4) {
        const e4 = s2[t4];
        i2.skipNulls && null === o2[e4] || $(l2, R(o2[e4], e4, c2, a2, i2.allowEmptyArrays, i2.strictNullHandling, i2.skipNulls, i2.encodeDotInKeys, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset, f2));
      }
      const p2 = l2.join(i2.delimiter);
      let y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), p2.length > 0 ? y2 + p2 : "";
    })(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t3, e3) => "boolean" == typeof t3 ? Number(t3) : e3(t3) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.m();
    let o2 = {};
    const [n2, r2] = Object.entries(this.t.routes).find(([t3, n3]) => o2 = new x(t3, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, o2, { route: r2 });
  }
  m() {
    const { host: t3, pathname: e2, search: o2 } = this.h();
    return (this.t.absolute ? t3 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + o2;
  }
  current(e2, o2) {
    const { name: n2, params: r2, query: i2, route: s2 } = this.p();
    if (!e2) return n2;
    const u2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(o2) || !u2) return u2;
    const l2 = new x(n2, s2, this.t);
    o2 = this.l(o2, l2);
    const c2 = t({}, r2, i2);
    if (Object.values(o2).every((t3) => !t3) && !Object.values(c2).some((t3) => void 0 !== t3)) return true;
    const a2 = (t3, e3) => Object.entries(t3).every(([t4, o3]) => Array.isArray(o3) && Array.isArray(e3[t4]) ? o3.every((o4) => e3[t4].includes(o4) || e3[t4].includes(decodeURIComponent(o4))) : "object" == typeof o3 && "object" == typeof e3[t4] && null !== o3 && null !== e3[t4] ? a2(o3, e3[t4]) : e3[t4] == o3 || e3[t4] == decodeURIComponent(o3));
    return a2(o2, c2);
  }
  h() {
    var t3, e2, o2, n2, r2, i2;
    const { host: s2 = "", pathname: u2 = "", search: l2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t3 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t3 : s2, pathname: null != (o2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? o2 : u2, search: null != (r2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? r2 : l2 };
  }
  get params() {
    const { params: e2, query: o2 } = this.p();
    return t({}, e2, o2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t3) {
    return this.t.routes.hasOwnProperty(t3);
  }
  l(e2 = {}, o2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = o2.parameterSegments.filter(({ name: t3 }) => !this.t.defaults[t3]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, o3, r2) => t({}, e3, n2[r2] ? { [n2[r2].name]: o3 } : "object" == typeof o3 ? o3 : { [o3]: "" }), {}) : 1 !== n2.length || e2.hasOwnProperty(n2[0].name) || !e2.hasOwnProperty(Object.values(o2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.v(o2), this.j(e2, o2));
  }
  v(e2) {
    return e2.parameterSegments.filter(({ name: t3 }) => this.t.defaults[t3]).reduce((e3, { name: o2 }, n2) => t({}, e3, { [o2]: this.t.defaults[o2] }), {});
  }
  j(e2, { bindings: o2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [r2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t3 }) => t3 === r2)) return t({}, e3, { [r2]: i2 });
      const s2 = i2.hasOwnProperty(o2[r2]) ? o2[r2] : i2.hasOwnProperty("id") ? "id" : void 0;
      if (void 0 === s2) throw new Error(`Ziggy error: object passed as '${r2}' parameter is missing route model binding key '${o2[r2]}'.`);
      return t({}, e3, { [r2]: i2[s2] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function P(t3, e2, o2, n2) {
  const r2 = new C(t3, e2, o2, n2);
  return t3 ? r2.toString() : r2;
}
const U = { install(t3, e2) {
  const o2 = (t4, o3, n2, r2 = e2) => P(t4, o3, n2, r2);
  parseInt(t3.version) > 2 ? (t3.config.globalProperties.route = o2, t3.provide("route", o2)) : t3.mixin({ methods: { route: o2 } });
} };
const Ziggy$1 = { "url": "http://127.0.0.1:8000", "port": 8e3, "defaults": {}, "routes": { "debugbar.openhandler": { "uri": "_debugbar/open", "methods": ["GET", "HEAD"] }, "debugbar.cache.delete": { "uri": "_debugbar/cache/{key}", "methods": ["DELETE"], "wheres": { "key": ".*" }, "parameters": ["key"] }, "debugbar.queries.explain": { "uri": "_debugbar/queries/explain", "methods": ["POST"] }, "debugbar.clockwork": { "uri": "_debugbar/clockwork/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "debugbar.assets": { "uri": "_debugbar/assets", "methods": ["GET", "HEAD"] }, "boost.browser-logs": { "uri": "_boost/browser-logs", "methods": ["POST"] }, "horizon.stats.index": { "uri": "horizon/api/stats", "methods": ["GET", "HEAD"] }, "horizon.workload.index": { "uri": "horizon/api/workload", "methods": ["GET", "HEAD"] }, "horizon.masters.index": { "uri": "horizon/api/masters", "methods": ["GET", "HEAD"] }, "horizon.monitoring.index": { "uri": "horizon/api/monitoring", "methods": ["GET", "HEAD"] }, "horizon.monitoring.store": { "uri": "horizon/api/monitoring", "methods": ["POST"] }, "horizon.monitoring-tag.paginate": { "uri": "horizon/api/monitoring/{tag}", "methods": ["GET", "HEAD"], "parameters": ["tag"] }, "horizon.monitoring-tag.destroy": { "uri": "horizon/api/monitoring/{tag}", "methods": ["DELETE"], "wheres": { "tag": ".*" }, "parameters": ["tag"] }, "horizon.jobs-metrics.index": { "uri": "horizon/api/metrics/jobs", "methods": ["GET", "HEAD"] }, "horizon.jobs-metrics.show": { "uri": "horizon/api/metrics/jobs/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.queues-metrics.index": { "uri": "horizon/api/metrics/queues", "methods": ["GET", "HEAD"] }, "horizon.queues-metrics.show": { "uri": "horizon/api/metrics/queues/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.jobs-batches.index": { "uri": "horizon/api/batches", "methods": ["GET", "HEAD"] }, "horizon.jobs-batches.show": { "uri": "horizon/api/batches/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.jobs-batches.retry": { "uri": "horizon/api/batches/retry/{id}", "methods": ["POST"], "parameters": ["id"] }, "horizon.pending-jobs.index": { "uri": "horizon/api/jobs/pending", "methods": ["GET", "HEAD"] }, "horizon.completed-jobs.index": { "uri": "horizon/api/jobs/completed", "methods": ["GET", "HEAD"] }, "horizon.silenced-jobs.index": { "uri": "horizon/api/jobs/silenced", "methods": ["GET", "HEAD"] }, "horizon.failed-jobs.index": { "uri": "horizon/api/jobs/failed", "methods": ["GET", "HEAD"] }, "horizon.failed-jobs.show": { "uri": "horizon/api/jobs/failed/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.retry-jobs.show": { "uri": "horizon/api/jobs/retry/{id}", "methods": ["POST"], "parameters": ["id"] }, "horizon.jobs.show": { "uri": "horizon/api/jobs/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.index": { "uri": "horizon/{view?}", "methods": ["GET", "HEAD"], "wheres": { "view": "(.*)" }, "parameters": ["view"] }, "sanctum.csrf-cookie": { "uri": "sanctum/csrf-cookie", "methods": ["GET", "HEAD"] }, "api.hms.items": { "uri": "api/hms/items", "methods": ["GET", "HEAD"] }, "items.search": { "uri": "api/v1/search", "methods": ["GET", "HEAD"] }, "api.categories.tree": { "uri": "api/v1/categories", "methods": ["GET", "HEAD"] }, "api.home": { "uri": "api/v1/home", "methods": ["GET", "HEAD"] }, "api.items.index": { "uri": "api/v1/items/{slug}", "methods": ["GET", "HEAD"], "parameters": ["slug"] }, "api.items.show": { "uri": "api/v1/item/{item}", "methods": ["GET", "HEAD"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.sales.index": { "uri": "api/v1/sales", "methods": ["GET", "HEAD"] }, "api.account.show": { "uri": "api/v1/account", "methods": ["GET", "HEAD"] }, "api.account.update": { "uri": "api/v1/account", "methods": ["PUT"] }, "api.account.change-password": { "uri": "api/v1/account/change-password", "methods": ["PUT"] }, "api.orders.index": { "uri": "api/v1/orders", "methods": ["GET", "HEAD"] }, "api.orders.show": { "uri": "api/v1/orders/{order}", "methods": ["GET", "HEAD"], "parameters": ["order"], "bindings": { "order": "id" } }, "api.orders.reorder": { "uri": "api/v1/orders/{order}/reorder", "methods": ["POST"], "parameters": ["order"], "bindings": { "order": "id" } }, "api.wishlist.index": { "uri": "api/v1/wishlist", "methods": ["GET", "HEAD"] }, "api.wishlist.ids": { "uri": "api/v1/wishlist/ids", "methods": ["GET", "HEAD"] }, "api.wishlist.sync": { "uri": "api/v1/wishlist/sync", "methods": ["POST"] }, "api.wishlist.toggle": { "uri": "api/v1/wishlist/{item}", "methods": ["POST"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.wishlist.destroy": { "uri": "api/v1/wishlist/{item}", "methods": ["DELETE"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.cart.index": { "uri": "api/v1/cart", "methods": ["GET", "HEAD"] }, "api.cart.sync": { "uri": "api/v1/cart/sync", "methods": ["POST"] }, "api.cart.add": { "uri": "api/v1/cart/{item}", "methods": ["POST"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.cart.update": { "uri": "api/v1/cart/{item}", "methods": ["PUT"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.cart.remove": { "uri": "api/v1/cart/{item}", "methods": ["DELETE"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.cart.toggle-service": { "uri": "api/v1/cart/{item}/toggle-service", "methods": ["POST"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.items.notify.subscribe": { "uri": "api/v1/items/{item}/notify", "methods": ["POST"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.items.notify.unsubscribe": { "uri": "api/v1/items/{item}/notify", "methods": ["DELETE"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.checkout.meta": { "uri": "api/v1/checkout/meta", "methods": ["GET", "HEAD"] }, "api.checkout.preview": { "uri": "api/v1/checkout/preview", "methods": ["POST"] }, "api.checkout.onway-regions": { "uri": "api/v1/checkout/onway-regions", "methods": ["GET", "HEAD"] }, "api.checkout.office-inventory": { "uri": "api/v1/checkout/office-inventory", "methods": ["POST"] }, "api.checkout.credit-info": { "uri": "api/v1/checkout/credit-info", "methods": ["GET", "HEAD"] }, "api.checkout.place": { "uri": "api/v1/checkout", "methods": ["POST"] }, "api.payment.initiate": { "uri": "api/v1/payment/initiate", "methods": ["POST"] }, "api.payment.status": { "uri": "api/v1/payment/status", "methods": ["GET", "HEAD"] }, "home": { "uri": "/", "methods": ["GET", "HEAD"] }, "read.more": { "uri": "read-more", "methods": ["GET", "HEAD"] }, "register.show": { "uri": "register", "methods": ["GET", "HEAD"] }, "register": { "uri": "register/submit-form", "methods": ["POST"] }, "register.verify-phone.show": { "uri": "register/verify-phone", "methods": ["GET", "HEAD"] }, "register.verify-code": { "uri": "registration/verify/phone", "methods": ["POST"] }, "register.resend-code": { "uri": "register/resend-code", "methods": ["POST"] }, "login": { "uri": "login", "methods": ["GET", "HEAD"] }, "login.post": { "uri": "login", "methods": ["POST"] }, "logout": { "uri": "logout", "methods": ["POST"] }, "show.forgot.password": { "uri": "forgot-password", "methods": ["GET", "HEAD"] }, "forgot-password.send-verification-code": { "uri": "forgot-password/send-code", "methods": ["POST"] }, "forgot-password.resend-code": { "uri": "forgot-password/resend-code", "methods": ["POST"] }, "forgot-password.verify-phone.show": { "uri": "forgot-password/verify-phone", "methods": ["GET", "HEAD"] }, "forgot-password.verify-code": { "uri": "forgot-password/verify-code", "methods": ["POST"] }, "forgot-password.reset.show": { "uri": "forgot-password/reset", "methods": ["GET", "HEAD"] }, "forgot-password.reset": { "uri": "forgot-password/reset", "methods": ["POST"] }, "admin.index": { "uri": "admin", "methods": ["GET", "HEAD"] }, "admin.orders.index": { "uri": "admin/orders", "methods": ["GET", "HEAD"] }, "admin.orders.show": { "uri": "admin/orders/{order}", "methods": ["GET", "HEAD"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.approve": { "uri": "admin/orders/{order}/approve", "methods": ["PUT"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.ready": { "uri": "admin/orders/{order}/ready", "methods": ["PUT"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.dispatch": { "uri": "admin/orders/{order}/dispatch", "methods": ["PUT"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.deliver": { "uri": "admin/orders/{order}/deliver", "methods": ["PUT"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.cancel": { "uri": "admin/orders/{order}/cancel", "methods": ["PUT"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.send-pdf": { "uri": "admin/orders/{order}/send-pdf", "methods": ["POST"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.send-onway": { "uri": "admin/orders/{order}/send-onway", "methods": ["POST"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.destroy": { "uri": "admin/orders/{order}", "methods": ["DELETE"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.items.index": { "uri": "admin/items", "methods": ["GET", "HEAD"] }, "admin.items.sync": { "uri": "admin/items/sync", "methods": ["POST"] }, "admin.items.sync-category": { "uri": "admin/items/sync-category", "methods": ["POST"] }, "admin.items.sync-attributes": { "uri": "admin/items/sync-attributes", "methods": ["POST"] }, "admin.items.fetch-missing-images": { "uri": "admin/items/fetch-missing-images", "methods": ["POST"] }, "admin.items.sync-inventory": { "uri": "admin/items/sync-inventory", "methods": ["POST"] }, "admin.items.search": { "uri": "admin/items/search", "methods": ["GET", "HEAD"] }, "admin.items.managed": { "uri": "admin/items/managed", "methods": ["GET", "HEAD"] }, "admin.items.update": { "uri": "admin/items/{item}", "methods": ["PUT"], "parameters": ["item"], "bindings": { "item": "id" } }, "admin.categories.search": { "uri": "admin/categories/search", "methods": ["GET", "HEAD"] }, "admin.categories.fetch-image": { "uri": "admin/categories/{category}/fetch-image", "methods": ["POST"], "parameters": ["category"], "bindings": { "category": "id" } }, "admin.categories.keywords.show": { "uri": "admin/categories/{category}/keywords", "methods": ["GET", "HEAD"], "parameters": ["category"], "bindings": { "category": "id" } }, "admin.categories.keywords.update": { "uri": "admin/categories/{category}/keywords", "methods": ["POST"], "parameters": ["category"], "bindings": { "category": "id" } }, "admin.payments.index": { "uri": "admin/payments", "methods": ["GET", "HEAD"] }, "admin.stock-notifications.index": { "uri": "admin/stock-notifications", "methods": ["GET", "HEAD"] }, "admin.stock-notifications.toggle-called": { "uri": "admin/stock-notifications/{stockNotification}/toggle-called", "methods": ["PATCH"], "parameters": ["stockNotification"], "bindings": { "stockNotification": "id" } }, "admin.stock-notifications.destroy": { "uri": "admin/stock-notifications/{stockNotification}", "methods": ["DELETE"], "parameters": ["stockNotification"], "bindings": { "stockNotification": "id" } }, "admin.analytics.index": { "uri": "admin/analytics", "methods": ["GET", "HEAD"] }, "admin.home-page.index": { "uri": "admin/home-page", "methods": ["GET", "HEAD"] }, "admin.home-page.banners.store": { "uri": "admin/home-page/banners", "methods": ["POST"] }, "admin.home-page.banners.destroy": { "uri": "admin/home-page/banners/{banner}", "methods": ["DELETE"], "parameters": ["banner"], "bindings": { "banner": "id" } }, "admin.home-page.sections.store": { "uri": "admin/home-page/sections", "methods": ["POST"] }, "admin.home-page.sections.update": { "uri": "admin/home-page/sections/{homeSection}", "methods": ["PUT"], "parameters": ["homeSection"], "bindings": { "homeSection": "id" } }, "admin.home-page.sections.toggle-hidden": { "uri": "admin/home-page/sections/{homeSection}/toggle-hidden", "methods": ["PATCH"], "parameters": ["homeSection"], "bindings": { "homeSection": "id" } }, "admin.home-page.sections.destroy": { "uri": "admin/home-page/sections/{homeSection}", "methods": ["DELETE"], "parameters": ["homeSection"], "bindings": { "homeSection": "id" } }, "admin.home-page.sections.items.store": { "uri": "admin/home-page/sections/{homeSection}/items", "methods": ["POST"], "parameters": ["homeSection"], "bindings": { "homeSection": "id" } }, "admin.home-page.sections.items.destroy": { "uri": "admin/home-page/sections/{homeSection}/items/{item}", "methods": ["DELETE"], "parameters": ["homeSection", "item"], "bindings": { "homeSection": "id", "item": "id" } }, "admin.home-page.sections.images.store": { "uri": "admin/home-page/sections/{homeSection}/images", "methods": ["POST"], "parameters": ["homeSection"], "bindings": { "homeSection": "id" } }, "admin.home-page.sections.images.update": { "uri": "admin/home-page/sections/{homeSection}/images/{homeSectionImage}", "methods": ["PUT"], "parameters": ["homeSection", "homeSectionImage"], "bindings": { "homeSection": "id", "homeSectionImage": "id" } }, "admin.home-page.sections.images.destroy": { "uri": "admin/home-page/sections/{homeSection}/images/{homeSectionImage}", "methods": ["DELETE"], "parameters": ["homeSection", "homeSectionImage"], "bindings": { "homeSection": "id", "homeSectionImage": "id" } }, "admin.users.index": { "uri": "admin/users", "methods": ["GET", "HEAD"] }, "admin.users.get-user": { "uri": "admin/user/{user}", "methods": ["GET", "HEAD"], "parameters": ["user"], "bindings": { "user": "id" } }, "admin.users.delete": { "uri": "admin/users/{user}", "methods": ["DELETE"], "parameters": ["user"], "bindings": { "user": "id" } }, "cashier.customers.index": { "uri": "cashier/customers", "methods": ["GET", "HEAD"] }, "cashier.customers.register": { "uri": "cashier/customers", "methods": ["POST"] }, "account.index": { "uri": "account", "methods": ["GET", "HEAD"] }, "account.update": { "uri": "account/update/{user}", "methods": ["PUT"], "parameters": ["user"], "bindings": { "user": "id" } }, "account.change-password": { "uri": "account/change-password", "methods": ["PUT"] }, "user-orders.index": { "uri": "user-orders", "methods": ["GET", "HEAD"] }, "user-orders.show": { "uri": "user-orders/{order}", "methods": ["GET", "HEAD"], "parameters": ["order"], "bindings": { "order": "id" } }, "user-orders.reorder": { "uri": "user-orders/{order}/reorder", "methods": ["POST"], "parameters": ["order"], "bindings": { "order": "id" } }, "wishlist.index": { "uri": "wishlist", "methods": ["GET", "HEAD"] }, "cart.index": { "uri": "cart", "methods": ["GET", "HEAD"] }, "checkout.index": { "uri": "checkout", "methods": ["GET", "HEAD"] }, "checkout.onway-regions": { "uri": "checkout/onway-regions", "methods": ["GET", "HEAD"] }, "checkout.credit-info": { "uri": "checkout/credit-info", "methods": ["GET", "HEAD"] }, "checkout.office-inventory": { "uri": "checkout/office-inventory", "methods": ["POST"] }, "payment.initiate": { "uri": "payment/initiate", "methods": ["POST"] }, "initiate.payment.invoice": { "uri": "initiate/payment/invoice", "methods": ["POST"] }, "initiate.payment.limit": { "uri": "initiate/payment/limit", "methods": ["POST"] }, "initiate.payment.cash": { "uri": "initiate/payment/cash", "methods": ["POST"] }, "payment.success": { "uri": "payment/success/{provider}", "methods": ["GET", "HEAD"], "parameters": ["provider"] }, "payment.cancel": { "uri": "payment/cancel/{provider}", "methods": ["GET", "HEAD"], "parameters": ["provider"] }, "payment.invoice.success": { "uri": "payment/invoice/{invoice}", "methods": ["GET", "HEAD"], "parameters": ["invoice"] }, "payment.limit.success": { "uri": "payment/limit/{invoice}", "methods": ["GET", "HEAD"], "parameters": ["invoice"] }, "payment.pcb.order.details": { "uri": "pro-credit-bank/order-details", "methods": ["GET", "HEAD"] }, "bc.send-order": { "uri": "bc-sales-order/{orderItem}", "methods": ["POST"], "parameters": ["orderItem"] }, "payment.callback": { "uri": "payment/callback", "methods": ["POST"] }, "download.file": { "uri": "order/download/{filename}", "methods": ["GET", "HEAD"], "wheres": { "filename": ".*" }, "parameters": ["filename"] }, "about-us": { "uri": "about-us", "methods": ["GET", "HEAD"] }, "terms-of-service": { "uri": "terms-of-service", "methods": ["GET", "HEAD"] }, "keep-conditions": { "uri": "keep-conditions", "methods": ["GET", "HEAD"] }, "privacy-policy": { "uri": "privacy-policy", "methods": ["GET", "HEAD"] }, "cookie-policy": { "uri": "cookie-policy", "methods": ["GET", "HEAD"] }, "delivery-rates": { "uri": "delivery-rates", "methods": ["GET", "HEAD"] }, "items.show": { "uri": "item/{item}", "methods": ["GET", "HEAD"], "parameters": ["item"], "bindings": { "item": "slug" } }, "stock-notifications.subscribe": { "uri": "items/{item}/notify", "methods": ["POST"], "parameters": ["item"], "bindings": { "item": "slug" } }, "stock-notifications.unsubscribe": { "uri": "items/{item}/notify", "methods": ["DELETE"], "parameters": ["item"], "bindings": { "item": "slug" } }, "search.index": { "uri": "search", "methods": ["GET", "HEAD"] }, "sales.index": { "uri": "sales", "methods": ["GET", "HEAD"] }, "items.index": { "uri": "{grandparentSlug}/{parentSlug?}/{childSlug?}", "methods": ["GET", "HEAD"], "wheres": { "grandparentSlug": "(?!(?:en|ru|tr)(?:/|$))[^/]+" }, "parameters": ["grandparentSlug", "parentSlug", "childSlug"] }, "storage.local": { "uri": "storage/{path}", "methods": ["GET", "HEAD"], "wheres": { "path": ".*" }, "parameters": ["path"] }, "storage.local.upload": { "uri": "storage/{path}", "methods": ["PUT"], "wheres": { "path": ".*" }, "parameters": ["path"] } } };
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy$1.routes, window.Ziggy.routes);
}
const account$3 = { "settingsTitle": "პარამეტრები", "profile": "პროფილი", "security": "უსაფრთხოება", "firstName": "სახელი", "lastName": "გვარი", "phone": "ტელეფონი", "email": "ელ.ფოსტა", "address": "მისამართი", "userType": "მომხმარებელი", "taxId": "საიდენტიფიკაციო ნომერი", "idNumber": "პირადი ნომერი", "changePassword": "შეცვალე პაროლი", "currentPassword": "მიმდინარე პაროლი", "newPassword": "ახალი პაროლი", "repeatNewPassword": "გაიმეორე ახალი პაროლი" };
const auth$3 = { "loginTitle": "ავტორიზაცია", "loginHeading": "ავტორიზაცია", "emailOrPhone": "ელ.ფოსტა ან ტელეფონი", "password": "პაროლი", "rememberMe": "დამახსოვრება", "forgotPassword": "დაგავიწყდა პაროლი?", "signIn": "შესვლა", "noAccount": "არ ხარ რეგისტრირებული?", "registerNow": "დარეგისტრირდი", "registerTitle": "რეგისტრაცია", "registerHeading": "რეგისტრაცია", "individual": "ფიზიკური პირი", "legalEntity": "იურიდიული პირი", "notGeorgianCitizen": "მონიშნეთ თუ არ ხართ საქართველოს მოქალაქე", "nonResident": "არარეზიდენტი ვარ", "firstName": "სახელი", "companyName": "კომპანიის სახელი", "lastName": "გვარი", "phone": "ტელეფონი", "personalId": "პირადი ნომერი", "identificationNumber": "საიდენტიფიკაციო ნომერი", "email": "ელ. ფოსტა", "repeatPassword": "გაიმეორე პაროლი", "entrepreneurNote": "თუ გაქვთ მცირე მეწარმის სტატუსი ან ხართ იურიდიული პირი, სპეციალური შეთავაზებების მისაღებად დაგვიკავშირდით", "confirm": "დადასტურება", "alreadyRegistered": "უკვე ხარ რეგისტრირებული?", "forgotTitle": "დაგავიწყდა პაროლი", "forgotHint": "შეიყვანე ტელეფონი, რომლითაც ხარ რეგისტრირებული", "resetTitle": "პაროლის შეცვლა", "newPassword": "ახალი პაროლი", "repeatNewPassword": "გაიმეორე ახალი პაროლი", "verifyPhoneTitle": "ტელეფონის იდენტიფიცირება", "enterSixDigitCode": "შეიყვანე 6 ნიშნა კოდი", "resendCode": "ხელახლა გაგზავნა", "currentPassword": "მიმდინარე პაროლი" };
const cart$3 = { "wholesaleDiscount": "საბითუმო ფასდაკლება", "vipDiscount": "VIP ფასდაკლება", "title": "კალათა", "productCount": "{count} პროდუქტი", "emptyHeading": "კალათა ცარიელია", "emptyText": "დაამატე პროდუქტები კალათაში და შემდეგ გააგრძელე შეძენა.", "selectAll": "ყველას არჩევა", "selectedCount": "{count} არჩეულია", "rowTotal": "სულ:", "vipSavings": "VIP დანაზოგი:", "savings": "დანაზოგი:", "availableQty": "ხელმისაწვდომი რაოდენობაა {count}", "setupService": "დამონტაჟების სერვისი", "orderSummary": "შეკვეთის შეჯამება", "totalSavings": "ჯამური დანაზოგი", "checkout": "შეკვეთის გაფორმება", "securePayment": "უსაფრთხო გადახდა" };
const catalog$3 = { "metaSuffix": "იხილეთ Sonniva-ს სრული კატალოგი", "categories": "კატეგორიები" };
const checkout$3 = { "cartEmptyDetail": "ყველა პროდუქტი ამოღებულია გადახდის გვერდიდან", "inventoryCheckFailed": "მარაგის შემოწმება ვერ მოხერხდა", "zonesLoadFailed": "ზონების ჩატვირთვა ვერ მოხერხდა. გთხოვთ განაახლოთ გვერდი და სცადოთ ხელახლა.", "genericError": "დაფიქსირდა შეცდომა", "noBankResponse": "ბანკიდან პასუხი ვერ მივიღეთ", "deliveryOffice": "თვითგატანა სონნივას ფილიალიდან", "deliveryTbilisi": "მიწოდება თბილისში", "deliveryRegions": "მიწოდება რეგიონებში", "regionOnwayOffice": "OnWay-ის ფილიალიდან გატანა", "regionAddress": "ადგილზე მიტანა", "avchalaAddress": "შუშის ქუჩა 38 — ორშაბათი-პარასკევი 09:00-18:00", "didubeAddress": "ზაირა კიკვიძის 6 — ორშაბათი-პარასკევი 09:00-18:00", "zone1Label": "I ზონა – 5-40 ₾", "zone2Label": "II ზონა – 5-50 ₾", "zone3Label": "III ზონა – 5-60 ₾", "providerPcb": "PCB ბანკი", "providerBog": "BOG ბანკი", "providerTbc": "TBC ბანკი", "providerInvoice": "საბანკო გადარიცხვა", "providerLimit": "ლიმიტით გადახდა", "providerCash": "ქეშით გადახდა", "errDeliveryType": "გთხოვთ აირჩიოთ მიწოდების ტიპი", "errTbilisiZone": "გთხოვთ აირჩიოთ თბილისის ზონა", "errRegionOption": "გთხოვთ აირჩიოთ მიწოდების ვარიანტი", "errOnwayBranch": "გთხოვთ აირჩიოთ OnWay ფილიალი", "errRegionZone": "გთხოვთ აირჩიოთ ქალაქი/სოფელი", "errOfficeBranch": "გთხოვთ აირჩიოთ ფილიალი", "errAddress": "გთხოვთ შეიყვანოთ მიწოდების მისამართი", "errProvider": "გთხოვთ აირჩიოთ გადახდის მეთოდი", "errAgreement": "გთხოვთ დაეთანხმოთ წესებსა და პირობებს", "fixMarkedFields": "გთხოვთ შეასწოროთ მონიშნული ველები გაგრძელებამდე", "backToCart": "კალათაში დაბრუნება", "title": "შეკვეთის გაფორმება", "deliveryTypeHeading": "მიწოდების ტიპი", "requiredField": "სავალდებულო ველი", "free": "უფასო", "freeParen": "(უფასო)", "deliveryAddressHeading": "მიწოდების მისამართი", "chooseOnwayBranch": "აირჩიეთ OnWay-ის ფილიალი", "choose": "არჩევა", "chooseCityDistrictVillage": "აირჩიეთ ქალაქი/რაიონიო/სოფელი", "notFound": "ვერ მოიძებნა", "chooseZone": "აირჩიეთ ზონა", "orderOver500FreeTbilisi": "შეკვეთა 500 ₾-ზე მეტია — თბილისში მიწოდება უფასოა", "streetNumberOptional": "ქუჩის ნომერი (არასავალდებულო)", "pickupPoint": "გატანის წერტილი", "clickLinkForAddress": "დააჭირეთ ლინკზე მისამართის სანახავად", "checkingBranchInventory": "მიმდინარეობს მარაგის შემოწმება არჩეულ ფილიალში...", "insufficientBranchQty": "პროდუქტის არასაკმარისი რაოდენობა არჩეულ ფილიალში", "commentHeading": "კომენტარი", "commentPlaceholder": "სპეციალური მოთხოვნები, შენიშვნები...", "paymentMethodHeading": "გადახდის მეთოდი", "checkingLimit": "მიმდინარეობს ლიმიტის შემოწმება...", "noLimitDefined": "თქვენ არ გაქვთ განსაზღვრული ლიმიტი. დაინტერესების შემთხვევაში დაგვიკავშირდით.", "insufficientLimit": "არასაკმარისი ლიმიტი!", "limit": "ლიმიტი", "used": "გამოყენებული", "available": "ხელმისაწვდომი", "amountDue": "გადასახდელი თანხა", "orderSummary": "შეკვეთის შეჯამება", "setupService": "მონტაჟის სერვისი", "remove": "წაშლა", "totalSavings": "ჯამური დანაზოგი", "delivery": "მიწოდება", "agree": "ვეთანხმები", "termsAndConditions": "წესებსა და პირობებს", "processing": "მიმდინარეობს...", "payAmount": "გადახდა — ", "securePaymentSsl": "უსაფრთხო გადახდა SSL დაშიფვრით", "insufficientBranchStockTitle": "არასაკმარისი მარაგი არჩეულ ფილიალში", "insufficientBranchStockText": "შემდეგი პროდუცქიის მარაგი არჩეულ ფილიალში საკმარისი არ არის. გთხოვთ შეცვალოთ ფილიალი ან რაოდენობა:", "inStockShort": "მარაგშია:", "desiredShort": "სასურველი:", "understood": "გასაგებია" };
const common$3 = { "search": "ძებნა", "searchPlaceholder": "მოძებნე ის რაც გჭირდება...", "searchShort": "რას ეძებთ?", "addToCart": "კალათაში დამატება", "inStock": "მარაგშია", "outOfStock": "მარაგში არ არის", "viewAll": "ყველას ნახვა", "loading": "იტვირთება...", "back": "უკან", "cancel": "გაუქმება", "confirm": "დადასტურება", "save": "შენახვა", "delete": "წაშლა", "edit": "რედაქტირება", "close": "დახურვა", "more": "მეტი", "pack": "შეკვრა", "clear": "გასუფთავება", "currency": "₾", "pleaseWait": "გთხოვთ დაელოდოთ...", "continue": "გაგრძელება", "submit": "დადასტურება", "goToHome": "მთავარ გვერდზე", "orderNumber": "შეკვეთის ნომერი", "backToHome": "მთავარ გვერდზე დაბრუნება", "startShopping": "დაიწყე შოპინგი", "continueShopping": "შოპინგის გაგრძელება", "total": "სულ", "all": "ყველა", "searchDots": "ძებნა...", "yes": "კი", "no": "არა", "goTo": "გადასვლა", "view": "იხილეთ", "viewDetails": "დეტალურად ნახვა" };
const customerPicker$3 = { "edit": "შეცვლა", "remove": "წაშლა", "selectCustomer": "მომხმარებლის არჩევა", "selectCustomerHint": "აირჩიეთ მომხმარებელი რომლის სახელითაც გსურთ შეკვეთის განხორციელება", "searchPlaceholder": "სახელი, ტელეფონი, ელ-ფოსტა ან საიდენტიფიკაციო კოდი…", "recentlyAdded": "ბოლოს დამატებული", "searchResults": "ძიების შედეგები", "noCustomerFound": "მომხმარებელი ვერ მოიძებნა.", "noRecentCustomers": "ბოლო მომხმარებლები არ არის.", "addNewCustomer": "ახალი მომხმარებლის დამატება", "firstName": "სახელი", "lastName": "გვარი", "mobile": "მობილური", "email": "ელ-ფოსტა", "idCode": "საიდენტიფიკაციო კოდი", "idCodePlaceholder": "პირადი / საიდ. კოდი", "address": "მისამართი", "addressPlaceholder": "ქუჩა, ქალაქი…", "saveAndSelect": "შენახვა და არჩევა" };
const error$3 = { "notFound": "ბოდიში, მოთხოვნილი გვერდი ვერ მოიძებნა.", "forbidden": "ბოდიში, ამ გვერდზე წვდომა არ გაქვთ.", "server": "რაღაც შეგვეშალა. სცადეთ მოგვიანებით.", "maintenance": "მიმდინარეობს ტექნიკური სამუშაოები. დაბრუნდით მალე.", "unexpected": "მოხდა მოულოდნელი შეცდომა." };
const footer$3 = { "rightsReserved": "ყველა უფლება დაცულია.", "termsOfService": "მომსახურების პირობები", "privacyPolicy": "კონფიდენციალურობის პოლიტიკა", "cookiePolicy": "ქუქი ფაილების პოლიტიკა", "workingHours": "ორშაბათი–პარასკევი, 09:00–18:00", "faq": "ხშირად დასმული კითხვები" };
const gallery$3 = { "noImage": "სურათი არ არის" };
const item$3 = { "notifyRestock": "მიიღეთ შეტყობინება მარაგის შევსებისთანავე", "noProducts": "პროდუქტი არ მოიძებნა", "maxQty": "შეკვეთის მაქსიმალური რაოდენობაა {count}", "similarProducts": "მსგავსი პროდუქტები", "copyCode": "დააკოპირე პროდუქტის კოდი", "copyName": "დააკოპირე პროდუქტის სახელი", "branchAvchala": "ავჭალის ფილიალი", "branchDidube": "დიდუბის ფილიალი", "wholesale": "საბითუმო", "pack": "შეკვრა", "retail": "საცალო", "priceAppliesFrom": "ფასი ვრცელდება", "perPackPurchase": "შეკვრის შეძენის შემთხვევაში", "perUnitPurchase": "ცალის შეძენის შემთხვევაში", "packPrice": "შეკვრის ფასი", "unitPrice": "ცალის ფასი", "choosePack": "აირჩიეთ შეკვრა", "setupService": "მონტაჟის სერვისი", "buyNow": "ახლავე შეძენა", "delivery": "მიწოდება", "deliverySelfPickup": "თვითგატანა ოფისიდან:", "deliverySelfPickupText": "უფასო. გატანის წერტილი", "onMap": "რუკაზე", "deliveryTbilisi": "მიწოდება თბილისში: 500+ ₾ უფასო", "deliveryRegions": "მიწოდება რეგიონებში:", "seeDeliveryRates": "იხილეთ მიწოდების ტარიფები", "deliveryUnloadNote": "მიტანის სერვისის ფარგლებში პროდუქციის მანქანიდან ჩამოტვირთვა და სართულზე ატანა არ შედის მომსახურებაში.", "paymentMethods": "გადახდის მეთოდები", "paymentCards": "ბარათებით Visa, MasterCard, ლოიალობის ქულებით", "paymentBankTransfer": "საბანკო გადარიცხვით", "specifications": "მახასიათებლები", "descriptionTab": "აღწერა", "noSpecifications": "მახასიათებლები არ არის მითითებული.", "noDescription": "აღწერა არ არის მითითებული." };
const nav$3 = { "chooseCategory": "აირჩიე კატეგორია", "catalog": "კატალოგი", "sales": "ფასდაკლებები", "myOrders": "ჩემი შეკვეთები", "myAccount": "ჩემი კაბინეტი", "adminPanel": "ადმინ პანელი", "favorites": "ფავორიტების სია", "aboutUs": "ჩვენს შესახებ", "deliveryRates": "მიწოდების ტარიფები", "termsOfService": "მომსახურების პირობები", "privacyPolicy": "კონფიდენციალურობა", "cookiePolicy": "Cookie პოლიტიკა", "contactUs": "დაგვიკავშირდით", "home": "საწყისი გვერდი", "signIn": "შესვლა", "signOut": "გასვლა" };
const orders$3 = { "title": "ჩემი შეკვეთები", "trackingBanner": "შეკვეთის სტატუსისა და მიწოდების ინფორმაციის სანახავად გადადით ვებგვერდზე და შეიყვანეთ თრექინგის ნომერი.", "checkStatus": "სტატუსის შემოწმება", "orderCount": "{count} შეკვეთა", "totalAmount": "ჯამური თანხა", "orderNo": "შეკვეთის №", "noProducts": "პროდუქტები არ მოიძებნა", "date": "თარიღი", "trackingNumber": "თრექინგის ნომერი", "details": "დეტალები", "reorder": "თავიდან შეკვეთა", "noOrders": "შეკვეთები არ მოიძებნა.", "loadError": "შეკვეთის ჩატვირთვა ვერ მოხერხდა.", "errorSummary": "შეცდომა", "detailTitle": "შეკვეთის დეტალები", "orderHash": "შეკვეთა #{no}", "reorderTitle": "თავიდან შეკვეთა #{no}", "delivery": "მიწოდება", "deliveryLine": "მიწოდება:", "trackingLine": "თრექინგის ნომერი:", "payment": "გადახდა", "paymentMethod": "გადახდის მეთოდი", "paymentStatus": "გადახდის სტატუსი", "transactionId": "ტრანზაქციის ID", "comment": "კომენტარი", "products": "პროდუქცია", "setupServiceLine": "მონტაჟის სერვისი —", "unitPrice": "ერთეულის ფასი", "unitPriceShort": "ერთ. ფასი", "wholesale": "საბითუმო", "subtotal": "ჯამი", "wholesaleDiscount": "საბითუმო ფასდაკლება", "downloadInvoice": "ინვოისის ჩამოტვირთვა", "status": { "awaitingPayment": "გადახდის მოლოდინში", "pending": "დაუდასტურებელი", "paid": "გადახდილი", "ready": "მზადაა", "dispatched": "გაგზავნილია", "delivered": "ჩაბარებულია", "cancelled": "უარყოფილი", "cancelledAlt": "გაუქმებული", "limit": "ლიმიტი" }, "paymentStatusLabels": { "pending": "მოლოდინში", "processing": "მუშავდება", "completed": "დასრულებული", "failed": "ვერ შესრულდა", "cancelled": "გაუქმებული" }, "deliveryTypes": { "office": "ოფისიდან გატანა", "tbilisi": "თბილისი", "regions": "რეგიონები" }, "providers": { "invoice": "ინვოისი", "cash": "ქეში" } };
const payment$3 = { "successTitle": "გადახდა წარმატებით შესრულდა", "confirmationEmailSent": "დადასტურების წერილი გამოგზავნილია თქვენს ელ-ფოსტაზე.", "cancelTitle": "გადახდა უარყოფილია", "cancelText": "გადახდა ვერ განხორციელდა. სცადეთ თავიდან ან აირჩიეთ სხვა მეთოდი.", "tryAgain": "თავიდან ცდა", "invoiceSentTitle": "ინვოისი გაგზავნილია", "invoiceSentText": "ინვოისი გაიგზავნა თქვენს ელ-ფოსტაზე", "invoiceNumber": "ინვოისის ნომერი", "checkEmailForPdf": "შეამოწმეთ ელ-ფოსტა PDF ინვოისისთვის", "checkSpam": "თუ წერილი არ მოგივიდათ, შეამოწმეთ სპამის საქაღალდე", "limitOrderTitle": "შეკვეთა განხორციელდა", "limitOrderText": "შეკვეთა წარმატებით გაფორმდა ლიმიტით გადახდის საფუძველზე" };
const places$3 = { "exactAddress": "ზუსტი მისამართი", "requiredField": "სავალდებულო ველი", "pickFromList": "აირჩიეთ შესაბამისი მისამართი ქვემოთ მოცემული ლისტიდან", "addressPlaceholder": "მისამართი" };
const pol$3 = /* @__PURE__ */ JSON.parse('{"about":{"title":"ჩვენს შესახებ","p1":"Sonniva Georgia 2014 წლიდან წარმატებით ოპერირებს ქართულ ბაზარზე და მომხმარებელს სთავაზობს ავეჯის აქსესუარების, ალუმინის პროფილებისა მოაჯირის დეტალების, მინისა და საშხაპე კაბინების აქსესუარების, ხელსაწყოების, ელექტრო ინსტრუმენტებისა და ხელსაწყოების ფართო არჩევანს.","p2":"კომპანიის მთავარი მიზანია მომხმარებლებს შესთავაზოს მაღალი ხარისხის პროდუქცია, თანამედროვე გადაწყვეტილებები და პროფესიონალური მომსახურება, რომელიც სრულად პასუხობს როგორც ინდივიდუალური მომხმარებლების, ასევე ბიზნეს სექტორის მოთხოვნებს.","p3":"წლების განმავლობაში Sonniva Georgia გახდა სანდო პარტნიორი ავეჯის მწარმოებლებისთვის, დიზაინერებისთვის, მშენებლებისა და ხელოსნებისთვის. ჩვენი ასორტიმენტი აერთიანებს მსოფლიოს წამყვანი ბრენდების პროდუქტებს, რაც გვაძლევს შესაძლებლობას მომხმარებლებს შევთავაზოთ ხარისხის, ფუნქციონალურობისა და ინოვაციების საუკეთესო კომბინაცია.","p4":"კომპანია განსაკუთრებულ ყურადღებას უთმობს მომსახურების ხარისხს, პროდუქციის მუდმივ განახლებას და თანამედროვე ტექნოლოგიების დანერგვას. სწორედ ამ მიდგომის საფუძველზე შევქმენით ონლაინ პლატფორმებიც, რომლებიც მომხმარებლებს საშუალებას აძლევს მარტივად და სწრაფად მიიღონ საჭირო პროდუქცია და მომსახურება.","p5":"გარდა სავაჭრო მიმართულებისა, Sonniva Georgia მომხმარებლებს სთავაზობს ალუმინის კარებისა და ჩარჩოების ინდივიდუალურ დამზადებას, ჭრასა და აწყობას. ჩვენი გუნდი უზრუნველყოფს თითოეული პროექტის ხარისხიან შესრულებას, ტექნიკურ მხარდაჭერასა და პროფესიონალურ კონსულტაციას.","p6":"დღეს Sonniva Georgia აგრძელებს განვითარებას, აფართოებს პროდუქციის ასორტიმენტს და ქმნის ახალ შესაძლებლობებს მომხმარებლებისთვის!","tagline":"Sonniva Georgia — ხარისხი, ინოვაცია და საიმედო პარტნიორობა ერთ სივრცეში."},"cookie":{"title":"Cookie პოლიტიკა","lastUpdated":"ბოლო განახლება: ივლისი 2026","intro":"აღნიშნული Cookie პოლიტიკა განმარტავს, თუ როგორ ვიყენებთ ჩვენს ვებგვერდზე Cookie და მსგავს ტექნოლოგიებს. ჩვენ ვიყენებთ მხოლოდ იმ Cookie-ებს, რომლებიც საჭიროა საიტის გამართული მუშაობისთვის, უსაფრთხოებისთვის და გამოყენების ანალიზისთვის.","whatH":"რა არის Cookie?","whatP":"Cookie წარმოადგენს მცირე ტექსტურ ფაილებს, რომლებიც ინახება თქვენს ბრაუზერში იმისათვის, რომ ვებგვერდმა იმუშაოს გამართულად, გააუმჯობესოს შესრულება ან საუკეთესო გამოყენების გამოცდილება.","useH":"რასთვის ვიყენებთ Cookie","c1h":"1. აუცილებელი Cookie","c1p":"ეს Cookie საჭიროა ვებგვერდის გამართული მუშაობისთვის, მათ შორის:","c1i1":"მომხმარებლის ავტორიზაციის სესიის Cookie","c1i2":"უსაფრთხოების და CSRF დაცვის Cookie","c2h":"2. Google Places API (მისამართის ავტომატური შევსება)","c2p1":"მისამართის შეყვანისას თქვენ მიერ აკრეფილი ტექსტი იგზავნება Google Places API-ზე ავტომატური შევსების შეთავაზებების გენერირებისთვის. ამ მოთხოვნის ფარგლებში Google-ს ასევე გადაეცემა თქვენი IP მისამართი.","c2p2pre":"ეს სერვისი","c2p2strong":"არ","c2p2mid":"ადგენს Cookie-ებს. იგი გამოიყენება მხოლოდ მისამართის შეყვანის დასახმარებლად და ექვემდებარება","googlePrivacyDat":"Google-ის კონფიდენციალურობის პოლიტიკას","googlePrivacyNom":"Google-ის კონფიდენციალურობის პოლიტიკა","c3h":"3. Google reCAPTCHA","c3p1":"ეს საიტი იყენებს Google reCAPTCHA-ს ბოტებისა და სპამისგან დასაცავად. reCAPTCHA სკრიპტი ადგენს შემდეგ Cookie-ს:","thCookie":"Cookie","thPurpose":"დანიშნულება","thExpiry":"ვადა","grecaptchaPurpose":"განასხვავებს ადამიანებს ბოტებისგან","sixMonths":"6 თვე","c3p2pre":"მისი გამოყენება ექვემდებარება","c4h":"4. Google Analytics (GA4)","c4p1":"ჩვენ ვიყენებთ Google Analytics GA4-ს იმის გასაგებად, თუ როგორ სარგებლობენ ვიზიტორები ჩვენი ვებგვერდით (ნანახი გვერდები, სესიის ხანგრძლივობა, ტრაფიკის წყარო). ეს მონაცემები ანონიმიზებულია და გამოიყენება მხოლოდ ჩვენი ვებგვერდის გასაუმჯობესებლად.","c4p2":"Google Analytics ადგენს შემდეგ Cookie-ებს:","gaPurpose":"განასხვავებს მომხმარებლებს","gaSessionPurpose":"ინარჩუნებს სესიის მდგომარეობას","twoYears":"2 წელი","twentyFourHours":"24 საათი","c4p3pre":"დამატებითი ინფორმაციისთვის იხილეთ","c4p3mid":". შეგიძლიათ უარი თქვათ","gaOptOut":"Google Analytics-ის გამორთვის გაფართოების","c4p3post":"საშუალებით.","manageH":"Cookie მართვა","manageP1":"თქვენ შეგიძლიათ აკონტროლოთ ან გამორთოთ Cookie თქვენი ბრაუზერის პარამეტრებიდან. თუმცა, აუცილებელი Cookie გამორთვამ შესაძლოა ხელი შეუშალოს ვებგვერდის ფუნქციონირებას.","manageP2":"Cookie მართვის შესახებ ინფორმაციისთვის იხილეთ თქვენი ბრაუზერის დახმარების განყოფილება.","c2p2":"ეს სერვისი {strong} ადგენს Cookie-ებს. იგი გამოიყენება მხოლოდ მისამართის შეყვანის დასახმარებლად და ექვემდებარება {link}.","c3p2":"მისი გამოყენება ექვემდებარება {link}.","c4p3":"დამატებითი ინფორმაციისთვის იხილეთ {link}. შეგიძლიათ უარი თქვათ {link2} საშუალებით."},"privacy":{"title":"კონფიდენციალურობის პოლიტიკა","contactCompany":"შპს Sonniva Georgia","contactEmailLabel":"ელ. ფოსტა:","contactWebLabel":"ვებგვერდი:","sections":[{"h":"1. ზოგადი ინფორმაცია","body":["შპს Sonniva Georgia-სთვის მნიშვნელოვანია მომხმარებელთა პერსონალური მონაცემების დაცვა და კონფიდენციალურობის უზრუნველყოფა. ჩვენ ვალდებულებას ვიღებთ, რომ თქვენი პერსონალური ინფორმაცია დამუშავდეს კანონმდებლობის მოთხოვნების, სამართლიანობის, გამჭვირვალობისა და უსაფრთხოების პრინციპების დაცვით.","წინამდებარე კონფიდენციალურობის პოლიტიკა განმარტავს, თუ რა ტიპის ინფორმაციას ვაგროვებთ, რა მიზნით ვიყენებთ მას, როგორ ვიცავთ თქვენს მონაცემებს და რა უფლებები გაქვთ თქვენ, როგორც მონაცემთა სუბიექტს.","ეს პოლიტიკა ვრცელდება Sonniva Georgia-ს ვებგვერდზე, ონლაინ პლატფორმებზე, სოციალური მედიის არხებზე, ფიზიკურ მაღაზიებში და ყველა იმ სერვისზე, რომელსაც კომპანია მომხმარებლებს სთავაზობს."]},{"h":"2. რა მონაცემებს ვაგროვებთ","intro":"კომპანიასთან ურთიერთობისას შესაძლოა შევაგროვოთ შემდეგი ინფორმაცია:","items":["სახელი და გვარი;","პირადი ან საიდენტიფიკაციო ნომერი (საჭიროების შემთხვევაში);","მობილური ტელეფონის ნომერი;","ელექტრონული ფოსტის მისამართი;","მიწოდების ან იურიდიული მისამართი;","კომპანიის დასახელება და საიდენტიფიკაციო კოდი;","შეკვეთების, გადახდებისა და მიწოდების ისტორია;","კომუნიკაციის ჩანაწერები;","ვებგვერდის გამოყენებასთან დაკავშირებული ტექნიკური ინფორმაცია;","IP მისამართი, მოწყობილობის ტიპი და ბრაუზერის მონაცემები;","Cookies და მსგავსი ტექნოლოგიებით მიღებული ინფორმაცია."]},{"h":"3. მონაცემების დამუშავების მიზნები","intro":"მონაცემების შეგროვება და დამუშავება ხორციელდება შემდეგი მიზნებით:","items":["შეკვეთების მიღება, დამუშავება და შესრულება;","პროდუქციის მიწოდების ორგანიზება;","საგარანტიო და შემდგომი მომსახურების უზრუნველყოფა;","მომხმარებელთა მხარდაჭერის გაწევა;","ანგარიშფაქტურებისა და სხვა ფინანსური დოკუმენტების მომზადება;","მომსახურების ხარისხის გაუმჯობესება;","სტატისტიკური და ანალიტიკური მონაცემების დამუშავება;","უსაფრთხოების უზრუნველყოფა და თაღლითური ქმედებების პრევენცია;","მარკეტინგული შეთავაზებებისა და სიახლეების გაზიარება მომხმარებლის თანხმობის შემთხვევაში;","კანონმდებლობით გათვალისწინებული ვალდებულებების შესრულება."]},{"h":"4. მონაცემების შენახვის ვადა","body":["Sonniva Georgia ინახავს პერსონალურ მონაცემებს მხოლოდ იმ ვადით, რაც აუცილებელია მომსახურების გაწევის, ბიზნეს პროცესების მართვისა და კანონმდებლობით გათვალისწინებული მოთხოვნების შესასრულებლად.","შენახვის ვადის გასვლის შემდეგ მონაცემები იშლება, ან ხდება მათი ანონიმიზაცია ისე, რომ პირის იდენტიფიცირება აღარ იყოს შესაძლებელი."]},{"h":"5. ვის შეიძლება გადაეცეს ინფორმაცია","intro":"თქვენი მონაცემები შეიძლება გადაეცეს მხოლოდ იმ პირებსა და ორგანიზაციებს, რომლებიც აუცილებელია მომსახურების სრულფასოვნად მიწოდებისთვის, მათ შორის:","items":["საკურიერო და სატრანსპორტო კომპანიებს;","გადახდის მომსახურების პროვაიდერებს;","პროგრამულ და ტექნოლოგიურ პარტნიორებს;","ბუღალტრულ და იურიდიულ მომსახურების მიმწოდებლებს;","სახელმწიფო ორგანოებს კანონით გათვალისწინებულ შემთხვევებში."],"outro":"კომპანია არ ყიდის, არ აქირავებს და არ გადასცემს მომხმარებელთა პერსონალურ მონაცემებს მესამე პირებს კომერციული მიზნებისთვის."},{"h":"6. მონაცემთა უსაფრთხოება","body":["ჩვენ ვიყენებთ თანამედროვე ტექნიკურ და ორგანიზაციულ მექანიზმებს თქვენი ინფორმაციის დასაცავად. უსაფრთხოების ზომები მოიცავს მონაცემთა დაცვას არასანქცირებული წვდომის, შეცვლის, დაკარგვის, განადგურებისა და უკანონო გამოყენებისგან.","მიუხედავად ამისა, ინტერნეტის საშუალებით მონაცემთა გადაცემის არცერთი მეთოდი არ არის სრულად დაცული, რის გამოც აბსოლუტური უსაფრთხოების გარანტია ვერ იქნება უზრუნველყოფილი."]},{"h":"7. Cookies-ის გამოყენება","intro":"ჩვენი ვებგვერდი იყენებს Cookies-სა და მსგავს ტექნოლოგიებს, რათა:","items":["უზრუნველყოს საიტის გამართული მუშაობა;","დაიმახსოვროს მომხმარებლის პარამეტრები;","გააანალიზოს ვიზიტორების ქცევა;","გააუმჯობესოს მომხმარებლის გამოცდილება;","შესთავაზოს უფრო შესაბამისი ინფორმაცია და შეთავაზებები."],"outro":"მომხმარებელს შეუძლია Cookies-ის მართვა ან გამორთვა საკუთარი ბრაუზერის პარამეტრებიდან."},{"h":"8. მომხმარებლის უფლებები","intro":"თქვენ გაქვთ უფლება:","items":["მიიღოთ ინფორმაცია თქვენს შესახებ დამუშავებული მონაცემების შესახებ;","მოითხოვოთ მონაცემების შესწორება ან განახლება;","მოითხოვოთ მონაცემების წაშლა კანონით დაშვებულ ფარგლებში;","შეზღუდოთ მონაცემთა დამუშავება;","გააუქმოთ თანხმობა, თუ დამუშავება ეფუძნება თანხმობას;","მიმართოთ შესაბამის საზედამხედველო ორგანოს, თუ ფიქრობთ, რომ თქვენი უფლებები დაირღვა."]},{"h":"9. მესამე მხარის ბმულები","body":["ჩვენს ვებგვერდზე შესაძლოა განთავსებული იყოს ბმულები სხვა ვებგვერდებზე. Sonniva Georgia არ არის პასუხისმგებელი აღნიშნული ვებგვერდების კონფიდენციალურობის პოლიტიკაზე ან მათ შინაარსზე. გირჩევთ, გაეცნოთ თითოეული ვებგვერდის შესაბამის წესებს."]},{"h":"10. პოლიტიკის განახლება","body":["კომპანია უფლებას იტოვებს პერიოდულად განაახლოს ან შეცვალოს აღნიშნული პოლიტიკა. განახლებული ვერსია გამოქვეყნდება ვებგვერდზე და ძალაში შევა გამოქვეყნების მომენტიდან."]},{"h":"11. საკონტაქტო ინფორმაცია","intro":"თუ გაქვთ შეკითხვები, შენიშვნები ან მოთხოვნები პერსონალური მონაცემების დამუშავებასთან დაკავშირებით, დაგვიკავშირდით:","outro":"ჩვენთვის მნიშვნელოვანია თქვენი ნდობა და ვცდილობთ უზრუნველვყოთ თქვენი პერსონალური მონაცემების მაქსიმალური დაცვა და უსაფრთხოება."}]},"terms":{"title":"მომსახურების პირობები","paymentH":"გადახდის მეთოდები","payCardH":"ბარათით გადახდა","payCardIntro":"ონლაინ გადახდისთვის შეგიძლიათ გამოიყენოთ ნებისმიერი საერთაშორისო საბანკო ბარათი:","payCardOutro":"გადახდა ხორციელდება უსაფრთხო ელექტრონული გადახდის სისტემის მეშვეობით.","payTransferH":"საბანკო გადარიცხვა","payTransferP1":"გადახდა შესაძლებელია ინვოისის საფუძველზე საბანკო გადარიცხვით.","payTransferP2":"აღნიშნული მეთოდი ხელმისაწვდომია როგორც ფიზიკური, ასევე იურიდიული პირებისთვის.","payContractH":"გადახდა ხელშეკრულების საფუძველზე","payContractP":"იურიდიულ პირებს ვთავაზობთ თანამშრომლობის ინდივიდუალურ პირობებს.","deliveryH":"მიწოდების პირობები","delFreeH":"უფასო მიწოდება","delFreeP":"500 ლარის ან მეტი ღირებულების შეკვეთებზე თბილისში მოქმედებს უფასო მიწოდების სერვისი.","delRegionsH":"რეგიონებში მიწოდება","delRegionsP":"რეგიონებში შეკვეთების მიწოდების ვადაა მაქსიმუმ 5 სამუშაო დღე.","delZonesH":"მიწოდების ღირებულება თბილისის მასშტაბით ფილიალიდან","zone1":"I ზონა – 5-40 ლარი","zone2":"II ზონა – 5-50 ლარი","zone3":"III ზონა – 5-60 ლარი","zone1Items":["გლდანი","გლდანულა","სოფელი გლდანი","ზაჰესი","ავჭალა","თემქა","მუხიანი","დიღომი","დიღმის მასივი","დიდი დიღომი","სოფელი დიღომი"],"zone2Items":["ვაკე","საბურთალო","ბაგები","ლისი","ვაშლიჯვარი","ორთაჭალა","მთაწმინდა","სოლოლაკი","ვერა","დიდუბე","ჩუღურეთი","ნაძალადევი"],"zone3Items":["ისანი","სამგორი","ლილო","ორხევი","აეროპორტის დასახლება","ქვემო ფონიჭალა","ზემო ფონიჭალა","ვარკეთილი","წყნეთი","კოჯორი","ტაბახმელა","წავკისი","შინდისი","ოქროყანა","ნაფეტვრები"],"delAdditionalH":"დამატებითი პირობები","delAdditionalItems":["ჰიპერმარკეტებიდან უფასო მიწოდების სერვისი მოქმედებს მხოლოდ იმ შემთხვევაში, თუ შეკვეთის ჯამური ღირებულება აღემატება 1500 ლარს.","მიტანის სერვისი მოიცავს პროდუქციის ტრანსპორტირებას დანიშნულების მისამართამდე. მომსახურებაში არ შედის პროდუქციის მანქანიდან ჩამოტვირთვა, შენობაში შეტანა ან სართულზე ატანა.","ონლაინ შეძენილი პროდუქციის ტრანსპორტირების ღირებულება გამოითვლება ავტომატურად შეკვეთის დასრულებისას, მიწოდების მეთოდის არჩევის შემდეგ."],"delFormulaItemPre":"გაბარიტული ამანათების შემთხვევაში ტრანსპორტირების საფასური შეიძლება გამოითვალოს მოცულობითი წონის მიხედვით. თუ მოცულობითი წონა აღემატება ფიზიკურ წონას, გამოიყენება შემდეგი ფორმულა:","delFormula":"სიგრძე (სმ) × სიგანე (სმ) × სიმაღლე (სმ) ÷ 5000","delMaxLengthItem":"ჩვენ ვუზრუნველყოფთ იმ პროდუქციის მიწოდებას, რომლის სიგრძე არ აღემატება 4 მეტრს.","delContactNote":"დამატებითი ინფორმაციის მისაღებად გთხოვთ დაგვიკავშირდეთ.","returnsH":"დაბრუნება, გადაცვლა, შენახვის პირობები და საგარანტიო მომსახურება","warrantyH":"საგარანტიო მომსახურება","warrantyP1":"საგარანტიო მომსახურება ვრცელდება მხოლოდ იმ პროდუქციაზე, რომელსაც თან ახლავს ოფიციალური საგარანტიო ტალონი.","warrantyP2":"საგარანტიო ტალონი მომხმარებელს გადაეცემა პროდუქციის შეძენის მომენტში.","warrantyIntro":"გთხოვთ გაითვალისწინოთ, რომ საგარანტიო პირობები არ ვრცელდება იმ დაზიანებებზე, რომლებიც გამოწვეულია:","warrantyItems":["მექანიკური ზემოქმედებით;","არასწორი მონტაჟით ან ექსპლუატაციით;","დაუდევრობით ან არამიზნობრივი გამოყენებით;","ბუნებრივი ცვეთით;","მწარმოებლის ინსტრუქციების დარღვევით."],"warrantyOutro":"ზოგიერთ პროდუქციაზე საგარანტიო მომსახურება შესაძლოა არ ვრცელდებოდეს ან ჰქონდეს განსხვავებული პირობები, რაც მითითებული იქნება კონკრეტული პროდუქტის აღწერაში ან საგარანტიო დოკუმენტაციაში.","exchangeH":"პროდუქციის გადაცვლა","exchangeIntro":"Sonniva Georgia უზრუნველყოფს პროდუქციის გადაცვლას შემდეგ შემთხვევებში:","exchangeItems":["პროდუქციას აქვს ქარხნული წუნი (მექანიკური დაზიანების გარდა);","შეკვეთის დამუშავების ან გაცემის პროცესში მოხდა შეცდომა და მომხმარებელმა მიიღო არასწორი მოდელი, ზომა, ფერი ან მახასიათებლების მქონე პროდუქცია;","მომხმარებელს სურს პროდუქციის გადაცვლა სხვა ანალოგიურ მოდელში პროდუქციის მიღებიდან 14 კალენდარული დღის განმავლობაში."],"exchangeOutro":"გადაცვლის მიზნით მომხმარებელმა უნდა მიმართოს იმ ფილიალს, სადაც განხორციელდა შეძენა, ან დაუკავშირდეს კომპანიის წარმომადგენელს.","returnH":"პროდუქციის დაბრუნება","returnIntro":"მომხმარებელს უფლება აქვს დააბრუნოს შეძენილი პროდუქცია შეძენიდან 14 კალენდარული დღის განმავლობაში, თუ დაცულია შემდეგი პირობები:","returnItems":["პროდუქცია არ არის გამოყენებული;","შენარჩუნებულია პროდუქტის პირვანდელი მდგომარეობა;","არ არის დაზიანებული შეფუთვა;","შენარჩუნებულია ქარხნული იარლიყები, სტიკერები და დამცავი ელემენტები;","პროდუქციას არ აღენიშნება ექსპლუატაციის ან მექანიკური დაზიანების კვალი."],"returnOutro":"კომპანია იტოვებს უფლებას უარი თქვას დაბრუნებაზე, თუ პროდუქცია არ აკმაყოფილებს ზემოთ ჩამოთვლილ პირობებს.","storageH":"შეკვეთის შენახვის პირობები","storageP1":"იმ შემთხვევაში, თუ მომხმარებელმა შეკვეთის გაფორმებისას აირჩია თვითგატანის სერვისი და შეკვეთა სრულად არის გადახდილი, კომპანია უზრუნველყოფს პროდუქციის შენახვას 5 სამუშაო დღის განმავლობაში.","storageIntro":"თუ აღნიშნულ ვადაში მომხმარებელი არ გამოცხადდება შეკვეთის გასატანად და წინასწარ არ შეათანხმებს შენახვის ვადის გაგრძელებას, Sonniva Georgia უფლებას იტოვებს:","storageItems":["გააუქმოს შეკვეთა;","დააბრუნოს პროდუქცია საწყობის მარაგში;","საჭიროების შემთხვევაში დააკისროს დამატებითი შენახვის საფასური."]},"delivery":{"title":"მიწოდების ტარიფები","headerSubtitle":"ყველა მიწოდების ვარიანტი და მათი ფასები ერთ გვერდზე","methodOfficeTitle":"სონნივას ფილიალიდან გატანა","methodOfficeSubtitle":"ავჭალა — შუშის ქუჩა 38","methodTbilisiTitle":"მიწოდება თბილისში","methodTbilisiSubtitle":"ზონის მიხედვით","methodRegionsTitle":"მიწოდება რეგიონებში","methodRegionsSubtitle":"წონისა და ტიპის მიხედვით","free":"უფასო","officeSectionTitle":"სონნივას ფილიალიდან გატანა","officeFullyFree":"სრულიად უფასო","avchalaAddress":"ავჭალა, შუშის ქუჩა 38","didubeAddress":"დიდუბე, ზაირა კიკვიძის 6","hours":"ორშაბათი–პარასკევი, 09:00–18:00","mapLinkText":"მისამართის სანახავად დააჭირეთ ლინკს","tbilisiSectionTitle":"მიწოდება თბილისში","tbilisiPriceByZone":"ფასი განისაზღვრება ზონის მიხედვით","freeThreshold":"{amount}-ზე მეტი შეკვეთისას — თბილისში მიწოდება {free}","freeThresholdWord":"უფასოა","zone1":"I ზონა","zone2":"II ზონა","zone3":"III ზონა","regionsSectionTitle":"მიწოდება რეგიონებში","regionsPriceByWeightType":"ფასი განისაზღვრება წონისა და ტიპის მიხედვით","legendOnwayTitle":"OnWay ფილიალი","legendOnwaySub":"ფილიალიდან გატანა","legendCityTitle":"ქალაქი/რაიონი","legendCitySub":"ადგილზე მიტანა","legendVillageTitle":"სოფელი","legendVillageSub":"სოფელში მიტანა","thWeight":"წონა","weightRange":"{from} – {to} კგ"}}');
const promo$3 = { "doorsTitle": "მემბრანული კარები", "doorsText": "შეუკვეთეთ მემბრანული კარები თქვენთვის სასურველ ზომებში და ფერებში", "framesTitle": "ალუმინის ჩარჩოები", "framesText": "ჩვენ ვამზადებთ ალუმინის ჩარჩოებს თქვენთვის სასურველ ზომებში" };
const quickView$3 = { "orderNow": "შეუკვეთე ახლავე" };
const sales$3 = { "title": "ფასდაკლებები", "metaDescription": "იხილეთ Sonniva-ს ფასდაკლებული პროდუქცია", "limitedTime": "შეზღუდული დროით", "heading": "ფასდაკლებები", "subheading": "აღმოაჩინეთ პროდუქცია საუკეთესო ფასებში.", "empty": "ამჟამად ფასდაკლებული პროდუქცია არ არის" };
const search$3 = { "foundCount": "სულ მოიძებნა {count} პროდუქტი", "noResults": 'პროდუქტი დასახელებით "{query}" — არ მოიძებნა', "tryAnother": "სცადეთ სხვა საძიებო სიტყვა", "pack": "შეკვრა", "wishlist": "სურვილების სია", "quickView": "სწრაფი დათვალიერება", "showMore": "მაჩვენე უფრო მეტი", "titleWithQuery": "ძიება: {query}", "filter": "ფილტრი", "price": "ფასი", "min": "მინ.", "max": "მაქს.", "stock": "მარაგი" };
const seo$3 = { "homeDescription": "Sonniva - ავეჯის ფიტინგები, სახელურები, სასრიალოები და სამშენებლო მასალები. საუკეთესო ხარისხი და ფასები საქართველოში.", "aboutTitle": "ჩვენს შესახებ", "aboutDescription": "გაიგეთ მეტი Sonniva-ს შესახებ - ავეჯის ფიტინგებისა და სამშენებლო მასალების წამყვანი მომწოდებელი საქართველოში." };
const share$3 = { "share": "გაზიარება", "shareHeading": "გააზიარეთ", "copyLink": "ბმულის კოპირება", "copied": "დაკოპირდა!" };
const stockNotify$3 = { "notifyWhenBack": "შემატყობინეთ როცა შეივსება", "enabled": "შეტყობინება ჩართულია", "backSmsNote": "მარაგი როგორც კი შეივსება, მიიღებთ შეტყობინებას SMS-ის სახით.", "loginRequired": "საჭიროა ავტორიზაცია", "loginRequiredText": "შეტყობინების გამოსაწერად გთხოვთ გაიაროთ ავტორიზაცია.", "subscribeTitle": "გამოიწერეთ შეტყობინება", "subscribeText": "გსურთ მიიღოთ SMS შეტყობინება მარაგის შევსებისთანავე?" };
const whatsapp$3 = { "requestOrder": "მოითხოვე შეკვეთა", "redirectText": "გადაგამისამართებთ ჩვენს WhatsApp გვერდზე, სადაც შეგიძლიათ მოგვწეროთ ან დაგვირეკოთ შესაკვეთად." };
const wishlist$3 = { "title": "სურვილების სია", "savedOne": "პროდუქტია შენახული", "savedMany": "შენახული", "emptyHeading": "თქვენი სურვილების სია ცარიელია", "emptyText": "შეინახე ის რაც მოგწონს და დაუბრუნდი ნებისმიერ დროს." };
const ka = {
  account: account$3,
  auth: auth$3,
  cart: cart$3,
  catalog: catalog$3,
  checkout: checkout$3,
  common: common$3,
  customerPicker: customerPicker$3,
  error: error$3,
  footer: footer$3,
  gallery: gallery$3,
  item: item$3,
  nav: nav$3,
  orders: orders$3,
  payment: payment$3,
  places: places$3,
  pol: pol$3,
  promo: promo$3,
  quickView: quickView$3,
  sales: sales$3,
  search: search$3,
  seo: seo$3,
  share: share$3,
  stockNotify: stockNotify$3,
  whatsapp: whatsapp$3,
  wishlist: wishlist$3
};
const account$2 = { "settingsTitle": "Settings", "profile": "Profile", "security": "Security", "firstName": "First name", "lastName": "Last name", "phone": "Phone", "email": "Email", "address": "Address", "userType": "Account type", "taxId": "Identification number", "idNumber": "Personal ID number", "changePassword": "Change password", "currentPassword": "Current password", "newPassword": "New password", "repeatNewPassword": "Repeat new password" };
const auth$2 = { "loginTitle": "Sign in", "loginHeading": "Sign in", "emailOrPhone": "Email or phone", "password": "Password", "rememberMe": "Remember me", "forgotPassword": "Forgot your password?", "signIn": "Sign in", "noAccount": "Don't have an account?", "registerNow": "Register", "registerTitle": "Register", "registerHeading": "Register", "individual": "Individual", "legalEntity": "Legal entity", "notGeorgianCitizen": "Tick this if you are not a Georgian citizen", "nonResident": "I am a non-resident", "firstName": "First name", "companyName": "Company name", "lastName": "Last name", "phone": "Phone", "personalId": "Personal ID number", "identificationNumber": "Identification number", "email": "Email", "repeatPassword": "Repeat password", "entrepreneurNote": "If you hold small-business status or are a legal entity, contact us to receive special offers", "confirm": "Confirm", "alreadyRegistered": "Already registered?", "forgotTitle": "Forgot password", "forgotHint": "Enter the phone number you registered with", "resetTitle": "Change password", "newPassword": "New password", "repeatNewPassword": "Repeat new password", "verifyPhoneTitle": "Phone verification", "enterSixDigitCode": "Enter the 6-digit code", "resendCode": "Resend", "currentPassword": "Current password" };
const cart$2 = { "wholesaleDiscount": "Wholesale discount", "vipDiscount": "VIP discount", "title": "Cart", "productCount": "{count} products", "emptyHeading": "Your cart is empty", "emptyText": "Add products to the cart and then continue to checkout.", "selectAll": "Select all", "selectedCount": "{count} selected", "rowTotal": "Total:", "vipSavings": "VIP saving:", "savings": "Saving:", "availableQty": "Available quantity: {count}", "setupService": "Installation service", "orderSummary": "Order summary", "totalSavings": "Total saving", "checkout": "Place order", "securePayment": "Secure payment" };
const catalog$2 = { "metaSuffix": "See Sonniva's full catalogue", "categories": "Categories" };
const checkout$2 = { "cartEmptyDetail": "All products have been removed from the checkout page", "inventoryCheckFailed": "The stock check could not be completed", "zonesLoadFailed": "The zones could not be loaded. Please refresh the page and try again.", "genericError": "An error occurred", "noBankResponse": "We did not receive a response from the bank", "deliveryOffice": "Pickup from a Sonniva branch", "deliveryTbilisi": "Delivery within Tbilisi", "deliveryRegions": "Delivery to the regions", "regionOnwayOffice": "Pickup from an OnWay branch", "regionAddress": "Delivery to the address", "avchalaAddress": "38 Shushi St. — Mon–Fri 09:00–18:00", "didubeAddress": "6 Zaira Kikvidze St. — Mon–Fri 09:00–18:00", "zone1Label": "Zone I – 5-40 ₾", "zone2Label": "Zone II – 5-50 ₾", "zone3Label": "Zone III – 5-60 ₾", "providerPcb": "PCB Bank", "providerBog": "BOG Bank", "providerTbc": "TBC Bank", "providerInvoice": "Bank transfer", "providerLimit": "Pay on credit limit", "providerCash": "Pay in cash", "errDeliveryType": "Please choose a delivery type", "errTbilisiZone": "Please choose a Tbilisi zone", "errRegionOption": "Please choose a delivery option", "errOnwayBranch": "Please choose an OnWay branch", "errRegionZone": "Please choose a city / village", "errOfficeBranch": "Please choose a branch", "errAddress": "Please enter a delivery address", "errProvider": "Please choose a payment method", "errAgreement": "Please agree to the terms and conditions", "fixMarkedFields": "Please correct the highlighted fields before continuing", "backToCart": "Back to cart", "title": "Checkout", "deliveryTypeHeading": "Delivery type", "requiredField": "Required field", "free": "Free", "freeParen": "(free)", "deliveryAddressHeading": "Delivery address", "chooseOnwayBranch": "Choose an OnWay branch", "choose": "Choose", "chooseCityDistrictVillage": "Choose a city / district / village", "notFound": "Not found", "chooseZone": "Choose a zone", "orderOver500FreeTbilisi": "The order is over 500 ₾ — delivery within Tbilisi is free", "streetNumberOptional": "Street number (optional)", "pickupPoint": "Pickup point", "clickLinkForAddress": "Click the link to see the address", "checkingBranchInventory": "Checking stock at the selected branch...", "insufficientBranchQty": "Not enough of the product at the selected branch", "commentHeading": "Comment", "commentPlaceholder": "Special requests, notes...", "paymentMethodHeading": "Payment method", "checkingLimit": "Checking the credit limit...", "noLimitDefined": "You do not have a defined credit limit. Contact us if you are interested.", "insufficientLimit": "Insufficient limit!", "limit": "Limit", "used": "Used", "available": "Available", "amountDue": "Amount due", "orderSummary": "Order summary", "setupService": "Installation service", "remove": "Remove", "totalSavings": "Total saving", "delivery": "Delivery", "agree": "I agree to the", "termsAndConditions": "terms and conditions", "processing": "Processing...", "payAmount": "Pay — ", "securePaymentSsl": "Secure payment with SSL encryption", "insufficientBranchStockTitle": "Insufficient stock at the selected branch", "insufficientBranchStockText": "There is not enough stock of the following products at the selected branch. Please change the branch or the quantity:", "inStockShort": "In stock:", "desiredShort": "Wanted:", "understood": "Got it" };
const common$2 = { "search": "Search", "searchPlaceholder": "Search for what you need...", "searchShort": "What are you looking for?", "addToCart": "Add to cart", "inStock": "In stock", "outOfStock": "Out of stock", "viewAll": "View all", "loading": "Loading...", "back": "Back", "cancel": "Cancel", "confirm": "Confirm", "save": "Save", "delete": "Delete", "edit": "Edit", "close": "Close", "more": "More", "pack": "Pack", "clear": "Clear", "currency": "₾", "pleaseWait": "Please wait...", "continue": "Continue", "submit": "Submit", "goToHome": "Go to home", "orderNumber": "Order number", "backToHome": "Back to home", "startShopping": "Start shopping", "continueShopping": "Continue shopping", "total": "Total", "all": "All", "searchDots": "Search...", "yes": "Yes", "no": "No", "goTo": "Go", "view": "View", "viewDetails": "View details" };
const customerPicker$2 = { "edit": "Edit", "remove": "Remove", "selectCustomer": "Select a customer", "selectCustomerHint": "Choose the customer you want to place the order on behalf of", "searchPlaceholder": "Name, phone, email or identification code…", "recentlyAdded": "Recently added", "searchResults": "Search results", "noCustomerFound": "No customer found.", "noRecentCustomers": "No recent customers.", "addNewCustomer": "Add a new customer", "firstName": "First name", "lastName": "Last name", "mobile": "Mobile", "email": "Email", "idCode": "Identification code", "idCodePlaceholder": "Personal / ID code", "address": "Address", "addressPlaceholder": "Street, city…", "saveAndSelect": "Save and select" };
const error$2 = { "notFound": "Sorry, the page you are looking for could not be found.", "forbidden": "Sorry, you are not authorized to access this page.", "server": "Something went wrong on our end. Please try again later.", "maintenance": "We are down for maintenance. Please check back soon.", "unexpected": "An unexpected error occurred." };
const footer$2 = { "rightsReserved": "All rights reserved.", "termsOfService": "Terms of Service", "privacyPolicy": "Privacy Policy", "cookiePolicy": "Cookie Policy", "workingHours": "Monday–Friday, 09:00–18:00", "faq": "Frequently asked questions" };
const gallery$2 = { "noImage": "No image" };
const item$2 = { "notifyRestock": "Get notified when it's back in stock", "noProducts": "No products found", "maxQty": "Maximum order quantity is {count}", "similarProducts": "Similar products", "copyCode": "Copy the product code", "copyName": "Copy the product name", "branchAvchala": "Avchala branch", "branchDidube": "Didube branch", "wholesale": "Wholesale", "pack": "Pack", "retail": "Retail", "priceAppliesFrom": "Price applies from", "perPackPurchase": "packs purchased", "perUnitPurchase": "units purchased", "packPrice": "Pack price", "unitPrice": "Unit price", "choosePack": "Choose a pack", "setupService": "Installation service", "buyNow": "Buy now", "delivery": "Delivery", "deliverySelfPickup": "Self-pickup from the office:", "deliverySelfPickupText": "Free. Pickup point", "onMap": "on the map", "deliveryTbilisi": "Delivery within Tbilisi: free on orders over 500 ₾", "deliveryRegions": "Delivery to the regions:", "seeDeliveryRates": "see the delivery rates", "deliveryUnloadNote": "The delivery service does not include unloading the goods from the vehicle or carrying them upstairs.", "paymentMethods": "Payment methods", "paymentCards": "By card — Visa, MasterCard, loyalty points", "paymentBankTransfer": "By bank transfer", "specifications": "Specifications", "descriptionTab": "Description", "noSpecifications": "No specifications provided.", "noDescription": "No description provided." };
const nav$2 = { "chooseCategory": "Choose a category", "catalog": "Catalogue", "sales": "Deals", "myOrders": "My orders", "myAccount": "My account", "adminPanel": "Admin panel", "favorites": "Wishlist", "aboutUs": "About us", "deliveryRates": "Delivery rates", "termsOfService": "Terms of Service", "privacyPolicy": "Privacy", "cookiePolicy": "Cookie Policy", "contactUs": "Contact us", "home": "Home", "signIn": "Sign in", "signOut": "Sign out" };
const orders$2 = { "title": "My orders", "trackingBanner": "To see the order status and delivery information, go to the website and enter the tracking number.", "checkStatus": "Check status", "orderCount": "{count} orders", "totalAmount": "Total amount", "orderNo": "Order no.", "noProducts": "No products found", "date": "Date", "trackingNumber": "Tracking number", "details": "Details", "reorder": "Reorder", "noOrders": "No orders found.", "loadError": "The order could not be loaded.", "errorSummary": "Error", "detailTitle": "Order details", "orderHash": "Order #{no}", "reorderTitle": "Reorder #{no}", "delivery": "Delivery", "deliveryLine": "Delivery:", "trackingLine": "Tracking number:", "payment": "Payment", "paymentMethod": "Payment method", "paymentStatus": "Payment status", "transactionId": "Transaction ID", "comment": "Comment", "products": "Products", "setupServiceLine": "Installation service —", "unitPrice": "Unit price", "unitPriceShort": "Unit price", "wholesale": "Wholesale", "subtotal": "Subtotal", "wholesaleDiscount": "Wholesale discount", "downloadInvoice": "Download invoice", "status": { "awaitingPayment": "Awaiting payment", "pending": "Unconfirmed", "paid": "Paid", "ready": "Ready", "dispatched": "Dispatched", "delivered": "Delivered", "cancelled": "Declined", "cancelledAlt": "Cancelled", "limit": "Credit limit" }, "paymentStatusLabels": { "pending": "Pending", "processing": "Processing", "completed": "Completed", "failed": "Failed", "cancelled": "Cancelled" }, "deliveryTypes": { "office": "Pickup from office", "tbilisi": "Tbilisi", "regions": "Regions" }, "providers": { "invoice": "Invoice", "cash": "Cash" } };
const payment$2 = { "successTitle": "Payment completed successfully", "confirmationEmailSent": "A confirmation email has been sent to your address.", "cancelTitle": "Payment declined", "cancelText": "The payment could not be processed. Try again or choose another method.", "tryAgain": "Try again", "invoiceSentTitle": "Invoice sent", "invoiceSentText": "The invoice has been sent to your email", "invoiceNumber": "Invoice number", "checkEmailForPdf": "Check your email for the PDF invoice", "checkSpam": "If you haven't received it, check your spam folder", "limitOrderTitle": "Order placed", "limitOrderText": "The order was placed successfully on credit-limit terms" };
const places$2 = { "exactAddress": "Exact address", "requiredField": "Required field", "pickFromList": "Choose the matching address from the list below", "addressPlaceholder": "Address" };
const pol$2 = /* @__PURE__ */ JSON.parse(`{"about":{"title":"About us","p1":"Sonniva Georgia has been operating successfully on the Georgian market since 2014, offering customers a wide range of furniture fittings, aluminium profiles and railing components, glass and shower-enclosure fittings, hand tools, power tools and hardware.","p2":"The company's main goal is to offer customers high-quality products, modern solutions and professional service that fully meet the needs of both individual customers and the business sector.","p3":"Over the years, Sonniva Georgia has become a trusted partner for furniture manufacturers, designers, builders and tradespeople. Our range brings together products from the world's leading brands, allowing us to offer customers the best combination of quality, functionality and innovation.","p4":"The company pays particular attention to service quality, the constant renewal of its product range and the adoption of modern technology. It is on this approach that we built our online platforms, which let customers obtain the products and services they need easily and quickly.","p5":"Beyond its retail activity, Sonniva Georgia offers customers the custom manufacture, cutting and assembly of aluminium doors and frames. Our team ensures the quality execution of each project, along with technical support and professional consultation.","p6":"Today Sonniva Georgia continues to grow, expanding its product range and creating new opportunities for customers!","tagline":"Sonniva Georgia — quality, innovation and reliable partnership in one place."},"cookie":{"title":"Cookie Policy","lastUpdated":"Last updated: July 2026","intro":"This Cookie Policy explains how we use cookies and similar technologies on our website. We use only those cookies that are needed for the site to work properly, for security and for usage analysis.","whatH":"What is a cookie?","whatP":"A cookie is a small text file stored in your browser so that the website works properly, improves its performance or provides the best browsing experience.","useH":"What we use cookies for","c1h":"1. Essential cookies","c1p":"These cookies are needed for the website to work properly, including:","c1i1":"user authentication session cookie","c1i2":"security and CSRF protection cookie","c2h":"2. Google Places API (address autocomplete)","c2p1":"When you enter an address, the text you type is sent to the Google Places API to generate autocomplete suggestions. As part of this request, your IP address is also passed to Google.","c2p2pre":"This service does","c2p2strong":"not","c2p2mid":"set cookies. It is used only to assist with address entry and is subject to the","googlePrivacyDat":"Google Privacy Policy","googlePrivacyNom":"Google Privacy Policy","c3h":"3. Google reCAPTCHA","c3p1":"This site uses Google reCAPTCHA to protect against bots and spam. The reCAPTCHA script sets the following cookie:","thCookie":"Cookie","thPurpose":"Purpose","thExpiry":"Expiry","grecaptchaPurpose":"Distinguishes humans from bots","sixMonths":"6 months","c3p2pre":"Its use is subject to the","c4h":"4. Google Analytics (GA4)","c4p1":"We use Google Analytics GA4 to understand how visitors use our website (pages viewed, session duration, traffic source). This data is anonymised and is used only to improve our website.","c4p2":"Google Analytics sets the following cookies:","gaPurpose":"Distinguishes users","gaSessionPurpose":"Maintains session state","twoYears":"2 years","twentyFourHours":"24 hours","c4p3pre":"For more information see the","c4p3mid":". You can opt out via the","gaOptOut":"Google Analytics opt-out add-on","c4p3post":".","manageH":"Managing cookies","manageP1":"You can control or disable cookies in your browser settings. However, disabling essential cookies may prevent the website from functioning.","manageP2":"For information about managing cookies, see the help section of your browser.","c2p2":"This service does {strong} set cookies. It is used only to assist with address entry and is subject to the {link}.","c3p2":"Its use is subject to the {link}.","c4p3":"For more information see the {link}. You can opt out via the {link2}."},"privacy":{"title":"Privacy Policy","contactCompany":"Sonniva Georgia LLC","contactEmailLabel":"Email:","contactWebLabel":"Website:","sections":[{"h":"1. General information","body":["The protection of customers' personal data and the assurance of confidentiality are important to Sonniva Georgia LLC. We undertake to process your personal information in accordance with the requirements of the law and the principles of fairness, transparency and security.","This privacy policy explains what type of information we collect, for what purpose we use it, how we protect your data and what rights you have as a data subject.","This policy applies to the Sonniva Georgia website, its online platforms, social media channels, physical stores and all the services the company offers to customers."]},{"h":"2. What data we collect","intro":"In the course of dealing with the company, we may collect the following information:","items":["first and last name;","personal or identification number (where necessary);","mobile phone number;","email address;","delivery or legal address;","company name and identification code;","order, payment and delivery history;","communication records;","technical information relating to use of the website;","IP address, device type and browser data;","information obtained through cookies and similar technologies."]},{"h":"3. Purposes of data processing","intro":"Data is collected and processed for the following purposes:","items":["receiving, processing and fulfilling orders;","organising product delivery;","providing warranty and after-sales service;","providing customer support;","preparing invoices and other financial documents;","improving service quality;","processing statistical and analytical data;","ensuring security and preventing fraudulent activity;","sharing marketing offers and news where the customer has consented;","fulfilling obligations required by law."]},{"h":"4. Data retention period","body":["Sonniva Georgia retains personal data only for as long as is necessary to provide the service, manage business processes and meet the requirements set out by law.","After the retention period expires, the data is deleted or anonymised so that the individual can no longer be identified."]},{"h":"5. Who information may be shared with","intro":"Your data may be shared only with those persons and organisations that are necessary to provide the service in full, including:","items":["courier and transport companies;","payment service providers;","software and technology partners;","accounting and legal service providers;","state authorities in cases provided for by law."],"outro":"The company does not sell, rent out or transfer customers' personal data to third parties for commercial purposes."},{"h":"6. Data security","body":["We use modern technical and organisational mechanisms to protect your information. Security measures include protecting data from unauthorised access, alteration, loss, destruction and unlawful use.","Nevertheless, no method of transmitting data over the internet is fully secure, so a guarantee of absolute security cannot be provided."]},{"h":"7. Use of cookies","intro":"Our website uses cookies and similar technologies in order to:","items":["ensure the site works properly;","remember the user's settings;","analyse visitor behaviour;","improve the user experience;","offer more relevant information and offers."],"outro":"Users can manage or disable cookies in their own browser settings."},{"h":"8. User rights","intro":"You have the right to:","items":["receive information about the data processed about you;","request the correction or updating of data;","request the deletion of data within the limits permitted by law;","restrict the processing of data;","withdraw consent, if the processing is based on consent;","apply to the relevant supervisory authority if you believe your rights have been violated."]},{"h":"9. Third-party links","body":["Our website may contain links to other websites. Sonniva Georgia is not responsible for the privacy policy or the content of those websites. We recommend that you review the relevant terms of each website."]},{"h":"10. Policy updates","body":["The company reserves the right to update or change this policy periodically. The updated version will be published on the website and takes effect from the moment of publication."]},{"h":"11. Contact information","intro":"If you have any questions, comments or requests relating to the processing of personal data, contact us:","outro":"Your trust is important to us and we strive to ensure the maximum protection and security of your personal data."}]},"terms":{"title":"Terms of Service","paymentH":"Payment methods","payCardH":"Payment by card","payCardIntro":"For online payment you can use any international bank card:","payCardOutro":"Payment is processed through a secure electronic payment system.","payTransferH":"Bank transfer","payTransferP1":"Payment is possible by bank transfer on the basis of an invoice.","payTransferP2":"This method is available to both individuals and legal entities.","payContractH":"Payment on the basis of a contract","payContractP":"We offer legal entities individual terms of cooperation.","deliveryH":"Delivery terms","delFreeH":"Free delivery","delFreeP":"Free delivery within Tbilisi applies to orders worth 500 GEL or more.","delRegionsH":"Delivery to the regions","delRegionsP":"The delivery time for orders to the regions is a maximum of 5 working days.","delZonesH":"Delivery cost across Tbilisi from a branch","zone1":"Zone I – 5-40 GEL","zone2":"Zone II – 5-50 GEL","zone3":"Zone III – 5-60 GEL","zone1Items":["Gldani","Gldanula","Gldani village","Zahesi","Avchala","Temka","Mukhiani","Dighomi","Dighomi massif","Didi Dighomi","Dighomi village"],"zone2Items":["Vake","Saburtalo","Bagebi","Lisi","Vashlijvari","Ortachala","Mtatsminda","Sololaki","Vera","Didube","Chughureti","Nadzaladevi"],"zone3Items":["Isani","Samgori","Lilo","Orkhevi","Airport settlement","Lower Ponichala","Upper Ponichala","Varketili","Tskneti","Kojori","Tabakhmela","Tsavkisi","Shindisi","Okrokana","Napetvrebi"],"delAdditionalH":"Additional terms","delAdditionalItems":["Free delivery from hypermarkets applies only if the total order value exceeds 1500 GEL.","The delivery service covers transporting the goods to the destination address. It does not include unloading the goods from the vehicle, carrying them into the building or up the stairs.","The transport cost for products purchased online is calculated automatically at checkout, after the delivery method is chosen."],"delFormulaItemPre":"For oversized parcels, the transport charge may be calculated by volumetric weight. If the volumetric weight exceeds the physical weight, the following formula is used:","delFormula":"length (cm) × width (cm) × height (cm) ÷ 5000","delMaxLengthItem":"We deliver products whose length does not exceed 4 metres.","delContactNote":"For further information, please contact us.","returnsH":"Returns, exchange, storage terms and warranty service","warrantyH":"Warranty service","warrantyP1":"Warranty service applies only to products accompanied by an official warranty card.","warrantyP2":"The warranty card is given to the customer at the time of purchase.","warrantyIntro":"Please note that the warranty terms do not apply to damage caused by:","warrantyItems":["mechanical impact;","incorrect installation or operation;","carelessness or misuse;","natural wear;","violation of the manufacturer's instructions."],"warrantyOutro":"For some products, warranty service may not apply or may have different terms, which will be indicated in the description of the specific product or in the warranty documentation.","exchangeH":"Product exchange","exchangeIntro":"Sonniva Georgia provides an exchange of products in the following cases:","exchangeItems":["the product has a factory defect (other than mechanical damage);","an error occurred during order processing or dispatch and the customer received a product with the wrong model, size, colour or specifications;","the customer wishes to exchange the product for another equivalent model within 14 calendar days of receiving it."],"exchangeOutro":"For an exchange, the customer must contact the branch where the purchase was made, or contact a company representative.","returnH":"Product return","returnIntro":"The customer has the right to return a purchased product within 14 calendar days of purchase, provided the following conditions are met:","returnItems":["the product has not been used;","the original condition of the product is preserved;","the packaging is not damaged;","the factory labels, stickers and protective elements are preserved;","the product shows no signs of use or mechanical damage."],"returnOutro":"The company reserves the right to refuse a return if the product does not meet the conditions listed above.","storageH":"Order storage terms","storageP1":"If the customer chose self-pickup when placing the order and the order is paid in full, the company stores the products for 5 working days.","storageIntro":"If, within this period, the customer does not come to collect the order and does not agree an extension of the storage period in advance, Sonniva Georgia reserves the right to:","storageItems":["cancel the order;","return the products to warehouse stock;","charge an additional storage fee if necessary."]},"delivery":{"title":"Delivery rates","headerSubtitle":"Every delivery option and its prices on one page","methodOfficeTitle":"Pickup from a Sonniva branch","methodOfficeSubtitle":"Avchala — 38 Shushi St.","methodTbilisiTitle":"Delivery within Tbilisi","methodTbilisiSubtitle":"By zone","methodRegionsTitle":"Delivery to the regions","methodRegionsSubtitle":"By weight and type","free":"Free","officeSectionTitle":"Pickup from a Sonniva branch","officeFullyFree":"Completely free","avchalaAddress":"Avchala, 38 Shushi St.","didubeAddress":"Didube, 6 Zaira Kikvidze St.","hours":"Monday–Friday, 09:00–18:00","mapLinkText":"Click the link to see the address","tbilisiSectionTitle":"Delivery within Tbilisi","tbilisiPriceByZone":"The price is determined by zone","freeThreshold":"On orders over {amount} — delivery within Tbilisi is {free}","freeThresholdWord":"free","zone1":"Zone I","zone2":"Zone II","zone3":"Zone III","regionsSectionTitle":"Delivery to the regions","regionsPriceByWeightType":"The price is determined by weight and type","legendOnwayTitle":"OnWay branch","legendOnwaySub":"Pickup from branch","legendCityTitle":"City / district","legendCitySub":"Delivery to the address","legendVillageTitle":"Village","legendVillageSub":"Delivery to the village","thWeight":"Weight","weightRange":"{from} – {to} kg"}}`);
const promo$2 = { "doorsTitle": "Membrane doors", "doorsText": "Order membrane doors in the sizes and colours you want", "framesTitle": "Aluminium frames", "framesText": "We make aluminium frames in the sizes you want" };
const quickView$2 = { "orderNow": "Order now" };
const sales$2 = { "title": "Sale", "metaDescription": "See Sonniva's discounted products", "limitedTime": "Limited time", "heading": "Sale", "subheading": "Discover products at the best prices.", "empty": "There are no discounted products at the moment" };
const search$2 = { "foundCount": "{count} products found", "noResults": 'No products found for "{query}"', "tryAnother": "Try a different search term", "pack": "Pack", "wishlist": "Wishlist", "quickView": "Quick view", "showMore": "Show more", "titleWithQuery": "Search: {query}", "filter": "Filter", "price": "Price", "min": "Min", "max": "Max", "stock": "Stock" };
const seo$2 = { "homeDescription": "Sonniva - furniture fittings, handles, drawer slides and construction materials. The best quality and prices in Georgia.", "aboutTitle": "About us", "aboutDescription": "Learn more about Sonniva - a leading supplier of furniture fittings and construction materials in Georgia." };
const share$2 = { "share": "Share", "shareHeading": "Share", "copyLink": "Copy link", "copied": "Copied!" };
const stockNotify$2 = { "notifyWhenBack": "Notify me when back in stock", "enabled": "Notification enabled", "backSmsNote": "As soon as it is back in stock, you will receive an SMS notification.", "loginRequired": "Sign-in required", "loginRequiredText": "Please sign in to subscribe to notifications.", "subscribeTitle": "Subscribe to a notification", "subscribeText": "Would you like to receive an SMS as soon as the item is back in stock?" };
const whatsapp$2 = { "requestOrder": "Request an order", "redirectText": "We will redirect you to our WhatsApp page, where you can message or call us to place an order." };
const wishlist$2 = { "title": "Wishlist", "savedOne": "product saved", "savedMany": "saved", "emptyHeading": "Your wishlist is empty", "emptyText": "Save what you like and come back to it any time." };
const en = {
  account: account$2,
  auth: auth$2,
  cart: cart$2,
  catalog: catalog$2,
  checkout: checkout$2,
  common: common$2,
  customerPicker: customerPicker$2,
  error: error$2,
  footer: footer$2,
  gallery: gallery$2,
  item: item$2,
  nav: nav$2,
  orders: orders$2,
  payment: payment$2,
  places: places$2,
  pol: pol$2,
  promo: promo$2,
  quickView: quickView$2,
  sales: sales$2,
  search: search$2,
  seo: seo$2,
  share: share$2,
  stockNotify: stockNotify$2,
  whatsapp: whatsapp$2,
  wishlist: wishlist$2
};
const account$1 = { "settingsTitle": "Настройки", "profile": "Профиль", "security": "Безопасность", "firstName": "Имя", "lastName": "Фамилия", "phone": "Телефон", "email": "Эл. почта", "address": "Адрес", "userType": "Тип аккаунта", "taxId": "Идентификационный номер", "idNumber": "Личный номер", "changePassword": "Смена пароля", "currentPassword": "Текущий пароль", "newPassword": "Новый пароль", "repeatNewPassword": "Повторите новый пароль" };
const auth$1 = { "loginTitle": "Авторизация", "loginHeading": "Авторизация", "emailOrPhone": "Эл. почта или телефон", "password": "Пароль", "rememberMe": "Запомнить меня", "forgotPassword": "Забыли пароль?", "signIn": "Войти", "noAccount": "Ещё не зарегистрированы?", "registerNow": "Зарегистрироваться", "registerTitle": "Регистрация", "registerHeading": "Регистрация", "individual": "Физическое лицо", "legalEntity": "Юридическое лицо", "notGeorgianCitizen": "Отметьте, если вы не гражданин Грузии", "nonResident": "Я нерезидент", "firstName": "Имя", "companyName": "Название компании", "lastName": "Фамилия", "phone": "Телефон", "personalId": "Личный номер", "identificationNumber": "Идентификационный номер", "email": "Эл. почта", "repeatPassword": "Повторите пароль", "entrepreneurNote": "Если у вас статус малого предпринимателя или вы юридическое лицо, свяжитесь с нами для получения специальных предложений", "confirm": "Подтвердить", "alreadyRegistered": "Уже зарегистрированы?", "forgotTitle": "Забыли пароль", "forgotHint": "Введите телефон, с которым вы зарегистрированы", "resetTitle": "Смена пароля", "newPassword": "Новый пароль", "repeatNewPassword": "Повторите новый пароль", "verifyPhoneTitle": "Подтверждение телефона", "enterSixDigitCode": "Введите 6-значный код", "resendCode": "Отправить снова", "currentPassword": "Текущий пароль" };
const cart$1 = { "wholesaleDiscount": "Оптовая скидка", "vipDiscount": "VIP-скидка", "title": "Корзина", "productCount": "{count} товаров", "emptyHeading": "Ваша корзина пуста", "emptyText": "Добавьте товары в корзину, а затем перейдите к оформлению.", "selectAll": "Выбрать все", "selectedCount": "Выбрано: {count}", "rowTotal": "Итого:", "vipSavings": "Экономия VIP:", "savings": "Экономия:", "availableQty": "Доступное количество: {count}", "setupService": "Услуга монтажа", "orderSummary": "Итоги заказа", "totalSavings": "Общая экономия", "checkout": "Оформить заказ", "securePayment": "Безопасная оплата" };
const catalog$1 = { "metaSuffix": "Смотрите полный каталог Sonniva", "categories": "Категории" };
const checkout$1 = { "cartEmptyDetail": "Все товары удалены со страницы оформления", "inventoryCheckFailed": "Не удалось проверить наличие", "zonesLoadFailed": "Не удалось загрузить зоны. Обновите страницу и попробуйте снова.", "genericError": "Произошла ошибка", "noBankResponse": "Мы не получили ответ от банка", "deliveryOffice": "Самовывоз из филиала Sonniva", "deliveryTbilisi": "Доставка по Тбилиси", "deliveryRegions": "Доставка в регионы", "regionOnwayOffice": "Самовывоз из филиала OnWay", "regionAddress": "Доставка по адресу", "avchalaAddress": "ул. Шуши 38 — Пн–Пт 09:00–18:00", "didubeAddress": "ул. Заиры Киквидзе 6 — Пн–Пт 09:00–18:00", "zone1Label": "Зона I – 5-40 ₾", "zone2Label": "Зона II – 5-50 ₾", "zone3Label": "Зона III – 5-60 ₾", "providerPcb": "PCB Bank", "providerBog": "BOG Bank", "providerTbc": "TBC Bank", "providerInvoice": "Банковский перевод", "providerLimit": "Оплата по лимиту", "providerCash": "Оплата наличными", "errDeliveryType": "Пожалуйста, выберите тип доставки", "errTbilisiZone": "Пожалуйста, выберите зону Тбилиси", "errRegionOption": "Пожалуйста, выберите вариант доставки", "errOnwayBranch": "Пожалуйста, выберите филиал OnWay", "errRegionZone": "Пожалуйста, выберите город / село", "errOfficeBranch": "Пожалуйста, выберите филиал", "errAddress": "Пожалуйста, введите адрес доставки", "errProvider": "Пожалуйста, выберите способ оплаты", "errAgreement": "Пожалуйста, согласитесь с условиями", "fixMarkedFields": "Пожалуйста, исправьте отмеченные поля перед продолжением", "backToCart": "Вернуться в корзину", "title": "Оформление заказа", "deliveryTypeHeading": "Тип доставки", "requiredField": "Обязательное поле", "free": "Бесплатно", "freeParen": "(бесплатно)", "deliveryAddressHeading": "Адрес доставки", "chooseOnwayBranch": "Выберите филиал OnWay", "choose": "Выбрать", "chooseCityDistrictVillage": "Выберите город / район / село", "notFound": "Не найдено", "chooseZone": "Выберите зону", "orderOver500FreeTbilisi": "Заказ более 500 ₾ — доставка по Тбилиси бесплатна", "streetNumberOptional": "Номер улицы (необязательно)", "pickupPoint": "Пункт выдачи", "clickLinkForAddress": "Нажмите на ссылку, чтобы увидеть адрес", "checkingBranchInventory": "Проверяем наличие в выбранном филиале...", "insufficientBranchQty": "Недостаточное количество товара в выбранном филиале", "commentHeading": "Комментарий", "commentPlaceholder": "Особые пожелания, примечания...", "paymentMethodHeading": "Способ оплаты", "checkingLimit": "Проверяем лимит...", "noLimitDefined": "У вас нет установленного лимита. Свяжитесь с нами, если заинтересованы.", "insufficientLimit": "Недостаточный лимит!", "limit": "Лимит", "used": "Использовано", "available": "Доступно", "amountDue": "Сумма к оплате", "orderSummary": "Итоги заказа", "setupService": "Услуга монтажа", "remove": "Удалить", "totalSavings": "Общая экономия", "delivery": "Доставка", "agree": "Я согласен с", "termsAndConditions": "условиями и правилами", "processing": "Обработка...", "payAmount": "Оплатить — ", "securePaymentSsl": "Безопасная оплата с SSL-шифрованием", "insufficientBranchStockTitle": "Недостаточно товара в выбранном филиале", "insufficientBranchStockText": "В выбранном филиале недостаточно следующих товаров. Пожалуйста, измените филиал или количество:", "inStockShort": "В наличии:", "desiredShort": "Нужно:", "understood": "Понятно" };
const common$1 = { "search": "Поиск", "searchPlaceholder": "Найдите то, что вам нужно...", "searchShort": "Что вы ищете?", "addToCart": "В корзину", "inStock": "В наличии", "outOfStock": "Нет в наличии", "viewAll": "Показать все", "loading": "Загрузка...", "back": "Назад", "cancel": "Отмена", "confirm": "Подтвердить", "save": "Сохранить", "delete": "Удалить", "edit": "Изменить", "close": "Закрыть", "more": "Ещё", "pack": "Упаковка", "clear": "Очистить", "currency": "₾", "pleaseWait": "Пожалуйста, подождите...", "continue": "Продолжить", "submit": "Подтвердить", "goToHome": "На главную", "orderNumber": "Номер заказа", "backToHome": "Вернуться на главную", "startShopping": "Начать покупки", "continueShopping": "Продолжить покупки", "total": "Итого", "all": "Все", "searchDots": "Поиск...", "yes": "Да", "no": "Нет", "goTo": "Перейти", "view": "Смотреть", "viewDetails": "Подробнее" };
const customerPicker$1 = { "edit": "Изменить", "remove": "Удалить", "selectCustomer": "Выбор клиента", "selectCustomerHint": "Выберите клиента, от имени которого хотите оформить заказ", "searchPlaceholder": "Имя, телефон, эл. почта или идентификационный код…", "recentlyAdded": "Недавно добавленные", "searchResults": "Результаты поиска", "noCustomerFound": "Клиент не найден.", "noRecentCustomers": "Нет недавних клиентов.", "addNewCustomer": "Добавить нового клиента", "firstName": "Имя", "lastName": "Фамилия", "mobile": "Мобильный", "email": "Эл. почта", "idCode": "Идентификационный код", "idCodePlaceholder": "Личный / идент. код", "address": "Адрес", "addressPlaceholder": "Улица, город…", "saveAndSelect": "Сохранить и выбрать" };
const error$1 = { "notFound": "Извините, запрашиваемая страница не найдена.", "forbidden": "Извините, у вас нет доступа к этой странице.", "server": "На нашей стороне произошла ошибка. Попробуйте позже.", "maintenance": "Ведутся технические работы. Зайдите позже.", "unexpected": "Произошла непредвиденная ошибка." };
const footer$1 = { "rightsReserved": "Все права защищены.", "termsOfService": "Условия обслуживания", "privacyPolicy": "Политика конфиденциальности", "cookiePolicy": "Политика использования файлов cookie", "workingHours": "Понедельник–пятница, 09:00–18:00", "faq": "Часто задаваемые вопросы" };
const gallery$1 = { "noImage": "Нет изображения" };
const item$1 = { "notifyRestock": "Сообщить о поступлении в продажу", "noProducts": "Товары не найдены", "maxQty": "Максимальное количество для заказа: {count}", "similarProducts": "Похожие товары", "copyCode": "Скопировать код товара", "copyName": "Скопировать название товара", "branchAvchala": "Филиал Авчала", "branchDidube": "Филиал Дидубе", "wholesale": "Опт", "pack": "Упаковка", "retail": "Розница", "priceAppliesFrom": "Цена действует от", "perPackPurchase": "упаковок при покупке", "perUnitPurchase": "штук при покупке", "packPrice": "Цена упаковки", "unitPrice": "Цена за штуку", "choosePack": "Выберите упаковку", "setupService": "Услуга монтажа", "buyNow": "Купить сейчас", "delivery": "Доставка", "deliverySelfPickup": "Самовывоз из офиса:", "deliverySelfPickupText": "Бесплатно. Пункт выдачи", "onMap": "на карте", "deliveryTbilisi": "Доставка по Тбилиси: бесплатно при заказе от 500 ₾", "deliveryRegions": "Доставка в регионы:", "seeDeliveryRates": "смотрите тарифы доставки", "deliveryUnloadNote": "В услугу доставки не входит выгрузка товара из машины и подъём на этаж.", "paymentMethods": "Способы оплаты", "paymentCards": "Картами Visa, MasterCard, баллами лояльности", "paymentBankTransfer": "Банковским переводом", "specifications": "Характеристики", "descriptionTab": "Описание", "noSpecifications": "Характеристики не указаны.", "noDescription": "Описание не указано." };
const nav$1 = { "chooseCategory": "Выберите категорию", "catalog": "Каталог", "sales": "Акции", "myOrders": "Мои заказы", "myAccount": "Личный кабинет", "adminPanel": "Панель администратора", "favorites": "Избранное", "aboutUs": "О нас", "deliveryRates": "Тарифы на доставку", "termsOfService": "Условия обслуживания", "privacyPolicy": "Конфиденциальность", "cookiePolicy": "Политика cookie", "contactUs": "Связаться с нами", "home": "Главная", "signIn": "Войти", "signOut": "Выйти" };
const orders$1 = { "title": "Мои заказы", "trackingBanner": "Чтобы увидеть статус заказа и информацию о доставке, перейдите на сайт и введите номер отслеживания.", "checkStatus": "Проверить статус", "orderCount": "{count} заказов", "totalAmount": "Общая сумма", "orderNo": "Заказ №", "noProducts": "Товары не найдены", "date": "Дата", "trackingNumber": "Номер отслеживания", "details": "Подробнее", "reorder": "Повторить заказ", "noOrders": "Заказы не найдены.", "loadError": "Не удалось загрузить заказ.", "errorSummary": "Ошибка", "detailTitle": "Детали заказа", "orderHash": "Заказ #{no}", "reorderTitle": "Повтор заказа #{no}", "delivery": "Доставка", "deliveryLine": "Доставка:", "trackingLine": "Номер отслеживания:", "payment": "Оплата", "paymentMethod": "Способ оплаты", "paymentStatus": "Статус оплаты", "transactionId": "ID транзакции", "comment": "Комментарий", "products": "Товары", "setupServiceLine": "Услуга монтажа —", "unitPrice": "Цена за единицу", "unitPriceShort": "Цена за ед.", "wholesale": "Опт", "subtotal": "Промежуточный итог", "wholesaleDiscount": "Оптовая скидка", "downloadInvoice": "Скачать счёт", "status": { "awaitingPayment": "Ожидает оплаты", "pending": "Не подтверждён", "paid": "Оплачен", "ready": "Готов", "dispatched": "Отправлен", "delivered": "Доставлен", "cancelled": "Отклонён", "cancelledAlt": "Отменён", "limit": "Лимит" }, "paymentStatusLabels": { "pending": "Ожидание", "processing": "Обрабатывается", "completed": "Завершено", "failed": "Не выполнено", "cancelled": "Отменено" }, "deliveryTypes": { "office": "Самовывоз из офиса", "tbilisi": "Тбилиси", "regions": "Регионы" }, "providers": { "invoice": "Счёт", "cash": "Наличные" } };
const payment$1 = { "successTitle": "Оплата прошла успешно", "confirmationEmailSent": "Письмо с подтверждением отправлено на вашу почту.", "cancelTitle": "Платёж отклонён", "cancelText": "Не удалось выполнить оплату. Попробуйте снова или выберите другой способ.", "tryAgain": "Попробовать снова", "invoiceSentTitle": "Счёт отправлен", "invoiceSentText": "Счёт отправлен на вашу электронную почту", "invoiceNumber": "Номер счёта", "checkEmailForPdf": "Проверьте почту — там PDF-счёт", "checkSpam": "Если письмо не пришло, проверьте папку «Спам»", "limitOrderTitle": "Заказ оформлен", "limitOrderText": "Заказ успешно оформлен на условиях оплаты по лимиту" };
const places$1 = { "exactAddress": "Точный адрес", "requiredField": "Обязательное поле", "pickFromList": "Выберите подходящий адрес из списка ниже", "addressPlaceholder": "Адрес" };
const pol$1 = /* @__PURE__ */ JSON.parse('{"about":{"title":"О нас","p1":"Sonniva Georgia успешно работает на грузинском рынке с 2014 года и предлагает клиентам широкий выбор мебельной фурнитуры, алюминиевых профилей и комплектующих для перил, фурнитуры для стекла и душевых кабин, ручного и электроинструмента.","p2":"Главная цель компании — предлагать клиентам качественную продукцию, современные решения и профессиональный сервис, полностью отвечающий запросам как частных клиентов, так и бизнес-сектора.","p3":"За эти годы Sonniva Georgia стала надёжным партнёром для производителей мебели, дизайнеров, строителей и мастеров. Наш ассортимент объединяет продукцию ведущих мировых брендов, что позволяет предлагать клиентам лучшее сочетание качества, функциональности и инноваций.","p4":"Компания уделяет особое внимание качеству обслуживания, постоянному обновлению ассортимента и внедрению современных технологий. Именно на этом подходе мы создали и онлайн-платформы, позволяющие клиентам легко и быстро получать нужные товары и услуги.","p5":"Помимо торгового направления, Sonniva Georgia предлагает клиентам индивидуальное изготовление, резку и сборку алюминиевых дверей и рам. Наша команда обеспечивает качественное выполнение каждого проекта, техническую поддержку и профессиональную консультацию.","p6":"Сегодня Sonniva Georgia продолжает развиваться, расширяет ассортимент продукции и создаёт новые возможности для клиентов!","tagline":"Sonniva Georgia — качество, инновации и надёжное партнёрство в одном месте."},"cookie":{"title":"Политика Cookie","lastUpdated":"Последнее обновление: июль 2026","intro":"Настоящая Политика Cookie объясняет, как мы используем файлы cookie и подобные технологии на нашем сайте. Мы используем только те файлы cookie, которые необходимы для корректной работы сайта, безопасности и анализа использования.","whatH":"Что такое cookie?","whatP":"Cookie — это небольшие текстовые файлы, которые сохраняются в вашем браузере, чтобы сайт работал корректно, повышал производительность или обеспечивал наилучший опыт использования.","useH":"Для чего мы используем cookie","c1h":"1. Необходимые cookie","c1p":"Эти cookie нужны для корректной работы сайта, в том числе:","c1i1":"cookie сессии авторизации пользователя","c1i2":"cookie безопасности и защиты от CSRF","c2h":"2. Google Places API (автозаполнение адреса)","c2p1":"При вводе адреса набираемый вами текст отправляется в Google Places API для генерации подсказок автозаполнения. В рамках этого запроса Google также передаётся ваш IP-адрес.","c2p2pre":"Этот сервис","c2p2strong":"не","c2p2mid":"устанавливает cookie. Он используется только для помощи при вводе адреса и подчиняется","googlePrivacyDat":"Политике конфиденциальности Google","googlePrivacyNom":"Политика конфиденциальности Google","c3h":"3. Google reCAPTCHA","c3p1":"Этот сайт использует Google reCAPTCHA для защиты от ботов и спама. Скрипт reCAPTCHA устанавливает следующий cookie:","thCookie":"Cookie","thPurpose":"Назначение","thExpiry":"Срок","grecaptchaPurpose":"Отличает людей от ботов","sixMonths":"6 месяцев","c3p2pre":"Его использование подчиняется","c4h":"4. Google Analytics (GA4)","c4p1":"Мы используем Google Analytics GA4, чтобы понять, как посетители пользуются нашим сайтом (просмотренные страницы, длительность сессии, источник трафика). Эти данные анонимизированы и используются только для улучшения нашего сайта.","c4p2":"Google Analytics устанавливает следующие cookie:","gaPurpose":"Отличает пользователей","gaSessionPurpose":"Сохраняет состояние сессии","twoYears":"2 года","twentyFourHours":"24 часа","c4p3pre":"Дополнительную информацию см. в","c4p3mid":". Вы можете отказаться с помощью","gaOptOut":"расширения для отключения Google Analytics","c4p3post":".","manageH":"Управление cookie","manageP1":"Вы можете контролировать или отключать cookie в настройках браузера. Однако отключение необходимых cookie может нарушить работу сайта.","manageP2":"Для информации об управлении cookie смотрите раздел справки вашего браузера.","c2p2":"Этот сервис {strong} устанавливает cookie. Он используется только для помощи при вводе адреса и подчиняется {link}.","c3p2":"Его использование подчиняется {link}.","c4p3":"Дополнительную информацию см. в {link}. Вы можете отказаться с помощью {link2}."},"privacy":{"title":"Политика конфиденциальности","contactCompany":"ООО «Sonniva Georgia»","contactEmailLabel":"Эл. почта:","contactWebLabel":"Веб-сайт:","sections":[{"h":"1. Общая информация","body":["Для ООО «Sonniva Georgia» важна защита персональных данных клиентов и обеспечение конфиденциальности. Мы обязуемся обрабатывать вашу персональную информацию в соответствии с требованиями законодательства и принципами справедливости, прозрачности и безопасности.","Настоящая политика конфиденциальности разъясняет, какой тип информации мы собираем, с какой целью её используем, как защищаем ваши данные и какие права есть у вас как у субъекта данных.","Эта политика распространяется на веб-сайт Sonniva Georgia, онлайн-платформы, каналы социальных сетей, физические магазины и все сервисы, которые компания предлагает клиентам."]},{"h":"2. Какие данные мы собираем","intro":"При взаимодействии с компанией мы можем собирать следующую информацию:","items":["имя и фамилия;","личный или идентификационный номер (при необходимости);","номер мобильного телефона;","адрес электронной почты;","адрес доставки или юридический адрес;","название компании и идентификационный код;","история заказов, платежей и доставок;","записи коммуникаций;","техническая информация, связанная с использованием сайта;","IP-адрес, тип устройства и данные браузера;","информация, полученная с помощью cookie и подобных технологий."]},{"h":"3. Цели обработки данных","intro":"Сбор и обработка данных осуществляются в следующих целях:","items":["приём, обработка и исполнение заказов;","организация доставки продукции;","обеспечение гарантийного и послепродажного обслуживания;","оказание поддержки клиентам;","подготовка счетов-фактур и других финансовых документов;","повышение качества обслуживания;","обработка статистических и аналитических данных;","обеспечение безопасности и предотвращение мошеннических действий;","рассылка маркетинговых предложений и новостей при согласии клиента;","исполнение обязательств, предусмотренных законодательством."]},{"h":"4. Срок хранения данных","body":["Sonniva Georgia хранит персональные данные только в течение срока, необходимого для оказания услуги, управления бизнес-процессами и выполнения требований, предусмотренных законодательством.","После истечения срока хранения данные удаляются или анонимизируются так, чтобы идентификация лица больше не была возможной."]},{"h":"5. Кому может быть передана информация","intro":"Ваши данные могут быть переданы только тем лицам и организациям, которые необходимы для полноценного оказания услуги, в том числе:","items":["курьерским и транспортным компаниям;","провайдерам платёжных услуг;","программным и технологическим партнёрам;","поставщикам бухгалтерских и юридических услуг;","государственным органам в случаях, предусмотренных законом."],"outro":"Компания не продаёт, не сдаёт в аренду и не передаёт персональные данные клиентов третьим лицам в коммерческих целях."},{"h":"6. Безопасность данных","body":["Мы используем современные технические и организационные механизмы для защиты вашей информации. Меры безопасности включают защиту данных от несанкционированного доступа, изменения, потери, уничтожения и незаконного использования.","Тем не менее ни один метод передачи данных через интернет не является полностью защищённым, поэтому гарантия абсолютной безопасности не может быть обеспечена."]},{"h":"7. Использование cookie","intro":"Наш веб-сайт использует cookie и подобные технологии, чтобы:","items":["обеспечить корректную работу сайта;","запомнить настройки пользователя;","проанализировать поведение посетителей;","улучшить опыт пользователя;","предложить более релевантную информацию и предложения."],"outro":"Пользователь может управлять cookie или отключить их в настройках своего браузера."},{"h":"8. Права пользователя","intro":"Вы имеете право:","items":["получить информацию об обрабатываемых о вас данных;","потребовать исправления или обновления данных;","потребовать удаления данных в пределах, допустимых законом;","ограничить обработку данных;","отозвать согласие, если обработка основана на согласии;","обратиться в соответствующий надзорный орган, если считаете, что ваши права нарушены."]},{"h":"9. Ссылки третьих сторон","body":["На нашем веб-сайте могут размещаться ссылки на другие веб-сайты. Sonniva Georgia не несёт ответственности за политику конфиденциальности или содержание указанных веб-сайтов. Рекомендуем ознакомиться с соответствующими правилами каждого веб-сайта."]},{"h":"10. Обновление политики","body":["Компания оставляет за собой право периодически обновлять или изменять данную политику. Обновлённая версия будет опубликована на веб-сайте и вступает в силу с момента публикации."]},{"h":"11. Контактная информация","intro":"Если у вас есть вопросы, замечания или запросы, связанные с обработкой персональных данных, свяжитесь с нами:","outro":"Для нас важно ваше доверие, и мы стремимся обеспечить максимальную защиту и безопасность ваших персональных данных."}]},"terms":{"title":"Условия обслуживания","paymentH":"Способы оплаты","payCardH":"Оплата картой","payCardIntro":"Для онлайн-оплаты вы можете использовать любую международную банковскую карту:","payCardOutro":"Оплата осуществляется через безопасную систему электронных платежей.","payTransferH":"Банковский перевод","payTransferP1":"Оплата возможна банковским переводом на основании счёта.","payTransferP2":"Этот способ доступен как физическим, так и юридическим лицам.","payContractH":"Оплата на основании договора","payContractP":"Юридическим лицам мы предлагаем индивидуальные условия сотрудничества.","deliveryH":"Условия доставки","delFreeH":"Бесплатная доставка","delFreeP":"Бесплатная доставка по Тбилиси действует для заказов стоимостью от 500 лари.","delRegionsH":"Доставка в регионы","delRegionsP":"Срок доставки заказов в регионы — максимум 5 рабочих дней.","delZonesH":"Стоимость доставки по Тбилиси из филиала","zone1":"Зона I – 5-40 лари","zone2":"Зона II – 5-50 лари","zone3":"Зона III – 5-60 лари","zone1Items":["Глдани","Глданула","село Глдани","Захеси","Авчала","Темка","Мухиани","Дигоми","Дигомский массив","Диди Дигоми","село Дигоми"],"zone2Items":["Ваке","Сабуртало","Багеби","Лиси","Вашлиджвари","Ортачала","Мтацминда","Сололаки","Вера","Дидубе","Чугурети","Надзаладеви"],"zone3Items":["Исани","Самгори","Лило","Орхеви","посёлок Аэропорт","Нижняя Поничала","Верхняя Поничала","Варкетили","Цкнети","Коджори","Табахмела","Цавкиси","Шиндиси","Окрокана","Напетвреби"],"delAdditionalH":"Дополнительные условия","delAdditionalItems":["Бесплатная доставка из гипермаркетов действует только в том случае, если общая стоимость заказа превышает 1500 лари.","Услуга доставки включает транспортировку продукции до адреса назначения. В услугу не входит выгрузка продукции из машины, занос в здание или подъём на этаж.","Стоимость транспортировки товаров, купленных онлайн, рассчитывается автоматически при оформлении заказа, после выбора способа доставки."],"delFormulaItemPre":"В случае габаритных отправлений плата за транспортировку может рассчитываться по объёмному весу. Если объёмный вес превышает физический вес, применяется следующая формула:","delFormula":"длина (см) × ширина (см) × высота (см) ÷ 5000","delMaxLengthItem":"Мы обеспечиваем доставку продукции, длина которой не превышает 4 метров.","delContactNote":"Для получения дополнительной информации, пожалуйста, свяжитесь с нами.","returnsH":"Возврат, обмен, условия хранения и гарантийное обслуживание","warrantyH":"Гарантийное обслуживание","warrantyP1":"Гарантийное обслуживание распространяется только на продукцию, к которой прилагается официальный гарантийный талон.","warrantyP2":"Гарантийный талон передаётся покупателю в момент приобретения продукции.","warrantyIntro":"Обратите внимание, что гарантийные условия не распространяются на повреждения, вызванные:","warrantyItems":["механическим воздействием;","неправильным монтажом или эксплуатацией;","небрежностью или использованием не по назначению;","естественным износом;","нарушением инструкций производителя."],"warrantyOutro":"На некоторую продукцию гарантийное обслуживание может не распространяться или иметь иные условия, что будет указано в описании конкретного товара или в гарантийной документации.","exchangeH":"Обмен продукции","exchangeIntro":"Sonniva Georgia обеспечивает обмен продукции в следующих случаях:","exchangeItems":["у продукции есть заводской брак (кроме механических повреждений);","в процессе обработки или выдачи заказа произошла ошибка, и покупатель получил продукцию неправильной модели, размера, цвета или характеристик;","покупатель хочет обменять продукцию на другую аналогичную модель в течение 14 календарных дней с момента получения продукции."],"exchangeOutro":"Для обмена покупатель должен обратиться в филиал, где была совершена покупка, или связаться с представителем компании.","returnH":"Возврат продукции","returnIntro":"Покупатель имеет право вернуть приобретённую продукцию в течение 14 календарных дней с момента покупки, если соблюдены следующие условия:","returnItems":["продукция не использовалась;","сохранено первоначальное состояние товара;","упаковка не повреждена;","сохранены заводские ярлыки, стикеры и защитные элементы;","на продукции нет следов эксплуатации или механических повреждений."],"returnOutro":"Компания оставляет за собой право отказать в возврате, если продукция не соответствует перечисленным выше условиям.","storageH":"Условия хранения заказа","storageP1":"В случае если покупатель при оформлении заказа выбрал услугу самовывоза и заказ полностью оплачен, компания обеспечивает хранение продукции в течение 5 рабочих дней.","storageIntro":"Если в указанный срок покупатель не явится за заказом и заранее не согласует продление срока хранения, Sonniva Georgia оставляет за собой право:","storageItems":["отменить заказ;","вернуть продукцию в складской запас;","при необходимости начислить дополнительную плату за хранение."]},"delivery":{"title":"Тарифы доставки","headerSubtitle":"Все варианты доставки и их цены на одной странице","methodOfficeTitle":"Самовывоз из филиала Sonniva","methodOfficeSubtitle":"Авчала — ул. Шуши 38","methodTbilisiTitle":"Доставка по Тбилиси","methodTbilisiSubtitle":"По зоне","methodRegionsTitle":"Доставка в регионы","methodRegionsSubtitle":"По весу и типу","free":"Бесплатно","officeSectionTitle":"Самовывоз из филиала Sonniva","officeFullyFree":"Полностью бесплатно","avchalaAddress":"Авчала, ул. Шуши 38","didubeAddress":"Дидубе, ул. Заиры Киквидзе 6","hours":"Понедельник–пятница, 09:00–18:00","mapLinkText":"Нажмите на ссылку, чтобы увидеть адрес","tbilisiSectionTitle":"Доставка по Тбилиси","tbilisiPriceByZone":"Цена определяется по зоне","freeThreshold":"При заказе свыше {amount} — доставка по Тбилиси {free}","freeThresholdWord":"бесплатна","zone1":"Зона I","zone2":"Зона II","zone3":"Зона III","regionsSectionTitle":"Доставка в регионы","regionsPriceByWeightType":"Цена определяется по весу и типу","legendOnwayTitle":"Филиал OnWay","legendOnwaySub":"Самовывоз из филиала","legendCityTitle":"Город / район","legendCitySub":"Доставка по адресу","legendVillageTitle":"Село","legendVillageSub":"Доставка в село","thWeight":"Вес","weightRange":"{from} – {to} кг"}}');
const promo$1 = { "doorsTitle": "Мембранные двери", "doorsText": "Закажите мембранные двери в нужных вам размерах и цветах", "framesTitle": "Алюминиевые рамы", "framesText": "Мы изготавливаем алюминиевые рамы в нужных вам размерах" };
const quickView$1 = { "orderNow": "Заказать сейчас" };
const sales$1 = { "title": "Скидки", "metaDescription": "Смотрите товары Sonniva со скидкой", "limitedTime": "Ограниченное время", "heading": "Скидки", "subheading": "Откройте для себя товары по лучшим ценам.", "empty": "Сейчас нет товаров со скидкой" };
const search$1 = { "foundCount": "Найдено товаров: {count}", "noResults": "По запросу «{query}» ничего не найдено", "tryAnother": "Попробуйте другой запрос", "pack": "Упаковка", "wishlist": "Избранное", "quickView": "Быстрый просмотр", "showMore": "Показать ещё", "titleWithQuery": "Поиск: {query}", "filter": "Фильтр", "price": "Цена", "min": "Мин.", "max": "Макс.", "stock": "Наличие" };
const seo$1 = { "homeDescription": "Sonniva - мебельная фурнитура, ручки, направляющие и строительные материалы. Лучшее качество и цены в Грузии.", "aboutTitle": "О нас", "aboutDescription": "Узнайте больше о Sonniva - ведущем поставщике мебельной фурнитуры и строительных материалов в Грузии." };
const share$1 = { "share": "Поделиться", "shareHeading": "Поделиться", "copyLink": "Скопировать ссылку", "copied": "Скопировано!" };
const stockNotify$1 = { "notifyWhenBack": "Сообщить, когда появится в наличии", "enabled": "Уведомление включено", "backSmsNote": "Как только товар появится в наличии, вы получите SMS-уведомление.", "loginRequired": "Требуется авторизация", "loginRequiredText": "Чтобы подписаться на уведомления, войдите в аккаунт.", "subscribeTitle": "Подписаться на уведомление", "subscribeText": "Хотите получить SMS, как только товар появится в наличии?" };
const whatsapp$1 = { "requestOrder": "Запросить заказ", "redirectText": "Мы перенаправим вас на нашу страницу в WhatsApp, где вы сможете написать или позвонить нам для оформления заказа." };
const wishlist$1 = { "title": "Избранное", "savedOne": "товар сохранён", "savedMany": "сохранено", "emptyHeading": "Ваш список избранного пуст", "emptyText": "Сохраняйте то, что нравится, и возвращайтесь в любое время." };
const ru = {
  account: account$1,
  auth: auth$1,
  cart: cart$1,
  catalog: catalog$1,
  checkout: checkout$1,
  common: common$1,
  customerPicker: customerPicker$1,
  error: error$1,
  footer: footer$1,
  gallery: gallery$1,
  item: item$1,
  nav: nav$1,
  orders: orders$1,
  payment: payment$1,
  places: places$1,
  pol: pol$1,
  promo: promo$1,
  quickView: quickView$1,
  sales: sales$1,
  search: search$1,
  seo: seo$1,
  share: share$1,
  stockNotify: stockNotify$1,
  whatsapp: whatsapp$1,
  wishlist: wishlist$1
};
const account = { "settingsTitle": "Ayarlar", "profile": "Profil", "security": "Güvenlik", "firstName": "Ad", "lastName": "Soyad", "phone": "Telefon", "email": "E-posta", "address": "Adres", "userType": "Hesap türü", "taxId": "Vergi kimlik numarası", "idNumber": "Kimlik numarası", "changePassword": "Şifre değiştir", "currentPassword": "Mevcut şifre", "newPassword": "Yeni şifre", "repeatNewPassword": "Yeni şifreyi tekrarla" };
const auth = { "loginTitle": "Giriş", "loginHeading": "Giriş", "emailOrPhone": "E-posta veya telefon", "password": "Şifre", "rememberMe": "Beni hatırla", "forgotPassword": "Şifrenizi mi unuttunuz?", "signIn": "Giriş yap", "noAccount": "Hesabınız yok mu?", "registerNow": "Kayıt ol", "registerTitle": "Kayıt", "registerHeading": "Kayıt", "individual": "Gerçek kişi", "legalEntity": "Tüzel kişi", "notGeorgianCitizen": "Gürcistan vatandaşı değilseniz işaretleyin", "nonResident": "Yerleşik değilim", "firstName": "Ad", "companyName": "Şirket adı", "lastName": "Soyad", "phone": "Telefon", "personalId": "Kimlik numarası", "identificationNumber": "Vergi kimlik numarası", "email": "E-posta", "repeatPassword": "Şifreyi tekrarla", "entrepreneurNote": "Küçük işletme statünüz varsa veya tüzel kişiyseniz, özel teklifler için bizimle iletişime geçin", "confirm": "Onayla", "alreadyRegistered": "Zaten kayıtlı mısınız?", "forgotTitle": "Şifremi unuttum", "forgotHint": "Kayıt olduğunuz telefon numarasını girin", "resetTitle": "Şifre değiştir", "newPassword": "Yeni şifre", "repeatNewPassword": "Yeni şifreyi tekrarla", "verifyPhoneTitle": "Telefon doğrulama", "enterSixDigitCode": "6 haneli kodu girin", "resendCode": "Tekrar gönder", "currentPassword": "Mevcut şifre" };
const cart = { "wholesaleDiscount": "Toptan indirim", "vipDiscount": "VIP indirim", "title": "Sepet", "productCount": "{count} ürün", "emptyHeading": "Sepetiniz boş", "emptyText": "Sepete ürün ekleyin ve ardından ödemeye geçin.", "selectAll": "Tümünü seç", "selectedCount": "{count} seçili", "rowTotal": "Toplam:", "vipSavings": "VIP tasarruf:", "savings": "Tasarruf:", "availableQty": "Mevcut miktar: {count}", "setupService": "Montaj hizmeti", "orderSummary": "Sipariş özeti", "totalSavings": "Toplam tasarruf", "checkout": "Siparişi tamamla", "securePayment": "Güvenli ödeme" };
const catalog = { "metaSuffix": "Sonniva'nın tüm kataloğuna göz atın", "categories": "Kategoriler" };
const checkout = { "cartEmptyDetail": "Tüm ürünler ödeme sayfasından kaldırıldı", "inventoryCheckFailed": "Stok kontrolü tamamlanamadı", "zonesLoadFailed": "Bölgeler yüklenemedi. Lütfen sayfayı yenileyip tekrar deneyin.", "genericError": "Bir hata oluştu", "noBankResponse": "Bankadan yanıt alamadık", "deliveryOffice": "Sonniva şubesinden teslim alma", "deliveryTbilisi": "Tiflis içi teslimat", "deliveryRegions": "Bölgelere teslimat", "regionOnwayOffice": "OnWay şubesinden teslim alma", "regionAddress": "Adrese teslimat", "avchalaAddress": "Shushi Cad. 38 — Pzt–Cum 09:00–18:00", "didubeAddress": "Zaira Kikvidze Cad. 6 — Pzt–Cum 09:00–18:00", "zone1Label": "Bölge I – 5-40 ₾", "zone2Label": "Bölge II – 5-50 ₾", "zone3Label": "Bölge III – 5-60 ₾", "providerPcb": "PCB Bank", "providerBog": "BOG Bank", "providerTbc": "TBC Bank", "providerInvoice": "Banka havalesi", "providerLimit": "Limitli ödeme", "providerCash": "Nakit ödeme", "errDeliveryType": "Lütfen bir teslimat türü seçin", "errTbilisiZone": "Lütfen bir Tiflis bölgesi seçin", "errRegionOption": "Lütfen bir teslimat seçeneği seçin", "errOnwayBranch": "Lütfen bir OnWay şubesi seçin", "errRegionZone": "Lütfen bir şehir / köy seçin", "errOfficeBranch": "Lütfen bir şube seçin", "errAddress": "Lütfen bir teslimat adresi girin", "errProvider": "Lütfen bir ödeme yöntemi seçin", "errAgreement": "Lütfen şartları ve koşulları kabul edin", "fixMarkedFields": "Devam etmeden önce lütfen işaretli alanları düzeltin", "backToCart": "Sepete dön", "title": "Ödeme", "deliveryTypeHeading": "Teslimat türü", "requiredField": "Zorunlu alan", "free": "Ücretsiz", "freeParen": "(ücretsiz)", "deliveryAddressHeading": "Teslimat adresi", "chooseOnwayBranch": "Bir OnWay şubesi seçin", "choose": "Seç", "chooseCityDistrictVillage": "Şehir / ilçe / köy seçin", "notFound": "Bulunamadı", "chooseZone": "Bölge seçin", "orderOver500FreeTbilisi": "Sipariş 500 ₾ üzerinde — Tiflis içi teslimat ücretsiz", "streetNumberOptional": "Sokak numarası (isteğe bağlı)", "pickupPoint": "Teslim noktası", "clickLinkForAddress": "Adresi görmek için bağlantıya tıklayın", "checkingBranchInventory": "Seçilen şubede stok kontrol ediliyor...", "insufficientBranchQty": "Seçilen şubede yeterli ürün yok", "commentHeading": "Yorum", "commentPlaceholder": "Özel istekler, notlar...", "paymentMethodHeading": "Ödeme yöntemi", "checkingLimit": "Limit kontrol ediliyor...", "noLimitDefined": "Tanımlı bir limitiniz yok. İlgileniyorsanız bizimle iletişime geçin.", "insufficientLimit": "Yetersiz limit!", "limit": "Limit", "used": "Kullanılan", "available": "Kullanılabilir", "amountDue": "Ödenecek tutar", "orderSummary": "Sipariş özeti", "setupService": "Montaj hizmeti", "remove": "Kaldır", "totalSavings": "Toplam tasarruf", "delivery": "Teslimat", "agree": "Kabul ediyorum:", "termsAndConditions": "şartlar ve koşullar", "processing": "İşleniyor...", "payAmount": "Öde — ", "securePaymentSsl": "SSL şifrelemesiyle güvenli ödeme", "insufficientBranchStockTitle": "Seçilen şubede yetersiz stok", "insufficientBranchStockText": "Seçilen şubede aşağıdaki ürünlerin stoğu yeterli değil. Lütfen şubeyi veya miktarı değiştirin:", "inStockShort": "Stokta:", "desiredShort": "İstenen:", "understood": "Anladım" };
const common = { "search": "Ara", "searchPlaceholder": "İhtiyacınız olanı arayın...", "searchShort": "Ne arıyorsunuz?", "addToCart": "Sepete ekle", "inStock": "Stokta var", "outOfStock": "Stokta yok", "viewAll": "Tümünü gör", "loading": "Yükleniyor...", "back": "Geri", "cancel": "İptal", "confirm": "Onayla", "save": "Kaydet", "delete": "Sil", "edit": "Düzenle", "close": "Kapat", "more": "Daha fazla", "pack": "Paket", "clear": "Temizle", "currency": "₾", "pleaseWait": "Lütfen bekleyin...", "continue": "Devam et", "submit": "Onayla", "goToHome": "Ana sayfaya git", "orderNumber": "Sipariş numarası", "backToHome": "Ana sayfaya dön", "startShopping": "Alışverişe başla", "continueShopping": "Alışverişe devam et", "total": "Toplam", "all": "Tümü", "searchDots": "Ara...", "yes": "Evet", "no": "Hayır", "goTo": "Git", "view": "Görüntüle", "viewDetails": "Ayrıntıları gör" };
const customerPicker = { "edit": "Düzenle", "remove": "Kaldır", "selectCustomer": "Müşteri seç", "selectCustomerHint": "Adına sipariş vermek istediğiniz müşteriyi seçin", "searchPlaceholder": "Ad, telefon, e-posta veya kimlik kodu…", "recentlyAdded": "Son eklenenler", "searchResults": "Arama sonuçları", "noCustomerFound": "Müşteri bulunamadı.", "noRecentCustomers": "Son müşteri yok.", "addNewCustomer": "Yeni müşteri ekle", "firstName": "Ad", "lastName": "Soyad", "mobile": "Cep telefonu", "email": "E-posta", "idCode": "Kimlik kodu", "idCodePlaceholder": "Kişisel / kimlik kodu", "address": "Adres", "addressPlaceholder": "Sokak, şehir…", "saveAndSelect": "Kaydet ve seç" };
const error = { "notFound": "Üzgünüz, aradığınız sayfa bulunamadı.", "forbidden": "Üzgünüz, bu sayfaya erişim yetkiniz yok.", "server": "Bizim tarafımızda bir sorun oluştu. Lütfen daha sonra tekrar deneyin.", "maintenance": "Bakım çalışması yapıyoruz. Lütfen kısa süre sonra tekrar kontrol edin.", "unexpected": "Beklenmeyen bir hata oluştu." };
const footer = { "rightsReserved": "Tüm hakları saklıdır.", "termsOfService": "Hizmet Şartları", "privacyPolicy": "Gizlilik Politikası", "cookiePolicy": "Çerez Politikası", "workingHours": "Pazartesi–Cuma, 09:00–18:00", "faq": "Sıkça sorulan sorular" };
const gallery = { "noImage": "Görsel yok" };
const item = { "notifyRestock": "Stoğa gelince haber ver", "noProducts": "Ürün bulunamadı", "maxQty": "Maksimum sipariş adedi: {count}", "similarProducts": "Benzer ürünler", "copyCode": "Ürün kodunu kopyala", "copyName": "Ürün adını kopyala", "branchAvchala": "Avchala şubesi", "branchDidube": "Didube şubesi", "wholesale": "Toptan", "pack": "Paket", "retail": "Perakende", "priceAppliesFrom": "Fiyat şu miktardan itibaren geçerli", "perPackPurchase": "paket alımında", "perUnitPurchase": "adet alımında", "packPrice": "Paket fiyatı", "unitPrice": "Birim fiyatı", "choosePack": "Paket seçin", "setupService": "Montaj hizmeti", "buyNow": "Şimdi satın al", "delivery": "Teslimat", "deliverySelfPickup": "Ofisten teslim alma:", "deliverySelfPickupText": "Ücretsiz. Teslim noktası", "onMap": "haritada", "deliveryTbilisi": "Tiflis içi teslimat: 500 ₾ üzeri siparişlerde ücretsiz", "deliveryRegions": "Bölgelere teslimat:", "seeDeliveryRates": "teslimat tarifelerine bakın", "deliveryUnloadNote": "Teslimat hizmetine ürünün araçtan indirilmesi ve kata taşınması dahil değildir.", "paymentMethods": "Ödeme yöntemleri", "paymentCards": "Kartla — Visa, MasterCard, sadakat puanları", "paymentBankTransfer": "Banka havalesi ile", "specifications": "Özellikler", "descriptionTab": "Açıklama", "noSpecifications": "Özellik belirtilmemiş.", "noDescription": "Açıklama belirtilmemiş." };
const nav = { "chooseCategory": "Kategori seçin", "catalog": "Katalog", "sales": "İndirimler", "myOrders": "Siparişlerim", "myAccount": "Hesabım", "adminPanel": "Yönetim paneli", "favorites": "Favoriler", "aboutUs": "Hakkımızda", "deliveryRates": "Teslimat ücretleri", "termsOfService": "Hizmet Şartları", "privacyPolicy": "Gizlilik", "cookiePolicy": "Çerez Politikası", "contactUs": "Bize ulaşın", "home": "Ana sayfa", "signIn": "Giriş yap", "signOut": "Çıkış yap" };
const orders = { "title": "Siparişlerim", "trackingBanner": "Sipariş durumunu ve teslimat bilgilerini görmek için web sitesine gidin ve takip numarasını girin.", "checkStatus": "Durumu kontrol et", "orderCount": "{count} sipariş", "totalAmount": "Toplam tutar", "orderNo": "Sipariş no.", "noProducts": "Ürün bulunamadı", "date": "Tarih", "trackingNumber": "Takip numarası", "details": "Ayrıntılar", "reorder": "Yeniden sipariş ver", "noOrders": "Sipariş bulunamadı.", "loadError": "Sipariş yüklenemedi.", "errorSummary": "Hata", "detailTitle": "Sipariş ayrıntıları", "orderHash": "Sipariş #{no}", "reorderTitle": "Yeniden sipariş #{no}", "delivery": "Teslimat", "deliveryLine": "Teslimat:", "trackingLine": "Takip numarası:", "payment": "Ödeme", "paymentMethod": "Ödeme yöntemi", "paymentStatus": "Ödeme durumu", "transactionId": "İşlem kimliği", "comment": "Yorum", "products": "Ürünler", "setupServiceLine": "Montaj hizmeti —", "unitPrice": "Birim fiyatı", "unitPriceShort": "Birim fiyat", "wholesale": "Toptan", "subtotal": "Ara toplam", "wholesaleDiscount": "Toptan indirim", "downloadInvoice": "Faturayı indir", "status": { "awaitingPayment": "Ödeme bekleniyor", "pending": "Onaylanmadı", "paid": "Ödendi", "ready": "Hazır", "dispatched": "Gönderildi", "delivered": "Teslim edildi", "cancelled": "Reddedildi", "cancelledAlt": "İptal edildi", "limit": "Limit" }, "paymentStatusLabels": { "pending": "Beklemede", "processing": "İşleniyor", "completed": "Tamamlandı", "failed": "Başarısız", "cancelled": "İptal edildi" }, "deliveryTypes": { "office": "Ofisten teslim alma", "tbilisi": "Tiflis", "regions": "Bölgeler" }, "providers": { "invoice": "Fatura", "cash": "Nakit" } };
const payment = { "successTitle": "Ödeme başarıyla tamamlandı", "confirmationEmailSent": "Onay e-postası adresinize gönderildi.", "cancelTitle": "Ödeme reddedildi", "cancelText": "Ödeme gerçekleştirilemedi. Tekrar deneyin veya başka bir yöntem seçin.", "tryAgain": "Tekrar dene", "invoiceSentTitle": "Fatura gönderildi", "invoiceSentText": "Fatura e-posta adresinize gönderildi", "invoiceNumber": "Fatura numarası", "checkEmailForPdf": "PDF fatura için e-postanızı kontrol edin", "checkSpam": "E-posta gelmediyse spam klasörünü kontrol edin", "limitOrderTitle": "Sipariş oluşturuldu", "limitOrderText": "Sipariş, limitli ödeme koşullarıyla başarıyla oluşturuldu" };
const places = { "exactAddress": "Tam adres", "requiredField": "Zorunlu alan", "pickFromList": "Aşağıdaki listeden uygun adresi seçin", "addressPlaceholder": "Adres" };
const pol = /* @__PURE__ */ JSON.parse(`{"about":{"title":"Hakkımızda","p1":"Sonniva Georgia, 2014 yılından bu yana Gürcistan pazarında başarıyla faaliyet göstermekte ve müşterilere geniş bir mobilya aksesuarı, alüminyum profil ve korkuluk parçası, cam ve duşakabin aksesuarı, el aleti, elektrikli alet ve hırdavat yelpazesi sunmaktadır.","p2":"Şirketin temel amacı; hem bireysel müşterilerin hem de iş sektörünün ihtiyaçlarını tam olarak karşılayan yüksek kaliteli ürünler, modern çözümler ve profesyonel hizmet sunmaktır.","p3":"Yıllar içinde Sonniva Georgia; mobilya üreticileri, tasarımcılar, inşaatçılar ve ustalar için güvenilir bir ortak haline geldi. Ürün yelpazemiz dünyanın önde gelen markalarının ürünlerini bir araya getirerek müşterilere kalite, işlevsellik ve yeniliğin en iyi birleşimini sunmamızı sağlıyor.","p4":"Şirket, hizmet kalitesine, ürün yelpazesinin sürekli yenilenmesine ve modern teknolojilerin benimsenmesine özel önem verir. Müşterilerin ihtiyaç duydukları ürün ve hizmetlere kolay ve hızlı şekilde ulaşmasını sağlayan çevrimiçi platformlarımızı da bu yaklaşımla oluşturduk.","p5":"Ticaret faaliyetinin yanı sıra Sonniva Georgia, müşterilere alüminyum kapı ve çerçevelerin özel üretimini, kesimini ve montajını sunar. Ekibimiz her projenin kaliteli şekilde tamamlanmasını, teknik desteği ve profesyonel danışmanlığı sağlar.","p6":"Bugün Sonniva Georgia gelişmeye devam ediyor, ürün yelpazesini genişletiyor ve müşteriler için yeni fırsatlar yaratıyor!","tagline":"Sonniva Georgia — tek bir çatı altında kalite, yenilik ve güvenilir ortaklık."},"cookie":{"title":"Çerez Politikası","lastUpdated":"Son güncelleme: Temmuz 2026","intro":"Bu Çerez Politikası, web sitemizde çerezleri ve benzer teknolojileri nasıl kullandığımızı açıklar. Yalnızca sitenin düzgün çalışması, güvenlik ve kullanım analizi için gerekli çerezleri kullanırız.","whatH":"Çerez nedir?","whatP":"Çerez, web sitesinin düzgün çalışması, performansını artırması veya en iyi kullanım deneyimini sunması için tarayıcınızda saklanan küçük bir metin dosyasıdır.","useH":"Çerezleri ne için kullanıyoruz","c1h":"1. Zorunlu çerezler","c1p":"Bu çerezler web sitesinin düzgün çalışması için gereklidir, bunlar arasında:","c1i1":"kullanıcı kimlik doğrulama oturumu çerezi","c1i2":"güvenlik ve CSRF koruması çerezi","c2h":"2. Google Places API (adres otomatik tamamlama)","c2p1":"Bir adres girdiğinizde, yazdığınız metin otomatik tamamlama önerileri oluşturmak için Google Places API'ye gönderilir. Bu istek kapsamında IP adresiniz de Google'a iletilir.","c2p2pre":"Bu hizmet çerez","c2p2strong":"ayarlamaz","c2p2mid":". Yalnızca adres girişine yardımcı olmak için kullanılır ve şuna tabidir:","googlePrivacyDat":"Google Gizlilik Politikası","googlePrivacyNom":"Google Gizlilik Politikası","c3h":"3. Google reCAPTCHA","c3p1":"Bu site, botlara ve spam'e karşı korunmak için Google reCAPTCHA kullanır. reCAPTCHA betiği şu çerezi ayarlar:","thCookie":"Çerez","thPurpose":"Amaç","thExpiry":"Süre","grecaptchaPurpose":"İnsanları botlardan ayırır","sixMonths":"6 ay","c3p2pre":"Kullanımı şuna tabidir:","c4h":"4. Google Analytics (GA4)","c4p1":"Ziyaretçilerin web sitemizi nasıl kullandığını (görüntülenen sayfalar, oturum süresi, trafik kaynağı) anlamak için Google Analytics GA4 kullanıyoruz. Bu veriler anonimleştirilir ve yalnızca web sitemizi geliştirmek için kullanılır.","c4p2":"Google Analytics şu çerezleri ayarlar:","gaPurpose":"Kullanıcıları ayırır","gaSessionPurpose":"Oturum durumunu korur","twoYears":"2 yıl","twentyFourHours":"24 saat","c4p3pre":"Daha fazla bilgi için bkz.","c4p3mid":". Şu eklenti ile devre dışı bırakabilirsiniz:","gaOptOut":"Google Analytics devre dışı bırakma eklentisi","c4p3post":".","manageH":"Çerez yönetimi","manageP1":"Çerezleri tarayıcı ayarlarınızdan kontrol edebilir veya devre dışı bırakabilirsiniz. Ancak zorunlu çerezleri devre dışı bırakmak web sitesinin çalışmasını engelleyebilir.","manageP2":"Çerez yönetimi hakkında bilgi için tarayıcınızın yardım bölümüne bakın.","c2p2":"Bu hizmet çerez {strong}. Yalnızca adres girişine yardımcı olmak için kullanılır ve şuna tabidir: {link}.","c3p2":"Kullanımı şuna tabidir: {link}.","c4p3":"Daha fazla bilgi için bkz. {link}. Şu eklenti ile devre dışı bırakabilirsiniz: {link2}."},"privacy":{"title":"Gizlilik Politikası","contactCompany":"Sonniva Georgia LLC","contactEmailLabel":"E-posta:","contactWebLabel":"Web sitesi:","sections":[{"h":"1. Genel bilgiler","body":["Müşterilerin kişisel verilerinin korunması ve gizliliğin sağlanması Sonniva Georgia LLC için önemlidir. Kişisel bilgilerinizi yasa gereklilikleri ile adalet, şeffaflık ve güvenlik ilkelerine uygun şekilde işlemeyi taahhüt ederiz.","Bu gizlilik politikası, hangi tür bilgileri topladığımızı, bunları hangi amaçla kullandığımızı, verilerinizi nasıl koruduğumuzu ve veri sahibi olarak hangi haklara sahip olduğunuzu açıklar.","Bu politika, Sonniva Georgia web sitesi, çevrimiçi platformları, sosyal medya kanalları, fiziksel mağazaları ve şirketin müşterilere sunduğu tüm hizmetler için geçerlidir."]},{"h":"2. Hangi verileri topluyoruz","intro":"Şirketle iletişim sırasında aşağıdaki bilgileri toplayabiliriz:","items":["ad ve soyad;","kişisel veya kimlik numarası (gerektiğinde);","cep telefonu numarası;","e-posta adresi;","teslimat veya yasal adres;","şirket adı ve kimlik kodu;","sipariş, ödeme ve teslimat geçmişi;","iletişim kayıtları;","web sitesinin kullanımına ilişkin teknik bilgiler;","IP adresi, cihaz türü ve tarayıcı verileri;","çerezler ve benzer teknolojiler yoluyla elde edilen bilgiler."]},{"h":"3. Veri işleme amaçları","intro":"Verilerin toplanması ve işlenmesi aşağıdaki amaçlarla yapılır:","items":["siparişlerin alınması, işlenmesi ve yerine getirilmesi;","ürün teslimatının organize edilmesi;","garanti ve satış sonrası hizmetin sağlanması;","müşteri desteğinin sunulması;","faturaların ve diğer mali belgelerin hazırlanması;","hizmet kalitesinin iyileştirilmesi;","istatistiksel ve analitik verilerin işlenmesi;","güvenliğin sağlanması ve dolandırıcılık faaliyetlerinin önlenmesi;","müşterinin onay verdiği durumlarda pazarlama tekliflerinin ve haberlerin paylaşılması;","yasa gereği yükümlülüklerin yerine getirilmesi."]},{"h":"4. Verilerin saklanma süresi","body":["Sonniva Georgia, kişisel verileri yalnızca hizmetin sunulması, iş süreçlerinin yönetilmesi ve yasa gereği belirlenen gerekliliklerin karşılanması için gerekli olan süre boyunca saklar.","Saklama süresi dolduktan sonra veriler silinir veya kişinin artık tanımlanamayacağı şekilde anonimleştirilir."]},{"h":"5. Bilgiler kimlerle paylaşılabilir","intro":"Verileriniz yalnızca hizmetin eksiksiz sunulması için gerekli olan kişi ve kuruluşlarla paylaşılabilir, bunlar arasında:","items":["kurye ve nakliye şirketleri;","ödeme hizmeti sağlayıcıları;","yazılım ve teknoloji ortakları;","muhasebe ve hukuk hizmeti sağlayıcıları;","yasa gereği öngörülen durumlarda devlet kurumları."],"outro":"Şirket, müşterilerin kişisel verilerini ticari amaçlarla üçüncü taraflara satmaz, kiralamaz ve devretmez."},{"h":"6. Veri güvenliği","body":["Bilgilerinizi korumak için modern teknik ve organizasyonel mekanizmalar kullanırız. Güvenlik önlemleri, verilerin yetkisiz erişime, değiştirilmeye, kaybolmaya, yok edilmeye ve yasa dışı kullanıma karşı korunmasını içerir.","Yine de internet üzerinden veri iletiminin hiçbir yöntemi tamamen güvenli değildir, bu nedenle mutlak güvenlik garantisi sağlanamaz."]},{"h":"7. Çerezlerin kullanımı","intro":"Web sitemiz, aşağıdaki amaçlarla çerezleri ve benzer teknolojileri kullanır:","items":["sitenin düzgün çalışmasını sağlamak;","kullanıcının ayarlarını hatırlamak;","ziyaretçi davranışını analiz etmek;","kullanıcı deneyimini iyileştirmek;","daha alakalı bilgi ve teklifler sunmak."],"outro":"Kullanıcı, çerezleri kendi tarayıcı ayarlarından yönetebilir veya devre dışı bırakabilir."},{"h":"8. Kullanıcı hakları","intro":"Şu haklara sahipsiniz:","items":["hakkınızda işlenen veriler hakkında bilgi almak;","verilerin düzeltilmesini veya güncellenmesini talep etmek;","yasanın izin verdiği ölçüde verilerin silinmesini talep etmek;","verilerin işlenmesini kısıtlamak;","işleme onaya dayanıyorsa onayı geri çekmek;","haklarınızın ihlal edildiğini düşünüyorsanız ilgili denetim kurumuna başvurmak."]},{"h":"9. Üçüncü taraf bağlantıları","body":["Web sitemizde başka web sitelerine bağlantılar bulunabilir. Sonniva Georgia, bu web sitelerinin gizlilik politikasından veya içeriğinden sorumlu değildir. Her web sitesinin ilgili koşullarını incelemenizi öneririz."]},{"h":"10. Politika güncellemeleri","body":["Şirket, bu politikayı periyodik olarak güncelleme veya değiştirme hakkını saklı tutar. Güncellenmiş sürüm web sitesinde yayınlanır ve yayınlandığı andan itibaren yürürlüğe girer."]},{"h":"11. İletişim bilgileri","intro":"Kişisel verilerin işlenmesiyle ilgili sorularınız, yorumlarınız veya talepleriniz varsa bizimle iletişime geçin:","outro":"Güveniniz bizim için önemlidir ve kişisel verilerinizin maksimum düzeyde korunmasını ve güvenliğini sağlamaya çalışıyoruz."}]},"terms":{"title":"Hizmet Koşulları","paymentH":"Ödeme yöntemleri","payCardH":"Kartla ödeme","payCardIntro":"Çevrimiçi ödeme için herhangi bir uluslararası banka kartını kullanabilirsiniz:","payCardOutro":"Ödeme, güvenli bir elektronik ödeme sistemi aracılığıyla gerçekleştirilir.","payTransferH":"Banka havalesi","payTransferP1":"Ödeme, fatura esasına dayalı olarak banka havalesiyle yapılabilir.","payTransferP2":"Bu yöntem hem gerçek kişiler hem de tüzel kişiler için kullanılabilir.","payContractH":"Sözleşme esasına dayalı ödeme","payContractP":"Tüzel kişilere bireysel iş birliği koşulları sunuyoruz.","deliveryH":"Teslimat koşulları","delFreeH":"Ücretsiz teslimat","delFreeP":"500 GEL ve üzeri değerdeki siparişlerde Tiflis içi ücretsiz teslimat geçerlidir.","delRegionsH":"Bölgelere teslimat","delRegionsP":"Bölgelere yapılan siparişlerin teslimat süresi en fazla 5 iş günüdür.","delZonesH":"Şubeden Tiflis genelinde teslimat ücreti","zone1":"Bölge I – 5-40 GEL","zone2":"Bölge II – 5-50 GEL","zone3":"Bölge III – 5-60 GEL","zone1Items":["Gldani","Gldanula","Gldani köyü","Zahesi","Avchala","Temka","Mukhiani","Dighomi","Dighomi sitesi","Didi Dighomi","Dighomi köyü"],"zone2Items":["Vake","Saburtalo","Bagebi","Lisi","Vashlijvari","Ortachala","Mtatsminda","Sololaki","Vera","Didube","Chughureti","Nadzaladevi"],"zone3Items":["Isani","Samgori","Lilo","Orkhevi","Havalimanı yerleşimi","Aşağı Ponichala","Yukarı Ponichala","Varketili","Tskneti","Kojori","Tabakhmela","Tsavkisi","Shindisi","Okrokana","Napetvrebi"],"delAdditionalH":"Ek koşullar","delAdditionalItems":["Hipermarketlerden ücretsiz teslimat hizmeti yalnızca toplam sipariş tutarı 1500 GEL'i aştığında geçerlidir.","Teslimat hizmeti, ürünlerin varış adresine taşınmasını kapsar. Ürünlerin araçtan indirilmesi, binaya taşınması veya kata çıkarılması hizmete dahil değildir.","Çevrimiçi satın alınan ürünlerin taşıma ücreti, teslimat yöntemi seçildikten sonra sipariş tamamlanırken otomatik olarak hesaplanır."],"delFormulaItemPre":"Büyük hacimli koliler için taşıma ücreti hacimsel ağırlığa göre hesaplanabilir. Hacimsel ağırlık fiziksel ağırlığı aşarsa aşağıdaki formül kullanılır:","delFormula":"uzunluk (cm) × genişlik (cm) × yükseklik (cm) ÷ 5000","delMaxLengthItem":"Uzunluğu 4 metreyi aşmayan ürünlerin teslimatını sağlıyoruz.","delContactNote":"Daha fazla bilgi için lütfen bizimle iletişime geçin.","returnsH":"İade, değişim, saklama koşulları ve garanti hizmeti","warrantyH":"Garanti hizmeti","warrantyP1":"Garanti hizmeti yalnızca resmi bir garanti belgesiyle birlikte gelen ürünler için geçerlidir.","warrantyP2":"Garanti belgesi, ürünün satın alındığı anda müşteriye verilir.","warrantyIntro":"Lütfen garanti koşullarının aşağıdaki nedenlerle oluşan hasarları kapsamadığını unutmayın:","warrantyItems":["mekanik etki;","yanlış montaj veya kullanım;","dikkatsizlik veya amaç dışı kullanım;","doğal aşınma;","üretici talimatlarının ihlali."],"warrantyOutro":"Bazı ürünler için garanti hizmeti geçerli olmayabilir veya farklı koşullara sahip olabilir; bu, ilgili ürünün açıklamasında veya garanti belgesinde belirtilir.","exchangeH":"Ürün değişimi","exchangeIntro":"Sonniva Georgia aşağıdaki durumlarda ürün değişimi sağlar:","exchangeItems":["üründe fabrika kusuru varsa (mekanik hasar hariç);","sipariş işleme veya teslim sürecinde bir hata oluşmuş ve müşteri yanlış model, boyut, renk veya özelliklere sahip bir ürün almışsa;","müşteri, ürünü teslim aldıktan sonraki 14 takvim günü içinde başka bir eşdeğer modelle değiştirmek isterse."],"exchangeOutro":"Değişim için müşteri, satın alımın yapıldığı şubeye başvurmalı veya bir şirket temsilcisiyle iletişime geçmelidir.","returnH":"Ürün iadesi","returnIntro":"Müşteri, aşağıdaki koşulların sağlanması halinde satın aldığı ürünü satın alma tarihinden itibaren 14 takvim günü içinde iade etme hakkına sahiptir:","returnItems":["ürün kullanılmamış olmalı;","ürünün orijinal durumu korunmuş olmalı;","ambalaj hasarsız olmalı;","fabrika etiketleri, çıkartmalar ve koruyucu unsurlar korunmuş olmalı;","üründe kullanım veya mekanik hasar izi bulunmamalı."],"returnOutro":"Ürün yukarıda sıralanan koşulları karşılamıyorsa şirket iadeyi reddetme hakkını saklı tutar.","storageH":"Sipariş saklama koşulları","storageP1":"Müşteri sipariş verirken teslim alma hizmetini seçtiyse ve sipariş tamamen ödenmişse, şirket ürünleri 5 iş günü boyunca saklar.","storageIntro":"Müşteri bu süre içinde siparişi teslim almaya gelmez ve saklama süresinin uzatılmasını önceden kararlaştırmazsa, Sonniva Georgia şu haklara sahiptir:","storageItems":["siparişi iptal etmek;","ürünleri depo stoğuna geri döndürmek;","gerekirse ek saklama ücreti tahsil etmek."]},"delivery":{"title":"Teslimat tarifeleri","headerSubtitle":"Tüm teslimat seçenekleri ve fiyatları tek sayfada","methodOfficeTitle":"Sonniva şubesinden teslim alma","methodOfficeSubtitle":"Avchala — Shushi Cad. 38","methodTbilisiTitle":"Tiflis içi teslimat","methodTbilisiSubtitle":"Bölgeye göre","methodRegionsTitle":"Bölgelere teslimat","methodRegionsSubtitle":"Ağırlık ve türe göre","free":"Ücretsiz","officeSectionTitle":"Sonniva şubesinden teslim alma","officeFullyFree":"Tamamen ücretsiz","avchalaAddress":"Avchala, Shushi Cad. 38","didubeAddress":"Didube, Zaira Kikvidze Cad. 6","hours":"Pazartesi–Cuma, 09:00–18:00","mapLinkText":"Adresi görmek için bağlantıya tıklayın","tbilisiSectionTitle":"Tiflis içi teslimat","tbilisiPriceByZone":"Fiyat bölgeye göre belirlenir","freeThreshold":"{amount} üzeri siparişlerde — Tiflis içi teslimat {free}","freeThresholdWord":"ücretsizdir","zone1":"Bölge I","zone2":"Bölge II","zone3":"Bölge III","regionsSectionTitle":"Bölgelere teslimat","regionsPriceByWeightType":"Fiyat ağırlık ve türe göre belirlenir","legendOnwayTitle":"OnWay şubesi","legendOnwaySub":"Şubeden teslim alma","legendCityTitle":"Şehir / ilçe","legendCitySub":"Adrese teslimat","legendVillageTitle":"Köy","legendVillageSub":"Köye teslimat","thWeight":"Ağırlık","weightRange":"{from} – {to} kg"}}`);
const promo = { "doorsTitle": "Membran kapılar", "doorsText": "İstediğiniz ölçü ve renklerde membran kapı sipariş edin", "framesTitle": "Alüminyum çerçeveler", "framesText": "İstediğiniz ölçülerde alüminyum çerçeve üretiyoruz" };
const quickView = { "orderNow": "Şimdi sipariş ver" };
const sales = { "title": "İndirimler", "metaDescription": "Sonniva'nın indirimli ürünlerine göz atın", "limitedTime": "Sınırlı süre", "heading": "İndirimler", "subheading": "En iyi fiyatlarla ürünleri keşfedin.", "empty": "Şu anda indirimli ürün yok" };
const search = { "foundCount": "{count} ürün bulundu", "noResults": '"{query}" için ürün bulunamadı', "tryAnother": "Farklı bir arama terimi deneyin", "pack": "Paket", "wishlist": "Favoriler", "quickView": "Hızlı bakış", "showMore": "Daha fazla göster", "titleWithQuery": "Arama: {query}", "filter": "Filtre", "price": "Fiyat", "min": "Min.", "max": "Maks.", "stock": "Stok" };
const seo = { "homeDescription": "Sonniva - mobilya bağlantı elemanları, kulplar, çekmece rayları ve inşaat malzemeleri. Gürcistan'ın en iyi kalitesi ve fiyatları.", "aboutTitle": "Hakkımızda", "aboutDescription": "Sonniva hakkında daha fazla bilgi edinin - Gürcistan'da mobilya bağlantı elemanları ve inşaat malzemeleri alanında lider tedarikçi." };
const share = { "share": "Paylaş", "shareHeading": "Paylaş", "copyLink": "Bağlantıyı kopyala", "copied": "Kopyalandı!" };
const stockNotify = { "notifyWhenBack": "Stoğa girince bana haber ver", "enabled": "Bildirim etkin", "backSmsNote": "Ürün stoğa girer girmez SMS bildirimi alacaksınız.", "loginRequired": "Giriş gerekli", "loginRequiredText": "Bildirimlere abone olmak için lütfen giriş yapın.", "subscribeTitle": "Bildirime abone ol", "subscribeText": "Ürün stoğa girer girmez SMS almak ister misiniz?" };
const whatsapp = { "requestOrder": "Sipariş talep et", "redirectText": "Sipariş vermek için bize mesaj atabileceğiniz veya arayabileceğiniz WhatsApp sayfamıza yönlendireceğiz." };
const wishlist = { "title": "Favoriler", "savedOne": "ürün kaydedildi", "savedMany": "kaydedildi", "emptyHeading": "Favori listeniz boş", "emptyText": "Beğendiklerinizi kaydedin ve istediğiniz zaman geri dönün." };
const tr = {
  account,
  auth,
  cart,
  catalog,
  checkout,
  common,
  customerPicker,
  error,
  footer,
  gallery,
  item,
  nav,
  orders,
  payment,
  places,
  pol,
  promo,
  quickView,
  sales,
  search,
  seo,
  share,
  stockNotify,
  whatsapp,
  wishlist
};
const _sfc_main$2 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "flex flex-col lg:flex-row items-center justify-around gap-6 px-6 py-5 sm:py-10 bg-white border-t border-slate-200" }, _attrs))} data-v-4aa68729><div class="flex flex-col items-center gap-3" data-v-4aa68729><div class="flex items-center gap-3" data-v-4aa68729>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "#",
        target: "_blank",
        rel: "noopener noreferrer"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="pi pi-linkedin text-lg lg:text-2xl text-[#0A66C2] inline-block scale-95" data-v-4aa68729${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "pi pi-linkedin text-lg lg:text-2xl text-[#0A66C2] inline-block scale-95" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "https://www.facebook.com/FurnituraSonniva",
        target: "_blank",
        rel: "noopener noreferrer"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="pi pi-facebook text-lg lg:text-2xl text-[#1877F2]" data-v-4aa68729${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "pi pi-facebook text-lg lg:text-2xl text-[#1877F2]" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "https://www.instagram.com/sonnivageorgia/",
        target: "_blank",
        rel: "noopener noreferrer"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="pi pi-instagram text-lg lg:text-2xl instagram-icon" data-v-4aa68729${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "pi pi-instagram text-lg lg:text-2xl instagram-icon" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex flex-col items-center space-y-3 order-3 sm:order-2" data-v-4aa68729><div data-v-4aa68729><p class="text-center text-sm text-gray-500" data-v-4aa68729> © 2025, <span class="text-[#c80a1d]" data-v-4aa68729>Sonniva Georgia</span> - ${ssrInterpolate(_ctx.$t("footer.rightsReserved"))}</p></div><div class="flex flex-col lg:flex-row items-center justify-center gap-2 text-xs text-gray-500" data-v-4aa68729>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("terms-of-service"),
        class: "hover:text-brand-500"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("footer.termsOfService"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("footer.termsOfService")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("privacy-policy"),
        class: "hover:text-brand-500"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("footer.privacyPolicy"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("footer.privacyPolicy")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("cookie-policy"),
        class: "hover:text-brand-500"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("footer.cookiePolicy"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("footer.cookiePolicy")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex flex-col items-center gap-2 order-2 sm:order-3" data-v-4aa68729><div class="flex items-center gap-2 text-sm text-gray-500" data-v-4aa68729><i class="pi pi-clock text-gray-500" data-v-4aa68729></i><span data-v-4aa68729>${ssrInterpolate(_ctx.$t("footer.workingHours"))}</span></div><a href="tel:032-269-36-99" class="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-500 transition-colors" data-v-4aa68729><i class="pi pi-phone text-[#c80a1d]" data-v-4aa68729></i><span class="font-medium" data-v-4aa68729>032 269 36 99</span></a></div></footer>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-4aa68729"]]);
const _sfc_main$1 = {
  __name: "NavSubmenu",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative overflow-hidden bg-brand-500" }, _attrs))}><div class="absolute inset-y-0 left-0 right-0 lg:left-2 lg:right-2 xl:left-6 xl:right-6 bg-neutral-950 rounded-none lg:rounded-xl lg:-skew-x-12"></div><div class="hidden lg:block absolute left-[4%] top-1/2 -translate-y-1/2 w-20 h-10 opacity-30 pointer-events-none" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle, #fbbf24 1px, transparent 1px)", "background-size": "10px 10px" })}"></div><div class="relative z-10 w-full lg:max-w-11/12 2xl:max-w-9/12 mx-auto px-3 sm:px-7 flex justify-between items-center py-1"><div class="hidden lg:block"></div><div class="flex items-center justify-center gap-4 lg:gap-6"><div class="hidden md:flex flex-col items-end gap-1.5 shrink-0"><span class="w-4 h-px bg-brand-500"></span><span class="w-10 h-px bg-brand-500"></span><span class="w-6 h-px bg-brand-500"></span></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("sales.index"),
        class: "group flex items-center gap-2.5 lg:gap-3 bg-brand-500 text-neutral-950 font-extrabold px-7 lg:px-9 py-1 lg:py-2 shrink-0 transition-colors duration-300 hover:bg-brand-400 [clip-path:polygon(16px_0,calc(100%-16px)_0,100%_50%,calc(100%-16px)_100%,16px_100%,0_50%)]"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-neutral-950 shrink-0 transition-transform duration-500 group-hover:rotate-90"${_scopeId}><i class="pi pi-percentage text-xs lg:text-sm text-brand-400"${_scopeId}></i></span><span class="text-sm lg:text-lg tracking-wide whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.$t("nav.sales"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-neutral-950 shrink-0 transition-transform duration-500 group-hover:rotate-90" }, [
                createVNode("i", { class: "pi pi-percentage text-xs lg:text-sm text-brand-400" })
              ]),
              createVNode("span", { class: "text-sm lg:text-lg tracking-wide whitespace-nowrap" }, toDisplayString(_ctx.$t("nav.sales")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex flex-col items-start gap-1.5 shrink-0"><span class="w-6 h-px bg-brand-500"></span><span class="w-10 h-px bg-brand-500"></span><span class="w-4 h-px bg-brand-500"></span></div></div><div class="flex justify-end"><a href="tel:+9950322693699" class="group flex items-center gap-2.5 lg:gap-3 shrink-0 text-white"><span class="flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-brand-500 shrink-0 transition-colors duration-300 group-hover:bg-brand-400"><i class="pi pi-phone text-sm lg:text-base text-neutral-950 transition-transform duration-300 group-hover:rotate-20"></i></span><span class="font-bold text-sm lg:text-lg whitespace-nowrap">032 269 36 99</span></a></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/menu/NavSubmenu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    computed(() => page.props.isLoggedIn);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Toast = script;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "body-content flex flex-col min-h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<main class="flex-1 w-full lg:max-w-10/12 mx-auto space-y-4 mb-4">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(ssrRenderComponent(_component_Toast, { position: "top-right" }, null, _parent));
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ConfirmationService = {
  install: function install(app) {
    var ConfirmationService2 = {
      require: function require2(options) {
        ConfirmationEventBus.emit("confirm", options);
      },
      close: function close() {
        ConfirmationEventBus.emit("close");
      }
    };
    app.config.globalProperties.$confirm = ConfirmationService2;
    app.provide(PrimeVueConfirmSymbol, ConfirmationService2);
  }
};
var ToastService = {
  install: function install2(app) {
    var ToastService2 = {
      add: function add(message) {
        ToastEventBus.emit("add", message);
      },
      remove: function remove(message) {
        ToastEventBus.emit("remove", message);
      },
      removeGroup: function removeGroup(group) {
        ToastEventBus.emit("remove-group", group);
      },
      removeAllGroups: function removeAllGroups() {
        ToastEventBus.emit("remove-all-groups");
      }
    };
    app.config.globalProperties.$toast = ToastService2;
    app.provide(PrimeVueToastSymbol, ToastService2);
  }
};
const DEFAULT_LOCALE = "ka";
const PREFIXED_LOCALES = ["en", "ru", "tr"];
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const emitter = mitt();
if (typeof window !== "undefined") window.emitter = emitter;
const stripLocalePrefix = (pathname) => {
  const seg = pathname.split("/")[1];
  return PREFIXED_LOCALES.includes(seg) ? pathname.slice(seg.length + 1) || "/" : pathname;
};
const ziggyLocation = typeof window !== "undefined" ? {
  get host() {
    return window.location.host;
  },
  get pathname() {
    return stripLocalePrefix(window.location.pathname);
  },
  get search() {
    return window.location.search;
  }
} : void 0;
const appName = "Sonniva";
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#e6f4ec",
      100: "#cce9d9",
      200: "#99d4b3",
      300: "#66be8e",
      400: "#33a968",
      500: "#0b913a",
      // Primary color set to custom hex
      600: "#0a8234",
      700: "#086f2d",
      800: "#065c26",
      900: "#04491f",
      950: "#023617"
    },
    colorScheme: {
      light: {
        surface: {
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}"
        }
      },
      dark: {
        surface: {
          0: "#ffffff",
          50: "{slate.50}",
          100: "{slate.100}",
          200: "{slate.200}",
          300: "{slate.300}",
          400: "{slate.400}",
          500: "{slate.500}",
          600: "{slate.600}",
          700: "{slate.700}",
          800: "{slate.800}",
          900: "{slate.900}",
          950: "{slate.950}"
        },
        formField: {
          background: "{slate.800}",
          focusBorderColor: "{slate.400}",
          placeholderColor: "{slate.400}"
        }
      }
    }
  }
});
const render = await createInertiaApp({
  progress: {
    // The delay after which the progress bar will appear, in milliseconds...
    delay: 150,
    // The color of the progress bar...
    color: "red",
    // Whether to include the default NProgress styles...
    includeCSS: true,
    // Whether the NProgress spinner will be shown...
    showSpinner: false
  },
  title: (title) => title ? `${title} - ${appName}` : appName,
  resolve: async (name) => {
    const page = await resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Account/Index.vue": () => import("./assets/Index-DY4zPM85.js"), "./Pages/Account/UpdatePassword.vue": () => import("./assets/UpdatePassword-w3MdUYUt.js"), "./Pages/Admin/AdminLayout.vue": () => import("./assets/AdminLayout-BRG84mek.js").then((n2) => n2.A), "./Pages/Admin/Analytics/Index.vue": () => import("./assets/Index-Chl6oSCD.js"), "./Pages/Admin/HomePage/HeroBannersTab.vue": () => import("./assets/HeroBannersTab-C-1mqKeR.js"), "./Pages/Admin/HomePage/HomeSectionCard.vue": () => import("./assets/HomeSectionCard-BRVwoASg.js"), "./Pages/Admin/HomePage/HomeSectionsTab.vue": () => import("./assets/HomeSectionsTab-DiOJLKFJ.js"), "./Pages/Admin/HomePage/Index.vue": () => import("./assets/Index-BWGPw0uW.js"), "./Pages/Admin/Index.vue": () => import("./assets/Index-AWxwS_Y8.js"), "./Pages/Admin/StockNotifications/Index.vue": () => import("./assets/Index-0qv86bfM.js"), "./Pages/Admin/items/DiscountedItems.vue": () => import("./assets/DiscountedItems-BXQrIRA1.js"), "./Pages/Admin/items/Index.vue": () => import("./assets/Index-5HBqz-hm.js"), "./Pages/Admin/items/ItemsListing.vue": () => import("./assets/ItemsListing-BsD3wlP1.js"), "./Pages/Admin/items/ManageItemDialog.vue": () => import("./assets/ManageItemDialog-B2zbvn2X.js"), "./Pages/Admin/items/ManageItemKeywordsTab.vue": () => import("./assets/ManageItemKeywordsTab-uWGtrf1Q.js"), "./Pages/Admin/items/ManageItemsTab.vue": () => import("./assets/ManageItemsTab-VV3WEKDz.js"), "./Pages/Admin/items/SyncCategoriesTab.vue": () => import("./assets/SyncCategoriesTab-CJO93bTz.js"), "./Pages/Admin/orders/Index.vue": () => import("./assets/Index-DMrNEbjT.js"), "./Pages/Admin/orders/OrderDetailDialog.vue": () => import("./assets/OrderDetailDialog-CYqFpZ_x.js"), "./Pages/Admin/payments/Index.vue": () => import("./assets/Index-BMjultXs.js"), "./Pages/Admin/users/Index.vue": () => import("./assets/Index-DkqKqm7N.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-Cv1L30L6.js"), "./Pages/Auth/ForgotPasswordVerifyPhone.vue": () => import("./assets/ForgotPasswordVerifyPhone-DkNgi28u.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-BYUs-6Vh.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-DunNPJm3.js"), "./Pages/Auth/RegisterVerifyPhone.vue": () => import("./assets/RegisterVerifyPhone-aS1W_FzV.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-Dg4lzs9j.js"), "./Pages/Cart/Index.vue": () => import("./assets/Index-B0UMWXy_.js"), "./Pages/Checkout/Index.vue": () => import("./assets/Index-Bjg7WUpW.js"), "./Pages/Contact/ContactButtons.vue": () => import("./assets/ContactButtons-DEj4wxBE.js"), "./Pages/Error.vue": () => import("./assets/Error-DI8WjqNf.js"), "./Pages/Home/Index.vue": () => import("./assets/Index-PyoljyrQ.js"), "./Pages/Home/ReadMore.vue": () => import("./assets/ReadMore-DdWmz2RR.js"), "./Pages/Items/ActiveFilterChips.vue": () => import("./assets/ActiveFilterChips-DTclLlM2.js"), "./Pages/Items/Index.vue": () => import("./assets/Index-DyOux6lg.js"), "./Pages/Items/ItemGallery.vue": () => import("./assets/ItemGallery-DwdMBoZv.js"), "./Pages/Items/Show.vue": () => import("./assets/Show-Cs3KH8Fl.js"), "./Pages/Items/SimilarItems.vue": () => import("./assets/SimilarItems-Bddr_MoV.js"), "./Pages/Items/SubcategoryStrip.vue": () => import("./assets/SubcategoryStrip-BsI0AUf3.js"), "./Pages/Payment/Cancel.vue": () => import("./assets/Cancel-C9DGUJ5_.js"), "./Pages/Payment/InvoiceSuccess.vue": () => import("./assets/InvoiceSuccess-DXkiM7ei.js"), "./Pages/Payment/LimitSuccess.vue": () => import("./assets/LimitSuccess-BRJ0xTIW.js"), "./Pages/Payment/Success.vue": () => import("./assets/Success-D75JhAqJ.js"), "./Pages/Policies/CookiePolicy.vue": () => import("./assets/CookiePolicy-BkpF6_RT.js"), "./Pages/Policies/DeliveryRates.vue": () => import("./assets/DeliveryRates-o2LyRXMc.js"), "./Pages/Policies/PrivacyPolicy.vue": () => import("./assets/PrivacyPolicy-C-M6h0zj.js"), "./Pages/Policies/TermsOfService.vue": () => import("./assets/TermsOfService-DAwLb-QD.js"), "./Pages/PrimevueComponents/PrimeInputText.vue": () => import("./assets/PrimeInputText-BlIRrCdA.js"), "./Pages/Sales/Index.vue": () => import("./assets/Index-CGtGfwHS.js"), "./Pages/Search/Index.vue": () => import("./assets/Index-Bxj49kZ_.js"), "./Pages/UserOrders/Index.vue": () => import("./assets/Index-CVf0ihCe.js"), "./Pages/UserOrders/OrderDetailDialog.vue": () => import("./assets/OrderDetailDialog-BxuLNtQU.js"), "./Pages/UserOrders/ReorderDialog.vue": () => import("./assets/ReorderDialog-CRmHH0nI.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-DaGKOMOX.js"), "./Pages/Wishlist/Index.vue": () => import("./assets/Index-BMRMi-0_.js"), "./Pages/about-us/Index.vue": () => import("./assets/Index-B-b2ZUkv.js") }));
    page.default.layout ??= _sfc_main;
    return page;
  },
  setup({ el, App, props, plugin }) {
    const ziggy = {
      ...Ziggy$1,
      url: "https://www.sonniva.ge",
      port: null,
      ...props.initialPage.props.ziggy || {}
    };
    const { location: _ziggyLoc, ...ziggyConfig } = ziggy;
    const ziggyForVue = typeof window !== "undefined" ? { ...ziggyConfig, location: ziggyLocation } : ziggy;
    const app = createApp({ render: () => h$1(App, props) });
    const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      locale: props.initialPage.props.locale ?? DEFAULT_LOCALE,
      fallbackLocale: DEFAULT_LOCALE,
      messages: { ka, en, ru, tr }
    });
    router.on("success", (event) => {
      i18n.global.locale.value = event.detail.page.props.locale ?? DEFAULT_LOCALE;
    });
    app.use(plugin);
    app.use(pinia);
    app.use(U, ziggyForVue);
    app.use(i18n);
    app.provide("emitter", emitter);
    app.config.globalProperties.$formatNumber = formatNumber;
    app.component("Head", Head);
    app.component("Select", script$1);
    app.component("FloatLabel", script$2);
    app.directive("keyfilter", KeyFilter);
    app.directive("tooltip", Tooltip);
    app.directive("ripple", Ripple);
    app.use(ConfirmationService);
    app.use(ToastService);
    app.use(PrimeVue, {
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: ".my-app-dark",
          cssLayer: {
            name: "primevue",
            order: "theme, base, primevue"
          }
        }
      },
      ptOptions: { mergeSections: true, mergeProps: true },
      pt: {
        button: {
          root: { class: "text-sm py-1.5 px-3" },
          icon: { class: "text-sm" }
        },
        selectbutton: {
          pcToggleButton: {
            root: { class: "bg-transparent border-none max-h-12 text-sm" },
            content: ({ context }) => ({
              class: context.active ? "bg-brand-500 border border-brand-300 text-white font-semibold rounded-md px-6 py-2" : "bg-transparent border border-slate-300 font-semibold rounded-md px-6 py-2"
            })
          }
        },
        select: {
          listContainer: { class: "text-sm" },
          root: { class: "focus-within:border-brand-400" },
          pcFilter: { root: { class: "rounded-xl" } }
        },
        // ── InputText ──────────────────────────────────────
        inputtext: {
          root: ({ props: props2, state }) => ({
            class: [
              "w-full px-3 py-2.5",
              "border border-slate-300",
              "text-sm font-medium text-slate-700",
              "placeholder:text-slate-400",
              "transition-all duration-200",
              "outline-none",
              state?.focused || props2?.focused ? "border-brand-500 ring-3 ring-brand-500/15" : "",
              props2?.disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
            ]
          })
        },
        // PrimeVue force-focuses the header close button when a dialog opens
        // (no other autofocus target exists in header/footer/content), using
        // focus({ focusVisible: true }) - which paints the focus-visible ring
        // even though nothing was actually pressed. Suppress it there only.
        dialog: {
          pcCloseButton: {
            root: { class: "focus-visible:outline-none focus-visible:shadow-none" }
          }
        },
        panel: {
          root: { class: "border-none !m-0" },
          header: {
            class: "text-sm font-medium text-gray-500 !p-0 cursor-pointer select-none",
            onClick: (e2) => {
              if (!e2.target.closest("button")) {
                e2.currentTarget.querySelector("button")?.click();
              }
            }
          },
          pcTogglebutton: {
            root: { class: "size-5" }
          },
          content: { class: "mt-3 p-0!" }
        },
        toast: {
          root: () => ({
            class: `!fixed max-sm:!bottom-14 sm:!right-4 !right-0 max-sm:!w-full px-4 pointer-events-none`
          }),
          // make the actual toast clickable again
          message: () => ({
            class: `
                          pointer-events-auto
                        `
          }),
          detail: () => ({
            class: `text-[13px] sm:text-sm `
          }),
          summary: () => ({
            class: `text-sm`
          }),
          messageIcon: () => ({
            class: `w-4 h-4 mt-0.5`
          })
        },
        global: {
          css: `

                    `
        }
      }
    });
    if (el) app.mount(el);
    return app;
  }
});
const renderPage = (page) => render(page, renderToString);
{
  createServer(renderPage);
}
export {
  renderPage as default
};
//# sourceMappingURL=app.js.map
