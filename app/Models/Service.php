<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    const SETUP_NO = 'NONINV331';

    protected $fillable = ['no', 'name', 'uom', 'unit_price'];

    protected $casts = [
        'unit_price' => 'decimal:2',
    ];

    public static function setupPrice(): float
    {
        return once(fn () => (float) static::query()->where('no', self::SETUP_NO)->valueOrFail('unit_price'));
    }
}
