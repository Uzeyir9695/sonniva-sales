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
        Schema::table('items', function (Blueprint $table) {
            $table->decimal('wholesale_discount_percent', 7, 4)->nullable()->after('discount'); // discount percentage applied to the matched Wholesale tier price, 0-100
            $table->decimal('vip_discount_percent', 7, 4)->nullable()->after('wholesale_discount_percent'); // discount percentage applied to the matched VIP tier price, 0-100
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn(['wholesale_discount_percent', 'vip_discount_percent']);
        });
    }
};
