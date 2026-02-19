<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\BusinessCentralService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;

class UpdateBusinessCentralCustomer implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public string $userId,
        public array $payload,
        public ?string $endpoint = null
    ) {}

    public function handle(BusinessCentralService $bcService): void
    {
        $user = User::find($this->userId);

        if (!$user) {
            return;
        }

        Cache::lock('update_bc_'.$this->userId, 10)->get(function () use ($user, $bcService) {
            if($user->bc_customer_no) {
                $bcService->updateCustomer($this->endpoint, $this->payload);
            } else {
                $bcService->addCustomer($user);
            }
        });
    }
}
