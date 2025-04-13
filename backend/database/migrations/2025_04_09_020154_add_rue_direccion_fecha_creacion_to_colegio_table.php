<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRueDireccionFechaCreacionToColegioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('colegio', function (Blueprint $table) {
            $table->string('RUE')->nullable();
            $table->string('direccion')->nullable();
            $table->date('fecha_creacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('colegio', function (Blueprint $table) {
            $table->dropColumn(['RUE', 'direccion', 'fecha_creacion']);
        });
    }
}
