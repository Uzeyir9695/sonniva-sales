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
    ];

    public function getStoragePathAttribute()
    {
        return '/storage/items';
    }

    public function getDiscountedPriceAttribute(): ?string
    {
        if ((float) $this->discount <= 0 || (float) $this->unit_price <= 0) {
            return null;
        }

        return number_format($this->unit_price * (1 - $this->discount / 100), 2, '.', '');
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
