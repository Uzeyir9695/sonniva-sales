<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Http;

class RecaptchaV3 implements ValidationRule
{
    protected string $action;
    protected float $minScore;

    public function __construct(string $action = 'submit', float $minScore = 0.5)
    {
        $this->action = $action;
        $this->minScore = $minScore;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $secret = config('services.google_recaptcha.secret_key');

        $response = Http::asForm()->post(
            config('services.google_recaptcha.url'),
            [
                'secret' => $secret,
                'response' => $value,
            ]
        )->json();

        // Validation: must succeed
        if (!($response['success'] ?? false)) {
            $fail('Recaptcha validation failed.');
            return;
        }

        // Validate score (v3 only)
        if (($response['score'] ?? 0) < $this->minScore) {
            $fail('Suspicious behavior detected.');
            return;
        }

        // Validate action
        if (($response['action'] ?? '') !== $this->action) {
            $fail('Invalid recaptcha action.');
        }
    }
}
