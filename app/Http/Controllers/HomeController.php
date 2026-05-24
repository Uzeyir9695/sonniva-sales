<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Inertia\Inertia;

class HomeController extends Controller
{
    private const BRAND_ATTRIBUTE_NAME = 'ბრენდი';

    public function index()
    {
        $carouselItems = [
            $this->getItemsByBrand('SAMET'),
            $this->getItemsByBrand('DEWALT'),
            $this->getItemsByBrand('ALBATUR'),
            $this->getItemsByBrand('HMSFIX'),
            $this->getItemsByBrand('EKSEN'),
            $this->getItemsByBrand('TOLSEN'),
        ];

        return Inertia::render('Home/Index', [
            'carouselItems' => $carouselItems,
        ]);
    }

    private function getItemsByBrand(string $brand, int $limit = 25): array
    {
        $items = Item::where('inventory', '>', 0)
            ->whereHas('attributes', fn ($q) => $q->where('name', self::BRAND_ATTRIBUTE_NAME)
                ->where('value', $brand)
            )
            ->withSum('orderItems', 'quantity')
            ->orderByDesc('order_items_sum_quantity')
            ->take($limit)
            ->get();

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
