<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    public function tree(): JsonResponse
    {
        $categories = Cache::rememberForever('nav_categories', fn () => Category::navTree());

        return response()->json($categories);
    }
}
