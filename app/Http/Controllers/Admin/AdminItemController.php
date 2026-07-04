<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\SyncItemCategoryJob;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/items/Index');
    }

    public function syncCategory(): RedirectResponse
    {
        SyncItemCategoryJob::dispatch();

        return redirect()->back()->with('message', 'Category sync started in the background. It may take a minute to finish.');
    }
}
