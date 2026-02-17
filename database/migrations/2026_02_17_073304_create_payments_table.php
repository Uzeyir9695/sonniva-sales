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
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('invoice_no')->index();
            $table->string('delivery_type')->nullable();
            $table->integer('delivery_cost')->nullable();
            $table->string('provider');
            $table->string('transaction_id')->unique()->nullable();
            $table->string('status')->default('pending'); // 'pending', 'processing', 'completed', 'failed', 'cancelled'
            $table->json('response_data')->nullable(); // Bank's response/metadata
            $table->string('payment_method')->nullable(); // Card type, etc.
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
