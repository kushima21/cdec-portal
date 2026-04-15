<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('curricula_id');
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('program_id');
            $table->unsignedBigInteger('academic_id'); // 👈 ADD THIS
            $table->unsignedBigInteger('building_id');
            $table->unsignedBigInteger('room_id');
            $table->unsignedBigInteger('instructor_id');

            $table->string('days'); // Monday,Tuesday
            $table->time('start_time');
            $table->time('end_time');

            $table->string('duration'); // Whole Semester / Summer
            $table->integer('available_slot')->default(0);

            $table->timestamps();

            // optional foreign keys
            $table->foreign('curricula_id')->references('curricula_id')->on('curricula')->onDelete('cascade');
            $table->foreign('academic_id')->references('academic_id')->on('academic_terms')->onDelete('cascade');
            $table->foreign('room_id')->references('resources_id')->on('resources')->onDelete('cascade');
            $table->foreign('instructor_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};