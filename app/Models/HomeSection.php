<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;

class HomeSection extends Model
{
    use HasUuids;

    protected $guarded = ['created_at', 'updated_at'];

    protected function casts(): array
    {
        return ['is_hidden' => 'boolean'];
    }

    public static function flushCache(): void
    {
        foreach (['', ...config('app.supported_locales', [])] as $locale) {
            Cache::forget('home_sections'.($locale ? '_'.$locale : ''));
        }
    }

    public function items(): BelongsToMany
    {
        return $this->belongsToMany(Item::class)
            ->withTimestamps()
            ->orderBy('home_section_item.created_at');
    }

    public function images(): HasMany
    {
        return $this->hasMany(HomeSectionImage::class)->orderBy('created_at');
    }
}
