<?php

use App\Models\Order;
use App\Models\User;

it('deletes the account and logs the user out', function () {
    $user = User::factory()->create(['password' => 'secret123']);

    $this->actingAs($user)
        ->delete(route('account.destroy'), ['password' => 'secret123'])
        ->assertRedirect(route('home'));

    $this->assertGuest();
    expect(User::withTrashed()->find($user->id)->trashed())->toBeTrue();
});

it('rejects a wrong password', function () {
    $user = User::factory()->create(['password' => 'secret123']);

    $this->actingAs($user)
        ->from('/delete-account')
        ->delete(route('account.destroy'), ['password' => 'wrong-password'])
        ->assertRedirect('/delete-account')
        ->assertSessionHasErrors('password');

    expect($user->fresh()->trashed())->toBeFalse();
});

it('refuses while an order is in progress', function () {
    $user = User::factory()->create(['password' => 'secret123']);
    Order::factory()->for($user)->ready()->create();

    $this->actingAs($user)
        ->from('/delete-account')
        ->delete(route('account.destroy'), ['password' => 'secret123'])
        ->assertSessionHasErrors('message');

    expect($user->fresh()->trashed())->toBeFalse();
});

it('requires login to delete', function () {
    $this->delete(route('account.destroy'), ['password' => 'secret123'])->assertRedirect(route('login'));
});
