<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Translation extends Model
{
    protected $fillable = ['source_text', 'en', 'ru', 'tr', 'needs_review'];

    /** Locales with a real column on this table — anything else resolves to the source text. */
    public const LOCALES = ['en', 'ru', 'tr'];

    /**
     * Georgian unit words that appear glued to a number in attribute values
     * (e.g. "160 მმ", "20 კგ") — translated in place so a value never needs
     * its own dictionary row just because of the number in front of it.
     *
     * @var array<string, array<string, string>>
     */
    private const UNIT_WORDS = [
        'მმ' => ['en' => 'mm', 'ru' => 'мм', 'tr' => 'mm'],
        'სმ' => ['en' => 'cm', 'ru' => 'см', 'tr' => 'cm'],
        'მ' => ['en' => 'm', 'ru' => 'м', 'tr' => 'm'],
        'კგ' => ['en' => 'kg', 'ru' => 'кг', 'tr' => 'kg'],
        'გრ' => ['en' => 'g', 'ru' => 'г', 'tr' => 'g'],
        'ლ' => ['en' => 'l', 'ru' => 'л', 'tr' => 'l'],
        'მლ' => ['en' => 'ml', 'ru' => 'мл', 'tr' => 'ml'],
        'ცალი' => ['en' => 'pcs', 'ru' => 'шт', 'tr' => 'adet'],
        'ვატი' => ['en' => 'W', 'ru' => 'Вт', 'tr' => 'W'],
        'ვოლტი' => ['en' => 'V', 'ru' => 'В', 'tr' => 'V'],
        'ამპერი' => ['en' => 'A', 'ru' => 'А', 'tr' => 'A'],
        'კელვინი' => ['en' => 'K', 'ru' => 'К', 'tr' => 'K'],
        'ლუმენი' => ['en' => 'lm', 'ru' => 'лм', 'tr' => 'lm'],
        'ბარი' => ['en' => 'bar', 'ru' => 'бар', 'tr' => 'bar'],
        'ჯოული' => ['en' => 'J', 'ru' => 'Дж', 'tr' => 'J'],
        'ნიუტონი' => ['en' => 'N', 'ru' => 'Н', 'tr' => 'N'],
        'სთ' => ['en' => 'h', 'ru' => 'ч', 'tr' => 'sa'],
        'წთ' => ['en' => 'min', 'ru' => 'мин', 'tr' => 'dk'],
        'წამი' => ['en' => 's', 'ru' => 'с', 'tr' => 'sn'],
    ];

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

        if (! in_array($locale, self::LOCALES, true)) {
            return $source;
        }

        return static::map($locale)[trim($source)] ?? static::translateUnits($source, $locale);
    }

    /**
     * Translates Georgian unit words that follow a number (e.g. "160 მმ" →
     * "160 mm"), leaving everything else in the string untouched. Used as a
     * fallback when there's no exact dictionary match for the full value.
     */
    private static function translateUnits(string $source, string $locale): string
    {
        return preg_replace_callback(
            '/(\d)(\s*)([\x{10A0}-\x{10FF}]+)/u',
            function (array $m) use ($locale) {
                $unit = self::UNIT_WORDS[$m[3]] ?? null;

                return $unit ? $m[1].$m[2].$unit[$locale] : $m[0];
            },
            $source
        );
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
        foreach (self::LOCALES as $locale) {
            Cache::forget("translations_map_{$locale}");
        }
    }

    protected static function booted(): void
    {
        static::saved(fn () => static::flushCache());
        static::deleted(fn () => static::flushCache());
    }
}
