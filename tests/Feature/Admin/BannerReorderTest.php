<?php

use App\Models\BannerImage;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

function reorderBanner(string $slot, int $sortOrder): BannerImage
{
    return BannerImage::create([
        'slot' => $slot,
        'image_path' => "banners/{$slot}/{$sortOrder}.jpg",
        'sort_order' => $sortOrder,
    ]);
}

it('saves the new order of main banners and clears the home cache', function () {
    $first = reorderBanner('main', 1);
    $second = reorderBanner('main', 2);
    $third = reorderBanner('main', 3);
    Cache::forever('nav_banners', ['stale']);

    $this->actingAs(User::factory()->create(['role' => 'admin']))
        ->put(route('admin.home-page.banners.reorder'), ['ids' => [$third->id, $first->id, $second->id]])
        ->assertRedirect();

    expect(BannerImage::where('slot', 'main')->orderBy('sort_order')->pluck('id')->all())
        ->toBe([$third->id, $first->id, $second->id])
        ->and(Cache::has('nav_banners'))->toBeFalse();
});

it('rejects banners from other slots', function () {
    $main = reorderBanner('main', 1);
    $doors = reorderBanner('doors', 1);

    $this->actingAs(User::factory()->create(['role' => 'admin']))
        ->put(route('admin.home-page.banners.reorder'), ['ids' => [$doors->id, $main->id]])
        ->assertSessionHasErrors('ids.0');
});

it('forbids a non-admin from reordering banners', function () {
    $banner = reorderBanner('main', 1);

    $this->actingAs(User::factory()->create(['role' => 'customer']))
        ->put(route('admin.home-page.banners.reorder'), ['ids' => [$banner->id]])
        ->assertForbidden();
});
