<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RegisterCustomerRequest;
use App\Models\User;
use App\Services\Auth\RegisterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Propaganistas\LaravelPhone\PhoneNumber;

class AdminCustomerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));

        if ($q === '') {
            return response()->json(['customers' => []]);
        }

        $customers = User::query()
            ->where('role', 'user')
            ->where(function ($query) use ($q) {
                $query->where('name', 'like', "%{$q}%")
                    ->orWhere('lastname', 'like', "%{$q}%")
                    ->orWhere('email', 'like', "%{$q}%")
                    ->orWhere('tax_id', 'like', "%{$q}%")
                    ->orWhere('phone', 'like', "%{$q}%");
            })
            ->orderBy('name')
            ->limit(20)
            ->get()
            ->map(fn (User $user) => $this->present($user));

        return response()->json(['customers' => $customers]);
    }

    public function store(RegisterCustomerRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $phone = new PhoneNumber($validated['phone'], 'GE');

        if (User::where('phone', $phone->formatE164())->exists()) {
            return response()->json([
                'errors' => ['phone' => [__('A customer with this phone number is already registered.')]],
            ], 422);
        }

        $customer = User::create([
            'name' => $validated['name'],
            'lastname' => $validated['lastname'],
            'phone_country' => 'GE',
            'phone' => $phone->formatE164(),
            'email' => $validated['email'] ?? null,
            'tax_id' => $validated['tax_id'],
            'address' => $validated['address'] ?? null,
            'user_type' => 'individual',
            'role' => 'user',
            'password' => Hash::make($validated['tax_id']),
            'phone_verified_at' => now(),
            'email_verified_at' => isset($validated['email']) ? now() : null,
        ]);

        dispatch(function () use ($customer) {
            app(RegisterService::class)->syncWithBusinessCentral($customer->fresh());
        })->catch(function (\Throwable $e) use ($customer) {
            Log::error('BC customer sync failed for an admin-registered customer', [
                'user_id' => $customer->id,
                'error' => $e->getMessage(),
            ]);
        });

        return response()->json(['customer' => $this->present($customer)], 201);
    }

    /**
     * @return array<string, mixed>
     */
    private function present(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'lastname' => $user->lastname,
            'phone' => $user->international_phone ?? $user->phone,
            'local_phone' => $user->local_phone,
            'tax_id' => $user->tax_id,
            'email' => $user->email,
            'address' => $user->address,
            'can_view_vip' => (bool) $user->can_view_vip,
            'can_view_wholesales' => (bool) $user->can_view_wholesales,
            'has_free_delivery' => (bool) $user->has_free_delivery,
        ];
    }
}
