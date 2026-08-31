<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AttachHomeSectionItemRequest;
use App\Http\Requests\HomeSectionRequest;
use App\Http\Requests\StoreHomeSectionImageRequest;
use App\Http\Requests\UpdateHomeSectionImageRequest;
use App\Models\HomeSection;
use App\Models\HomeSectionImage;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class AdminHomeSectionController extends Controller
{
    public function store(HomeSectionRequest $request): RedirectResponse
    {
        HomeSection::create($request->validated());
        HomeSection::flushCache();

        return back()->with('message', 'Section created.');
    }

    public function update(HomeSectionRequest $request, HomeSection $homeSection): RedirectResponse
    {
        $homeSection->update($request->validated());
        HomeSection::flushCache();

        return back()->with('message', 'Section updated.');
    }

    public function toggleHidden(HomeSection $homeSection): RedirectResponse
    {
        $homeSection->update(['is_hidden' => ! $homeSection->is_hidden]);
        HomeSection::flushCache();

        return back()->with('message', 'Visibility updated.');
    }

    public function destroy(HomeSection $homeSection): RedirectResponse
    {
        $homeSection->images->each(fn (HomeSectionImage $image) => Storage::disk('public')->delete($image->image_path));
        $homeSection->delete();
        HomeSection::flushCache();

        return back()->with('message', 'Section deleted.');
    }

    public function attachItem(AttachHomeSectionItemRequest $request, HomeSection $homeSection): RedirectResponse
    {
        $homeSection->items()->syncWithoutDetaching([$request->validated('item_id')]);
        HomeSection::flushCache();

        return back()->with('message', 'Item added.');
    }

    public function detachItem(HomeSection $homeSection, Item $item): RedirectResponse
    {
        $homeSection->items()->detach($item->id);
        HomeSection::flushCache();

        return back()->with('message', 'Item removed.');
    }

    public function storeImage(StoreHomeSectionImageRequest $request, HomeSection $homeSection): RedirectResponse
    {
        $path = $request->file('image')->store("home-sections/{$homeSection->id}", 'public');

        $homeSection->images()->create([
            'image_path' => $path,
            'title' => $request->validated('title'),
            'link_url' => $request->validated('link_url'),
        ]);

        HomeSection::flushCache();

        return back()->with('message', 'Image uploaded.');
    }

    public function updateImage(UpdateHomeSectionImageRequest $request, HomeSection $homeSection, HomeSectionImage $homeSectionImage): RedirectResponse
    {
        $homeSectionImage->update($request->validated());
        HomeSection::flushCache();

        return back()->with('message', 'Image updated.');
    }

    public function destroyImage(HomeSection $homeSection, HomeSectionImage $homeSectionImage): RedirectResponse
    {
        Storage::disk('public')->delete($homeSectionImage->image_path);
        $homeSectionImage->delete();
        HomeSection::flushCache();

        return back()->with('message', 'Image deleted.');
    }
}
