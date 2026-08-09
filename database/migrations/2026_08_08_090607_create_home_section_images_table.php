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
        Schema::create('home_section_images', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('home_section_id')->constrained()->cascadeOnDelete();
            $table->string('image_path');
            $table->string('title')->nullable();
            $table->string('link_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_section_images');
    }
};
