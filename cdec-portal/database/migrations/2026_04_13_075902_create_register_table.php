<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
Schema::create('register', function (Blueprint $table) {
    $table->id();
    $table->string('firstname');
    $table->string('lastname');
    $table->string('email')->unique();
    $table->string('password');
    $table->string('status')->default('Active');
    $table->string('roles')->default('tertiary');
    $table->timestamps();
});
    }

    public function down(): void
    {

    }
};
