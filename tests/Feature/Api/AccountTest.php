<?php

use App\Jobs\UpdateBusinessCentralCustomer;
use App\Models\User;
use App\Services\BusinessCentralService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Queue;
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
        'address' => $user->address,
    ], $overrides);
}

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
