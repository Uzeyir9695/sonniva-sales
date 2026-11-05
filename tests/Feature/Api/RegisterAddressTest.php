<?php

use App\Models\User;
use App\Services\BusinessCentralService;
use App\Services\SmsService;

beforeEach(function () {
    $this->mock(SmsService::class, function ($mock) {
        $mock->shouldReceive('generateOtp')->andReturn('123456');
        $mock->shouldReceive('sendOtp')->andReturn(['success' => true, 'message' => 'sent']);
    });
    $this->mock(BusinessCentralService::class, fn ($mock) => $mock->shouldReceive('getCustomer')->andReturn(['value' => [['No' => 'C100']]]));

    $this->payload = [
        'user_type' => 'individual',
        'tax_id' => '12345678901',
        'name' => 'Test',
        'lastname' => 'User',
        'phone_country' => 'GE',
        'phone' => '555123456',
        'password' => 'password',
        'password_confirmation' => 'password',
    ];
});

function verifyApiRegistration(): void
{
    test()->postJson('/api/v1/register/verify-phone', ['phone' => '555123456', 'phone_country' => 'GE', 'otp' => '123456'])
        ->assertCreated();
}

it('saves the address sent by the mobile app', function () {
    $this->postJson('/api/v1/register', [...$this->payload, 'address' => 'Tbilisi, Rustaveli 1'])->assertOk();

    verifyApiRegistration();

    expect(User::where('tax_id', '12345678901')->first()->address)->toBe('Tbilisi, Rustaveli 1');
});

it('rejects a missing, blank or too long address', function (?string $address) {
    $this->postJson('/api/v1/register', [...$this->payload, 'address' => $address])
        ->assertJsonValidationErrors('address');
})->with([
    'missing' => null,
    'blank' => '   ',
    'too long' => str_repeat('a', 101),
]);
