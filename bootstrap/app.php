<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetLocale;
use Illuminate\Contracts\Auth\Middleware\AuthenticatesRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        // Registers a /<locale>-prefixed clone of every web route right after
        // routes/web.php loads, so /en/..., /ru/..., /tr/... are matchable for
        // incoming requests. routes/web.php and every route() call site stay
        // untouched — SetLocale's URL::forceRootUrl() is what puts the prefix
        // on generated links. Runs once at registration time, so it is fully
        // route:cache compatible. Admin routes are deliberately not cloned.
        then: function () {
            $default = config('app.default_locale');
            $prefixes = array_values(array_diff(config('app.supported_locales', []), [$default]));

            if (empty($prefixes)) {
                return;
            }

            $prefixPattern = implode('|', array_map('preg_quote', $prefixes));

            foreach (Route::getRoutes()->getRoutes() as $route) {
                if (! in_array('web', $route->middleware(), true) || $route->isFallback) {
                    continue;
                }

                $uri = ltrim($route->uri(), '/');

                if ($uri === 'admin' || str_starts_with($uri, 'admin/')) {
                    continue;
                }

                if (in_array(explode('/', $uri)[0], $prefixes, true)) {
                    continue;
                }

                // A route whose first URI segment is a wildcard (the category
                // catch-all) sits at the URL root and would otherwise swallow
                // /en, /ru, /tr and shadow every prefixed clone below — pin its
                // first segment so it can never match a locale prefix.
                if (str_starts_with($uri, '{')) {
                    $param = trim(explode('/', $uri)[0], '{}?');
                    $route->where($param, '(?!(?:'.$prefixPattern.')(?:/|$))[^/]+');
                }

                $action = $route->getAction();
                unset($action['as'], $action['prefix']);

                foreach ($prefixes as $prefix) {
                    $clone = Route::addRoute($route->methods(), $prefix.'/'.$uri, $action);

                    if (! empty($route->wheres)) {
                        $clone->where($route->wheres);
                    }

                    // Route::uri() drops the ":field" off scoped bindings such as
                    // {item:slug}, so the clone would resolve by primary key and
                    // 404. Carry the original's binding fields onto the clone.
                    if ($route->bindingFields()) {
                        $clone->setBindingFields($route->bindingFields());
                    }
                }
            }
        },
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();
        $middleware->web(append: [
            SetLocale::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Laravel reorders auth-style middleware by priority regardless of
        // registration order, matching 'auth' by the AuthenticatesRequests
        // interface. Without this, an unauthenticated redirect off a /en page
        // runs before SetLocale and route('login') inside it loses the prefix.
        $middleware->prependToPriorityList(
            before: AuthenticatesRequests::class,
            prepend: SetLocale::class,
        );
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if (in_array($response->getStatusCode(), [500, 503, 404, 403])) {
                return Inertia::render('Error', ['status' => $response->getStatusCode()])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            }

            if ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }

            return $response;
        });
    })->create();
