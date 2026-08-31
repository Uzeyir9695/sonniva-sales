<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\FetchMissingItemImagesJob;
use App\Jobs\SyncInventoryJob;
use App\Jobs\SyncItemAttributesJob;
use App\Jobs\SyncItemCategoryJob;
use App\Jobs\SyncItemFromBcJob;
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

    public function syncItems(Request $request): RedirectResponse
    {
        $no = $request->input('no') ?: null;

        SyncItemFromBcJob::dispatch($no);

        $message = $no
            ? "Fetching item {$no} from Business Central. It should appear in the shop within a minute."
            : 'Fetching new items from Business Central in the background. This checks the full catalog and can take a few minutes.';

        return redirect()->back()->with('message', $message);
    }

    public function syncCategory(): RedirectResponse
    {
        SyncItemCategoryJob::dispatch();

        return redirect()->back()->with('message', 'Category sync started in the background. It may take a minute to finish.');
    }

    public function syncAttributes(): RedirectResponse
    {
        SyncItemAttributesJob::dispatch();

        return redirect()->back()->with('message', 'Attribute sync started in the background. It may take a minute to finish.');
    }

    public function fetchMissingImages(): RedirectResponse
    {
        FetchMissingItemImagesJob::dispatch();

        return redirect()->back()->with('message', 'Fetching missing item images in the background. It may take a while depending on how many items are missing images.');
    }

    public function syncInventory(): RedirectResponse
    {
        SyncInventoryJob::dispatch();

        return redirect()->back()->with('message', 'Inventory sync started in the background. It may take a minute to finish.');
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
            ->get(['id', 'no', 'name', 'slug', 'images', 'video_url', 'unit_price', 'unit_price_override', 'discount', 'wholesale_discount_percent', 'vip_discount_percent', 'bc_discount_percent', 'fake_price']);

        return response()->json($items);
    }

    public function managed(): Response
    {
        $items = Item::where('discount', '>', 0)
            ->orderBy('name')
            ->get(['id', 'no', 'name', 'slug', 'images', 'video_url', 'unit_price', 'unit_price_override', 'discount', 'wholesale_discount_percent', 'vip_discount_percent', 'bc_discount_percent', 'fake_price']);

        return Inertia::render('Admin/items/DiscountedItems', [
            'items' => $items,
        ]);
    }

    public function update(Request $request, Item $item): RedirectResponse
    {
        $bcUnitPrice = $item->bc_unit_price;

        // The prospective effective price if this request's override is applied - used to
        // validate/derive fake_price and the discount target against the price that will
        // actually be in effect once this save completes, not the stale pre-save one.
        $overrideInput = $request->input('unit_price_override');
        $prospectiveUnitPrice = $overrideInput !== null && $overrideInput !== ''
            ? (float) $overrideInput
            : (float) $item->unit_price;

        $validated = $request->validate([
            'video_url' => ['nullable', 'url', 'regex:/^https?:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}/'],
            'unit_price_override' => ['nullable', 'numeric', 'gt:'.$bcUnitPrice],
            'discount' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'discount_amount' => ['nullable', 'numeric', 'min:0', 'max:'.$prospectiveUnitPrice],
            'wholesale_discount_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'vip_discount_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'bc_discount_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'fake_price' => ['nullable', 'numeric', 'gt:'.$prospectiveUnitPrice],
        ], [
            'video_url.regex' => 'Paste the link from YouTube\'s Share button (youtu.be/...).',
            'unit_price_override.gt' => 'The increased price must be higher than the Business Central price ('.$bcUnitPrice.').',
            'fake_price.gt' => 'The fake price must be higher than the unit price ('.$prospectiveUnitPrice.').',
        ]);

        $unitPrice = $prospectiveUnitPrice;
        $fakePrice = $validated['fake_price'] ?? null;

        $discount = $validated['discount'] ?? null;
        $bcDiscountPercent = $validated['bc_discount_percent'] ?? null;

        // A ₾ amount off, or a BC discount alongside a fake price, both imply a
        // target "real" sale price - resolve that first, then work out what web
        // discount percentage reaches it off the price the web discount is
        // actually applied to (the fake price when one is set, else unit_price).
        $targetPrice = null;
        if (! empty($validated['discount_amount']) && $unitPrice > 0) {
            $bcDiscountPercent = round($validated['discount_amount'] / $unitPrice * 100, 4);
            $targetPrice = $unitPrice - $validated['discount_amount'];
        } elseif ($fakePrice > 0 && ! empty($bcDiscountPercent) && $unitPrice > 0) {
            $targetPrice = $unitPrice * (1 - $bcDiscountPercent / 100);
        } elseif ($fakePrice > 0 && ! empty($discount) && $unitPrice > 0) {
            // Fake price + a web discount with no BC override - the target is
            // just unit_price, so the percentage is always recalculated to land
            // on the real sale price rather than trusting a stale percentage
            // left over from a previously-set BC discount / amount off.
            $targetPrice = $unitPrice;
        }

        if ($targetPrice !== null) {
            $priceBase = $fakePrice > 0 ? (float) $fakePrice : $unitPrice;
            $discount = $priceBase > 0 ? round(($priceBase - $targetPrice) / $priceBase * 100, 4) : $discount;
        }

        $item->update([
            'video_url' => $request->input('video_url') ?: null,
            'unit_price_override' => $validated['unit_price_override'] ?? null,
            'discount' => $discount,
            'wholesale_discount_percent' => $validated['wholesale_discount_percent'] ?? null,
            'vip_discount_percent' => $validated['vip_discount_percent'] ?? null,
            'bc_discount_percent' => $bcDiscountPercent,
            'fake_price' => $fakePrice,
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

    public function getCategoryKeywords(Category $category): JsonResponse
    {
        $item = Item::whereIn('category_code', $category->descendantCodes())->first(['en_keywords', 'ru_keywords', 'tr_keywords']);

        return response()->json([
            'en_keywords' => $item->en_keywords ?? '',
            'ru_keywords' => $item->ru_keywords ?? '',
            'tr_keywords' => $item->tr_keywords ?? '',
        ]);
    }

    public function updateCategoryKeywords(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'en_keywords' => ['nullable', 'string'],
            'ru_keywords' => ['nullable', 'string'],
            'tr_keywords' => ['nullable', 'string'],
        ]);

        $updated = Item::whereIn('category_code', $category->descendantCodes())->update([
            'en_keywords' => $validated['en_keywords'] ?: null,
            'ru_keywords' => $validated['ru_keywords'] ?: null,
            'tr_keywords' => $validated['tr_keywords'] ?: null,
        ]);

        return redirect()->back()->with('message', "Keywords assigned to {$updated} item(s) in \"{$category->name}\" and its sub-categories.");
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

        Category::flushNavCache();

        if ($oldImage && $oldImage !== $fileName) {
            Storage::disk('public')->delete("categories/{$oldImage}");
        }

        return redirect()->back()->with('message', 'Category image updated from Business Central.');
    }
}
