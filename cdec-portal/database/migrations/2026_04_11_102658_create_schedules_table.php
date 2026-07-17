<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id('schedule_id');

            // Curriculum
            $table->unsignedBigInteger('curricula_id');

            // Course
            $table->unsignedBigInteger('course_id');
            $table->string('course_code')->nullable();
            $table->string('course_no')->nullable();
            $table->string('descriptive_title')->nullable();

            // Program
            $table->unsignedBigInteger('program_id');

            // Academic
            $table->unsignedBigInteger('academic_id');
            $table->string('academic_year')->nullable();
            $table->string('academic_period')->nullable();

            // Room
            $table->unsignedBigInteger('building_id');
            $table->unsignedBigInteger('resources_id');
            $table->string('room_name')->nullable();

            // Instructor
            $table->unsignedBigInteger('instructor_id');
            $table->string('prefix')->nullable();
            $table->string('instructor_name')->nullable();

            // Schedule
            $table->string('days');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('duration');
            $table->integer('available_slot')->default(0);

            $table->timestamps();

            /*
            |--------------------------------------------------------------------------
            | Foreign Keys
            |--------------------------------------------------------------------------
            */

            $table->foreign('curricula_id')
                ->references('curricula_id')
                ->on('curricula')
                ->onDelete('cascade');

            $table->foreign('course_id')
                ->references('course_id')
                ->on('courses')
                ->onDelete('cascade');

            $table->foreign('academic_id')
                ->references('academic_id')
                ->on('academic_terms')
                ->onDelete('cascade');
                
            $table->foreign('resources_id')
                ->references('resources_id')
                ->on('resources')
                ->onDelete('cascade');

            $table->foreign('instructor_id')
                ->references('user_id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};