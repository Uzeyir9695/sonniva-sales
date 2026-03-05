<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    use HasUuids;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $appends = ['storage_path'];

    protected $casts = [
        'images' => 'array',
        'prices' => 'array',
    ];

    public function getStoragePathAttribute()
    {
        return "/storage/items";
    }

    public function attributes(): HasMany
    {
        return $this->hasMany(Attribute::class);
    }
}
