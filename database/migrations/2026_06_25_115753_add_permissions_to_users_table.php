<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('can_view_wholesales')->default(false)->after('role');
            $table->boolean('can_view_vip')->default(false)->after('can_view_wholesales');
            $table->boolean('can_view_inventory')->default(false)->after('can_view_vip');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['can_view_wholesales', 'can_view_vip', 'can_view_inventory']);
        });
    }
};
