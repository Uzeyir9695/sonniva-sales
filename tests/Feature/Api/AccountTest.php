<?php

use App\Jobs\UpdateBusinessCentralCustomer;
use App\Models\Item;
use App\Models\Order;
use App\Models\User;
use App\Services\BusinessCentralService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

function validAccountPayload(User $user, array $overrides = []): array
{
    return array_merge([
        'user_type' => $user->user_type,
        'name' => $user->name,
        'lastname' => $user->lastname,
        'phone' => $user->phone->formatE164(),
        'email' => $user->email,
        'tax_id' => (string) $user->tax_id,
        'address' => 'Tbilisi, Rustaveli 1',
    ], $overrides);
}

it('requires an address when updating a profile through the API', function (?string $address) {
    Queue::fake();

    $user = User::factory()->create(['phone_country' => 'GE', 'tax_id' => '111', 'Address' => 'Old address']);
    Sanctum::actingAs($user);

    $this->putJson('/api/v1/account', validAccountPayload($user, ['address' => $address]))
        ->assertJsonValidationErrors('address');

    expect($user->fresh()->address)->toBe('Old address');
})->with([
    'missing' => null,
    'blank' => '   ',
]);

it('lets an admin account save through the API without an address', function () {
    Queue::fake();

    $admin = User::factory()->create(['role' => 'admin', 'phone_country' => 'GE', 'tax_id' => '111', 'Address' => null]);
    Sanctum::actingAs($admin);

    $this->putJson('/api/v1/account', validAccountPayload($admin, ['address' => null]))->assertOk();
});

describe('show', function () {
    it('returns the authenticated user\'s profile fields', function () {
        $user = User::factory()->create(['phone_country' => 'GE']);

        Sanctum::actingAs($user);

        $this->getJson('/api/v1/account')
            ->assertOk()
            ->assertJson([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'lastname' => $user->lastname,
                    'email' => $user->email,
                    'tax_id' => $user->tax_id,
                ],
            ])
            ->assertJsonMissing(['password'])
            ->assertJsonMissing(['can_view_wholesales']);
    });

    it('rejects an unauthenticated request', function () {
        $this->getJson('/api/v1/account')->assertUnauthorized();
    });
});

describe('update', function () {
    it('updates the profile fields', function () {
        Queue::fake();

        $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => null, 'phone_country' => 'GE']);

        Sanctum::actingAs($user);

        $this->putJson('/api/v1/account', validAccountPayload($user, ['name' => 'Updated Name']))
            ->assertOk();

        expect($user->fresh()->name)->toBe('Updated Name');
    });

    it('blocks the update when the new tax id belongs to a different BC customer', function () {
        Queue::fake();

        $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => 'C001', 'phone_country' => 'GE']);

        $this->mock(BusinessCentralService::class, function ($mock) {
            $mock->shouldReceive('getCustomer')->once()->andReturn([
                'value' => [['No' => 'C999']],
            ]);
        });

        Sanctum::actingAs($user);

        $this->putJson('/api/v1/account', validAccountPayload($user, ['tax_id' => '222']))
            ->assertStatus(422)
            ->assertJsonValidationErrors('tax_id');

        expect($user->fresh()->tax_id)->toBe('111');
        Queue::assertNotPushed(UpdateBusinessCentralCustomer::class);
    });

    it('allows the update when the new tax id is not claimed by BC', function () {
        Queue::fake();

        $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => 'C001', 'phone_country' => 'GE']);

        $this->mock(BusinessCentralService::class, function ($mock) {
            $mock->shouldReceive('getCustomer')->once()->andReturn(['value' => []]);
        });

        Sanctum::actingAs($user);

        $this->putJson('/api/v1/account', validAccountPayload($user, ['tax_id' => '222']))
            ->assertOk();

        expect($user->fresh()->tax_id)->toBe('222');
        Queue::assertPushed(UpdateBusinessCentralCustomer::class);
    });

    it('does not expose admin-only permission fields to the request', function () {
        Queue::fake();

        $user = User::factory()->create(['phone_country' => 'GE', 'can_view_wholesales' => false]);

        Sanctum::actingAs($user);

        $this->putJson('/api/v1/account', validAccountPayload($user, ['can_view_wholesales' => true]))
            ->assertOk();

        expect($user->fresh()->can_view_wholesales)->toBeFalse();
    });

    it('rejects an unauthenticated request', function () {
        $user = User::factory()->make(['phone_country' => 'GE']);

        $this->putJson('/api/v1/account', validAccountPayload($user))->assertUnauthorized();
    });
});

describe('change password', function () {
    it('changes the password and revokes existing tokens', function () {
        $user = User::factory()->create(['password' => Hash::make('old-password')]);

        $token = $user->createToken('test')->plainTextToken;

        $this->withHeader('Authorization', 'Bearer '.$token)
            ->putJson('/api/v1/account/change-password', [
                'current_password' => 'old-password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ])
            ->assertOk();

        expect(Hash::check('new-password', $user->fresh()->password))->toBeTrue();
        expect($user->tokens()->count())->toBe(0);
    });

    it('rejects the wrong current password', function () {
        $user = User::factory()->create(['password' => Hash::make('old-password')]);

        Sanctum::actingAs($user);

        $this->putJson('/api/v1/account/change-password', [
            'current_password' => 'wrong-password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ])
            ->assertStatus(422)
            ->assertJsonValidationErrors('current_password');

        expect(Hash::check('old-password', $user->fresh()->password))->toBeTrue();
    });
});

describe('destroy', function () {
    it('anonymizes and soft-deletes the user but keeps their orders', function () {
        $user = User::factory()->create(['password' => 'secret123', 'phone_country' => 'GE']);
        $order = Order::factory()->for($user)->state(['status' => 'delivered'])->create();
        $item = Item::create([
            'no' => Str::random(10),
            'category_code' => 'test-category',
            'name' => 'Test Item',
            'slug' => 'test-item-'.Str::random(8),
            'inventory' => 0,
            'unit_price' => 100,
            'discount' => 0,
            'prices' => [],
        ]);
        $user->wishlists()->create(['item_id' => $item->id]);
        $user->createToken('nativephp-mobile');

        Sanctum::actingAs($user);

        $this->deleteJson('/api/v1/account', ['password' => 'secret123'])->assertOk();

        $deleted = User::withTrashed()->find($user->id);

        expect($deleted->trashed())->toBeTrue()
            ->and($deleted->name)->toBeNull()
            ->and($deleted->phone)->toBeNull()
            ->and($deleted->email)->toBeNull()
            ->and($deleted->tax_id)->toBeNull()
            ->and($deleted->tokens()->count())->toBe(0)
            ->and($deleted->wishlists()->count())->toBe(0)
            ->and($order->fresh()->user->id)->toBe($user->id);
    });

    it('rejects a wrong password', function () {
        $user = User::factory()->create(['password' => 'secret123']);

        Sanctum::actingAs($user);

        $this->deleteJson('/api/v1/account', ['password' => 'wrong-password'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password');

        expect($user->fresh()->trashed())->toBeFalse();
    });

    it('refuses while an order is in progress', function () {
        $user = User::factory()->create(['password' => 'secret123']);
        Order::factory()->for($user)->paid()->create();

        Sanctum::actingAs($user);

        $this->deleteJson('/api/v1/account', ['password' => 'secret123'])->assertConflict();

        expect($user->fresh()->trashed())->toBeFalse();
    });

    it('lets the phone number register again', function () {
        $user = User::factory()->create(['password' => 'secret123', 'phone_country' => 'GE']);
        $phone = $user->getRawOriginal('phone');

        Sanctum::actingAs($user);

        $this->deleteJson('/api/v1/account', ['password' => 'secret123'])->assertOk();

        expect(User::where('phone', $phone)->exists())->toBeFalse();

        User::factory()->create(['phone' => $phone, 'phone_country' => 'GE']);
    });
});
