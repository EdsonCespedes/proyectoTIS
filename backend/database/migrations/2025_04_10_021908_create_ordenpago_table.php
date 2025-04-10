<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdenpagoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ordenpago', function (Blueprint $table) {
            $table->increments('idOrdenPago');
            $table->decimal('montoTotal');
            $table->boolean('cancelado');
            $table->dateTime('vigencia');
           
            $table->unsignedInteger ('idTutor');
            $table->foreign('idTutor')->references('idTutor')->on('tutor');

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
        Schema::dropIfExists('ordenpago');
    }
}
