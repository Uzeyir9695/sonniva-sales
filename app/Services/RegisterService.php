<?php

namespace App\Services;

use App\Models\OtpVerification;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Propaganistas\LaravelPhone\PhoneNumber;

class RegisterService
{
    protected BusinessCentralService $bcService;
    protected SmsService $smsService;

    public function __construct(BusinessCentralService $bcService, SmsService $smsService)
    {
        $this->bcService = $bcService;
        $this->smsService = $smsService;
    }

    /*
    |--------------------------------------------------------------------------
    | Phone
    |--------------------------------------------------------------------------
    */

    /**
     * Format and return a PhoneNumber object in E164 format.
     * Used by both web and API controllers before any OTP or user logic.
     */
    public function formatPhone(string $phone, string $country = 'GE'): PhoneNumber
    {
        return new PhoneNumber($phone, $country);
    }

    /**
     * Check if phone already exists in users table.
     * Call this AFTER formatPhone() so you're checking the E164 formatted version.
     */
    public function phoneExists(PhoneNumber $phone): bool
    {
        return User::where('phone', $phone->formatE164())->exists();
    }

    /*
    |--------------------------------------------------------------------------
    | OTP
    |--------------------------------------------------------------------------
    */

    /**
     * Generate a fresh OTP and send it via SMS.
     *
     * Returns array:
     * [
     *   'success' => bool,
     *   'otp'     => string|null,   // only returned on success, store it yourself
     *   'message' => string,
     * ]
     *
     * Web controller  → store otp + expires_at in session()
     * API controller  → store otp + expires_at in otp_verifications table
     */
    public function generateAndSendOtp(PhoneNumber $phone): array
    {
        $otp = $this->smsService->generateOtp(6);

        $result = $this->smsService->sendOtp($phone, $otp);

        if ($result['success']) {
            return [
                'success' => true,
                'otp'     => $otp,
                'message' => __('Verification code sent. Please check you phone!'),
            ];
        }

        return [
            'success' => false,
            'otp'     => null,
            'message' => $result['message'],
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | OTP Verification (API only - DB based)
    |--------------------------------------------------------------------------
    */

    /**
     * Save or update OTP record in DB for the given phone.
     * API controller uses this instead of session().
     */
    public function storeOtpInDb(PhoneNumber $phone, string $otp, array $registrationData): void
    {
        OtpVerification::updateOrCreate(
            ['phone' => $phone->formatE164()],
            [
                'otp'               => $otp,
                'registration_data' => $registrationData, // cast to json in model
                'expires_at'        => now()->addMinutes(15),
            ]
        );
    }

    /**
     * Validate OTP from DB for given phone.
     *
     * Returns array:
     * [
     *   'valid'            => bool,
     *   'message'          => string,
     *   'registration_data'=> array|null,  // the original reg payload on success
     * ]
     */
    public function verifyOtpFromDb(string $phoneE164, string $submittedOtp): array
    {
        $record = OtpVerification::where('phone', $phoneE164)->latest()->first();

        if (!$record) {
            return [
                'valid'             => false,
                'message'           => __('Session expired. Please try again.'),
                'registration_data' => null,
            ];
        }

        if (now()->greaterThan($record->expires_at)) {
            $record->delete();
            return [
                'valid'             => false,
                'message'           => __('Verification code expired. Please try again.'),
                'registration_data' => null,
            ];
        }

        if ($record->otp !== $submittedOtp) {
            return [
                'valid'             => false,
                'message'           => __('Invalid verification code.'),
                'registration_data' => null,
            ];
        }

        $registrationData = $record->registration_data;
        $record->delete(); // OTP used — clean it up

        return [
            'valid'             => true,
            'message'           => 'OTP verified',
            'registration_data' => $registrationData,
        ];
    }

    /**
     * Validate OTP from session for given session data.
     * Web controller uses this version.
     *
     * Returns array:
     * [
     *   'valid'   => bool,
     *   'message' => string,
     * ]
     */
    public function verifyOtpFromSession(string $sessionOtp, ?string $sessionExpiresAt, string $submittedOtp): array
    {
        if (!$sessionOtp || !$sessionExpiresAt) {
            return [
                'valid'   => false,
                'message' => __('Session expired. Please try again.'),
            ];
        }

        if (now()->greaterThan($sessionExpiresAt)) {
            return [
                'valid'   => false,
                'message' => __('Verification code expired. Please try again.'),
            ];
        }

        if ($sessionOtp !== $submittedOtp) {
            return [
                'valid'   => false,
                'message' => __('Invalid verification code.'),
            ];
        }

        return ['valid' => true, 'message' => 'OTP verified'];
    }

    /*
    |--------------------------------------------------------------------------
    | User
    |--------------------------------------------------------------------------
    */

    /**
     * Create and persist the user.
     * Accepts the registration data array — same shape from both session and DB.
     * Password is hashed here.
     */
    public function createUser(array $data, PhoneNumber $phone, bool $passwordAlreadyHashed = false): User
    {
        return User::create([
            'user_type'         => $data['user_type'],
            'tax_id'            => $data['tax_id'],
            'name'              => $data['name'],
            'phone_country'     => $data['phone_country'],
            'phone'             => $phone->formatE164(),
            'email'             => $data['email'] ?? null,
            'password'          => $passwordAlreadyHashed ? $data['password'] : Hash::make($data['password']),
            'phone_verified_at' => now(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Business Central Sync
    |--------------------------------------------------------------------------
    */

    /**
     * Check if customer exists in BC by tax_id and either link or create them.
     * Called after createUser() — same logic for both web and API.
     */
    public function syncWithBusinessCentral(User $user): void
    {
        $endpoint = "Customers?\$filter=VAT_Registration_No eq '" . $user->tax_id . "'";

        $bcCustomer = $this->bcService->getCustomer($endpoint);

        if (!empty($bcCustomer['value'])) {
            // Customer already exists in BC — just link them
            $user->bc_customer_no = $bcCustomer['value'][0]['No'];
            $user->save();
            return;
        }

        // Customer doesn't exist — create them in BC
        $this->addCustomerToBC($user);
    }

    /**
     * Create a new customer in Business Central.
     * Private — called only from syncWithBusinessCentral().
     */
    private function addCustomerToBC(User $user): void
    {
        $payload = [
            'Name'               => trim($user->name . ' ' . $user->lastname),
            'Search_Name'        => trim($user->name . ' ' . $user->lastname),
            'Address'            => $user->address,
            'Address_2'          => '',
            'Salesperson_Code'   => '6002',
            'Phone_No'           => $user->phone,
            'E_Mail'             => $user->email ?? 'Email not provided',
            'VAT_Registration_No'=> $user->tax_id,
        ];

        $result = $this->bcService->addCustomer($payload);

        if ($result) {
            $user->bc_customer_no = $result['No'];
            $user->save();
        }
    }
}
