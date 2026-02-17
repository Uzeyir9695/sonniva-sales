<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class OtpVerification extends Model
{
    use HasUuids;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $casts = ['expires_at' => 'datetime'];

}
