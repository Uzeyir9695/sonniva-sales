<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DeepLTranslationService
{
    private string $apiKey;

    private string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.deepl.api_key', '');
        $this->baseUrl = str_ends_with($this->apiKey, ':fx')
            ? 'https://api-free.deepl.com/v2/translate'
            : 'https://api.deepl.com/v2/translate';
    }

    /**
     * Translate a single word/phrase from one language to another using the DeepL API.
     *
     * @param  string  $text  Text to translate
     * @param  string  $from  Source language ISO 639-1 code
     * @param  string  $to  Destination language ISO 639-1 code
     * @return string|null Translated text, or null if translation is unavailable/unnecessary
     */
    public function translate(string $text, string $from, string $to): ?string
    {
        if ($text === '' || $from === $to || ! $this->apiKey) {
            return null;
        }

        $cacheKey = "deepl:translate:{$from}:{$to}:".md5($text);

        return Cache::remember($cacheKey, now()->addMonth(), function () use ($text, $from, $to) {
            try {
                $response = Http::timeout(5)
                    ->withHeaders(['Authorization' => "DeepL-Auth-Key {$this->apiKey}"])
                    ->post($this->baseUrl, [
                        'text' => [$text],
                        'source_lang' => strtoupper($from),
                        'target_lang' => strtoupper($to),
                    ]);

                if (! $response->successful()) {
                    return null;
                }

                return $response->json('translations.0.text');

            } catch (\Exception $e) {
                Log::warning('DeepL translation failed', [
                    'text' => $text,
                    'from' => $from,
                    'to' => $to,
                    'error' => $e->getMessage(),
                ]);

                return null;
            }
        });
    }
}
