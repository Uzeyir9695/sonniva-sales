<?php

use App\Jobs\UpdateBusinessCentralCustomer;
use App\Models\User;
use App\Services\BusinessCentralService;
use Illuminate\Support\Facades\Queue;

function validPayload(User $user, array $overrides = []): array
{
    return array_merge([
        'user_type' => $user->user_type,
        'name' => $user->name,
        'lastname' => $user->lastname,
        'phone_country' => $user->phone_country,
        'phone' => $user->phone->formatE164(),
        'email' => $user->email,
        'tax_id' => $user->tax_id,
        'address' => 'Tbilisi, Rustaveli 1',
    ], $overrides);
}

it('blocks the update when the new tax id belongs to a different BC customer', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => 'C001', 'phone_country' => 'GE']);

    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldReceive('getCustomer')->once()->andReturn([
            'value' => [['No' => 'C999']],
        ]);
    });

    $response = $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['tax_id' => '222']));

    $response->assertSessionHasErrors('tax_id');
    expect($user->fresh()->tax_id)->toBe('111');
    Queue::assertNotPushed(UpdateBusinessCentralCustomer::class);
});

it('allows the update when the new tax id is not claimed by BC', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => 'C001', 'phone_country' => 'GE']);

    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldReceive('getCustomer')->once()->andReturn(['value' => []]);
    });

    $response = $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['tax_id' => '222']));

    $response->assertSessionDoesntHaveErrors();
    expect($user->fresh()->tax_id)->toBe('222');
    Queue::assertPushed(UpdateBusinessCentralCustomer::class);
});

it('allows the update when the matched BC customer is the user\'s own record', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => 'C001', 'phone_country' => 'GE']);

    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldReceive('getCustomer')->once()->andReturn([
            'value' => [['No' => 'C001']],
        ]);
    });

    $response = $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['tax_id' => '222']));

    $response->assertSessionDoesntHaveErrors();
    expect($user->fresh()->tax_id)->toBe('222');
});

it('does not block the update when BC is unreachable', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => 'C001', 'phone_country' => 'GE']);

    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldReceive('getCustomer')->once()->andThrow(new Exception('BC down'));
    });

    $response = $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['tax_id' => '222']));

    $response->assertSessionDoesntHaveErrors();
    expect($user->fresh()->tax_id)->toBe('222');
});

it('does not call BC when the tax id is unchanged', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => 'C001', 'phone_country' => 'GE']);

    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldNotReceive('getCustomer');
    });

    $response = $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user));

    $response->assertSessionDoesntHaveErrors();
});

it('lets an admin grant free delivery to a user', function () {
    Queue::fake();

    $admin = User::factory()->create(['role' => 'admin', 'phone_country' => 'GE']);
    $target = User::factory()->create(['tax_id' => '111', 'phone_country' => 'GE', 'has_free_delivery' => false]);

    $this->actingAs($admin)
        ->put(route('account.update', $target), validPayload($target, ['has_free_delivery' => true]))
        ->assertSessionDoesntHaveErrors();

    expect($target->fresh()->has_free_delivery)->toBeTrue();
});

it('saves permissions for an account without a user type', function () {
    Queue::fake();

    $admin = User::factory()->create(['role' => 'admin', 'phone_country' => 'GE', 'tax_id' => '111', 'user_type' => null]);

    $this->actingAs($admin)
        ->put(route('account.update', $admin), validPayload($admin, ['can_view_vip' => true, 'can_view_wholesales' => true]))
        ->assertSessionDoesntHaveErrors();

    expect($admin->fresh())
        ->can_view_vip->toBeTruthy()
        ->can_view_wholesales->toBeTruthy();
});

it('forbids non-admins from updating another user', function (string $role) {
    Queue::fake();

    $customer = User::factory()->create(['name' => 'Original', 'tax_id' => '111', 'phone_country' => 'GE']);
    $phone = $customer->fresh()->getRawOriginal('phone');

    $this->actingAs(User::factory()->create(['role' => $role]))
        ->put(route('account.update', $customer), validPayload($customer, ['name' => 'Changed', 'phone' => '+995599000111']))
        ->assertForbidden();

    expect($customer->fresh()->name)->toBe('Original')
        ->and($customer->fresh()->getRawOriginal('phone'))->toBe($phone);
    Queue::assertNothingPushed();
})->with(['user', 'manager', 'cashier']);

it('clears the last name when a user becomes a legal entity', function () {
    Queue::fake();

    $user = User::factory()->create(['user_type' => 'individual', 'lastname' => 'Doe', 'tax_id' => '111', 'phone_country' => 'GE']);

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['user_type' => 'legal_entity']))
        ->assertSessionDoesntHaveErrors();

    expect($user->fresh()->lastname)->toBeNull();
});

it('keeps a foreign user\'s phone country when it is sent back', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'phone_country' => 'TR', 'phone' => '+905321234567']);

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user))
        ->assertSessionDoesntHaveErrors();

    expect($user->fresh()->phone_country)->toBe('TR');
});

it('rejects a changed phone that is not a valid number', function () {
    $user = User::factory()->create(['tax_id' => '111', 'phone_country' => 'GE']);

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['phone' => '123456789']))
        ->assertSessionHasErrors('phone');
});

it('rejects another user\'s phone in both local and international format', function (string $phone) {
    User::factory()->create(['phone' => '+995599112233', 'phone_country' => 'GE']);
    $user = User::factory()->create(['tax_id' => '111', 'phone_country' => 'GE']);

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['phone' => $phone]))
        ->assertSessionHasErrors('phone');
})->with(['599112233', '+995599112233']);

it('accepts the user\'s own phone typed in local format', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'phone_country' => 'GE', 'phone' => '+995599112233']);

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['phone' => '599112233']))
        ->assertSessionDoesntHaveErrors();

    expect($user->fresh()->getRawOriginal('phone'))->toBe('+995599112233');
});

it('lets a user with an old invalid phone save other fields', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'phone_country' => 'GE']);
    DB::table('users')->where('id', $user->id)->update(['phone' => '+995123456789']);

    expect(Validator::make(['phone' => '+995123456789'], ['phone' => 'phone:GE'])->fails())->toBeTrue();

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['name' => 'Jane', 'phone' => '+995123456789']))
        ->assertSessionDoesntHaveErrors();

    expect($user->fresh()->name)->toBe('Jane');
});

it('does not send a city to BC', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'phone_country' => 'GE']);

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user))
        ->assertSessionDoesntHaveErrors();

    Queue::assertPushed(UpdateBusinessCentralCustomer::class, fn ($job) => ! array_key_exists('City', $job->payload));
});

it('requires an address when updating a profile', function (?string $address) {
    $user = User::factory()->create(['tax_id' => '111', 'phone_country' => 'GE', 'Address' => 'Old address']);

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['address' => $address]))
        ->assertSessionHasErrors('address');

    expect($user->fresh()->address)->toBe('Old address');
})->with([
    'missing' => null,
    'blank' => '   ',
]);

it('lets an admin account save without an address', function () {
    Queue::fake();

    $admin = User::factory()->create(['role' => 'admin', 'phone_country' => 'GE', 'tax_id' => '111', 'Address' => null]);

    $this->actingAs($admin)
        ->put(route('account.update', $admin), validPayload($admin, ['address' => null]))
        ->assertSessionDoesntHaveErrors();
});

it('rejects an unknown user type', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'phone_country' => 'GE']);

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['user_type' => 'admin']))
        ->assertSessionHasErrors('user_type');
});

it('ignores has_free_delivery sent by a non-admin editing their own profile', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'phone_country' => 'GE', 'has_free_delivery' => false]);

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['has_free_delivery' => true]));

    expect($user->fresh()->has_free_delivery)->toBeFalse();
});

it('lets an admin set a user\'s BC customer number', function () {
    Queue::fake();

    $admin = User::factory()->create(['role' => 'admin']);
    $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => null, 'phone_country' => 'GE']);

    $this->actingAs($admin)
        ->put(route('account.update', $user), validPayload($user, ['bc_customer_no' => 'C124280']))
        ->assertSessionDoesntHaveErrors();

    expect($user->fresh()->bc_customer_no)->toBe('C124280');
    Queue::assertPushed(UpdateBusinessCentralCustomer::class, fn ($job) => $job->endpoint === "Customers(No='C124280')");
});

it('rejects a BC customer number already linked to another user', function () {
    Queue::fake();

    $admin = User::factory()->create(['role' => 'admin']);
    User::factory()->create(['bc_customer_no' => 'C124280']);
    $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => 'C001', 'phone_country' => 'GE']);

    $this->actingAs($admin)
        ->put(route('account.update', $user), validPayload($user, ['bc_customer_no' => 'C124280']))
        ->assertSessionHasErrors('bc_customer_no');

    expect($user->fresh()->bc_customer_no)->toBe('C001');
});

it('saves an account whose unchanged BC customer number is shared with another user', function () {
    Queue::fake();

    $admin = User::factory()->create(['role' => 'admin', 'tax_id' => '111', 'phone_country' => 'GE', 'bc_customer_no' => 'C107510']);
    User::factory()->create(['bc_customer_no' => 'C107510']);

    $this->actingAs($admin)
        ->put(route('account.update', $admin), validPayload($admin, ['bc_customer_no' => 'C107510', 'can_view_vip' => true]))
        ->assertSessionDoesntHaveErrors();

    expect($admin->fresh()->can_view_vip)->toBeTruthy();
});

it('ignores a BC customer number sent by a non-admin', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => 'C001', 'phone_country' => 'GE']);

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['bc_customer_no' => 'C999']))
        ->assertSessionDoesntHaveErrors();

    expect($user->fresh()->bc_customer_no)->toBe('C001');
});
