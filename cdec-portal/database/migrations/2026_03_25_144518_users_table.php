<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up(): void
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('prefix')->nullable();
        $table->string('firstname');
        $table->string('middlename')->nullable();
        $table->string('lastname');
        $table->string('suffix')->nullable();
        $table->string('academic_suffix')->nullable();

        $table->json('roles'); // multi roles

        $table->string('username')->unique();
        $table->string('password');
        $table->string('profile_picture')->nullable();

        $table->date('birthdate')->nullable();
        $table->string('contact_number')->nullable();
        $table->string('sex')->nullable();

        $table->string('emergency_fullname')->nullable();
        $table->string('emergency_address')->nullable();
        $table->string('emergency_number')->nullable();

        $table->timestamps();
    });
}
};
