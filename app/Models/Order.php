<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $guarded = ['created_at', 'updated_at'];

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::parse($value)->timezone('Asia/Tbilisi')->format('d-m-Y')
        );
    }

    protected function approvedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Carbon::parse($value)->timezone('Asia/Tbilisi')->format('d-m-Y') : null
        );
    }

    protected function invoicedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Carbon::parse($value)->timezone('Asia/Tbilisi')->format('d-m-Y') : null
        );
    }

    protected function readyAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Carbon::parse($value)->timezone('Asia/Tbilisi')->format('d-m-Y') : null
        );
    }

    protected function dispatchedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Carbon::parse($value)->timezone('Asia/Tbilisi')->format('d-m-Y') : null
        );
    }

    protected function deliveredAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Carbon::parse($value)->timezone('Asia/Tbilisi')->format('d-m-Y') : null
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Combined wholesale + normal (fake_price/discount) savings for this order. The wholesale
     * portion is read from the order-level column rather than summed from order_items.wholesale_discount:
     * that per-line column was never persisted for orders placed before ~2026-07-05, while the
     * order-level aggregate has always been correct.
     */
    public function discountTotal(): float
    {
        $normalDiscount = (float) $this->items->sum(function (OrderItem $item) {
            if ($item->wholesale_discount > 0) {
                return 0.0;
            }

            if ($item->discount > 0) {
                return (float) $item->subtotal / (1 - (float) $item->discount / 100) - (float) $item->subtotal;
            }

            if ($item->fake_price > 0) {
                return (float) $item->fake_price * $item->quantity - (float) $item->subtotal;
            }

            return 0.0;
        });

        return (float) $this->wholesale_discount + $normalDiscount;
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    public static function paymentConfirmedMessage(string $invoice): string
    {
        return "თქვენს მიერ გაფორმებული შეკვეთა ინვოისის ნომრით #{$invoice} წარმატებით დადასტურდა. გმადლობთ რომ ირჩევთ Sonniva Georgia-ს";
    }
}
