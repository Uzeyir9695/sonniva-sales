<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('access-admin', function ($user) {
            return $user->role === 'admin' || $user->role === 'manager';
        });

        Gate::define('manage-item-pricing', function ($user) {
            return in_array($user->role, ['admin', 'manager', 'pricing_manager']);
        });

        Gate::define('place-orders-for-customers', function ($user) {
            return $user->role === 'admin';
        });
    }
}
