<?php

use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;

it('shows the login form', function () {
    $this->get(route('login'))->assertOk();
});

it('logs in with a valid email and password', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'password' => bcrypt('password'),
    ]);

    $response = $this->post(route('login.post'), [
        'login' => 'test@example.com',
        'password' => 'password',
    ]);

    // LoginController redirects to the literal path "home", not the "/" route named
    // "home" - so this lands on /home rather than route('home'). Asserting the actual
    // current behavior here; see note to the team about this likely being unintended.
    $response->assertRedirect('/home');
    $this->assertAuthenticatedAs($user);
});

it('logs in with a valid phone and password', function () {
    $user = User::factory()->create([
        'phone' => '+995555123456',
        'phone_country' => 'GE',
        'password' => bcrypt('password'),
    ]);

    $response = $this->post(route('login.post'), [
        'login' => '555123456',
        'password' => 'password',
    ]);

    $response->assertRedirect('/home');
    $this->assertAuthenticatedAs($user);
});

it('redirects admins to the admin dashboard', function () {
    User::factory()->create([
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
    ]);

    $response = $this->post(route('login.post'), [
        'login' => 'admin@example.com',
        'password' => 'password',
    ]);

    $response->assertRedirect(route('admin.index'));
});

it('rejects an invalid password', function () {
    User::factory()->create([
        'email' => 'test@example.com',
        'password' => bcrypt('password'),
    ]);

    $response = $this->post(route('login.post'), [
        'login' => 'test@example.com',
        'password' => 'wrong-password',
    ]);

    $response->assertSessionHasErrors('message');
    $this->assertGuest();
});

it('locks out after too many failed attempts', function () {
    User::factory()->create([
        'email' => 'test@example.com',
        'password' => bcrypt('password'),
    ]);

    foreach (range(1, 3) as $attempt) {
        $this->post(route('login.post'), [
            'login' => 'test@example.com',
            'password' => 'wrong-password',
        ]);
    }

    $response = $this->post(route('login.post'), [
        'login' => 'test@example.com',
        'password' => 'password',
    ]);

    $response->assertSessionHasErrors('message');
    $this->assertGuest();

    RateLimiter::clear('login-attempt:test@example.com');
});

it('logs the user out', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('logout'));

    $response->assertRedirect(route('login'));
    $this->assertGuest();
});
