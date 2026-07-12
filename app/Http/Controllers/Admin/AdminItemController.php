<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\SyncItemCategoryJob;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        $request->validate([
            'video_url' => ['nullable', 'url', 'regex:/^https?:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}/'],
            'discount' => ['nullable', 'numeric', 'min:0', 'max:100'],
        ], [
            'video_url.regex' => 'Paste the link from YouTube\'s Share button (youtu.be/...).',
        ]);

        $item->update([
            'video_url' => $request->input('video_url') ?: null,
            'discount' => $request->input('discount') ?: null,
        ]);

        return redirect()->back()->with('message', 'Item updated.');
    }
}
