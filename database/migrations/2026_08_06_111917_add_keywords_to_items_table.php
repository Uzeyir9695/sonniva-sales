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
            $table->text('en_keywords')->nullable()->after('video_url');
            $table->text('ru_keywords')->nullable()->after('en_keywords');
            $table->text('tr_keywords')->nullable()->after('ru_keywords');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn(['en_keywords', 'ru_keywords', 'tr_keywords']);
        });
    }
};
