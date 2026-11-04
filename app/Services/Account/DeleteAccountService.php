<?php

namespace App\Services\Account;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DeleteAccountService
{
    public const array ACTIVE_ORDER_STATUSES = ['pending', 'paid', 'limit', 'ready', 'dispatched'];

    public function hasActiveOrders(User $user): bool
    {
        return $user->orders()->whereIn('status', self::ACTIVE_ORDER_STATUSES)->exists();
    }

    /**
     * Orders and payments are kept for accounting; personal data is wiped and the row soft-deleted.
     */
    public function delete(User $user): void
    {
        DB::transaction(function () use ($user) {
            $phone = $user->getRawOriginal('phone');

            $user->tokens()->delete();
            $user->carts()->delete();
            $user->wishlists()->delete();
            $user->stockNotifications()->delete();

            DB::table('sessions')->where('user_id', $user->id)->delete();
            DB::table('otp_verifications')->where('phone', $phone)->delete();
            DB::table('password_reset_tokens')->where('phone', $phone)->delete();

            $user->forceFill([
                'name' => null,
                'lastname' => null,
                'phone' => null,
                'email' => null,
                'tax_id' => null,
                'address' => null,
                'phone_verified_at' => null,
                'email_verified_at' => null,
                'password' => Str::random(64),
                'remember_token' => null,
            ])->save();

            $user->delete();
        });
    }
}
