import axios from "axios";
import { mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext, computed, createApp, h as h$1 } from "vue";
import { Link, usePage, router, createInertiaApp, Head } from "@inertiajs/vue3";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { _ as _sfc_main$3, s as script, C as ConfirmationEventBus, T as ToastEventBus } from "./assets/index-fPWhUr3j.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderSlot, renderToString } from "vue/server-renderer";
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
import "./assets/QuickViewDialog-D3Np2Bmz.js";
import "./assets/index-D46B4f3g.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primevue/core/basedirective";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./assets/useCart-CLT7fb2x.js";
import "./assets/usePricing-ssZPWxiP.js";
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
const Ziggy$1 = { "url": "http://127.0.0.1:8000", "port": 8e3, "defaults": {}, "routes": { "debugbar.openhandler": { "uri": "_debugbar/open", "methods": ["GET", "HEAD"] }, "debugbar.cache.delete": { "uri": "_debugbar/cache/{key}", "methods": ["DELETE"], "wheres": { "key": ".*" }, "parameters": ["key"] }, "debugbar.queries.explain": { "uri": "_debugbar/queries/explain", "methods": ["POST"] }, "debugbar.clockwork": { "uri": "_debugbar/clockwork/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "debugbar.assets": { "uri": "_debugbar/assets", "methods": ["GET", "HEAD"] }, "boost.browser-logs": { "uri": "_boost/browser-logs", "methods": ["POST"] }, "horizon.stats.index": { "uri": "horizon/api/stats", "methods": ["GET", "HEAD"] }, "horizon.workload.index": { "uri": "horizon/api/workload", "methods": ["GET", "HEAD"] }, "horizon.masters.index": { "uri": "horizon/api/masters", "methods": ["GET", "HEAD"] }, "horizon.monitoring.index": { "uri": "horizon/api/monitoring", "methods": ["GET", "HEAD"] }, "horizon.monitoring.store": { "uri": "horizon/api/monitoring", "methods": ["POST"] }, "horizon.monitoring-tag.paginate": { "uri": "horizon/api/monitoring/{tag}", "methods": ["GET", "HEAD"], "parameters": ["tag"] }, "horizon.monitoring-tag.destroy": { "uri": "horizon/api/monitoring/{tag}", "methods": ["DELETE"], "wheres": { "tag": ".*" }, "parameters": ["tag"] }, "horizon.jobs-metrics.index": { "uri": "horizon/api/metrics/jobs", "methods": ["GET", "HEAD"] }, "horizon.jobs-metrics.show": { "uri": "horizon/api/metrics/jobs/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.queues-metrics.index": { "uri": "horizon/api/metrics/queues", "methods": ["GET", "HEAD"] }, "horizon.queues-metrics.show": { "uri": "horizon/api/metrics/queues/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.jobs-batches.index": { "uri": "horizon/api/batches", "methods": ["GET", "HEAD"] }, "horizon.jobs-batches.show": { "uri": "horizon/api/batches/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.jobs-batches.retry": { "uri": "horizon/api/batches/retry/{id}", "methods": ["POST"], "parameters": ["id"] }, "horizon.pending-jobs.index": { "uri": "horizon/api/jobs/pending", "methods": ["GET", "HEAD"] }, "horizon.completed-jobs.index": { "uri": "horizon/api/jobs/completed", "methods": ["GET", "HEAD"] }, "horizon.silenced-jobs.index": { "uri": "horizon/api/jobs/silenced", "methods": ["GET", "HEAD"] }, "horizon.failed-jobs.index": { "uri": "horizon/api/jobs/failed", "methods": ["GET", "HEAD"] }, "horizon.failed-jobs.show": { "uri": "horizon/api/jobs/failed/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.retry-jobs.show": { "uri": "horizon/api/jobs/retry/{id}", "methods": ["POST"], "parameters": ["id"] }, "horizon.jobs.show": { "uri": "horizon/api/jobs/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.index": { "uri": "horizon/{view?}", "methods": ["GET", "HEAD"], "wheres": { "view": "(.*)" }, "parameters": ["view"] }, "sanctum.csrf-cookie": { "uri": "sanctum/csrf-cookie", "methods": ["GET", "HEAD"] }, "items.search": { "uri": "api/v1/search", "methods": ["GET", "HEAD"] }, "api.wishlist.ids": { "uri": "api/v1/wishlist/ids", "methods": ["GET", "HEAD"] }, "api.wishlist.sync": { "uri": "api/v1/wishlist/sync", "methods": ["POST"] }, "api.wishlist.toggle": { "uri": "api/v1/wishlist/{item}", "methods": ["POST"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.wishlist.destroy": { "uri": "api/v1/wishlist/{item}", "methods": ["DELETE"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.cart.sync": { "uri": "api/v1/cart/sync", "methods": ["POST"] }, "api.cart.add": { "uri": "api/v1/cart/{item}", "methods": ["POST"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.cart.update": { "uri": "api/v1/cart/{item}", "methods": ["PUT"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.cart.remove": { "uri": "api/v1/cart/{item}", "methods": ["DELETE"], "parameters": ["item"], "bindings": { "item": "id" } }, "api.cart.toggle-service": { "uri": "api/v1/cart/{item}/toggle-service", "methods": ["POST"], "parameters": ["item"], "bindings": { "item": "id" } }, "home": { "uri": "/", "methods": ["GET", "HEAD"] }, "read.more": { "uri": "read-more", "methods": ["GET", "HEAD"] }, "register.show": { "uri": "register", "methods": ["GET", "HEAD"] }, "register": { "uri": "register/submit-form", "methods": ["POST"] }, "register.verify-phone.show": { "uri": "register/verify-phone", "methods": ["GET", "HEAD"] }, "register.verify-code": { "uri": "registration/verify/phone", "methods": ["POST"] }, "register.resend-code": { "uri": "register/resend-code", "methods": ["POST"] }, "login": { "uri": "login", "methods": ["GET", "HEAD"] }, "login.post": { "uri": "login", "methods": ["POST"] }, "logout": { "uri": "logout", "methods": ["POST"] }, "show.forgot.password": { "uri": "forgot-password", "methods": ["GET", "HEAD"] }, "forgot-password.send-verification-code": { "uri": "forgot-password/send-code", "methods": ["POST"] }, "forgot-password.resend-code": { "uri": "forgot-password/resend-code", "methods": ["POST"] }, "forgot-password.verify-phone.show": { "uri": "forgot-password/verify-phone", "methods": ["GET", "HEAD"] }, "forgot-password.verify-code": { "uri": "forgot-password/verify-code", "methods": ["POST"] }, "forgot-password.reset.show": { "uri": "forgot-password/reset", "methods": ["GET", "HEAD"] }, "forgot-password.reset": { "uri": "forgot-password/reset", "methods": ["POST"] }, "admin.index": { "uri": "admin", "methods": ["GET", "HEAD"] }, "admin.orders.index": { "uri": "admin/orders", "methods": ["GET", "HEAD"] }, "admin.orders.show": { "uri": "admin/orders/{order}", "methods": ["GET", "HEAD"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.approve": { "uri": "admin/orders/{order}/approve", "methods": ["PUT"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.ready": { "uri": "admin/orders/{order}/ready", "methods": ["PUT"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.dispatch": { "uri": "admin/orders/{order}/dispatch", "methods": ["PUT"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.deliver": { "uri": "admin/orders/{order}/deliver", "methods": ["PUT"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.cancel": { "uri": "admin/orders/{order}/cancel", "methods": ["PUT"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.send-pdf": { "uri": "admin/orders/{order}/send-pdf", "methods": ["POST"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.send-onway": { "uri": "admin/orders/{order}/send-onway", "methods": ["POST"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.orders.destroy": { "uri": "admin/orders/{order}", "methods": ["DELETE"], "parameters": ["order"], "bindings": { "order": "id" } }, "admin.items.index": { "uri": "admin/items", "methods": ["GET", "HEAD"] }, "admin.items.sync-category": { "uri": "admin/items/sync-category", "methods": ["POST"] }, "admin.items.sync-attributes": { "uri": "admin/items/sync-attributes", "methods": ["POST"] }, "admin.items.fetch-missing-images": { "uri": "admin/items/fetch-missing-images", "methods": ["POST"] }, "admin.items.sync-inventory": { "uri": "admin/items/sync-inventory", "methods": ["POST"] }, "admin.items.search": { "uri": "admin/items/search", "methods": ["GET", "HEAD"] }, "admin.items.update": { "uri": "admin/items/{item}", "methods": ["PUT"], "parameters": ["item"], "bindings": { "item": "id" } }, "admin.categories.search": { "uri": "admin/categories/search", "methods": ["GET", "HEAD"] }, "admin.categories.fetch-image": { "uri": "admin/categories/{category}/fetch-image", "methods": ["POST"], "parameters": ["category"], "bindings": { "category": "id" } }, "admin.payments.index": { "uri": "admin/payments", "methods": ["GET", "HEAD"] }, "admin.stock-notifications.index": { "uri": "admin/stock-notifications", "methods": ["GET", "HEAD"] }, "admin.stock-notifications.toggle-called": { "uri": "admin/stock-notifications/{stockNotification}/toggle-called", "methods": ["PATCH"], "parameters": ["stockNotification"], "bindings": { "stockNotification": "id" } }, "admin.stock-notifications.destroy": { "uri": "admin/stock-notifications/{stockNotification}", "methods": ["DELETE"], "parameters": ["stockNotification"], "bindings": { "stockNotification": "id" } }, "admin.analytics.index": { "uri": "admin/analytics", "methods": ["GET", "HEAD"] }, "admin.home-page.index": { "uri": "admin/home-page", "methods": ["GET", "HEAD"] }, "admin.home-page.banners.store": { "uri": "admin/home-page/banners", "methods": ["POST"] }, "admin.home-page.banners.destroy": { "uri": "admin/home-page/banners/{banner}", "methods": ["DELETE"], "parameters": ["banner"], "bindings": { "banner": "id" } }, "admin.users.index": { "uri": "admin/users", "methods": ["GET", "HEAD"] }, "admin.users.get-user": { "uri": "admin/user/{user}", "methods": ["GET", "HEAD"], "parameters": ["user"], "bindings": { "user": "id" } }, "admin.users.delete": { "uri": "admin/users/{user}", "methods": ["DELETE"], "parameters": ["user"], "bindings": { "user": "id" } }, "cashier.customers.index": { "uri": "cashier/customers", "methods": ["GET", "HEAD"] }, "cashier.customers.register": { "uri": "cashier/customers", "methods": ["POST"] }, "account.index": { "uri": "account", "methods": ["GET", "HEAD"] }, "account.update": { "uri": "account/update/{user}", "methods": ["PUT"], "parameters": ["user"], "bindings": { "user": "id" } }, "account.change-password": { "uri": "account/change-password", "methods": ["PUT"] }, "user-orders.index": { "uri": "user-orders", "methods": ["GET", "HEAD"] }, "user-orders.show": { "uri": "user-orders/{order}", "methods": ["GET", "HEAD"], "parameters": ["order"], "bindings": { "order": "id" } }, "user-orders.reorder": { "uri": "user-orders/{order}/reorder", "methods": ["POST"], "parameters": ["order"], "bindings": { "order": "id" } }, "wishlist.index": { "uri": "wishlist", "methods": ["GET", "HEAD"] }, "cart.index": { "uri": "cart", "methods": ["GET", "HEAD"] }, "checkout.index": { "uri": "checkout", "methods": ["GET", "HEAD"] }, "checkout.onway-regions": { "uri": "checkout/onway-regions", "methods": ["GET", "HEAD"] }, "checkout.credit-info": { "uri": "checkout/credit-info", "methods": ["GET", "HEAD"] }, "checkout.office-inventory": { "uri": "checkout/office-inventory", "methods": ["POST"] }, "payment.initiate": { "uri": "payment/initiate", "methods": ["POST"] }, "initiate.payment.invoice": { "uri": "initiate/payment/invoice", "methods": ["POST"] }, "initiate.payment.limit": { "uri": "initiate/payment/limit", "methods": ["POST"] }, "payment.success": { "uri": "payment/success/{provider}", "methods": ["GET", "HEAD"], "parameters": ["provider"] }, "payment.cancel": { "uri": "payment/cancel/{provider}", "methods": ["GET", "HEAD"], "parameters": ["provider"] }, "payment.invoice.success": { "uri": "payment/invoice/{invoice}", "methods": ["GET", "HEAD"], "parameters": ["invoice"] }, "payment.limit.success": { "uri": "payment/limit/{invoice}", "methods": ["GET", "HEAD"], "parameters": ["invoice"] }, "payment.pcb.order.details": { "uri": "pro-credit-bank/order-details", "methods": ["GET", "HEAD"] }, "bc.send-order": { "uri": "bc-sales-order/{orderItem}", "methods": ["POST"], "parameters": ["orderItem"] }, "payment.callback": { "uri": "payment/callback", "methods": ["POST"] }, "download.file": { "uri": "order/download/{filename}", "methods": ["GET", "HEAD"], "wheres": { "filename": ".*" }, "parameters": ["filename"] }, "about-us": { "uri": "about-us", "methods": ["GET", "HEAD"] }, "terms-of-service": { "uri": "terms-of-service", "methods": ["GET", "HEAD"] }, "keep-conditions": { "uri": "keep-conditions", "methods": ["GET", "HEAD"] }, "privacy-policy": { "uri": "privacy-policy", "methods": ["GET", "HEAD"] }, "cookie-policy": { "uri": "cookie-policy", "methods": ["GET", "HEAD"] }, "delivery-rates": { "uri": "delivery-rates", "methods": ["GET", "HEAD"] }, "items.show": { "uri": "item/{item}", "methods": ["GET", "HEAD"], "parameters": ["item"], "bindings": { "item": "slug" } }, "stock-notifications.subscribe": { "uri": "items/{item}/notify", "methods": ["POST"], "parameters": ["item"], "bindings": { "item": "slug" } }, "stock-notifications.unsubscribe": { "uri": "items/{item}/notify", "methods": ["DELETE"], "parameters": ["item"], "bindings": { "item": "slug" } }, "search.index": { "uri": "search", "methods": ["GET", "HEAD"] }, "sales.index": { "uri": "sales", "methods": ["GET", "HEAD"] }, "items.index": { "uri": "{grandparentSlug}/{parentSlug?}/{childSlug?}", "methods": ["GET", "HEAD"], "parameters": ["grandparentSlug", "parentSlug", "childSlug"] }, "storage.local": { "uri": "storage/{path}", "methods": ["GET", "HEAD"], "wheres": { "path": ".*" }, "parameters": ["path"] }, "storage.local.upload": { "uri": "storage/{path}", "methods": ["PUT"], "wheres": { "path": ".*" }, "parameters": ["path"] } } };
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy$1.routes, window.Ziggy.routes);
}
const _sfc_main$2 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "flex flex-col lg:flex-row items-center justify-around gap-6 px-6 py-5 sm:py-10 bg-white border-t border-slate-200" }, _attrs))} data-v-fbe5a4e7><div class="flex flex-col items-center gap-3" data-v-fbe5a4e7><div class="flex items-center gap-3" data-v-fbe5a4e7>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "#",
        target: "_blank",
        rel: "noopener noreferrer"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="pi pi-linkedin text-lg lg:text-2xl text-[#0A66C2] inline-block scale-95" data-v-fbe5a4e7${_scopeId}></i>`);
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
            _push2(`<i class="pi pi-facebook text-lg lg:text-2xl text-[#1877F2]" data-v-fbe5a4e7${_scopeId}></i>`);
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
            _push2(`<i class="pi pi-instagram text-lg lg:text-2xl instagram-icon" data-v-fbe5a4e7${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "pi pi-instagram text-lg lg:text-2xl instagram-icon" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex flex-col items-center space-y-3 order-3 sm:order-2" data-v-fbe5a4e7><div data-v-fbe5a4e7><p class="text-center text-sm text-gray-500" data-v-fbe5a4e7> © 2025, <span class="text-[#c80a1d]" data-v-fbe5a4e7>Sonniva Georgia</span> - ყველა უფლება დაცულია. </p></div><div class="flex flex-col lg:flex-row items-center justify-center gap-2 text-xs text-gray-500" data-v-fbe5a4e7>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("terms-of-service"),
        class: "hover:text-brand-500"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`მომსახურების პირობები`);
          } else {
            return [
              createTextVNode("მომსახურების პირობები")
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
            _push2(`კონფიდენციალურობის პოლიტიკა`);
          } else {
            return [
              createTextVNode("კონფიდენციალურობის პოლიტიკა")
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
            _push2(`ქუქი ფაილების პოლიტიკა`);
          } else {
            return [
              createTextVNode("ქუქი ფაილების პოლიტიკა")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex flex-col items-center gap-2 order-2 sm:order-3" data-v-fbe5a4e7><div class="flex items-center gap-2 text-sm text-gray-500" data-v-fbe5a4e7><i class="pi pi-clock text-gray-500" data-v-fbe5a4e7></i><span data-v-fbe5a4e7>ორშაბათი–პარასკევი, 09:00–18:00</span></div><a href="tel:032-269-36-99" class="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-500 transition-colors" data-v-fbe5a4e7><i class="pi pi-phone text-[#c80a1d]" data-v-fbe5a4e7></i><span class="font-medium" data-v-fbe5a4e7>032 269 36 99</span></a></div></footer>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-fbe5a4e7"]]);
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
            _push2(`<span class="flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-neutral-950 shrink-0 transition-transform duration-500 group-hover:rotate-90"${_scopeId}><i class="pi pi-percentage text-xs lg:text-sm text-brand-400"${_scopeId}></i></span><span class="text-sm lg:text-lg tracking-wide whitespace-nowrap"${_scopeId}>ფასდაკლებები</span>`);
          } else {
            return [
              createVNode("span", { class: "flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-neutral-950 shrink-0 transition-transform duration-500 group-hover:rotate-90" }, [
                createVNode("i", { class: "pi pi-percentage text-xs lg:text-sm text-brand-400" })
              ]),
              createVNode("span", { class: "text-sm lg:text-lg tracking-wide whitespace-nowrap" }, "ფასდაკლებები")
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
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const emitter = mitt();
if (typeof window !== "undefined") window.emitter = emitter;
const getWeglotLang = () => {
  const weglot = typeof window !== "undefined" ? window.Weglot : void 0;
  if (!weglot?.getCurrentLang) return null;
  const lang = weglot.getCurrentLang();
  return lang && lang !== weglot.options?.language_from ? lang : null;
};
const stripWeglotPrefix = (pathname) => {
  const lang = getWeglotLang();
  if (lang && (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`))) {
    return pathname.slice(lang.length + 1) || "/";
  }
  return pathname;
};
const ziggyLocation = typeof window !== "undefined" ? {
  get host() {
    return window.location.host;
  },
  get pathname() {
    return stripWeglotPrefix(window.location.pathname);
  },
  get search() {
    return window.location.search;
  }
} : void 0;
const restoreWeglotUrlPrefix = () => {
  const lang = getWeglotLang();
  if (!lang) return;
  window.Weglot.switchTo(lang);
  const url = new URL(window.location.href);
  const hasPrefix = url.pathname === `/${lang}` || url.pathname.startsWith(`/${lang}/`);
  if (!hasPrefix) {
    url.pathname = `/${lang}${url.pathname}`;
    window.history.replaceState(window.history.state, "", url);
  }
};
router.on("navigate", restoreWeglotUrlPrefix);
router.on("success", restoreWeglotUrlPrefix);
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
    const page = await resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Account/Index.vue": () => import("./assets/Index-49WlmPKV.js"), "./Pages/Account/UpdatePassword.vue": () => import("./assets/UpdatePassword-B6tEF7gB.js"), "./Pages/Admin/AdminLayout.vue": () => import("./assets/AdminLayout-BZQ72uFD.js").then((n2) => n2.A), "./Pages/Admin/Analytics/Index.vue": () => import("./assets/Index-BYzr0qvk.js"), "./Pages/Admin/HomePage/Index.vue": () => import("./assets/Index-1elsl5S_.js"), "./Pages/Admin/Index.vue": () => import("./assets/Index-BxnTxJ8B.js"), "./Pages/Admin/StockNotifications/Index.vue": () => import("./assets/Index-DbNCswwj.js"), "./Pages/Admin/items/Index.vue": () => import("./assets/Index-BnQ5DuEf.js"), "./Pages/Admin/orders/Index.vue": () => import("./assets/Index-D4ijjnYi.js"), "./Pages/Admin/orders/OrderDetailDialog.vue": () => import("./assets/OrderDetailDialog-C69fQIuX.js"), "./Pages/Admin/payments/Index.vue": () => import("./assets/Index-CXPmFM8d.js"), "./Pages/Admin/users/Index.vue": () => import("./assets/Index-du43ttYq.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-BEYVPxSJ.js"), "./Pages/Auth/ForgotPasswordVerifyPhone.vue": () => import("./assets/ForgotPasswordVerifyPhone-1hVWJFaR.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-DYtraSQS.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-CUnKXqv8.js"), "./Pages/Auth/RegisterVerifyPhone.vue": () => import("./assets/RegisterVerifyPhone-CBLOWOpw.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-BxDTEgBd.js"), "./Pages/Cart/Index.vue": () => import("./assets/Index-Dh0i5eJI.js"), "./Pages/Checkout/Index.vue": () => import("./assets/Index-DFeWsyA0.js"), "./Pages/Contact/ContactButtons.vue": () => import("./assets/ContactButtons-DEj4wxBE.js"), "./Pages/Error.vue": () => import("./assets/Error-DA2GFQKK.js"), "./Pages/Home/Index.vue": () => import("./assets/Index-DKIj6Dk0.js"), "./Pages/Home/ReadMore.vue": () => import("./assets/ReadMore-BtrKOEqj.js"), "./Pages/Items/ActiveFilterChips.vue": () => import("./assets/ActiveFilterChips-XpR4B2fs.js"), "./Pages/Items/Index.vue": () => import("./assets/Index-7Sd_ltyR.js"), "./Pages/Items/ItemGallery.vue": () => import("./assets/ItemGallery-DPazEfKP.js"), "./Pages/Items/Show.vue": () => import("./assets/Show-CemlRLS8.js"), "./Pages/Items/SimilarItems.vue": () => import("./assets/SimilarItems-mq1Tbj56.js"), "./Pages/Items/SubcategoryStrip.vue": () => import("./assets/SubcategoryStrip-BsI0AUf3.js"), "./Pages/Payment/Cancel.vue": () => import("./assets/Cancel-DxMjprSF.js"), "./Pages/Payment/InvoiceSuccess.vue": () => import("./assets/InvoiceSuccess-BTgAXpzY.js"), "./Pages/Payment/LimitSuccess.vue": () => import("./assets/LimitSuccess-DT96ZzZS.js"), "./Pages/Payment/Success.vue": () => import("./assets/Success-B2ZIpObU.js"), "./Pages/Policies/CookiePolicy.vue": () => import("./assets/CookiePolicy-DEnVfhui.js"), "./Pages/Policies/DeliveryRates.vue": () => import("./assets/DeliveryRates-MAvASpCE.js"), "./Pages/Policies/PrivacyPolicy.vue": () => import("./assets/PrivacyPolicy-D46B0Nqz.js"), "./Pages/Policies/TermsOfService.vue": () => import("./assets/TermsOfService-DsqXDpUx.js"), "./Pages/PrimevueComponents/PrimeInputText.vue": () => import("./assets/PrimeInputText-BlIRrCdA.js"), "./Pages/Sales/Index.vue": () => import("./assets/Index-D8-C8fIR.js"), "./Pages/Search/Index.vue": () => import("./assets/Index-Dk2htzk7.js"), "./Pages/UserOrders/Index.vue": () => import("./assets/Index-DK0J5_iy.js"), "./Pages/UserOrders/OrderDetailDialog.vue": () => import("./assets/OrderDetailDialog-1Tm2ZrTL.js"), "./Pages/UserOrders/ReorderDialog.vue": () => import("./assets/ReorderDialog-DJKA7zkF.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-DaGKOMOX.js"), "./Pages/Wishlist/Index.vue": () => import("./assets/Index-BHPG8T3a.js"), "./Pages/about-us/Index.vue": () => import("./assets/Index-CnCemXjd.js") }));
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
    const { location: _ziggyLoc, ...ziggyConfig } = typeof window !== "undefined" ? ziggy : {};
    const ziggyForVue = typeof window !== "undefined" ? { ...ziggyConfig, location: ziggyLocation } : ziggy;
    const app = createApp({ render: () => h$1(App, props) });
    app.use(plugin);
    app.use(pinia);
    app.use(U, ziggyForVue);
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
