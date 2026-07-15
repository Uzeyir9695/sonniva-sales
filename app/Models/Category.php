<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Image;

class Category extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'level',
        'sort_order',
        'image',
    ];

    protected $appends = ['storage_path'];

    public function getStoragePathAttribute()
    {
        return '/storage/categories';
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id', 'code');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id', 'code')
            ->orderBy('sort_order');
    }

    public function childrenRecursive(): HasMany
    {
        return $this->children()->with('childrenRecursive');
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class, 'category_code', 'code');
    }

    public static function storeImageFromBase64(string $base64): ?string
    {
        if (empty($base64)) {
            return null;
        }

        $imageData = base64_decode($base64);
        $hash = md5($imageData);
        $fileName = $hash.'.jpg';
        $path = "categories/{$fileName}";

        if (! Storage::disk('public')->exists($path)) {
            Storage::disk('public')->put($path, $imageData);

            $fullPath = storage_path("app/public/{$path}");

            Image::load($fullPath)
                ->optimize()
                ->save($fullPath);
        }

        return $fileName;
    }
}
