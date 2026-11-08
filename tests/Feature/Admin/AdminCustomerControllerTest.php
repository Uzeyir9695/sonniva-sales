<?php

use App\Models\User;
use App\Services\BusinessCentralService;
use Illuminate\Queue\CallQueuedClosure;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Queue;

beforeEach(function () {
    $this->mock(BusinessCentralService::class)->shouldReceive('getCustomer', 'addCustomer')->andReturn(['value' => []])->byDefault();
    Queue::fake();
});

it('is closed to non-admins', function () {
    $this->actingAs(User::factory()->create(['role' => 'user']))
        ->getJson(route('admin.customers.index', ['q' => 'x']))
        ->assertForbidden();

    $this->actingAs(User::factory()->create(['role' => 'manager']))
        ->getJson(route('admin.customers.index', ['q' => 'x']))
        ->assertForbidden();
});

it('searches customers by name, phone or tax id and only returns role=user', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $match = User::factory()->create(['role' => 'user', 'name' => 'Nino', 'lastname' => 'Beridze', 'tax_id' => '01001099999']);
    User::factory()->create(['role' => 'user', 'name' => 'Someone Else']);
    User::factory()->create(['role' => 'manager', 'name' => 'Nino Manager']);

    $ids = collect($this->actingAs($admin)->getJson(route('admin.customers.index', ['q' => 'Nino']))
        ->assertOk()->json('customers'))->pluck('id');

    expect($ids)->toContain($match->id)->toHaveCount(1);
});

it('registers a customer with the phone as the password and queues the BC sync', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)->postJson(route('admin.customers.store'), [
        'user_type' => 'individual',
        'name' => 'Giorgi',
        'lastname' => 'Kapanadze',
        'phone' => '599123456',
        'tax_id' => '01001012345',
        'address' => 'Tbilisi, Rustaveli 1',
    ])->assertCreated();

    $customer = User::where('tax_id', '01001012345')->firstOrFail();
    expect($customer->role)->toBe('user')
        ->and($customer->user_type)->toBe('individual')
        ->and($customer->phone_verified_at)->not->toBeNull()
        ->and(Hash::check('599123456', $customer->password))->toBeTrue();

    $response->assertJsonPath('customer.id', $customer->id);
    Queue::assertPushed(CallQueuedClosure::class);
});

it('requires phone and tax id', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $this->actingAs($admin)->postJson(route('admin.customers.store'), [
        'name' => 'Giorgi',
        'lastname' => 'Kapanadze',
    ])->assertStatus(422)->assertJsonValidationErrors(['phone', 'tax_id']);
});

it('rejects a phone that already belongs to a user', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    User::factory()->create(['phone' => '+995599123456', 'phone_country' => 'GE']);

    $this->actingAs($admin)->postJson(route('admin.customers.store'), [
        'user_type' => 'individual',
        'name' => 'Giorgi',
        'lastname' => 'Kapanadze',
        'phone' => '599123456',
        'tax_id' => '01001012345',
        'address' => 'Tbilisi, Rustaveli 1',
    ])->assertStatus(422)->assertJsonValidationErrors(['phone']);
});

it('saves the address of a customer registered by an admin', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)->postJson(route('admin.customers.store'), [
        'user_type' => 'individual',
        'name' => 'Giorgi',
        'lastname' => 'Kapanadze',
        'phone' => '599123456',
        'tax_id' => '01001012345',
        'address' => 'Tbilisi, Rustaveli 1',
    ])->assertCreated();

    expect(User::find($response->json('customer.id'))->address)->toBe('Tbilisi, Rustaveli 1');
});

it('requires an address when an admin registers a customer', function (?string $address) {
    $admin = User::factory()->create(['role' => 'admin']);

    $this->actingAs($admin)->postJson(route('admin.customers.store'), [
        'user_type' => 'individual',
        'name' => 'Giorgi',
        'lastname' => 'Kapanadze',
        'phone' => '599123456',
        'tax_id' => '01001012345',
        'address' => $address,
    ])->assertStatus(422)->assertJsonValidationErrors(['address']);
})->with([
    'missing' => null,
    'blank' => '   ',
]);
