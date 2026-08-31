<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Translation extends Model
{
    protected $fillable = ['source_text', 'en', 'ru', 'tr', 'needs_review'];

    protected function casts(): array
    {
        return ['needs_review' => 'boolean'];
    }

    /**
     * Translates a single free-text string via the shared dictionary for the
     * active locale, falling back to the source text when there is no entry.
     */
    public static function get(?string $source): ?string
    {
        if ($source === null || trim($source) === '') {
            return $source;
        }

        $locale = app()->getLocale();

        if ($locale === config('app.default_locale')) {
            return $source;
        }

        return static::map($locale)[trim($source)] ?? $source;
    }

    /**
     * @return array<string, string>
     */
    public static function map(string $locale): array
    {
        return Cache::rememberForever("translations_map_{$locale}", fn () => static::query()
            ->whereNotNull($locale)
            ->pluck($locale, 'source_text')
            ->all());
    }

    public static function flushCache(): void
    {
        foreach (['en', 'ru', 'tr'] as $locale) {
            Cache::forget("translations_map_{$locale}");
        }
    }

    protected static function booted(): void
    {
        static::saved(fn () => static::flushCache());
        static::deleted(fn () => static::flushCache());
    }
}
