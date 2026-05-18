<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Google\Analytics\Data\V1beta\Filter;
use Google\Analytics\Data\V1beta\Filter\StringFilter;
use Google\Analytics\Data\V1beta\FilterExpression;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\OrderBy;
use Spatie\Analytics\Period;

class AdminAnalyticsController extends Controller
{
    public function index(Request $request): Response
    {
        $days = $request->integer('days', 30);
        $configured = $this->isConfigured();

        return Inertia::render('Admin/Analytics/Index', [
            'days' => $days,
            'configured' => $configured,
            'summary' => $configured ? Inertia::defer(fn () => $this->fetchSummary(Period::days($days))) : [],
            'topPages' => $configured ? Inertia::defer(fn () => $this->fetchTopPages(Period::days($days))) : [],
            'userTypes' => $configured ? Inertia::defer(fn () => $this->fetchUserTypes(Period::days($days))) : [],
            'topSearchTerms' => $configured ? Inertia::defer(fn () => $this->fetchTopSearchTerms(Period::days($days))) : [],
            'topViewedItems' => $configured ? Inertia::defer(fn () => $this->fetchTopViewedItems(Period::days($days))) : [],
        ]);
    }

    private function fetchSummary(Period $period): array
    {
        $visitors = Analytics::fetchVisitorsAndPageViews($period);

        $totals = Analytics::get(
            period: $period,
            metrics: ['sessions', 'newUsers'],
            dimensions: [],
            maxResults: 1,
        );

        return [
            'activeUsers' => $visitors->sum('activeUsers'),
            'screenPageViews' => $visitors->sum('screenPageViews'),
            'sessions' => $totals->first()['sessions'] ?? 0,
            'newUsers' => $totals->first()['newUsers'] ?? 0,
        ];
    }

    private function fetchTopPages(Period $period): array
    {
        return Analytics::fetchMostVisitedPages($period, maxResults: 10)
            ->map(fn ($row) => [
                'title' => $row['pageTitle'] ?? '—',
                'url' => $row['fullPageUrl'] ?? '—',
                'views' => $row['screenPageViews'],
            ])->values()->toArray();
    }

    private function fetchUserTypes(Period $period): array
    {
        return Analytics::fetchUserTypes($period)
            ->map(fn ($row) => [
                'type' => $row['newVsReturning'] ?? '—',
                'users' => $row['activeUsers'],
            ])->values()->toArray();
    }

    private function fetchTopSearchTerms(Period $period): array
    {
        $filter = new FilterExpression([
            'filter' => new Filter([
                'field_name' => 'eventName',
                'string_filter' => new StringFilter([
                    'value' => 'search',
                    'match_type' => StringFilter\MatchType::EXACT,
                ]),
            ]),
        ]);

        return Analytics::get(
            period: $period,
            metrics: ['eventCount'],
            dimensions: ['customEvent:search_term'],
            maxResults: 10,
            orderBy: [OrderBy::metric('eventCount', true)],
            dimensionFilter: $filter,
        )->map(fn ($row) => [
            'term' => $row['customEvent:search_term'] ?? '—',
            'count' => $row['eventCount'],
        ])->filter(fn ($row) => filled($row['term']) && $row['term'] !== '(not set)')
            ->values()->toArray();
    }

    private function fetchTopViewedItems(Period $period): array
    {
        return Analytics::get(
            period: $period,
            metrics: ['itemsViewed'],
            dimensions: ['itemName', 'itemId'],
            maxResults: 50,
            orderBy: [OrderBy::metric('itemsViewed', true)],
        )->map(fn ($row) => [
            'name' => $row['itemName'] ?? '—',
            'id' => $row['itemId'] ?? '—',
            'views' => $row['itemsViewed'],
        ])->values()->toArray();
    }

    private function isConfigured(): bool
    {
        return filled(config('analytics.property_id'))
            && file_exists(config('analytics.service_account_credentials_json'));
    }
}
