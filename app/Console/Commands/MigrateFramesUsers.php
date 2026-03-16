<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MigrateFramesUsers extends Command
{
    protected $signature = 'migrate:frames-users';
    protected $description = 'One-time migration of frames users to shared e-commerce DB';

    public function handle()
    {
        $users = DB::connection('frames_temp')->table('users')->get();

        $this->info("Found {$users->count()} users to migrate...");
        $bar = $this->output->createProgressBar($users->count());

        foreach ($users as $user) {
            $exists = DB::table('users')->where('phone', $user->phone)->first();

            if ($exists) {
                // Update everything EXCEPT id
                DB::table('users')->where('phone', $user->phone)->update([
                    'name'              => $user->name,
                    'lastname'          => $user->lastname,
                    'email'             => $user->email,
                    'phone_country'     => $user->phone_country,
                    'password'          => $user->password,
                    'user_type'              => $user->user_type,
                    'role'              => $user->role,
                    'bc_customer_no'    => $user->bc_customer_no,
                    'tax_id'            => $user->tax_id,
                    'address'           => $user->address,
                    'phone_verified_at' => $user->phone_verified_at,
                    'email_verified_at' => $user->email_verified_at,
                    'last_login_at'     => $user->last_login_at,
                    'remember_token'    => $user->remember_token,
                    'updated_at'        => $user->updated_at,
                ]);
            } else {
                // Insert new user with frames id
                DB::table('users')->insert([
                    'id'                => $user->id,
                    'name'              => $user->name,
                    'lastname'          => $user->lastname,
                    'email'             => $user->email,
                    'phone'             => $user->phone,
                    'phone_country'     => $user->phone_country,
                    'password'          => $user->password,
                    'user_type'              => $user->user_type,
                    'role'              => $user->role,
                    'bc_customer_no'    => $user->bc_customer_no,
                    'is_handyman'       => false,
                    'tax_id'            => $user->tax_id,
                    'address'           => $user->address,
                    'phone_verified_at' => $user->phone_verified_at,
                    'email_verified_at' => $user->email_verified_at,
                    'last_login_at'     => $user->last_login_at,
                    'remember_token'    => $user->remember_token,
                    'created_at'        => $user->created_at,
                    'updated_at'        => $user->updated_at,
                ]);
            }

            $bar->advance();
        }

        $bar->finish();
        $this->info("\nDone! {$users->count()} users migrated.");
    }
}
