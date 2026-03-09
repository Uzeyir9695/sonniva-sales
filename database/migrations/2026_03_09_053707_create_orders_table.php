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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->string('invoice_no')->nullable()->unique()->index();
            $table->string('status')->default('pending'); // pending/approved/ready/cancelled
            $table->string('delivery_type'); // office/tbilisi/regions
            $table->decimal('delivery_cost', 10, 2)->default(0);
            $table->string('address');
            $table->string('apartment_number')->nullable();
            $table->decimal('subtotal', 12, 2)->default(0);
            $table->decimal('total', 12, 2)->default(0);
            $table->text('comment')->nullable();
            $table->timestamp('seen_at')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('invoiced_at')->nullable();
            $table->timestamp('ready_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
