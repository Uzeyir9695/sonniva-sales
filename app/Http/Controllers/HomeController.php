<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $rootCodes = ['1100','1200','1300','1400','1500','1600','1700','1800','1900','2000','2100','2200'];

        $categories = Category::whereNull('parent_id')
            ->whereIn('code', $rootCodes)
            ->orderBy('sort_order')
            ->with(['children' => function ($query) {
                $query->orderBy('sort_order')->with(['children' => function ($query) {
                    $query->orderBy('sort_order');
                }]);
            }])
            ->get()
            ->map(fn($cat) => [
                'name' => $cat->name,
                'icon' => $cat->image ?? '📦',
                'subs' => $cat->children->map(fn($sub) => [
                    'name'  => $sub->name,
                    'items' => $sub->children->map(fn($item) => $item->name)->values(),
                ])->values(),
            ]);

        return Inertia::render('home/Index', [
            'categories' => $categories,
        ]);
    }

    public function readMore()
    {
        return Inertia::render('home/ReadMore');
    }
}
