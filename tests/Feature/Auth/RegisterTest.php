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
        'tax_id' => '12345678901',
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

it('allows registration without an email', function () {
    mockOtpSms();

    $payload = validRegisterPayload();
    unset($payload['email']);

    $response = $this->post(route('register'), $payload);

    $response->assertRedirect(route('register.verify-phone.show'));
    $response->assertSessionHasNoErrors();
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

it('validates tax_id length by user type and residency', function (string $userType, bool $isForeign, string $taxId, bool $valid) {
    mockOtpSms();

    $response = $this->post(route('register'), validRegisterPayload([
        'user_type' => $userType,
        'is_foreign_resident' => $isForeign,
        'tax_id' => $taxId,
    ]));

    $valid
        ? $response->assertSessionDoesntHaveErrors('tax_id')
        : $response->assertSessionHasErrors('tax_id');
})->with([
    'individual resident 11' => ['individual', false, '12345678901', true],
    'individual resident 9' => ['individual', false, '123456789', false],
    'individual resident 12' => ['individual', false, '123456789012', false],
    'legal resident 9' => ['legal_entity', false, '123456789', true],
    'legal resident 11' => ['legal_entity', false, '12345678901', false],
    'foreign individual 7' => ['individual', true, '1234567', true],
    'foreign legal 20' => ['legal_entity', true, str_repeat('1', 20), true],
    'foreign 6' => ['individual', true, '123456', false],
    'foreign 21' => ['legal_entity', true, str_repeat('1', 21), false],
]);

it('resends a fresh OTP', function () {
    mockOtpSms();

    $this->post(route('register'), validRegisterPayload());

    mockOtpSms('654321');

    $response = $this->post(route('register.resend-code'));

    $response->assertSessionDoesntHaveErrors();
    $response->assertSessionHas('otp', '654321');
});
