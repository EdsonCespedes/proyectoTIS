<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveDepartamentoProvinciaFromPostulante extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('postulante', function (Blueprint $table) {
            $table->dropColumn(['departamento', 'provincia',]); // Eliminar dos columnas
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('postulante', function (Blueprint $table) {
            //
        });
    }
}
