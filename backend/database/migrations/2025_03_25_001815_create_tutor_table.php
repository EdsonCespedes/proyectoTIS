<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTutorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tutor', function (Blueprint $table) {
            $table->increments('idTutor');
            $table->string('nombreTutor', 45)->nullable();
            $table->string('apellidoTutor', 45)->nullable();
            $table->string('correoTutor', 45)->nullable();
            $table->string('telefonoTutor', 45)->nullable();
            $table->dateTime('fechaNacTutor')->nullable();
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
        Schema::dropIfExists('tutor');
    }
}
