<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LiquidationItem extends Model
{
    use HasUuids;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
