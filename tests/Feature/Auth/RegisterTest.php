<?php

use App\Models\User;
use App\Services\BusinessCentralService;
use App\Services\SmsService;

function mockOtpSms(string $otp = '123456'): void
{
    test()->mock(SmsService::class, function ($mock) use ($otp) {
        $mock->shouldReceive('generateOtp')->andReturn($otp);
        $mock->shouldReceive('sendOtp')->andReturn(['success' => true, 'message' => 'sent']);
    });
}

function validRegisterPayload(array $overrides = []): array
{
    return array_merge([
        'user_type' => 'individual',
        'tax_id' => '123456789',
        'name' => 'Test',
        'lastname' => 'User',
        'phone_country' => 'GE',
        'phone' => '555123456',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'captcha_token' => 'test-token',
    ], $overrides);
}

it('shows the register form', function () {
    $this->get(route('register.show'))->assertOk();
});

it('sends an OTP and redirects to phone verification on valid registration', function () {
    mockOtpSms();

    $response = $this->post(route('register'), validRegisterPayload());

    $response->assertRedirect(route('register.verify-phone.show'));
    $response->assertSessionHas('otp', '123456');
    $response->assertSessionHas('register_data');
    $this->assertDatabaseMissing('users', ['email' => 'test@example.com']);
});

it('rejects registration when the phone is already registered', function () {
    User::factory()->create(['phone' => '+995555123456', 'phone_country' => 'GE']);

    mockOtpSms();

    $response = $this->post(route('register'), validRegisterPayload());

    $response->assertSessionHasErrors('phone');
});

it('creates the user, links the BC customer, and logs in on correct OTP', function () {
    mockOtpSms();

    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldReceive('getCustomer')->once()->andReturn([
            'value' => [['No' => 'C100']],
        ]);
    });

    $this->post(route('register'), validRegisterPayload());

    $response = $this->post(route('register.verify-code'), ['otp' => '123456']);

    $response->assertRedirect(route('account.index'));
    $this->assertAuthenticated();

    $user = User::where('email', 'test@example.com')->first();
    expect($user)->not->toBeNull();
    expect($user->bc_customer_no)->toBe('C100');
});

it('rejects verification with the wrong OTP and does not log in', function () {
    mockOtpSms();

    $this->post(route('register'), validRegisterPayload());

    $response = $this->post(route('register.verify-code'), ['otp' => '000000']);

    $response->assertSessionHasErrors('message');
    $this->assertGuest();
    $this->assertDatabaseMissing('users', ['email' => 'test@example.com']);
});

it('resends a fresh OTP', function () {
    mockOtpSms();

    $this->post(route('register'), validRegisterPayload());

    mockOtpSms('654321');

    $response = $this->post(route('register.resend-code'));

    $response->assertSessionDoesntHaveErrors();
    $response->assertSessionHas('otp', '654321');
});
