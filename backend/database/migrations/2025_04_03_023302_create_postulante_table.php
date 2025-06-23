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

        Schema::create('postulante', function (Blueprint $table) {
            $table->id('idPostulante');
            $table->string('nombrePost');
            $table->string('apellidoPost');
            $table->string('carnet');
            $table->date('fechaNaciPost');
            $table->string('correoPost');
            $table->string('telefonoPost');
            $table->string('departamento');
            $table->string('provincia');
            $table->foreignId('idTutor')
                ->constrained('tutor')
                ->cascadeOnDelete();
            $table->foreignId('idColegio')
                ->constrained('colegio')
                ->cascadeOnDelete();
            $table->string ('delegacion')->nullable();
            $table->foreignId('idCurso')
                ->constrained('curso')
                ->cascadeOnDelete();

            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('postulante');
    }
};
