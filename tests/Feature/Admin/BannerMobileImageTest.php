<?php

use App\Models\BannerImage;
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

it('lets an admin attach a mobile image to a banner', function () {
    Storage::fake('public');
    $banner = mainBanner();

    $this->actingAs(User::factory()->create(['role' => 'admin']))
        ->post(route('admin.home-page.banners.mobile-image.store', $banner), [
            'mobile_image' => UploadedFile::fake()->image('mobile.jpg', 1080, 1350),
        ])
        ->assertRedirect();

    $banner->refresh();
    expect($banner->mobile_image_path)->not->toBeNull();
    Storage::disk('public')->assertExists($banner->mobile_image_path);
});

it('replaces the previous mobile image on re-upload', function () {
    Storage::fake('public');
    $old = UploadedFile::fake()->image('old.jpg')->store('banners/main/mobile', 'public');
    $banner = mainBanner(['mobile_image_path' => $old]);

    $this->actingAs(User::factory()->create(['role' => 'admin']))
        ->post(route('admin.home-page.banners.mobile-image.store', $banner), [
            'mobile_image' => UploadedFile::fake()->image('new.jpg'),
        ])
        ->assertRedirect();

    Storage::disk('public')->assertMissing($old);
    expect($banner->refresh()->mobile_image_path)->not->toBe($old);
});

it('lets an admin remove the mobile image', function () {
    Storage::fake('public');
    $path = UploadedFile::fake()->image('m.jpg')->store('banners/main/mobile', 'public');
    $banner = mainBanner(['mobile_image_path' => $path]);

    $this->actingAs(User::factory()->create(['role' => 'admin']))
        ->delete(route('admin.home-page.banners.mobile-image.destroy', $banner))
        ->assertRedirect();

    Storage::disk('public')->assertMissing($path);
    expect($banner->refresh()->mobile_image_path)->toBeNull();
});

it('validates the uploaded file is an image', function () {
    Storage::fake('public');
    $banner = mainBanner();

    $this->actingAs(User::factory()->create(['role' => 'admin']))
        ->post(route('admin.home-page.banners.mobile-image.store', $banner), [
            'mobile_image' => UploadedFile::fake()->create('doc.pdf', 100, 'application/pdf'),
        ])
        ->assertSessionHasErrors('mobile_image');
});

it('forbids a non-admin from attaching a mobile image', function () {
    Storage::fake('public');
    $banner = mainBanner();

    $this->actingAs(User::factory()->create(['role' => 'customer']))
        ->post(route('admin.home-page.banners.mobile-image.store', $banner), [
            'mobile_image' => UploadedFile::fake()->image('m.jpg'),
        ])
        ->assertForbidden();
});

it('deletes the mobile image file when the banner is deleted', function () {
    Storage::fake('public');
    $desktop = UploadedFile::fake()->image('d.jpg')->store('banners/main', 'public');
    $mobile = UploadedFile::fake()->image('m.jpg')->store('banners/main/mobile', 'public');
    $banner = mainBanner(['image_path' => $desktop, 'mobile_image_path' => $mobile]);

    $this->actingAs(User::factory()->create(['role' => 'admin']))
        ->delete(route('admin.home-page.banners.destroy', $banner))
        ->assertRedirect();

    Storage::disk('public')->assertMissing($desktop);
    Storage::disk('public')->assertMissing($mobile);
});
