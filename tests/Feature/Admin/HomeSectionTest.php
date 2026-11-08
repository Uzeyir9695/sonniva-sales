<?php

use App\Models\HomeSection;
use App\Models\Item;
use App\Models\User;
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

it('forbids a non-admin from creating a home section', function () {
    $this->actingAs(User::factory()->create(['role' => 'customer']))
        ->post(route('admin.home-page.sections.store'))
        ->assertForbidden();

    expect(HomeSection::count())->toBe(0);
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
