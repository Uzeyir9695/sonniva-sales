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
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('order_id')->constrained()->cascadeOnDelete();
            $table->string('provider'); // bog/tbc/pcb/invoice
            $table->string('transaction_id')->unique()->nullable(); // bank's transaction ID
            $table->string('status')->default('pending'); // pending/processing/completed/failed/cancelled
            $table->decimal('amount', 12, 2);
            $table->string('currency', 3)->default('GEL');
            $table->json('response_data')->nullable(); // full bank response
            $table->string('payment_method')->nullable(); // card type, last4 etc.
            $table->string('ip_address', 45)->nullable(); // fraud detection
            $table->unsignedSmallInteger('attempts')->default(0); // retry tracking
            $table->string('invoice_no')->nullable()->index();
            $table->timestamp('processed_at')->nullable(); // prevents duplicate charges
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
