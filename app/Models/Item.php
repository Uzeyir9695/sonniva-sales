<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    use HasUuids;

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
}
