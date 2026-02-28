<?php

namespace App\Http\Middleware;

use App\Models\Category;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $isAdmin = auth()?->user()?->role === 'admin';

        $categories = fn() => Cache::rememberForever('nav_categories', function () {
            return Category::whereNull('parent_id')
                ->whereIn('code', ['1100','1200','1300','1400','1500','1600','1700','1800','1900','2000','2100','2200'])
                ->orderBy('sort_order')
                ->with(['children' => function ($query) {
                    $query->orderBy('sort_order')->with(['children' => function ($query) {
                        $query->orderBy('sort_order');
                    }]);
                }])
                ->get()
                ->map(fn($cat) => [
                    'name' => $cat->name,
                    'slug' => $cat->slug,
                    'icon' => $cat->image ?? '📦',
                    'subs' => $cat->children->map(fn($sub) => [
                        'name'  => $sub->name,
                        'slug' => $sub->slug,
                        'items' => $sub->children->map(fn($item) => [
                            'name' => $item->name,
                            'slug' => $item->slug,
                        ])->values(),
                    ])->values(),
                ]);
        });

        return [
            ...parent::share($request),
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy())->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'categories' => $categories,

            'recaptcha_site_key' => config('services.google_recaptcha.site_key'),

            'isLoggedIn' => Auth::check(),
            'isAdmin' => $isAdmin,
            'user' => Auth::user(),

            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
