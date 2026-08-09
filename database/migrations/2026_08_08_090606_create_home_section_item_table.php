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
        Schema::create('home_section_item', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('home_section_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('item_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['home_section_id', 'item_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_section_item');
    }
};
