<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

/**
 * Locale for the /v1 mobile API: read from the `Accept-Language` header
 * (NativePHP mobile has no URL to prefix, unlike the web SetLocale). Falls
 * through to the default locale when absent or unsupported.
 */
class SetApiLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->header('Accept-Language');

        if ($locale !== null && in_array($locale, config('app.supported_locales', []), true)) {
            App::setLocale($locale);
        }

        return $next($request);
    }
}
