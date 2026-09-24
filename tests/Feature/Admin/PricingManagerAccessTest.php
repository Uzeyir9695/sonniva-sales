<?php

use App\Models\Item;
use App\Models\User;
use Illuminate\Support\Str;

function pricingManager(): User
{
    return User::factory()->create(['role' => 'pricing_manager']);
}

it('redirects a pricing manager to the manage items page after login', function () {
    User::factory()->create([
        'email' => 'pricemanager@example.com',
        'password' => bcrypt('password'),
        'role' => 'pricing_manager',
    ]);

    $this->post(route('login.post'), [
        'login' => 'pricemanager@example.com',
        'password' => 'password',
    ])->assertRedirect(route('admin.items.index'));
});

it('lets a pricing manager use the manage item pages', function () {
    $this->actingAs(pricingManager());

    $this->get(route('admin.items.index'))->assertOk();
    $this->get(route('admin.items.managed'))->assertOk();
    $this->getJson(route('admin.items.search', ['q' => 'drill']))->assertOk();
});

it('lets a pricing manager update an item discount', function () {
    $item = Item::create([
        'no' => 'PMSKU',
        'name' => 'Drill',
        'slug' => 'item-'.Str::random(6),
        'inventory' => 1,
        'unit_price' => 100,
    ]);

    $this->actingAs(pricingManager())
        ->put(route('admin.items.update', $item), ['discount' => 10])
        ->assertSessionHasNoErrors();

    expect((float) $item->fresh()->discount)->toBe(10.0);
});

it('blocks a pricing manager from the rest of the admin panel', function (string $method, string $routeName) {
    $this->actingAs(pricingManager())
        ->{$method}(route($routeName))
        ->assertForbidden();
})->with([
    'dashboard' => ['get', 'admin.index'],
    'orders' => ['get', 'admin.orders.index'],
    'users' => ['get', 'admin.users.index'],
    'payments' => ['get', 'admin.payments.index'],
    'home page' => ['get', 'admin.home-page.index'],
    'item sync' => ['post', 'admin.items.sync'],
    'inventory sync' => ['post', 'admin.items.sync-inventory'],
    'category search' => ['get', 'admin.categories.search'],
    'customer picker' => ['get', 'admin.customers.index'],
]);

it('blocks regular users from the manage item pages', function () {
    $this->actingAs(User::factory()->create(['role' => 'user']))
        ->get(route('admin.items.index'))
        ->assertForbidden();
});

it('still lets admins and managers use the manage item pages', function (string $role) {
    $this->actingAs(User::factory()->create(['role' => $role]))
        ->get(route('admin.items.index'))
        ->assertOk();
})->with(['admin', 'manager']);
