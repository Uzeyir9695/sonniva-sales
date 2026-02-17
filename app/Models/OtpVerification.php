<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class OtpVerification extends Model
{
    use HasUuids;

    protected $fillable = [
        'phone',
        'otp',
        'registration_data',
        'expires_at',
    ];

    protected $casts = [
        'registration_data' => 'array',
        'expires_at'        => 'datetime',
    ];

}
