<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemapCommand extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Generate the XML sitemap to public/sitemap.xml';

    public function handle(): int
    {
        $sitemap = Sitemap::create();

        $this->addStaticPages($sitemap);
        $this->addCategoryPages($sitemap);
        $this->addItemPages($sitemap);

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap written to public/sitemap.xml');

        return self::SUCCESS;
    }

    private function addStaticPages(Sitemap $sitemap): void
    {
        $sitemap->add(Url::create(url('/'))->setPriority(1.0)->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY));
        $sitemap->add(Url::create(url('/read-more'))->setPriority(0.7)->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));
        $sitemap->add(Url::create(url('/about-us'))->setPriority(0.6)->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));
        $sitemap->add(Url::create(url('/frequently-asked-questions'))->setPriority(0.6)->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));
    }

    private function addCategoryPages(Sitemap $sitemap): void
    {
        Category::query()
            ->whereIn('level', [1, 2, 3])
            ->whereNotNull('slug')
            ->with(['parent', 'parent.parent'])
            ->each(function (Category $category) use ($sitemap) {
                $url = $this->buildCategoryUrl($category);

                if ($url === null) {
                    return;
                }

                $sitemap->add(
                    Url::create($url)
                        ->setPriority(0.8)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                        ->setLastModificationDate($category->updated_at)
                );
            });
    }

    private function addItemPages(Sitemap $sitemap): void
    {
        Item::query()
            ->whereNotNull('slug')
            ->orderBy('updated_at', 'desc')
            ->each(function (Item $item) use ($sitemap) {
                $sitemap->add(
                    Url::create(route('items.show', ['item' => $item->slug]))
                        ->setPriority(0.9)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                        ->setLastModificationDate($item->updated_at)
                );
            });
    }

    private function buildCategoryUrl(Category $category): ?string
    {
        return match ($category->level) {
            1 => route('items.index', ['grandparentSlug' => $category->slug]),
            2 => $category->parent?->slug
                ? route('items.index', ['grandparentSlug' => $category->parent->slug, 'parentSlug' => $category->slug])
                : null,
            3 => $category->parent?->slug && $category->parent->parent?->slug
                ? route('items.index', [
                    'grandparentSlug' => $category->parent->parent->slug,
                    'parentSlug' => $category->parent->slug,
                    'childSlug' => $category->slug,
                ])
                : null,
            default => null,
        };
    }
}
