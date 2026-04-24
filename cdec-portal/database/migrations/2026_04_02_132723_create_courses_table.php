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
Schema::create('courses', function (Blueprint $table) {
    $table->id();
    $table->string('course_code')->nullable();
   $table->integer('course_no')->nullable();
    $table->string('descriptive_title');
    $table->integer('lecture_units')->nullable();
    $table->integer('lab_units')->nullable();
    $table->integer('total_units');
    $table->timestamps();
});
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
