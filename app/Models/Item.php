<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedAttributes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute as AttributeCast;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Image;

class Item extends Model
{
    use HasLocalizedAttributes, HasUuids, SoftDeletes;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $hidden = [
        'en_keywords', 'ru_keywords', 'tr_keywords',
        'name_en', 'name_ru', 'name_tr',
        'description_en', 'description_ru', 'description_tr',
    ];

    protected $appends = ['storage_path', 'discounted_price', 'has_setup_service', 'setup_service_price', 'bc_unit_price'];

    protected $casts = [
        'images' => 'array',
        'prices' => 'array',
        'weights' => 'array',
        'discount' => 'decimal:4',
        'wholesale_discount_percent' => 'decimal:4',
        'vip_discount_percent' => 'decimal:4',
        'bc_discount_percent' => 'decimal:4',
        'fake_price' => 'decimal:2',
        'unit_price_override' => 'decimal:2',
        'needs_review' => 'boolean',
    ];

    /**
     * `unit_price` is overwritten from Business Central every 30 minutes by
     * `items:sync-data`. `unit_price_override` lets an admin charge more than
     * that synced price without it getting wiped out on the next sync - every
     * read of `unit_price` transparently returns the override when one is
     * set, so cart/checkout/order/invoice/BC-payment code needs no changes.
     */
    protected function unitPrice(): AttributeCast
    {
        return AttributeCast::make(
            get: fn ($value) => $this->attributes['unit_price_override'] ?? $value,
        );
    }

    public function getBcUnitPriceAttribute(): float
    {
        return (float) $this->attributes['unit_price'];
    }

    protected function name(): AttributeCast
    {
        return AttributeCast::get(fn ($value) => $this->localized('name', $value));
    }

    protected function description(): AttributeCast
    {
        return AttributeCast::get(fn ($value) => $this->localized('description', $value));
    }

    /** Columns to add to a restricted select() so the localized name accessor can resolve. */
    const LOCALE_NAME_COLUMNS = ['name_en', 'name_ru', 'name_tr'];

    const SETUP_SERVICE_CATEGORY_CODE = '2300-02';

    const SETUP_SERVICE_PRICE = 130.00;

    public function getStoragePathAttribute()
    {
        return '/storage/items';
    }

    public function hasSetupService(): bool
    {
        return $this->category_code === self::SETUP_SERVICE_CATEGORY_CODE;
    }

    public function getHasSetupServiceAttribute(): bool
    {
        return $this->hasSetupService();
    }

    public function getSetupServicePriceAttribute(): ?float
    {
        return $this->hasSetupService() ? self::SETUP_SERVICE_PRICE : null;
    }

    public function getDiscountedPriceAttribute(): ?string
    {
        $base = (float) ($this->fake_price ?? 0) > 0 ? (float) $this->fake_price : (float) $this->unit_price;

        if ((float) $this->discount <= 0 || $base <= 0) {
            return null;
        }

        return number_format($base * (1 - $this->discount / 100), 2, '.', '');
    }

    public function scopeSearch(Builder $query, string $q): Builder
    {
        return $query->where(function (Builder $query) use ($q) {
            $query->where('name', 'like', "%{$q}%")
                ->orWhere('no', 'like', "%{$q}%")
                ->orWhere('en_keywords', 'like', "%{$q}%")
                ->orWhere('ru_keywords', 'like', "%{$q}%")
                ->orWhere('tr_keywords', 'like', "%{$q}%");
        });
    }

    public function attributes(): HasMany
    {
        return $this->hasMany(Attribute::class);
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public static function storeImageFromBase64(string $base64): ?string
    {
        if (empty($base64)) {
            return null;
        }

        $imageData = base64_decode($base64);
        $hash = md5($imageData);
        $fileName = $hash.'.jpg';
        $path = "items/{$fileName}";

        if (! Storage::disk('public')->exists($path)) {
            Storage::disk('public')->put($path, $imageData);

            $fullPath = storage_path("app/public/{$path}");

            Image::load($fullPath)
                ->optimize()
                ->save($fullPath);
        }

        return $fileName;
    }
}
