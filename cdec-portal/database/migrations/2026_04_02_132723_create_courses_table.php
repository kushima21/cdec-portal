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
            $table->course_id(); // COURSE ID

            $table->string('course_no')->unique(); // COURSE NO
            $table->string('descriptive_title'); // DESCRIPTIVE TITLE

            $table->integer('lab_units')->default(0); // LAB UNITS
            $table->integer('lecture_units')->default(0); // LECTURE UNITS
            $table->integer('total_units')->default(0); // TOTAL UNITS

            $table->timestamps(); // CREATED AT & UPDATED AT
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
