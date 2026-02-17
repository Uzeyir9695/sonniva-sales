<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class BusinessCentralToken extends Model
{
    use HasUuids;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $casts = ['expires_at' => 'datetime'];

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    public function isExpiringSoon(int $minutes = 3): bool
    {
        return $this->expires_at->subMinutes($minutes)->isPast();
    }
}
