<?php

namespace App\Http\Controllers;

use App\Models\BannerImage;
use App\Models\Item;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    private const BRAND_ATTRIBUTE_NAME = 'ბრენდი';

    public function index()
    {
        $carouselItems = [
            $this->getItemsByBrand('HMSFIX'),
            $this->getItemsByBrand('SAMET'),
            $this->getItemsByBrand('ALBATUR'),
            $this->getItemsByBrand('TOLSEN'),
            $this->getItemsByBrand('DEWALT'),
            $this->getItemsByBrand('EKSEN'),
        ];

        $banners = Cache::rememberForever('nav_banners', function () {
            return BannerImage::with('item:id,slug')
                ->orderBy('sort_order')
                ->get()
                ->groupBy('slot')
                ->map(fn ($group, $slot) => $slot === 'main'
                    ? $group->map(fn ($b) => [
                        'image_url' => Storage::disk('public')->url($b->image_path),
                        'item_slug' => $b->item?->slug,
                    ])->values()
                    : $group->map(fn ($b) => Storage::disk('public')->url($b->image_path))->values());
        });

        return Inertia::render('Home/Index', [
            'carouselItems' => $carouselItems,
            'banners' => $banners,
        ]);
    }

    private function getItemsByBrand(string $brand, int $limit = 12): array
    {
        $items = Cache::remember("home_carousel_{$brand}", now()->addHour(), function () use ($brand, $limit) {
            return Item::where('inventory', '>', 0)
                ->whereHas('attributes', fn ($q) => $q->where('name', self::BRAND_ATTRIBUTE_NAME)
                    ->where('value', $brand)
                )
                ->withSum('orderItems', 'quantity')
                ->orderByDesc('order_items_sum_quantity')
                ->take($limit)
                ->get();
        });

        return [
            'title' => $brand,
            'items' => $items,
        ];
    }

    public function readMore()
    {
        return Inertia::render('Home/ReadMore');
    }
}
