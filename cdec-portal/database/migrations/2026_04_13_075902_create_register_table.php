<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('register', function (Blueprint $table) {
            $table->id();

            // Stores users.id
            $table->unsignedBigInteger('register_id');

            $table->string('firstname');
            $table->string('lastname');
            $table->string('school_id')->unique();
            $table->string('email')->unique();
            $table->string('password');

            $table->string('status')->default('Active');
            $table->json('roles');

            $table->timestamps();

            // Foreign Key
            $table->foreign('register_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('register');
    }
    
};