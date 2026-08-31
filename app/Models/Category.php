<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedAttributes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Image;

class Category extends Model
{
    use HasLocalizedAttributes, HasUuids;

    /**
     * Top-level codes shown in navigation (web mega menu + mobile drawer), in display order.
     *
     * @var array<int, string>
     */
    public const NAV_CODES = [
        '1100', '1200', '1300', '1400', '1500', '1600',
        '1700', '1800', '1900', '2000', '2100', '2200', '2300',
    ];

    protected $fillable = [
        'name',
        'name_en',
        'name_ru',
        'name_tr',
        'needs_review',
        'slug',
        'parent_id',
        'level',
        'sort_order',
        'image',
    ];

    protected $appends = ['storage_path'];

    protected $hidden = ['name_en', 'name_ru', 'name_tr', 'needs_review'];

    protected function casts(): array
    {
        return ['needs_review' => 'boolean'];
    }

    protected function name(): Attribute
    {
        return Attribute::get(fn ($value) => $this->localized('name', $value));
    }

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

    /**
     * @return array<int, string>
     */
    public function descendantCodes(): array
    {
        $this->loadMissing('childrenRecursive');

        return array_merge(
            [$this->code],
            $this->childrenRecursive->flatMap(fn (Category $child) => $child->descendantCodes())->all()
        );
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class, 'category_code', 'code');
    }

    /**
     * Nav tree for whitelisted top-level categories: top level → subs (2nd
     * level) → items (3rd level, leaf). Shared by the web mega menu
     * (HandleInertiaRequests) and the mobile categories API.
     *
     * @return Collection<int, array{code: string, name: string, slug: ?string, storage_path: string, image: ?string, subs: array}>
     */
    public static function navTree(): Collection
    {
        return self::whereNull('parent_id')
            ->whereIn('code', self::NAV_CODES)
            ->orderBy('sort_order')
            ->with(['children' => function ($query) {
                $query->orderBy('sort_order')
                    ->withCount('items') // for 2-level branches where this IS last level
                    ->with(['children' => function ($query) {
                        $query->orderBy('sort_order')
                            ->withCount('items');
                    }]);
            }])
            ->get()
            ->map(fn (Category $cat) => [
                'code' => $cat->code,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'storage_path' => $cat->storage_path,
                'image' => $cat->image,
                'subs' => $cat->children->map(fn (Category $sub) => [
                    'name' => $sub->name,
                    'slug' => $sub->slug,
                    'storage_path' => $sub->storage_path,
                    'image' => $sub->image,
                    'items_count' => $sub->children->isEmpty()
                        ? $sub->items_count  // 2nd level — no children, count items
                        : null,

                    'items' => $sub->children->map(fn (Category $item) => [
                        'name' => $item->name,
                        'slug' => $item->slug,
                        'items_count' => $item->items_count, // 3rd level count of items
                    ])->values(),
                ])->values(),
            ]);
    }

    public static function flushNavCache(): void
    {
        foreach (['', ...config('app.supported_locales', [])] as $locale) {
            Cache::forget('nav_categories'.($locale ? '_'.$locale : ''));
        }
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
