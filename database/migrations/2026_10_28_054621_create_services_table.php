<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('no')->unique();
            $table->string('name');
            $table->string('uom');
            $table->decimal('unit_price', 12, 2);
            $table->timestamps();
        });

        DB::table('services')->insert([
            ['no' => 'NONINV331', 'name' => 'მონტაჟი', 'uom' => 'ცალი/UNIT', 'unit_price' => 130, 'created_at' => now(), 'updated_at' => now()],
            ['no' => 'NONINV261', 'name' => 'ალუმინის დაჭრის მომსახურება', 'uom' => 'ცალი/UNIT', 'unit_price' => 5, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
