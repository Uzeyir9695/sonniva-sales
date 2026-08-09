<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HomeSectionImage extends Model
{
    use HasUuids;

    protected $guarded = ['created_at', 'updated_at'];

    public function homeSection(): BelongsTo
    {
        return $this->belongsTo(HomeSection::class);
    }
}
