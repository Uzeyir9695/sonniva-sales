// Icon files in public/categories-icons/ are named "{code}-{CATEGORY_ICON_VERSION}.png".
// Query-string cache busting (?v=) doesn't work here because the CDN/proxy in front
// of the server caches by path and ignores query strings. So when an icon is replaced,
// bump this number AND rename the actual PNG file in public/categories-icons/ to match
// (e.g. 1300-1.png -> 1300-2.png) so the URL path itself changes.
export const CATEGORY_ICON_VERSION = 1