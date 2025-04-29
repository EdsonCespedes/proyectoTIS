<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagodetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagodetalle', function (Blueprint $table) {
            $table->increments('idPagoDet');
            $table->decimal('monto');
            $table->string('descripcion');
           
            $table->unsignedInteger ('idOrdenPago');
            $table->foreign('idOrdenPago')->references('idOrdenPago')->on('ordenpago');
            $table->unsignedInteger ('idPostulacion');
            $table->foreign('idPostulacion')->references('idPostulacion')->on('postulacion');

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
        Schema::dropIfExists('pagodetalle');
    }
}
