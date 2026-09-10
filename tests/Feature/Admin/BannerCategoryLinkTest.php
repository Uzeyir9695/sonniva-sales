<?php

use App\Models\BannerImage;
use App\Models\Category;
use App\Models\Item;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

beforeEach(fn () => Cache::flush());

function bannerCategory(array $overrides = []): Category
{
    return Category::forceCreate(array_merge([
        'code' => 'BC00',
        'name' => 'Power tools',
        'slug' => 'power-tools',
        'parent_id' => null,
        'level' => 1,
        'sort_order' => 0,
    ], $overrides));
}

it('lets an admin upload a main banner linked to a category', function () {
    Storage::fake('public');
    $category = bannerCategory();

    $this->actingAs(User::factory()->create(['role' => 'admin']))
        ->post(route('admin.home-page.banners.store'), [
            'slot' => 'main',
            'category_id' => $category->id,
            'images' => [UploadedFile::fake()->image('banner.jpg')],
        ])
        ->assertRedirect();

    $banner = BannerImage::sole();
    expect($banner->category_id)->toBe($category->id)
        ->and($banner->item_id)->toBeNull();
});

it('rejects a banner linked to both an item and a category', function () {
    Storage::fake('public');
    $category = bannerCategory();

    $this->actingAs(User::factory()->create(['role' => 'admin']))
        ->post(route('admin.home-page.banners.store'), [
            'slot' => 'main',
            'item_id' => Item::create([
                'no' => 'SKU'.Str::random(6),
                'name' => 'Test item',
                'slug' => 'item-'.Str::random(8),
                'category_code' => 'BC00',
                'inventory' => 1,
                'unit_price' => 10,
            ])->id,
            'category_id' => $category->id,
            'images' => [UploadedFile::fake()->image('banner.jpg')],
        ])
        ->assertSessionHasErrors('category_id');

    expect(BannerImage::count())->toBe(0);
});

it('finds categories by code or by localized name', function () {
    bannerCategory(['code' => 'BC00', 'name' => 'ხელსაწყოები', 'name_en' => 'Power tools', 'slug' => 'power-tools']);
    $admin = User::factory()->create(['role' => 'admin']);

    expect($this->actingAs($admin)->getJson(route('admin.categories.search', ['q' => 'BC00']))->json())->toHaveCount(1)
        ->and($this->actingAs($admin)->getJson(route('admin.categories.search', ['q' => 'Power']))->json())->toHaveCount(1)
        ->and($this->actingAs($admin)->getJson(route('admin.categories.search', ['q' => 'ხელსაწ']))->json())->toHaveCount(1);
});

it('exposes the category slug to the web homepage', function () {
    $category = bannerCategory();
    BannerImage::create([
        'slot' => 'main',
        'category_id' => $category->id,
        'image_path' => 'banners/main/desktop.jpg',
        'mobile_image_path' => 'banners/main/mobile/a.jpg',
        'sort_order' => 0,
    ]);

    $this->get(route('home'))
        ->assertInertia(fn ($page) => $page
            ->where('banners.main.0.category_slug', 'power-tools')
            ->where('banners.main.0.item_slug', null)
        );
});
