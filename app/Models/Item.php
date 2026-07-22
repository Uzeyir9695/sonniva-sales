<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Image;

class Item extends Model
{
    use HasUuids, SoftDeletes;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['storage_path', 'discounted_price'];

    protected $casts = [
        'images' => 'array',
        'prices' => 'array',
        'weights' => 'array',
        'discount' => 'decimal:4',
        'wholesale_discount_percent' => 'decimal:4',
        'vip_discount_percent' => 'decimal:4',
        'bc_discount_percent' => 'decimal:4',
        'fake_price' => 'decimal:2',
    ];

    public function getStoragePathAttribute()
    {
        return '/storage/items';
    }

    public function getDiscountedPriceAttribute(): ?string
    {
        $base = (float) ($this->fake_price ?? 0) > 0 ? (float) $this->fake_price : (float) $this->unit_price;

        if ((float) $this->discount <= 0 || $base <= 0) {
            return null;
        }

        return number_format($base * (1 - $this->discount / 100), 2, '.', '');
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
