<?php

namespace App\Http\Controllers;

use App\Models\BannerImage;
use App\Models\HomeSection;
use App\Models\HomeSectionImage;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    private const BRAND_ATTRIBUTE_NAME = 'ბრენდი';

    public function index(Request $request)
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
                    : $group->map(fn ($b) => Storage::disk('public')->url($b->image_path))->values())
                ->toArray();
        });

        $homeSections = Cache::rememberForever('home_sections', function () {
            return HomeSection::where('is_hidden', false)
                ->with(['items', 'images'])
                ->orderBy('created_at')
                ->get()
                ->map(fn (HomeSection $s) => [
                    'id' => $s->id,
                    'carousel_title' => $s->carousel_title,
                    'gallery_title' => $s->gallery_title,
                    'items' => $s->items,
                    'images' => $s->images->map(fn (HomeSectionImage $img) => [
                        'id' => $img->id,
                        'image_url' => Storage::disk('public')->url($img->image_path),
                        'title' => $img->title,
                        'link_url' => $img->link_url,
                    ]),
                ])
                ->toArray();
        });

        if ($request->wantsJson()) {
            return response()->json([
                'carouselItems' => $carouselItems,
                'banners' => $banners,
                'homeSections' => $homeSections,
            ]);
        }

        return Inertia::render('Home/Index', [
            'carouselItems' => $carouselItems,
            'banners' => $banners,
            'homeSections' => $homeSections,
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
                ->get()
                ->toArray();
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
