<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StockNotification;
use Inertia\Inertia;
use Inertia\Response;

class AdminStockNotificationController extends Controller
{
    public function index(): Response
    {
        $notifications = StockNotification::query()
            ->with(['user:id,name,lastname,phone', 'item:id,no,name'])
            ->latest()
            ->paginate(50);

        return Inertia::render('Admin/StockNotifications/Index', [
            'notifications' => $notifications,
        ]);
    }
}
