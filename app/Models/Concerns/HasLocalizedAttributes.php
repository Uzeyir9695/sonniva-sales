<?php

namespace App\Models\Concerns;

use App\Models\Translation;

trait HasLocalizedAttributes
{
    /**
     * Returns the `<column>_<locale>` value for the active locale, falling
     * back to the raw (Georgian) column when the translation is missing or
     * the active locale is the default. The locale column must be present in
     * the query's select list for this to resolve to a translation.
     */
    protected function localized(string $column, mixed $fallback): mixed
    {
        $locale = app()->getLocale();

        if (! in_array($locale, Translation::LOCALES, true)) {
            return $fallback;
        }

        return ($this->attributes[$column.'_'.$locale] ?? null) ?: $fallback;
    }
}
