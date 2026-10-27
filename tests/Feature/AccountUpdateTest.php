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
        'address' => $user->address,
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

it('ignores a BC customer number sent by a non-admin', function () {
    Queue::fake();

    $user = User::factory()->create(['tax_id' => '111', 'bc_customer_no' => 'C001', 'phone_country' => 'GE']);

    $this->actingAs($user)
        ->put(route('account.update', $user), validPayload($user, ['bc_customer_no' => 'C999']))
        ->assertSessionDoesntHaveErrors();

    expect($user->fresh()->bc_customer_no)->toBe('C001');
});
