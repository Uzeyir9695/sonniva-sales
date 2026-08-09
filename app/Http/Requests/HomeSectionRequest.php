<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HomeSectionRequest extends FormRequest
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
            'carousel_title' => ['nullable', 'string', 'max:255'],
            'gallery_title' => ['nullable', 'string', 'max:255'],
        ];
    }
}
