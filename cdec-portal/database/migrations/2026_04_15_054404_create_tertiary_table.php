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
Schema::create('tertiary', function (Blueprint $table) {
    $table->id();

    // Personal Info
    $table->string('prefix')->nullable();
    $table->string('suffix')->nullable();
    $table->string('first_name');
    $table->string('middle_name')->nullable();
    $table->string('last_name');
    $table->date('birth_date')->nullable();
    $table->integer('age')->nullable();
    $table->string('gender')->nullable();
    $table->string('civil_status')->nullable();
    $table->string('contact_number')->nullable();
    $table->text('address')->nullable();

    // Emergency
    $table->string('emergency_fullname')->nullable();
    $table->text('emergency_address')->nullable();
    $table->string('emergency_number')->nullable();

    // Academic
    $table->string('previous_school')->nullable();
    $table->text('school_address')->nullable();

    // Logged in user info
    $table->string('email');
    $table->string('username');

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tertiary');
    }
};
