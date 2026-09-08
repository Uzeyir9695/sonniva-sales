/**
 * URL for a routes/api.php endpoint (/api/...).
 *
 * On en/ru/tr pages SetLocale forces Ziggy's root URL to /<locale>, so an
 * absolute route('api.*') resolves to /<locale>/api/... — which has no route
 * and 404s. The API routes are never locale-prefixed, so generate the URL
 * relative (Ziggy's third arg): that drops the origin entirely and yields a
 * clean /api/... path that hits the current origin.
 */
export const apiRoute = (name, params) => route(name, params, false);
