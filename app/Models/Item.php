<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute as CastAttribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasUuids;

    protected $fillable = ['id', 'created_at', 'updated_at'];

    protected function slug(): CastAttribute
    {
        return CastAttribute::make(
            set: fn () => preg_replace(
                '/\s+/u',
                '-',
                trim(
                    preg_replace(
                        '/[-]+/u',
                        ' ',
                        mb_strtolower($this->description, 'UTF-8')
                    )
                )
            ),
            get: fn ($value) => $value
        );
    }
}
