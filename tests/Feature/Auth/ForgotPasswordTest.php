<?php

use App\Models\User;
use App\Services\SmsService;
use Illuminate\Support\Facades\Hash;

function mockForgotPasswordOtpSms(string $otp = '123456'): void
{
    test()->mock(SmsService::class, function ($mock) use ($otp) {
        $mock->shouldReceive('generateOtp')->andReturn($otp);
        $mock->shouldReceive('sendOtp')->andReturn(['success' => true, 'message' => 'sent']);
    });
}

it('shows the forgot password form', function () {
    $this->get(route('show.forgot.password'))->assertOk();
});

it('sends an OTP for a registered phone', function () {
    User::factory()->create(['phone' => '+995555123456', 'phone_country' => 'GE']);

    mockForgotPasswordOtpSms();

    $response = $this->post(route('forgot-password.send-verification-code'), [
        'phone_country' => 'GE',
        'phone' => '555123456',
    ]);

    $response->assertRedirect(route('forgot-password.verify-phone.show'));
    $response->assertSessionHas('otp', '123456');
});

it('rejects sending an OTP for an unregistered phone', function () {
    mockForgotPasswordOtpSms();

    $response = $this->post(route('forgot-password.send-verification-code'), [
        'phone_country' => 'GE',
        'phone' => '555123456',
    ]);

    $response->assertSessionHasErrors('phone');
});

it('verifies the OTP and allows reaching the reset step', function () {
    User::factory()->create(['phone' => '+995555123456', 'phone_country' => 'GE']);

    mockForgotPasswordOtpSms();

    $this->post(route('forgot-password.send-verification-code'), [
        'phone_country' => 'GE',
        'phone' => '555123456',
    ]);

    $response = $this->post(route('forgot-password.verify-code'), ['otp' => '123456']);

    $response->assertRedirect(route('forgot-password.reset.show'));
    $response->assertSessionHas('verified_phone');
});

it('rejects the wrong OTP', function () {
    User::factory()->create(['phone' => '+995555123456', 'phone_country' => 'GE']);

    mockForgotPasswordOtpSms();

    $this->post(route('forgot-password.send-verification-code'), [
        'phone_country' => 'GE',
        'phone' => '555123456',
    ]);

    $response = $this->post(route('forgot-password.verify-code'), ['otp' => '000000']);

    $response->assertSessionHasErrors('message');
    $response->assertSessionMissing('verified_phone');
});

it('resets the password after a verified OTP', function () {
    $user = User::factory()->create([
        'phone' => '+995555123456',
        'phone_country' => 'GE',
        'password' => bcrypt('old-password'),
    ]);

    mockForgotPasswordOtpSms();

    $this->post(route('forgot-password.send-verification-code'), [
        'phone_country' => 'GE',
        'phone' => '555123456',
    ]);

    $this->post(route('forgot-password.verify-code'), ['otp' => '123456']);

    $response = $this->post(route('forgot-password.reset'), [
        'password' => 'new-password',
        'password_confirmation' => 'new-password',
    ]);

    $response->assertRedirect(route('login'));
    expect(Hash::check('new-password', $user->fresh()->password))->toBeTrue();
});

it('rejects resetting the password without a verified session', function () {
    User::factory()->create(['phone' => '+995555123456', 'phone_country' => 'GE']);

    $response = $this->post(route('forgot-password.reset'), [
        'password' => 'new-password',
        'password_confirmation' => 'new-password',
    ]);

    $response->assertSessionHasErrors('message');
});

it('resends a fresh OTP', function () {
    User::factory()->create(['phone' => '+995555123456', 'phone_country' => 'GE']);

    mockForgotPasswordOtpSms();

    $this->post(route('forgot-password.send-verification-code'), [
        'phone_country' => 'GE',
        'phone' => '555123456',
    ]);

    mockForgotPasswordOtpSms('654321');

    $response = $this->post(route('forgot-password.resend-code'));

    $response->assertSessionDoesntHaveErrors();
    $response->assertSessionHas('otp', '654321');
});
