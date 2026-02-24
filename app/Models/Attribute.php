<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasUuids;

    protected $fillable = ['id', 'created_at', 'updated_at'];
}
