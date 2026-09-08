/**
 * URL for a route that has no locale-prefixed clone — every routes/api.php
 * endpoint (/api/...) and the admin/* routes (bootstrap/app.php skips both
 * when cloning).
 *
 * On en/ru/tr pages SetLocale forces Ziggy's root URL to /<locale>, so an
 * absolute route() call resolves to /<locale>/api/... or /<locale>/admin/...,
 * which has no route and 404s. Generating relative (Ziggy's third arg) drops
 * the origin entirely and yields a clean path that hits the current origin.
 */
export const apiRoute = (name, params) => route(name, params, false);
