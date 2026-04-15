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
    Schema::create('resources', function (Blueprint $table) {
        $table->resources_id();
        $table->string('room_name');
        $table->string('glossary')->nullable();
        $table->text('description')->nullable();
        $table->unsignedBigInteger('building_id');
        $table->string('floor');
        $table->integer('capacity');
        $table->timestamps();

        // optional FK
        $table->foreign('building_id')->references('building_id')->on('buildings')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
