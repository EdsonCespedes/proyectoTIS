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
            $table->increments('idPostulante');
            $table->string('nombrePost');
            $table->string('apellidoPost');
            $table->string('carnet');
            $table->date('fechaNaciPost');
            $table->string('correoPost');
            $table->string('telefonoPost');
            $table->string('departamento');
            $table->string('provincia');
            $table->unsignedInteger ('idTutor');
            $table->foreign('idTutor')->references('idTutor')->on('tutor');
            $table->unsignedInteger ('idColegio');
            $table->foreign('idColegio')->references('idColegio')->on('colegio');
            $table->unsignedInteger ('idDelegacion')->nullable();
            $table->foreign('idDelegacion')->references('idDelegacion')->on('delegacion');
            $table->unsignedInteger ('idCurso');
            $table->foreign('idCurso')->references('idCurso')->on('curso');

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
