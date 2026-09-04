<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemapCommand extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Generate the XML sitemap to public/sitemap.xml';

    /** @var list<string> */
    private array $locales;

    private string $defaultLocale;

    private string $base;

    public function handle(): int
    {
        $this->defaultLocale = config('app.default_locale');
        $this->locales = config('app.supported_locales', [$this->defaultLocale]);
        $this->base = rtrim(config('app.url'), '/');

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
        $pages = [
            ['/', 1.0, Url::CHANGE_FREQUENCY_DAILY],
            ['/sales', 0.7, Url::CHANGE_FREQUENCY_DAILY],
            ['/about-us', 0.6, Url::CHANGE_FREQUENCY_MONTHLY],
            ['/read-more', 0.5, Url::CHANGE_FREQUENCY_MONTHLY],
            ['/delivery-rates', 0.4, Url::CHANGE_FREQUENCY_MONTHLY],
            ['/terms-of-service', 0.3, Url::CHANGE_FREQUENCY_YEARLY],
            ['/privacy-policy', 0.3, Url::CHANGE_FREQUENCY_YEARLY],
            ['/cookie-policy', 0.3, Url::CHANGE_FREQUENCY_YEARLY],
        ];

        foreach ($pages as [$path, $priority, $freq]) {
            $this->addLocalized($sitemap, $path, $priority, $freq);
        }
    }

    private function addCategoryPages(Sitemap $sitemap): void
    {
        Category::query()
            ->whereIn('level', [1, 2, 3])
            ->whereNotNull('slug')
            ->with(['parent', 'parent.parent'])
            ->each(function (Category $category) use ($sitemap) {
                $path = $this->buildCategoryPath($category);

                if ($path === null) {
                    return;
                }

                $this->addLocalized($sitemap, $path, 0.8, Url::CHANGE_FREQUENCY_WEEKLY, $category->updated_at);
            });
    }

    private function addItemPages(Sitemap $sitemap): void
    {
        Item::query()
            ->whereNotNull('slug')
            ->orderByDesc('updated_at')
            ->each(function (Item $item) use ($sitemap) {
                $this->addLocalized($sitemap, '/item/'.rawurlencode($item->slug), 0.9, Url::CHANGE_FREQUENCY_WEEKLY, $item->updated_at);
            });
    }

    /**
     * One <url> per page. <loc> is the default-locale (bare) URL; every locale
     * variant — including the default itself — plus x-default is listed as an
     * <xhtml:link rel="alternate" hreflang="…">, which is how Google clusters
     * the translations. Google crawls the alternates, so the /en /ru /tr pages
     * still get discovered without a separate <url> entry each.
     */
    private function addLocalized(Sitemap $sitemap, string $path, float $priority, string $freq, ?Carbon $lastModified = null): void
    {
        $url = Url::create($this->href($this->defaultLocale, $path))
            ->setPriority($priority)
            ->setChangeFrequency($freq);

        if ($lastModified) {
            $url->setLastModificationDate($lastModified);
        }

        foreach ($this->locales as $locale) {
            $url->addAlternate($this->href($locale, $path), $locale);
        }
        $url->addAlternate($this->href($this->defaultLocale, $path), 'x-default');

        $sitemap->add($url);
    }

    private function href(string $locale, string $path): string
    {
        $prefix = $locale === $this->defaultLocale ? '' : '/'.$locale;
        $path = $path === '/' ? '' : $path;

        return $this->base.$prefix.$path;
    }

    private function buildCategoryPath(Category $category): ?string
    {
        $segments = match ($category->level) {
            1 => [$category->slug],
            2 => $category->parent?->slug
                ? [$category->parent->slug, $category->slug]
                : null,
            3 => $category->parent?->slug && $category->parent->parent?->slug
                ? [$category->parent->parent->slug, $category->parent->slug, $category->slug]
                : null,
            default => null,
        };

        return $segments === null ? null : '/'.implode('/', array_map('rawurlencode', $segments));
    }
}
