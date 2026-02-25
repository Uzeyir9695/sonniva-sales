<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    //
    public function index(Request $request)
    {
        $activeSlug = last(array_filter($request->segments()));

        $category = Category::where('slug', $activeSlug)->firstOrFail();

        $code = $category->code;

        // Collect all codes to filter items by
        $codes = collect([$code]); // in order to include the current category code as well, pass $code to the collection as array

        if ($category->level === 1) {
            // root: get all sub and leaf codes
            $subs = Category::where('parent_id', $code)->pluck('code');
            $leaves = Category::whereIn('parent_id', $subs)->pluck('code');
            $codes = $codes->merge($subs)->merge($leaves);

        } elseif ($category->level === 2) {
            // sub: get all leaf codes
            $leaves = Category::where('parent_id', $code)->pluck('code');
            $codes = $codes->merge($leaves);
        }

        $items = Item::whereIn('category_code', $codes)
            ->paginate(24);

        return Inertia::render('items/Index', [
            'items' => Inertia::defer(fn () => $items),
        ]);
    }
}
