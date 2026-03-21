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
    use HasUuids, SoftDeletes, HasFactory;
    protected $guarded = ['created_at', 'updated_at'];

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::parse($value)->timezone('Asia/Tbilisi')->format('d.m.Y')
        );
    }
    protected function approvedAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Carbon::parse($value)->timezone('Asia/Tbilisi')->format('d.m.Y') : null
        );
    }
    protected function invoicedAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Carbon::parse($value)->timezone('Asia/Tbilisi')->format('d.m.Y') : null
        );
    }

    protected function readyAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Carbon::parse($value)->timezone('Asia/Tbilisi')->format('d.m.Y') : null
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

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    public static function paymentConfirmedMessage(string $invoice): string
    {
        return "თქვენს მიერ გაფორმებული შეკვეთა ინვოისის ნომრით #{$invoice} წარმატებით დადასტურდა. გმადლობთ რომ ირჩევთ Sonniva Georgia-ს";
    }
}
