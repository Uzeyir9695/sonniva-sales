<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

/**
 * Resolves the active locale from the URL's first segment. bootstrap/app.php
 * registers a prefixed clone of every web route (/en, /ru, /tr), so the
 * request path genuinely carries the prefix — this only has to read it.
 */
class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $default = config('app.default_locale');
        $supported = config('app.supported_locales', [$default]);

        $segment = $request->segment(1);
        $locale = $segment !== $default && in_array($segment, $supported, true)
            ? $segment
            : $default;

        App::setLocale($locale);

        // Rebases every route()/URL generation for the rest of the request
        // (server side and Ziggy's client-side route(), via the shared `ziggy`
        // prop) onto the /<locale> root. Passing null on the default locale
        // clears the forced root entirely — forceRootUrl() mutates a singleton
        // with no built-in reset, so a prefixed request would otherwise pin
        // the prefix onto every later request under a reused container.
        URL::forceRootUrl($locale === $default
            ? null
            : rtrim(config('app.url'), '/').'/'.$locale);

        return $next($request);
    }
}
