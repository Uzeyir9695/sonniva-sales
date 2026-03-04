<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    /**
     * List all wishlisted items for the authenticated user.
     */
    public function index(Request $request)
    {
        $items = $request->user()
            ->wishlistedItems()
            ->latest('wishlists.created_at')
            ->paginate(24);

        if ($request->wantsJson()) {
            return response()->json([
                'data' => $items->items(),
                'meta' => [
                    'total'        => $items->total(),
                    'current_page' => $items->currentPage(),
                    'last_page'    => $items->lastPage(),
                ],
            ]);
        }

        return Inertia::render('Wishlist/Index', [
            'items' => $items,
        ]);
    }

    /**
     * Toggle wishlist status for a single item.
     * Returns the new state so the frontend can update optimistically.
     */
    public function toggle(Request $request, Item $item): JsonResponse
    {
        $added = $request->user()->toggleWishlist($item->id);

        return response()->json([
            'wishlisted' => $added,
            'item_id'    => $item->id,
            'message'    => $added ? 'Added to wishlist' : 'Removed from wishlist',
        ]);
    }

    /**
     * Remove a specific item from the wishlist (explicit DELETE endpoint).
     */
    public function destroy(Request $request, Item $item): JsonResponse
    {
        $request->user()
            ->wishlists()
            ->where('item_id', $item->id)
            ->delete();

        return response()->json([
            'wishlisted' => false,
            'item_id'    => $item->id,
            'message'    => 'Removed from wishlist',
        ]);
    }

    /**
     * Bulk-sync guest wishlist (called after login).
     * Accepts an array of item_ids from localStorage.
     */
    public function syncGuest(Request $request): JsonResponse
    {
        $request->validate([
            'item_ids'   => ['required', 'array', 'max:100'],
            'item_ids.*' => ['string', 'exists:items,id'],  // string not integer
        ]);

        $user = auth()->user();
        $itemIds = collect($request->item_ids)->unique();

        foreach ($itemIds as $itemId) {
            $user->wishlists()->firstOrCreate(
                ['item_id' => $itemId],
            );
        }
        // Return the full set of wishlisted IDs so the frontend can replace localStorage
        $allIds = $user->wishlists()->pluck('item_id');

        return response()->json([
            'wishlisted_ids' => $allIds,
            'merged'         => $itemIds->count(),
        ]);
    }

    /**
     * Return just the IDs of all wishlisted items — lightweight poll endpoint.
     */
    public function ids(Request $request): JsonResponse
    {
        $ids = $request->user()->wishlists()->pluck('item_id');

        return response()->json(['wishlisted_ids' => $ids]);
    }
}
