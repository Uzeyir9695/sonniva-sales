<?php

use App\Models\HomeSection;
use App\Models\Item;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

function adminUser(): User
{
    return User::factory()->create(['role' => 'admin']);
}

function makeItem(array $overrides = []): Item
{
    return Item::create(array_merge([
        'no' => 'ITEM-'.Str::random(8),
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'images' => [],
    ], $overrides));
}

it('lets an admin create a home section', function () {
    $this->actingAs(adminUser())->post(route('admin.home-page.sections.store'))->assertRedirect();

    expect(HomeSection::count())->toBe(1);
});

it('forbids a non-admin from creating a home section', function () {
    $this->actingAs(User::factory()->create(['role' => 'customer']))
        ->post(route('admin.home-page.sections.store'))
        ->assertForbidden();

    expect(HomeSection::count())->toBe(0);
});

it('lets an admin toggle a section hidden', function () {
    $section = HomeSection::create(['is_hidden' => false]);

    $this->actingAs(adminUser())
        ->patch(route('admin.home-page.sections.toggle-hidden', $section))
        ->assertRedirect();

    expect($section->fresh()->is_hidden)->toBeTrue();
});

it('deletes a section along with its uploaded images', function () {
    Storage::fake('public');

    $section = HomeSection::create();
    $path = UploadedFile::fake()->image('gallery.jpg')->store("home-sections/{$section->id}", 'public');
    $image = $section->images()->create(['image_path' => $path]);

    $this->actingAs(adminUser())
        ->delete(route('admin.home-page.sections.destroy', $section))
        ->assertRedirect();

    expect(HomeSection::find($section->id))->toBeNull();
    expect($section->images()->count())->toBe(0);
    Storage::disk('public')->assertMissing($path);
});

it('lets an admin attach and detach an item, idempotently', function () {
    $section = HomeSection::create();
    $item = makeItem();
    $admin = adminUser();

    $this->actingAs($admin)
        ->post(route('admin.home-page.sections.items.store', $section), ['item_id' => $item->id])
        ->assertRedirect();
    $this->actingAs($admin)
        ->post(route('admin.home-page.sections.items.store', $section), ['item_id' => $item->id])
        ->assertRedirect();

    expect($section->items()->count())->toBe(1);

    $this->actingAs($admin)
        ->delete(route('admin.home-page.sections.items.destroy', [$section, $item]))
        ->assertRedirect();

    expect($section->items()->count())->toBe(0);
});

it('lets an admin upload, update, and delete a gallery image', function () {
    Storage::fake('public');

    $section = HomeSection::create();
    $admin = adminUser();

    $this->actingAs($admin)
        ->post(route('admin.home-page.sections.images.store', $section), [
            'image' => UploadedFile::fake()->image('promo.jpg'),
            'title' => 'Promo',
            'link_url' => '/c/doors',
        ])
        ->assertRedirect();

    $image = $section->images()->sole();
    expect($image->title)->toBe('Promo');
    expect($image->link_url)->toBe('/c/doors');
    Storage::disk('public')->assertExists($image->image_path);

    $this->actingAs($admin)
        ->put(route('admin.home-page.sections.images.update', [$section, $image]), [
            'title' => 'Updated Promo',
            'link_url' => '/c/frames',
        ])
        ->assertRedirect();

    expect($image->fresh()->title)->toBe('Updated Promo');
    expect($image->fresh()->link_url)->toBe('/c/frames');

    $this->actingAs($admin)
        ->delete(route('admin.home-page.sections.images.destroy', [$section, $image]))
        ->assertRedirect();

    expect($section->images()->count())->toBe(0);
    Storage::disk('public')->assertMissing($image->image_path);
});

it('excludes hidden sections but includes visible ones on the public home page', function () {
    $visible = HomeSection::create(['carousel_title' => 'Visible Section', 'is_hidden' => false]);
    $visible->items()->attach(makeItem()->id);

    HomeSection::create(['carousel_title' => 'Hidden Section', 'is_hidden' => true]);

    $this->get(route('home'))->assertInertia(fn (Assert $page) => $page
        ->has('homeSections', 1)
        ->where('homeSections.0.id', $visible->id)
    );
});
