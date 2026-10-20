<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->string('notice_title')->nullable()->after('description_tr');
            $table->string('notice_title_en')->nullable()->after('notice_title');
            $table->string('notice_title_ru')->nullable()->after('notice_title_en');
            $table->string('notice_title_tr')->nullable()->after('notice_title_ru');
            $table->text('notice_description')->nullable()->after('notice_title_tr');
            $table->text('notice_description_en')->nullable()->after('notice_description');
            $table->text('notice_description_ru')->nullable()->after('notice_description_en');
            $table->text('notice_description_tr')->nullable()->after('notice_description_ru');
        });
    }

    public function down(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn([
                'notice_title', 'notice_title_en', 'notice_title_ru', 'notice_title_tr',
                'notice_description', 'notice_description_en', 'notice_description_ru', 'notice_description_tr',
            ]);
        });
    }
};
