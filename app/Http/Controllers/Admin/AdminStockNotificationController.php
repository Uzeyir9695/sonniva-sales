<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StockNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminStockNotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $tab = $request->input('tab', 'pending');

        $notifications = StockNotification::query()
            ->with(['user:id,name,lastname,phone', 'item:id,no,name'])
            ->when($tab === 'pending', fn ($q) => $q->whereNull('notified_at'))
            ->when($tab === 'sent', fn ($q) => $q->whereNotNull('notified_at'))
            ->latest()
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('Admin/StockNotifications/Index', [
            'notifications' => $notifications,
            'counts' => [
                'pending' => StockNotification::whereNull('notified_at')->count(),
                'sent' => StockNotification::whereNotNull('notified_at')->count(),
            ],
            'tab' => $tab,
        ]);
    }

    public function destroy(StockNotification $stockNotification): \Illuminate\Http\RedirectResponse
    {
        $stockNotification->delete();

        return back();
    }
}
