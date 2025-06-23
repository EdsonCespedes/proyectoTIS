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
            $table->id('idPostulacion');
            $table->foreignId('idCategoria')
                ->constrained('categoria', 'idCategoria')
                ->cascadeOnDelete();
            $table->foreignId('idPostulante')
                ->constrained('postulante', 'idPostulante')
                ->cascadeOnDelete();
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
