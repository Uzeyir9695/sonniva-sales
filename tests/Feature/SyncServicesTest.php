<?php

use App\Models\Item;
use App\Models\Service;
use App\Services\BusinessCentralService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

beforeEach(function () {
    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldReceive('getAccessToken')->andReturn('fake-token');
    });
});

it('ships with the setup and cutting services', function () {
    expect(Service::pluck('unit_price', 'no')->all())->toBe([
        'NONINV331' => '130.00',
        'NONINV261' => '5.00',
    ]);
});

it('updates services from BC and leaves missing ones unchanged', function () {
    Http::fake(['*/items?*' => Http::response(['value' => [
        ['no' => 'NONINV331', 'description' => 'მონტაჟი', 'baseUOMDesc' => 'ცალი/UNIT', 'unitPrice' => 150],
    ]])]);

    $this->artisan('services:sync')->assertSuccessful();

    expect(Service::firstWhere('no', 'NONINV331')->unit_price)->toBe('150.00')
        ->and(Service::firstWhere('no', 'NONINV261')->unit_price)->toBe('5.00');
});

it('changes nothing when the BC request fails', function () {
    Http::fake(['*/items?*' => Http::response('error', 500)]);

    $this->artisan('services:sync')->assertFailed();

    expect(Service::firstWhere('no', 'NONINV331')->unit_price)->toBe('130.00');
});

it('prices the setup service from the services table', function () {
    Service::where('no', Service::SETUP_NO)->update(['unit_price' => 99]);

    $item = Item::create([
        'no' => 'LOCK001',
        'name' => 'Lock',
        'slug' => 'lock-'.Str::random(6),
        'inventory' => 1,
        'unit_price' => 10,
        'category_code' => Item::SETUP_SERVICE_CATEGORY_CODE,
    ]);

    expect($item->setup_service_price)->toBe(99.0);
});
