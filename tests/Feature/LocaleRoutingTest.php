<?php

use App\Http\Middleware\SetLocale;
use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

afterEach(fn () => URL::forceRootUrl(null));

it('serves the default locale on bare URLs', function () {
    $this->get('/about-us')
        ->assertOk()
        ->assertSee('lang="ka"', false);
});

it('serves a prefixed locale on its own URL', function () {
    $this->get('/en/about-us')
        ->assertOk()
        ->assertSee('lang="en"', false)
        // forceRootUrl propagated to asset() in the root template
        ->assertSee(rtrim(config('app.url'), '/').'/en/favicon.png', false)
        ->assertSee('hreflang="ru" href="'.rtrim(config('app.url'), '/').'/ru/about-us"', false);
});

it('resolves a bare path and its prefixed clone to the same route', function () {
    expect($this->get('/about-us')->getStatusCode())->toBe(200);
    expect($this->get('/ru/about-us')->getStatusCode())->toBe(200);
    expect($this->get('/tr/about-us')->getStatusCode())->toBe(200);
});

it('does not clone admin routes', function () {
    $this->get('/en/admin')->assertNotFound();
});

it('keeps scoped route-model bindings on prefixed clones', function () {
    $item = Item::create([
        'no' => 'RB01', 'category_code' => 'RB01', 'name' => 'route binding item',
        'slug' => 'sample-item-slug', 'inventory' => 1, 'unit_price' => 5,
    ]);

    // Bare path resolves the item by its slug, not its primary key.
    $this->get('/item/'.$item->slug)->assertOk();
    // The /en clone must resolve the same way (regression: clone lost the
    // {item:slug} binding field and 404'd trying to match on the UUID PK).
    $this->get('/en/item/'.$item->slug)
        ->assertOk()
        ->assertSee('route binding item');
});

it('rejects an unsupported locale segment', function () {
    $this->get('/de/about-us')->assertNotFound();
});

it('serves cart api routes only unprefixed, never under a locale prefix', function () {
    // routes/api.php is never cloned, so a /<locale>/api/... URL hits no real
    // endpoint — the client must call these unprefixed (see utils/apiRoute.js).
    $user = User::factory()->create();
    $item = Item::create([
        'no' => 'API01', 'category_code' => 'API01', 'name' => 'api item',
        'slug' => 'api-item-slug', 'inventory' => 5, 'unit_price' => 5,
    ]);

    $this->actingAs($user)->postJson('/en/api/v1/cart/'.$item->id, ['quantity' => 1])
        ->assertStatus(405);

    $this->actingAs($user)->postJson('/api/v1/cart/'.$item->id, ['quantity' => 1])
        ->assertOk()
        ->assertJsonPath('quantity', 1);
});

it('forces the locale root for route generation on a prefixed request', function () {
    app(SetLocale::class)->handle(
        Request::create('/en/about-us'),
        fn () => response('')
    );

    expect(app()->getLocale())->toBe('en');
    expect(route('about-us'))->toEndWith('/en/about-us');
});

it('clears the forced root on a default-locale request', function () {
    URL::forceRootUrl('https://example.test/en');

    app(SetLocale::class)->handle(
        Request::create('/about-us'),
        fn () => response('')
    );

    expect(app()->getLocale())->toBe('ka');
    expect(route('about-us'))->not->toContain('/en/');
});
