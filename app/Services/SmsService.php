<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsService
{
    private string $apiKey;
    private string $sender;
    private string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.smsoffice.key');
        $this->sender = config('services.smsoffice.sender', 'SMSOFFICE');
        $this->baseUrl = 'https://smsoffice.ge/api/v2';
    }

    /**
     * Send OTP code to a phone number
     *
     * @param string $phoneNumber Phone number in international format (e.g., 995577123456)
     * @param string $code OTP code to send
     * @param string|null $reference Unique identifier for tracking
     * @return array Response from SMS API
     */
    public function sendOtp(string $phoneNumber, string $code, ?string $reference = null): array
    {
        $message = "Your verification code is: {$code}. Do not share this code with anyone.";

        return $this->send($phoneNumber, $message, true, $reference);
    }

    /**
     * Send SMS message
     *
     * @param string $destination Phone number(s) - comma separated for multiple
     * @param string $content Message content (max 1000 characters)
     * @param bool $urgent Send as urgent (bypass user blocks)
     * @param string|null $reference Unique identifier for tracking (max 20 chars)
     * @param int $contentType 1: Text, 2: Flash
     * @param int|null $scheduledAt Unix timestamp for scheduled sending
     * @return array Response from SMS API
     */
    public function send(
        string $destination,
        string $content,
        bool $urgent = false,
        ?string $reference = null,
        int $contentType = 1,
        ?int $scheduledAt = null
    ): array {
        try {
            $params = [
                'key' => $this->apiKey,
                'destination' => $destination,
                'sender' => $this->sender,
                'content' => $content,
                'contentType' => $contentType,
            ];

            if ($urgent) {
                $params['urgent'] = 'true';
            }

            if ($reference) {
                $params['reference'] = substr($reference, 0, 20); // Max 20 chars
            }

            if ($scheduledAt) {
                $params['scheduledAt'] = $scheduledAt;
            }

            // Use POST for reliability and longer content support
            $response = Http::asForm()
                ->timeout(10)
                ->post("{$this->baseUrl}/send/", $params);

            $result = $response->json();

            return [
                'success' => $result['Success'] ?? false,
                'message' => $result['Message'] ?? 'Unknown error',
                'error_code' => $result['ErrorCode'] ?? null,
                'output' => $result['Output'] ?? null,
            ];

        } catch (\Exception $e) {
            Log::channel('sms')->error('SMS sending failed', [
                'destination' => $destination,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'message' => 'Failed to send SMS: ' . $e->getMessage(),
                'error_code' => -1,
                'output' => null,
            ];
        }
    }

    /**
     * Get current SMS balance
     *
     * @return int|null Number of messages left
     */
    public function getBalance(): ?int
    {
        try {
            $response = Http::timeout(10)
                ->get('https://smsoffice.ge/api/getBalance', [
                    'key' => $this->apiKey,
                ]);

            if ($response->successful()) {
                return (int) $response->body();
            }

            return null;

        } catch (\Exception $e) {
            Log::channel('sms')->error('Failed to get SMS balance', [
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Generate a random OTP code
     *
     * @param int $length Length of OTP code
     * @return string
     */
    public function generateOtp(int $length = 6): string
    {
        $min = pow(10, $length - 1);
        $max = pow(10, $length) - 1;

        return (string) random_int($min, $max);
    }

    /**
     * Format phone number to international format without + or 00
     *
     * @param string $phone Phone number
     * @param string $countryCode Default country code (e.g., '995' for Georgia)
     * @return string
     */
    public function formatPhoneNumber(string $phone, string $countryCode = '995'): string
    {
        // Remove all non-numeric characters
        $phone = preg_replace('/[^0-9]/', '', $phone);

        // Remove leading + or 00
        $phone = preg_replace('/^(00|\+)/', '', $phone);

        // Add country code if not present
        if (!str_starts_with($phone, $countryCode)) {
            $phone = $countryCode . $phone;
        }

        return $phone;
    }

    /**
     * Get error message by error code
     *
     * @param int $errorCode
     * @return string
     */
    public function getErrorMessage(int $errorCode): string
    {
        return match ($errorCode) {
            0 => 'Request successfully received',
            10 => 'Destination does not contain any valid numbers',
            20 => 'Balance is insufficient',
            60 => 'Content parameter is missing',
            70 => 'Destination parameter is empty',
            75 => 'All numbers are stoplisted',
            76 => 'All numbers have invalid format',
            77 => 'All numbers are stoplisted or have invalid format',
            80 => 'API key is incorrect',
            120 => 'API access is disabled',
            150 => 'Sender not found',
            500 => 'API key is missing',
            600 => 'Destination is missing',
            700 => 'Sender is missing',
            800 => 'Content is missing',
            -100 => 'Temporary delay',
            default => 'Unknown error',
        };
    }
}
