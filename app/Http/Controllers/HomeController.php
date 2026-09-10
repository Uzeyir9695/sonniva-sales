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
            return BannerImage::with(['item:id,slug', 'category:id,slug'])
                ->orderBy('sort_order')
                ->get()
                ->groupBy('slot')
                ->map(fn ($group, $slot) => $slot === 'main'
                    ? $group->map(fn ($b) => [
                        'image_url' => Storage::disk('public')->url($b->image_path),
                        'mobile_image_url' => $b->mobile_image_path
                            ? Storage::disk('public')->url($b->mobile_image_path)
                            : null,
                        'item_slug' => $b->item?->slug,
                        'category_slug' => $b->category?->slug,
                    ])->values()
                    : $group->map(fn ($b) => Storage::disk('public')->url($b->image_path))->values())
                ->toArray();
        });

        $homeSections = Cache::rememberForever('home_sections_'.app()->getLocale(), function () {
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
                'banners' => $this->mobileBanners($banners),
                'homeSections' => $homeSections,
            ]);
        }

        return Inertia::render('Home/Index', [
            'carouselItems' => $carouselItems,
            'banners' => $banners,
            'homeSections' => $homeSections,
        ]);
    }

    /**
     * The mobile app only shows the main banner when a phone-specific image
     * exists for a slide — never the wide desktop image. Slides without a
     * mobile image are dropped; an empty list means the app renders no carousel.
     *
     * @param  array<string, mixed>  $banners
     * @return array<string, mixed>
     */
    private function mobileBanners(array $banners): array
    {
        $banners['main'] = collect($banners['main'] ?? [])
            ->filter(fn (array $slide) => ! empty($slide['mobile_image_url']))
            ->map(fn (array $slide) => [
                'image_url' => $slide['mobile_image_url'],
                'item_slug' => $slide['item_slug'],
                'category_slug' => $slide['category_slug'],
            ])
            ->values()
            ->all();

        return $banners;
    }

    private function getItemsByBrand(string $brand, int $limit = 12): array
    {
        $items = Cache::remember('home_carousel_'.$brand.'_'.app()->getLocale(), now()->addHour(), function () use ($brand, $limit) {
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
