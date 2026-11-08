<?php

use App\Models\BannerImage;
use App\Models\Item;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function mainBanner(array $overrides = []): BannerImage
{
    return BannerImage::create(array_merge([
        'slot' => 'main',
        'image_path' => 'banners/main/desktop.jpg',
        'sort_order' => 0,
    ], $overrides));
}

it('forbids a non-admin from attaching a mobile image', function () {
    Storage::fake('public');
    $banner = mainBanner();

    $this->actingAs(User::factory()->create(['role' => 'customer']))
        ->post(route('admin.home-page.banners.mobile-image.store', $banner), [
            'mobile_image' => UploadedFile::fake()->image('m.jpg'),
        ])
        ->assertForbidden();
});

it('gives the mobile app the linked item id for a banner', function () {
    $item = Item::create([
        'no' => 'BNR-1',
        'name' => 'Banner item',
        'slug' => 'banner-item',
        'inventory' => 1,
        'unit_price' => 10,
    ]);
    mainBanner(['mobile_image_path' => 'banners/main/mobile/m.jpg', 'item_id' => $item->id]);
    mainBanner(['mobile_image_path' => 'banners/main/mobile/n.jpg', 'sort_order' => 1]);

    $this->getJson(route('api.home'))
        ->assertOk()
        ->assertJsonPath('banners.main.0.item_id', $item->id)
        ->assertJsonPath('banners.main.0.item_slug', 'banner-item')
        ->assertJsonPath('banners.main.1.item_id', null);
});
