<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attribute extends Model
{
    use HasUuids;

    protected $guarded = ['id'];
    public $timestamps = false;

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
