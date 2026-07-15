// Icon files in public/categories-icons/ are named "{code}-{CATEGORY_ICON_VERSION}.png".
// Query-string cache busting (?v=) does not work here - Cloudflare's edge cache for
// this zone caches static assets by path and doesn't vary on the query string, so a
// purge was still required and the query bump alone never showed the new file. When
// an icon is replaced, bump this number AND rename the PNG in public/categories-icons/
// to match (e.g. 1300-2.png -> 1300-3.png) so the URL path itself changes.
export const CATEGORY_ICON_VERSION = 2