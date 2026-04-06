<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('colleges', function (Blueprint $table) {
            $table->college_id();
            $table->string('abbreviation', 50);
            $table->string('college_name');
            $table->string('college_logo')->nullable();
            $table->string('email')->unique();
            $table->string('associate_dean');
            $table->text('descriptive')->nullable();
            $table->enum('colleges_status', ['Active', 'Inactive'])->default('Active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('colleges');
    }
};