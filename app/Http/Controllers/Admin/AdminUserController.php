<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index(string $locale, Request $request)
    {
        $start = Carbon::parse($request->start_date)->timezone('Asia/Tbilisi')->startOfDay();
        $end   = Carbon::parse($request->end_date)->timezone('Asia/Tbilisi')->endOfDay();

        $users = User::select('id', 'tax_id', 'phone', 'name', 'lastname', 'created_at')
            ->when($request->start_date && $request->end_date, function ($query) use ($start, $end) {
                $query->whereBetween('created_at', [$start, $end]);
            })
            ->withCount(['orderItems as paid_items_count' => function ($q) {
                $q->where('status', 'paid');
            }])
            ->latest()
            ->get();

        return Inertia::render('admin/users/Index', [
            'users' => Inertia::defer(fn() => $users),
            'usersCount' => $users->count(),
            'onlineUsers' => $this->onlineCounts(),
        ]);
    }

    public function edit(string $locale, User $user)
    {
        return response()->json(['user' => $user], 200);
    }

    public function destroy(string $locale, User $user)
    {
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    function onlineCounts(int $seconds = 120): int
    {
        $active = time() - $seconds;

        $authUsers = DB::table('sessions')
        ->whereNotNull('user_id')
        ->where('last_activity', '>=', $active)
        ->count();

        $guestUsers = DB::table('sessions')
        ->whereNull('user_id')
        ->where('last_activity', '>=', $active)
        ->count();

        return $authUsers + $guestUsers;
    }
}
