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
