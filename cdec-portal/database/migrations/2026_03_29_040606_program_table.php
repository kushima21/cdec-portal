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
    Schema::create('programs', function (Blueprint $table) {
        $table->id();
        $table->string('abbreviation');
        $table->string('program_name');
        $table->string('major')->nullable();
        $table->string('college_duration');
        $table->text('description')->nullable();

        // Store the full name instead of user ID
        $table->string('program_head')->nullable();
        $table->string('program_status')->default('Active');

        $table->timestamps(); // created_at & updated_at
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
