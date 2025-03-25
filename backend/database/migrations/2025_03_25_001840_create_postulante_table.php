<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostulanteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('postulante', function (Blueprint $table) {
            $table->increments('idPostulante');
            $table->string('nombrePost', 45)->nullable();
            $table->string('apellidoPost', 45)->nullable();
            $table->string('carnet', 45)->nullable();
            $table->dateTime('fechaNacPost')->nullable();
            $table->string('correoPost', 45)->nullable();
            $table->string('telefonoPost', 45)->nullable();
            $table->string('departamento', 45)->nullable();
            $table->string('provincia', 45)->nullable();
            $table->string('curso', 45)->nullable();
            $table->unsignedInteger('idColegio');
            $table->unsignedInteger('idDelegacion');
            $table->unsignedInteger('idTutor');
            $table->foreign('idColegio')->references('idColegio')->on('colegio')->onDelete('cascade');
            $table->foreign('idDelegacion')->references('idDelegacion')->on('delegacion')->onDelete('cascade');
            $table->foreign('idTutor')->references('idTutor')->on('tutor')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('postulante');
    }
}
