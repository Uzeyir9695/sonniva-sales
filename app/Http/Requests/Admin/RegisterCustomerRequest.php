<?php

namespace App\Http\Requests\Admin;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterCustomerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('place-orders-for-customers') ?? false;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'user_type' => ['required', 'string', 'in:individual,legal_entity'],
            'name' => ['required', 'string', 'max:100'],
            'lastname' => ['required_if:user_type,individual', 'string', 'max:100'],
            'phone' => ['required', 'string', 'phone:GE'],
            'tax_id' => ['required', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255', Rule::unique(User::class, 'email')],
            'address' => ['nullable', 'string', 'max:255'],
        ];
    }
}
