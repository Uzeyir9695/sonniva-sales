<?php

namespace App\Http\Controllers;

use App\Mail\StockNotificationAdminMail;
use App\Models\Item;
use App\Models\StockNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class StockNotificationController extends Controller
{
    public function subscribe(Request $request, Item $item): RedirectResponse
    {
        $user = $request->user();

        StockNotification::firstOrCreate([
            'user_id' => $user->id,
            'item_id' => $item->id,
        ]);

        Mail::to(config('mail.from.address'))->queue(new StockNotificationAdminMail($user, $item));

        return back()->with('success', 'მარაგის შევსებისას შეგატყობინებთ.');
    }

    public function unsubscribe(Request $request, Item $item): RedirectResponse
    {
        StockNotification::where('user_id', $request->user()->id)
            ->where('item_id', $item->id)
            ->delete();

        return back()->with('success', 'გამოწერა გაუქმდა.');
    }
}
