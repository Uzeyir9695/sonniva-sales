<?php

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Item;
use App\Models\Translation;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\URL;

afterEach(function () {
    URL::forceRootUrl(null);
    Cache::flush();
});

it('serves catalog content translated on a prefixed locale', function () {
    Translation::create(['source_text' => 'ფერი', 'en' => 'Colour']);
    Category::forceCreate(['code' => 'ZZ00', 'name' => 'ტესტ კატეგორია', 'name_en' => 'Test category', 'slug' => 'zz-test', 'parent_id' => null, 'level' => 1, 'sort_order' => 0]);
    Category::forceCreate(['code' => 'ZZ01', 'name' => 'ქვე კატეგორია', 'name_en' => 'Test subcategory', 'slug' => 'zz-sub', 'parent_id' => 'ZZ00', 'level' => 2, 'sort_order' => 0]);
    foreach ([['ZZSKU', 'შავი'], ['ZZSKU2', 'თეთრი']] as [$no, $colour]) {
        $item = Item::create(['no' => $no, 'category_code' => 'ZZ01', 'name' => 'ტესტ ნივთი', 'name_en' => 'Test widget', 'slug' => 'zz-'.$no, 'inventory' => 2, 'unit_price' => 9]);
        Attribute::create(['item_id' => $item->id, 'bc_attribute_id' => 999, 'name' => 'ფერი', 'value' => $colour]);
    }

    $content = $this->get('/en/zz-test')->assertOk()->getContent();

    expect($content)->toContain('Test subcategory')   // localized category name (accessor)
        ->and($content)->toContain('Colour');          // dictionary-translated attribute label
});
