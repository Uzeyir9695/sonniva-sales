<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlaceOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'provider' => ['required', 'string', 'in:invoice,limit,cash'],
            'delivery_type' => ['required', 'string', 'in:office,tbilisi,regions'],
            'delivery_price_type' => ['nullable', 'string'],
            'cart_ids' => ['required', 'array', 'min:1'],
            'cart_ids.*' => ['uuid'],
            'city' => ['nullable', 'string', 'max:255'],
            'branch' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'apartment_number' => ['nullable', 'string', 'max:50'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
