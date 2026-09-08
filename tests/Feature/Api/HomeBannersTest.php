<?php

use App\Models\BannerImage;
use Illuminate\Support\Facades\Cache;

beforeEach(fn () => Cache::flush());

function apiMainBanner(array $overrides = []): BannerImage
{
    return BannerImage::create(array_merge([
        'slot' => 'main',
        'image_path' => 'banners/main/desktop-'.uniqid().'.jpg',
        'sort_order' => 0,
    ], $overrides));
}

it('returns only main banner slides that have a mobile image, using the mobile url', function () {
    apiMainBanner(['sort_order' => 1]); // no mobile image -> excluded
    apiMainBanner(['sort_order' => 2, 'mobile_image_path' => 'banners/main/mobile/a.jpg']);

    $response = $this->getJson(route('api.home'));

    $response->assertOk();
    $main = $response->json('banners.main');

    expect($main)->toHaveCount(1)
        ->and($main[0]['image_url'])->toContain('banners/main/mobile/a.jpg');
});

it('returns an empty main banner list when no slide has a mobile image', function () {
    apiMainBanner();
    apiMainBanner(['sort_order' => 1]);

    $response = $this->getJson(route('api.home'));

    $response->assertOk();
    expect($response->json('banners.main'))->toBe([]);
});

it('still exposes the desktop image to the web homepage', function () {
    apiMainBanner(['image_path' => 'banners/main/desktop.jpg']);

    $this->get('/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('banners.main.0.image_url', fn ($url) => str_contains($url, 'banners/main/desktop.jpg'))
        );
});
