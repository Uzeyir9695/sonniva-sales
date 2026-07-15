<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\SyncItemCategoryJob;
use App\Models\Category;
use App\Models\Item;
use App\Services\BusinessCentralService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/items/Index');
    }

    public function syncCategory(): RedirectResponse
    {
        SyncItemCategoryJob::dispatch();

        return redirect()->back()->with('message', 'Category sync started in the background. It may take a minute to finish.');
    }

    public function search(Request $request): JsonResponse
    {
        $q = $request->input('q', '');

        if (strlen($q) < 2) {
            return response()->json([]);
        }

        $items = Item::where('no', 'like', "%{$q}%")
            ->orWhere('name', 'like', "%{$q}%")
            ->orderBy('name')
            ->limit(30)
            ->get(['id', 'no', 'name', 'slug', 'images', 'video_url', 'unit_price', 'discount']);

        return response()->json($items);
    }

    public function update(Request $request, Item $item): RedirectResponse
    {
        $validated = $request->validate([
            'video_url' => ['nullable', 'url', 'regex:/^https?:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}/'],
            'discount' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'discount_amount' => ['nullable', 'numeric', 'min:0', 'max:'.$item->unit_price],
        ], [
            'video_url.regex' => 'Paste the link from YouTube\'s Share button (youtu.be/...).',
        ]);

        // A ₾ amount off takes priority over the raw percentage - convert it
        // relative to the item's current unit_price before saving.
        $discount = $validated['discount'] ?? null;
        if (! empty($validated['discount_amount']) && $item->unit_price > 0) {
            $discount = round($validated['discount_amount'] / $item->unit_price * 100, 4);
        }

        $item->update([
            'video_url' => $request->input('video_url') ?: null,
            'discount' => $discount,
        ]);

        return redirect()->back()->with('message', 'Item updated.');
    }

    public function searchCategories(Request $request): JsonResponse
    {
        $q = $request->input('q', '');

        if (strlen($q) < 2) {
            return response()->json([]);
        }

        $categories = Category::where('name', 'like', "%{$q}%")
            ->orWhere('code', 'like', "%{$q}%")
            ->orderBy('name')
            ->limit(30)
            ->get(['id', 'code', 'name', 'image']);

        return response()->json($categories);
    }

    public function updateCategoryImage(Category $category, BusinessCentralService $bc): RedirectResponse
    {
        try {
            $bcCategory = $bc->getItemCategoryByCode($category->code);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['message' => 'Failed to reach Business Central: '.$e->getMessage()]);
        }

        if (empty($bcCategory['imageBase64'])) {
            return redirect()->back()->withErrors(['message' => 'Business Central has no image for this category.']);
        }

        $oldImage = $category->image;
        $fileName = Category::storeImageFromBase64($bcCategory['imageBase64']);

        $category->update(['image' => $fileName]);

        if ($oldImage && $oldImage !== $fileName) {
            Storage::disk('public')->delete("categories/{$oldImage}");
        }

        return redirect()->back()->with('message', 'Category image updated from Business Central.');
    }
}
