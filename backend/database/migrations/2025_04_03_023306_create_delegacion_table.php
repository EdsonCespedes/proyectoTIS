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
        Schema::disableForeignKeyConstraints();

        Schema::create('delegacion', function (Blueprint $table) {
            $table->increments('idDelegacion');
            $table->unsignedInteger ('idColegio');
            $table->foreign('idColegio')->references('idColegio')->on('colegio');
            $table->string('nombreDelegacion');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delegacion');
    }
};
