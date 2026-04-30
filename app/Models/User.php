<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Propaganistas\LaravelPhone\Casts\E164PhoneNumberCast;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids, HasApiTokens;

    public $incrementing = false;

    protected $keyType='string';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['local_phone', 'international_phone'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_handyman' => 'boolean',
            'is_entrepreneur' => 'boolean',
            'password' => 'hashed',
            'phone' => E164PhoneNumberCast::class.':phone_country',
        ];
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::parse($value)->timezone('Asia/Tbilisi')->format('d.m.Y'),
        );
    }

    protected function localPhone(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->phone && $this->phone_country
                ? phone($this->phone, $this->phone_country)
                    ->formatForMobileDialingInCountry($this->phone_country)
                : null
        );
    }

    /**
     * Cast phone in international format (with country code).
     */
    protected function internationalPhone(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->phone && $this->phone_country
                ? phone($this->phone, $this->phone_country)
                    ->formatE164()
                : null
        );
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function wishlistedItems(): BelongsToMany
    {
        return $this->belongsToMany(Item::class, 'wishlists')->withTimestamps();
    }

    public function hasWishlisted(int $itemId): bool
    {
        return $this->wishlists()->where('item_id', $itemId)->exists();
    }

    public function toggleWishlist(string $itemId): bool
    {
        $exists = $this->wishlists()->where('item_id', $itemId)->exists();

        if ($exists) {
            $this->wishlists()->where('item_id', $itemId)->delete();
            return false; // removed
        }

        $this->wishlists()->create(['item_id' => $itemId]);
        return true; // added
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function cartItems(): BelongsToMany
    {
        return $this->belongsToMany(Item::class, 'carts')
            ->withPivot('quantity')
            ->withTimestamps();
    }
}
