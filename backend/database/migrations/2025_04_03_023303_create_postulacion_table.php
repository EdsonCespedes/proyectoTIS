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

        Schema::create('postulacion', function (Blueprint $table) {
            $table->increments('idPostulacion');
            $table->unsignedInteger ('idCategoria');
            $table->foreign('idCategoria')->references('idCategoria')->on('categoria');
            $table->unsignedInteger ('idPostulante');
            $table->foreign('idPostulante')->references('idPostulante')->on('postulante');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('postulacion');
    }
};
