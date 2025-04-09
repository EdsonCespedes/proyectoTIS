<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConvocatoriasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('convocatorias', function (Blueprint $table) {
            $table->increments('idConvocatoria');
            $table->dateTime('fechaPublicacion')->nullable();
            $table->dateTime('fechaInicioInsc')->nullable();
            $table->dateTime('fechaFinInsc')->nullable();
            $table->string('portada', 45)->nullable();
            $table->boolean('activo')->default(false);
            $table->dateTime('fechaInicioOlimp')->nullable();
            $table->dateTime('fechaFinOlimp')->nullable();
            $table->integer('maximoPostPorArea')->nullable();
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
        Schema::dropIfExists('convocatoria');
    }
}
