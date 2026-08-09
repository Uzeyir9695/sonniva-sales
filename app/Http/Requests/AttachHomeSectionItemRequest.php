<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AttachHomeSectionItemRequest extends FormRequest
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
            'item_id' => ['required', 'uuid', 'exists:items,id'],
        ];
    }
}
