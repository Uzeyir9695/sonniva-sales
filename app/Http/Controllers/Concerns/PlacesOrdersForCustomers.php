<?php

namespace App\Http\Controllers\Concerns;

use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;

trait PlacesOrdersForCustomers
{
    /**
     * The user the order is being placed for. That's the authenticated user for
     * a normal checkout, or — when an admin passes `customer_id` — the selected
     * customer. The admin's cart is still what gets checked out; only the buyer
     * (price tier, delivery, invoice, confirmation) changes.
     */
    protected function resolveOrderBuyer(Request $request): User
    {
        $customerId = $request->input('customer_id');

        if (blank($customerId)) {
            return $request->user();
        }

        abort_unless($request->user()->can('place-orders-for-customers'), 403);

        return User::where('role', 'user')->findOrFail($customerId);
    }

    /**
     * Order-level services only an admin can add at checkout.
     *
     * @return list<array{service: Service, quantity: int}>
     */
    protected function resolveOrderServices(Request $request): array
    {
        $request->validate([
            'cutting_quantity' => ['nullable', 'integer', 'min:0', 'max:10000'],
        ]);

        $quantity = $request->integer('cutting_quantity');

        if ($quantity === 0) {
            return [];
        }

        abort_unless($request->user()->can('place-orders-for-customers'), 403);

        return [[
            'service' => Service::where('no', Service::CUTTING_NO)->firstOrFail(),
            'quantity' => $quantity,
        ]];
    }
}
