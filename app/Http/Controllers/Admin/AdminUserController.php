<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminUserController extends Controller
{
    private const array PAID_STATUSES = ['paid', 'dispatched', 'delivered'];

    public function index(Request $request)
    {
        return Inertia::render('Admin/users/Index', [
            'users' => Inertia::defer(fn () => $this->usersWithPaidCount($request)
                ->paginate($request->integer('per_page', 15))
                ->withQueryString()),
            'paidOrdersTotal' => Inertia::defer(fn () => Order::whereIn('status', self::PAID_STATUSES)
                ->whereIn('user_id', $this->filteredUsers($request)->select('id'))
                ->count()),
            'onlineUsers' => $this->onlineCounts(),
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $users = $this->usersWithPaidCount($request);

        return response()->streamDownload(function () use ($users) {
            $out = fopen('php://output', 'w');
            fwrite($out, "\u{FEFF}");
            fputcsv($out, ['Full Name', 'User ID', 'Phone', 'Paid Orders', 'Handyman', 'Joined']);

            $users->lazy(500)->each(fn (User $user) => fputcsv($out, [
                trim($user->name.' '.$user->lastname),
                $user->tax_id,
                $user->phone,
                $user->paid_orders_count,
                $user->is_handyman ? 'Yes' : 'No',
                $user->created_at,
            ]));

            fclose($out);
        }, 'users.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    private function filteredUsers(Request $request): Builder
    {
        return User::query()
            ->when($request->filled('tax_id'), fn ($q) => $q->where('tax_id', $request->string('tax_id')))
            ->when($request->filled('phone'), fn ($q) => $q->where('phone', 'like', '%'.$request->string('phone').'%'))
            ->when($request->filled('name'), function ($q) use ($request) {
                $name = '%'.$request->string('name').'%';
                $q->where(fn ($u) => $u->where('name', 'like', $name)
                    ->orWhere('lastname', 'like', $name)
                    ->orWhereRaw("concat(name, ' ', lastname) like ?", [$name]));
            });
    }

    private function usersWithPaidCount(Request $request): Builder
    {
        return $this->filteredUsers($request)
            ->select('id', 'tax_id', 'phone', 'name', 'lastname', 'is_handyman', 'created_at')
            ->withCount(['orders as paid_orders_count' => fn ($q) => $q->whereIn('status', self::PAID_STATUSES)])
            ->latest();
    }

    public function edit(User $user)
    {
        return response()->json(['user' => $user], 200);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    public function onlineCounts(int $seconds = 120): int
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
