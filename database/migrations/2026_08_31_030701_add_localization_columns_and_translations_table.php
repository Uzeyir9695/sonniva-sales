<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
            $table->string('name_ru')->nullable()->after('name_en');
            $table->string('name_tr')->nullable()->after('name_ru');
            $table->text('description_en')->nullable()->after('description');
            $table->text('description_ru')->nullable()->after('description_en');
            $table->text('description_tr')->nullable()->after('description_ru');
            $table->boolean('needs_review')->default(false)->after('tr_keywords');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
            $table->string('name_ru')->nullable()->after('name_en');
            $table->string('name_tr')->nullable()->after('name_ru');
            $table->boolean('needs_review')->default(false)->after('name_tr');
        });

        // Shared dictionary for short, heavily-repeated free text — attribute
        // names, attribute values, UOM descriptions — translated once per
        // distinct source string and looked up everywhere it recurs.
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('source_text')->unique();
            $table->text('en')->nullable();
            $table->text('ru')->nullable();
            $table->text('tr')->nullable();
            $table->boolean('needs_review')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn([
                'name_en', 'name_ru', 'name_tr',
                'description_en', 'description_ru', 'description_tr',
                'needs_review',
            ]);
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'name_ru', 'name_tr', 'needs_review']);
        });

        Schema::dropIfExists('translations');
    }
};
