<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BannerImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminBannerController extends Controller
{
    public function index(): Response
    {
        $banners = BannerImage::with('item:id,name,slug')
            ->orderBy('slot')->orderBy('sort_order')->get()
            ->groupBy('slot')
            ->map(fn ($group) => $group->map(fn ($b) => [
                'id' => $b->id,
                'image_url' => Storage::disk('public')->url($b->image_path),
                'sort_order' => $b->sort_order,
                'item' => $b->item,
            ]));

        return Inertia::render('Admin/HomePage/Index', [
            'banners' => $banners,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'slot' => ['required', 'in:main,doors,frames'],
            'item_id' => ['required_if:slot,main', 'nullable', 'exists:items,id'],
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['required', 'image', 'max:4096'],
        ]);

        $slot = $request->slot;
        $nextOrder = BannerImage::where('slot', $slot)->max('sort_order') + 1;

        foreach ($request->file('images') as $file) {
            $path = $file->store("banners/{$slot}", 'public');
            BannerImage::create([
                'slot' => $slot,
                'item_id' => $request->item_id,
                'image_path' => $path,
                'sort_order' => $nextOrder++,
            ]);
        }

        Cache::forget('nav_banners');

        return back()->with('message', 'Images uploaded.');
    }

    public function destroy(BannerImage $banner): RedirectResponse
    {
        Storage::disk('public')->delete($banner->image_path);
        $banner->delete();
        Cache::forget('nav_banners');

        return back()->with('message', 'Image deleted.');
    }
}
