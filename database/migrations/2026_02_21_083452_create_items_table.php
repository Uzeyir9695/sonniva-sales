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
        Schema::create('items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('no')->unique(); // BC's no (e.g. HANDLE00001)
            $table->string('category_code')->nullable()->index();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('slug')->unique();
            $table->integer('inventory')->default(0);
            $table->decimal('unit_price', 10, 2)->default(0);
            $table->string('base_uom_desc')->nullable();
            $table->decimal('min_qty_unit_price', 10, 2)->default(0);
            $table->string('image')->nullable();
            $table->timestamp('synced_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
