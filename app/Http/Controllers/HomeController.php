<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Item;
use Inertia\Inertia;

class HomeController extends Controller
{
    private const BRAND_ATTRIBUTE_NAME = 'ბრენდი';

    public function index()
    {
        $carouselItems = [
            $this->getSametItems('SAMET'),
        ];

        return Inertia::render('Home/Index', [
            'carouselItems' => $carouselItems,
        ]);
    }

    private function getSametItems(string $brand, int $limit = 25): array
    {
        $items = Item::where('inventory', '>', 0)
            ->whereHas('attributes', fn($q) =>
                $q->where('name', self::BRAND_ATTRIBUTE_NAME)
                    ->where('value', $brand)
                )
            ->take($limit)
            ->get();

        return  [
            'title' => 'SAMET',
            'items' => $items,
        ];
    }

    public function readMore()
    {
        return Inertia::render('Home/ReadMore');
    }
}
