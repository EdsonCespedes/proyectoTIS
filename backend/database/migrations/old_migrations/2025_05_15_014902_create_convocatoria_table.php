<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConvocatoriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('convocatoria', function (Blueprint $table) {
            $table->increments('idConvocatoria');
            $table->string('tituloConvocatoria');
            $table->text('descripcion')->nullable();
            $table->dateTime('fechaPublicacion')->nullable();
            $table->dateTime('fechaInicioInsc')->nullable();
            $table->dateTime('fechaFinInsc')->nullable();
            $table->string('portada', 255)->nullable();
            $table->boolean('habilitada')->default(false);
            $table->dateTime('fechaInicioOlimp')->nullable();
            $table->dateTime('fechaFinOlimp')->nullable();
            $table->integer('maximoPostPorArea')->default(0);
            $table->boolean('eliminado')->default(false);
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
